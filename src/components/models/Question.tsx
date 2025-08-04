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
}

export interface Question {
  id: number;
  question: string;
  correctAnswer: string;
  answers: string[];
  explanation: string;
  reviewed?: boolean;
}

export interface PaginatedResponse<T> {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  items: T[];
}