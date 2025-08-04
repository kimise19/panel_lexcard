
export interface Tests {
  id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    subcategoryId: number;
}
export interface APIQuestion {
  id: number;
  question: string;
  options: string | string[];
  answers: string | string[];
  correct: number;
  justification: string;
  score: number;
  createdAt: string;
  updatedAt: string;
  testId: number;
  test: Tests;
}
export const InitialQuestionStateQuestion: APIQuestion = {
  id: 0,
  question: "",
  options: [],
  answers: [],
  correct: 0,
  justification: "",
  score: 0,
  createdAt: "",
  updatedAt: "",
  testId: 0,
  test: {
    id: 0,
    name: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    subcategoryId: 0,
  },

};

export interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  answers: string[];
  explanation: string;
  reviewed: boolean;
}

export interface PaginatedResponse<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  items: T[];
}