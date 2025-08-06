import {Category,Categorie} from '../../models/modelsadmin/Category';
import { 
  createCategoryGraphQL, 
  updateCategoryGraphQL, 
  deleteCategoryGraphQL,
  getCategoriesGraphQL,
  CreateCategoryInput,
  UpdateCategoryInput,
  CategoryConnection,
  CategoryGraphQL,
  PaginationInput
} from '../GraphQLService';
import { convertFileToBase64 } from '../../utils/ImageUtils';

// Función para convertir CategoryGraphQL a Category para el admin
const convertGraphQLCategoryToCategory = (graphqlCategory: CategoryGraphQL): Category => {
  return {
    id: graphqlCategory.id,
    name: graphqlCategory.name,
    description: graphqlCategory.description || "",
    image: null, // GraphQL devuelve string, pero el modelo espera File|null
    createdAt: graphqlCategory.createdAt,
    updatedAt: graphqlCategory.updatedAt,
    subcategories: [] // Las subcategorías se cargan por separado
  };
};

export const createCategory = async (category: Categorie): Promise<Categorie> => {
    try {
        const input: CreateCategoryInput = {
            name: category.name,
            description: category.description,
            // Convertir imagen File a base64 si existe
            image: category.image ? await convertFileToBase64(category.image) : undefined
        };

        const result = await createCategoryGraphQL(input);
        
        return {
            id: result.id,
            name: result.name,
            description: result.description || "",
            image: null // GraphQL devuelve string, pero el modelo espera File|null
        };
    } catch (error) {
        console.error("Error creating category:", error);
        throw new Error(
            error instanceof Error ? error.message : "No se pudo crear la categoría"
        );
    }
};

export const updateCategoryById = async (categoryId: string, category: Categorie): Promise<Categorie> => {
    try {
        const input: UpdateCategoryInput = {
            name: category.name,
            description: category.description,
            // Convertir imagen File a base64 si existe
            image: category.image ? await convertFileToBase64(category.image) : undefined
        };

        const result = await updateCategoryGraphQL(parseInt(categoryId), input);
        
        return {
            id: result.id,
            name: result.name,
            description: result.description || "",
            image: null // GraphQL devuelve string, pero el modelo espera File|null
        };
    } catch (error) {
        console.error("Error updating category:", error);
        throw new Error(
            error instanceof Error ? error.message : "No se pudo actualizar la categoría"
        );
    }
}

export const deleteCategoryById = async (categoryId: string): Promise<void> => {
    try {
        await deleteCategoryGraphQL(parseInt(categoryId));
    } catch (error) {
        console.error("Error deleting category:", error);
        throw new Error(
            error instanceof Error ? error.message : "No se pudo eliminar la categoría"
        );
    }
}

export const allCategory = async (
    pageSize: number = 10,
    search: string = ""
  ): Promise<{ items: Category[]; totalPages: number; totalItems: number }> => {
    try {
        const pagination: PaginationInput = {
            first: pageSize,
            // Para implementar paginación por número de página, podrías calcular offset
            // after: pageNumber > 1 ? calculateCursor(pageNumber, pageSize) : undefined
        };

        const result: CategoryConnection = await getCategoriesGraphQL(pagination, search);
        
        const categories = result.edges.map(edge => convertGraphQLCategoryToCategory(edge.node));
        
        // Calcular total de páginas basado en totalCount y pageSize
        const totalPages = Math.ceil(result.totalCount / pageSize);
        
        return {
            items: categories,
            totalPages,
            totalItems: result.totalCount
        };
    } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error(
            error instanceof Error ? error.message : "Error al obtener las categorías"
        );
    }
};
  