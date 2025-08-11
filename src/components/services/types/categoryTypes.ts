// Category Types based on GraphQL schema
import { PageInfo } from './commonTypes';

export interface CategoryGraphQL {
  id: number;
  name: string;
  description?: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryEdge {
  node: CategoryGraphQL;
}

export interface CategoryConnection {
  edges: CategoryEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface CreateCategoryInput {
  name: string;
  description?: string;
  image?: File;
}

export interface UpdateCategoryInput {
  name?: string;
  description?: string;
  image?: File;
}
