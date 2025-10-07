export interface Organization {
  id: string;
  name: string;
  displayName: string;
  description?: string;
  slug: string;
  userId?: string;
  createdAt: Date;
  updatedAt: Date;
}
