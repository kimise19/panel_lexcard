import { Subcategory } from "../../models/modelsadmin/Category";
import { 
  createSubcategoryGraphQL, 
  updateSubcategoryGraphQL, 
  deleteSubcategoryGraphQL,
  getSubcategoriesGraphQL
} from '../GraphQLService';
import {
  CreateSubcategoryInput,
  UpdateSubcategoryInput,
  SubcategoryConnection,
  SubcategoryGraphQL,
  PaginationInput
} from '../types';

// Función para convertir SubcategoryGraphQL a Subcategory para el admin
const convertGraphQLSubcategoryToSubcategory = (graphqlSubcategory: SubcategoryGraphQL): Subcategory => {
  return {
    id: graphqlSubcategory.id,
    name: graphqlSubcategory.name,
    description: graphqlSubcategory.description || "",
    categoryId: graphqlSubcategory.categoryId,
    createdAt: graphqlSubcategory.createdAt,
    updatedAt: graphqlSubcategory.updatedAt,
    categoryName: graphqlSubcategory.category.name
  };
};

export const allSubcategory = async (
    pageSize: number = 10,
    search: string = ""
): Promise<{ items: Subcategory[]; totalPages: number; totalItems: number }> => {
    try {
        const pagination: PaginationInput = {
            first: pageSize,
            // Para implementar paginación por número de página, podrías calcular offset
        };

        const result: SubcategoryConnection = await getSubcategoriesGraphQL(pagination, search);
        
        const subcategories = result.edges.map(edge => convertGraphQLSubcategoryToSubcategory(edge.node));
        
        // Calcular total de páginas basado en totalCount y pageSize
        const totalPages = Math.ceil(result.totalCount / pageSize);
        
        return {
            items: subcategories,
            totalPages,
            totalItems: result.totalCount
        };
    } catch (error) {
        console.error("Error fetching subcategories:", error);
        throw new Error(
            error instanceof Error ? error.message : "Error al obtener las subcategorías"
        );
    }
};

export const createSubcategory = async (subcategory: Subcategory): Promise<Subcategory> => {
    try {
        const input: CreateSubcategoryInput = {
            name: subcategory.name,
            description: subcategory.description,
            categoryId: subcategory.categoryId
        };

        const result = await createSubcategoryGraphQL(input);
        
        return convertGraphQLSubcategoryToSubcategory(result);
    } catch (error) {
        console.error("Error creating subcategory:", error);
        throw new Error(
            error instanceof Error ? error.message : "No se pudo crear la subcategoría"
        );
    }
};

export const updateSubcategoryById = async (subcategoryId: string, subcategory: Subcategory): Promise<Subcategory> => {
    try {
        const input: UpdateSubcategoryInput = {
            name: subcategory.name,
            description: subcategory.description,
            categoryId: subcategory.categoryId
        };

        const result = await updateSubcategoryGraphQL(parseInt(subcategoryId), input);
        
        return convertGraphQLSubcategoryToSubcategory(result);
    } catch (error) {
        console.error("Error updating subcategory:", error);
        throw new Error(
            error instanceof Error ? error.message : "No se pudo actualizar la subcategoría"
        );
    }
};

export const deleteSubcategoryById = async (subcategoryId: string): Promise<void> => {
    try {
        await deleteSubcategoryGraphQL(parseInt(subcategoryId));
    } catch (error) {
        console.error("Error deleting subcategory:", error);
        throw new Error(
            error instanceof Error ? error.message : "No se pudo eliminar la subcategoría"
        );
    }
};