import { Test } from '../models/Tets';

export interface Subcategory {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
  questions?: any[]; // Usamos any aquí para compatibilidad con Ask.tsx
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