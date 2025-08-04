// Define the Subcategory interface first
export interface Subcategory {
  id: number;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  categoryId: number;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  image: File|null;
  createdAt?: string;
  updatedAt?: string;
  subcategories: Subcategory[];
}

export const InitialCategoryState: Category = {
  id: 0,
  name: "",
  description: "",
  image:null,
  createdAt: "",
  updatedAt: "",
  subcategories: []
};

export interface Categorie{
  id: number,
  name: string,
  description: string,
  image: File|null,
}
export const InitialCategoryStateCategory: Categorie = {
  id: 0,
  name: "",
  description: "",
  image: null,
};