import { APIQuestion } from '../../models/modelsadmin/Question';
export interface Subcategory {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
}
export interface Test {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  subcategoryId: number;
  questions?: APIQuestion[];
  subcategory: Subcategory;
}
export const InitialTestStateTest: Test = {
  id: 0,
  name: "",
  description: "",
  createdAt: "",
  updatedAt: "",
  subcategoryId: 0,
  subcategory: {
    id: 0,
    name: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    categoryId: 0,
  },
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}
// Subcategory with tests included
export interface SubcategoryWithTests {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  category: Category;
  tests: Test[];
}

// Pagination structure for the API response
export interface TestResponse {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  items: SubcategoryWithTests[];
}

// Optional: If you need a structure for test attempts or results
export interface TestAttempt {
  id: number;
  testId: number;
  score: number;
  completedAt: string;
  answers: TestAnswer[];
}

export interface TestAnswer {
  questionId: number;
  selectedOptionId: number;
  isCorrect: boolean;
}