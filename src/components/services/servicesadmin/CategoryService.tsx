import {Category,Categorie} from '../../models/modelsadmin/Category';

export const createCategory = async (category: Categorie): Promise<Categorie> => {
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.image) {
        formData.append("image", category.image); // Agregar la imagen solo si está presente
    }

    const response = await fetch(`/api/categories`, {
        method: "POST",
        body: formData, // Se envía FormData en lugar de JSON
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "La respuesta de la red no fue satisfactoria");
    }

    const data: Categorie = await response.json();
    return data;
};

export const updateCategoryById = async (categoryId: string, category: Categorie): Promise<Categorie> => {
    const formData = new FormData();
    formData.append("name", category.name);
    formData.append("description", category.description);
    if (category.image) {
        formData.append("image", category.image); // Agregar la imagen solo si está presente
    }

    const response = await fetch(`/api/categories/${categoryId}`, {
        method: "PUT",
        body: formData, // Se envía FormData en lugar de JSON
    });

    if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "La respuesta de la red no fue satisfactoria");
    }

    const data: Categorie = await response.json();
    return data;
}

export const deleteCategoryById = async (categoryId: string): Promise<void> => {
    try {
        const response = await fetch(`/api/categories/${categoryId}`, {
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



export const allCategory = async (
    pageNumber: number = 1,
    pageSize: number = 10,
    search: string = "",
    orderBy: string = "",
    orderDirection: string = ""
  ): Promise<{ items: Category[]; totalPages: number; totalItems: number }> => {
    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      search,
      orderBy,
      orderDirection,
    });
  
    const response = await fetch(`/api/categories?${queryParams.toString()}`);
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || "La respuesta de la red no fue satisfactoria"
      );
    }
  
    return await response.json();
  };
  