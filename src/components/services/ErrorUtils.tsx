interface ErrorResponse {
    message?: string;
    error?: string;
    errors?: string[];
  }
  
  export const getErrorMessage = (errorResponse: ErrorResponse): string => {
    if (errorResponse.message) return errorResponse.message;
    if (errorResponse.error) return errorResponse.error;
    if (errorResponse.errors && errorResponse.errors.length > 0) {
      return errorResponse.errors.join(", ");
    }
    return "La respuesta de la red no fue satisfactoria";
  };