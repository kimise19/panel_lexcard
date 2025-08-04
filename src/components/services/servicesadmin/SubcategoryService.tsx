import { Subcategory } from "../../models/modelsadmin/Category";

export const allSubcategory = async (
    pageNumber: number = 1,
    pageSize: number = 10,
    search: string = "",
    orderBy: string = "",
    orderDirection: string = ""
  ): Promise<{ items: Subcategory[]; totalPages: number; totalItems: number }> => {
    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      search,
      orderBy,
      orderDirection,
    });
  
    const response = await fetch(`/api/subcategories?${queryParams.toString()}`);
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || "La respuesta de la red no fue satisfactoria"
      );
    }
  
    return await response.json();
  };

  export const createSubcategory = async (subcategory: Subcategory): Promise<Subcategory> => {
    const response = await fetch(`/api/subcategories`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: subcategory.name,
        description: subcategory.description,
        categoryId: subcategory.categoryId,
      }),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "La respuesta de la red no fue satisfactoria");
    }
  
    const data: Subcategory = await response.json();
    return data;
  };

  export const updateSubcategoryById = async (subcategoryId: string, subcategory: Subcategory): Promise<Subcategory> => {
   
  
      const response = await fetch(`/api/subcategories/${subcategoryId}`, {
          method: "PUT",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: subcategory.name,
            description: subcategory.description,
            categoryId: subcategory.categoryId,
          }),
      });
  
      if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.message || "La respuesta de la red no fue satisfactoria");
      }
  
      const data: Subcategory = await response.json();
      return data;
  }

  export const deleteSubcategoryById = async (subcategoryId: string): Promise<void> => {
    try {
        const response = await fetch(`/api/subcategories/${subcategoryId}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.message || "La respuesta de la red no fue satisfactoria");
        }
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error al borrar la categoría:", error.message);
            throw new Error("No se pudo borrar la categoría. Por favor, inténtelo de nuevo más tarde.");
        } else {
            console.error("Error desconocido al borrar la categoría");
            throw new Error("No se pudo borrar la categoría debido a un error desconocido. Por favor, inténtelo de nuevo más tarde.");
        }
    }
}