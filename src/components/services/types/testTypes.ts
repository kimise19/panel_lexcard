import { PageInfo } from './commonTypes';
import { SubcategoryGraphQL } from './subcategoryTypes';

// Types based on GraphQL schema for Test
export interface Test {
  id: number;
  name: string;
  description?: string;
  subcategoryId: number;
  subcategory: SubcategoryGraphQL;
  createdAt: string;
  updatedAt: string;
}

export interface TestEdge {
  node: Test;
}

export interface TestConnection {
  edges: TestEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface CreateTestInput {
  name: string;
  description?: string;
  subcategoryId: number;
}

export interface UpdateTestInput {
  id: number;
  name?: string;
  description?: string;
  subcategoryId?: number;
}
