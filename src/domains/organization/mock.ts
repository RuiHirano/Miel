import { Organization } from "./types";

export const mockOrganizations: Organization[] = [
  {
    id: "org-1",
    name: "平野家",
    displayName: "平野家の家計簿",
    description: "家族の収支管理",
    slug: "hirano-family",
    userId: "user-1",
    createdAt: new Date("2024-01-01T10:00:00"),
    updatedAt: new Date("2024-01-15T14:30:00"),
  },
  {
    id: "org-2",
    name: "個人用",
    displayName: "個人の家計簿",
    description: "個人的な収支管理用",
    slug: "personal",
    userId: "user-1",
    createdAt: new Date("2024-01-02T09:15:00"),
    updatedAt: new Date("2024-01-20T16:45:00"),
  },
  {
    id: "org-3",
    name: "Tech Startup Inc.",
    displayName: "Tech Startup経理",
    description: "会社の経費管理",
    slug: "tech-startup",
    userId: "user-1",
    createdAt: new Date("2024-01-03T11:30:00"),
    updatedAt: new Date("2024-01-18T13:20:00"),
  },
];

// 現在の組織（デフォルト）
export const currentOrganization: Organization = mockOrganizations[0];

// 組織IDから組織情報を取得するヘルパー関数
export const getOrganizationById = (
  organizationId: string
): Organization | undefined => {
  return mockOrganizations.find((org) => org.id === organizationId);
};

// ユーザーIDから所属組織一覧を取得するヘルパー関数
export const getOrganizationsByUserId = (userId: string): Organization[] => {
  return mockOrganizations.filter((org) => org.userId === userId);
};

// slugから組織情報を取得するヘルパー関数
export const getOrganizationBySlug = (
  slug: string
): Organization | undefined => {
  return mockOrganizations.find((org) => org.slug === slug);
};
