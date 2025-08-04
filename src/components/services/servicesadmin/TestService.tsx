import {Test} from '../../models/modelsadmin/Tets';

export const allTest=async(
    pageNumber: number = 1,
    pageSize: number = 10,
    search: string = "",
    orderBy: string = "",
    orderDirection: string = ""
  ): Promise<{items: Test[]; totalPages: number; totalItems: number}> => {
    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      search,
      orderBy,
      orderDirection,
    });
  
    const response = await fetch(`/api/tests?${queryParams.toString()}`);
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(
        errorResponse.message || "La respuesta de la red no fue satisfactoria"
      );
    }
  
    return await response.json();
  };

export const createTest = async (test: Test): Promise<Test> => {
        const response = await fetch(`/api/tests`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: test.name,
            description: test.description,
            subcategoryId: test.subcategoryId,
        }),
        });
    
        if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || "La respuesta de la red no fue satisfactoria");
        }
    
        const data: Test = await response.json();
        return data;
    };
export const updateTestById = async (subcategoryId: string, test: Test): Promise<Test> => {
       
      
          const response = await fetch(`/api/tests/${subcategoryId}`, {
              method: "PUT",
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: test.name,
                description: test.description,
                subcategoryId: test.subcategoryId,
              }),
          });
      
          if (!response.ok) {
              const errorResponse = await response.json();
              throw new Error(errorResponse.message || "La respuesta de la red no fue satisfactoria");
          }
      
          const data: Test = await response.json();
          return data;
      }
export const deleteTestById = async (testId: string): Promise<void> => {
        try {
            const response = await fetch(`/api/tests/${testId}`, {
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