import { OrganizationRepository } from '../repositories/organization-repository';
import { Organization } from '../types';

export class OrganizationService {
  private repository: OrganizationRepository;

  constructor() {
    this.repository = new OrganizationRepository();
  }

  async createOrganization(organization: Omit<Organization, 'id' | 'createdAt' | 'updatedAt'>): Promise<Organization> {
    const existingOrg = await this.repository.findBySlug(organization.slug);
    if (existingOrg) {
      throw new Error(`Organization with slug '${organization.slug}' already exists`);
    }
    return this.repository.create(organization);
  }

  async getOrganizationById(id: string): Promise<Organization | null> {
    return this.repository.findById(id);
  }

  async getAllOrganizations(): Promise<Organization[]> {
    return this.repository.findAll();
  }

  async getOrganizationsByUserId(userId: string): Promise<Organization[]> {
    return this.repository.findByUserId(userId);
  }

  async getOrganizationBySlug(slug: string): Promise<Organization | null> {
    return this.repository.findBySlug(slug);
  }

  async updateOrganization(id: string, updates: Partial<Organization>): Promise<Organization> {
    if (updates.slug) {
      const existingOrg = await this.repository.findBySlug(updates.slug);
      if (existingOrg && existingOrg.id !== id) {
        throw new Error(`Organization with slug '${updates.slug}' already exists`);
      }
    }
    return this.repository.update(id, updates);
  }

  async deleteOrganization(id: string): Promise<void> {
    return this.repository.delete(id);
  }

  async generateUniqueSlug(name: string): Promise<string> {
    const baseSlug = name.toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim('-');

    let slug = baseSlug;
    let counter = 1;

    while (await this.repository.findBySlug(slug)) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    return slug;
  }

  async createPersonalOrganization(userId: string, displayName: string): Promise<Organization> {
    const slug = await this.generateUniqueSlug(displayName);
    
    return this.createOrganization({
      name: displayName,
      displayName,
      description: 'Personal organization',
      slug,
      userId
    });
  }
}