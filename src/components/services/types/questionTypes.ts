// Question Types based on GraphQL schema
import { PageInfo } from './commonTypes';

export enum QuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  TRUE_FALSE = 'TRUE_FALSE',
  SINGLE_CHOICE = 'SINGLE_CHOICE'
}

export interface QuestionGraphQL {
  id: number;
  question: string;
  options: string[];
  answers: string[];
  correct: string[];
  justification: string;
  score: number;
  type: QuestionType;
  testId: number;
  createdAt: string;
  updatedAt: string;
}

export interface QuestionEdge {
  node: QuestionGraphQL;
}

export interface QuestionConnection {
  edges: QuestionEdge[];
  pageInfo: PageInfo;
  totalCount: number;
}

export interface CreateQuestionInput {
  question: string;
  options: string[];
  answers: string[];
  correct: string[];
  justification: string;
  score: number;
  type: QuestionType;
  testId: number;
}

export interface UpdateQuestionInput {
  question?: string;
  options?: string[];
  answers?: string[];
  correct?: string[];
  justification?: string;
  score?: number;
  type?: QuestionType;
  testId?: number;
}
