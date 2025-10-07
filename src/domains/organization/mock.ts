import { Organization } from "./types";

export const mockOrganizations: Organization[] = [
  {
    id: "org-1",
    name: "個人用家計簿",
    displayName: "田中太郎の家計簿",
    description: "個人の収支管理用",
    slug: "tanaka-personal",
    userId: "user-1",
    createdAt: new Date("2024-01-01T10:00:00"),
    updatedAt: new Date("2024-01-15T14:30:00"),
  },
  {
    id: "org-2",
    name: "ABC商事株式会社",
    displayName: "ABC商事 経理部",
    description: "会社の経費管理",
    slug: "abc-trading",
    userId: "user-2",
    createdAt: new Date("2024-01-02T09:15:00"),
    updatedAt: new Date("2024-01-20T16:45:00"),
  },
  {
    id: "org-3",
    name: "スタートアップXYZ",
    displayName: "XYZ Inc.",
    description: "スタートアップの資金管理",
    slug: "startup-xyz",
    userId: "user-3",
    createdAt: new Date("2024-01-03T11:30:00"),
    updatedAt: new Date("2024-01-18T13:20:00"),
  },
  {
    id: "org-4",
    name: "家族共有家計簿",
    displayName: "山田家の家計簿",
    description: "家族みんなで管理する家計簿",
    slug: "yamada-family",
    userId: "user-4",
    createdAt: new Date("2024-01-05T08:45:00"),
    updatedAt: new Date("2024-01-22T17:10:00"),
  },
  {
    id: "org-5",
    name: "フリーランス事業",
    displayName: "佐藤デザイン事務所",
    slug: "sato-design",
    userId: "user-5",
    createdAt: new Date("2024-01-07T14:20:00"),
    updatedAt: new Date("2024-01-25T10:55:00"),
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
