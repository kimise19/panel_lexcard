import { Test } from '../modelsadmin/Tets';
export interface Questions {
  id: number;
  text: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  subcategoryId: number;
}
export interface Subcategory {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  questions?: Questions[]; // Usamos any aquí para compatibilidad con Ask.tsx
}

export interface SubcategoryDetail {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
    description: string;
    image: string;
    createdAt: string;
    updatedAt: string;
  };
  tests: Test[];
}