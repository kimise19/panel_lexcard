import { CommonTypes, PageInfo } from './commonTypes';
import { Subcategory } from './subcategoryTypes';

// Types based on GraphQL schema for Test
export interface Test {
  id: number;
  name: string;
  description?: string;
  subcategoryId: number;
  subcategory: Subcategory;
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

export interface TestsResponse extends CommonTypes {
  items: Test[];
}

export interface TestResponse extends CommonTypes {
  item: Test;
}

export interface DeleteTestResponse extends CommonTypes {
  success: boolean;
}
