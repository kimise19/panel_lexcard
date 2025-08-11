// Subcategory Types based on GraphQL schema
import { PageInfo } from './commonTypes';

export interface SubcategoryGraphQL {
  id: number;
  name: string;
  description?: string;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
    description?: string;
    image?: string;
  };
}

export interface SubcategoryEdge {
  node: SubcategoryGraphQL;
}

export interface SubcategoryConnection {
  edges: SubcategoryEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface CreateSubcategoryInput {
  name: string;
  description?: string;
  categoryId: number;
}

export interface UpdateSubcategoryInput {
  name?: string;
  description?: string;
  categoryId?: number;
}
