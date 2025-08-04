import {APIQuestion} from "../../models/modelsadmin/Question";

export const allQuestion = async (
    pageNumber: number = 1,
    pageSize: number = 10,
    search: string = "",
    orderBy: string = "",
    orderDirection: string = ""
  ): Promise<{ items: APIQuestion[]; totalPages: number; totalItems: number }> => {
    const queryParams = new URLSearchParams({
      pageNumber: pageNumber.toString(),
      pageSize: pageSize.toString(),
      search,
      orderBy,
      orderDirection,
    });

    // Agregar logs para depuración
    console.log("Fetching questions with params:", queryParams.toString());

    try {
      const response = await fetch(`/api/questions?${queryParams.toString()}`);
      console.log("API response status:", response.status); // Log del estado de la respuesta
      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error response from API:", errorResponse); // Log del error de la API
        throw new Error(
          errorResponse.message || "La respuesta de la red no fue satisfactoria"
        );
      }

      const data = await response.json();
      console.log("Fetched questions data:", data); // Log de los datos obtenidos
      return data;
    } catch (error) {
      console.error("Error al obtener las preguntas:", error);
      throw error;
    }
  };

export const createQuestion = async (question: APIQuestion): Promise<APIQuestion> => {
    const response = await fetch(`/api/questions`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question.question,
        options: question.options,
        answers: question.answers,
        correct: question.correct,
        justification: question.justification,
        score: question.score,
        testId: question.testId,
      }),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "La respuesta de la red no fue satisfactoria");
    }
  
    const data: APIQuestion = await response.json();
    return data;
  };

  export const  updateQuestionById  = async (questionId: string, question: APIQuestion): Promise<APIQuestion> => {
    const response = await fetch(`/api/questions/${questionId}`, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question: question.question,
        options: question.options,
        answers: question.answers,
        correct: question.correct,
        justification: question.justification,
        score: question.score,
        testId: question.testId,
      }),
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "La respuesta de la red no fue satisfactoria");
    }
  
    const data: APIQuestion = await response.json();
    return data;
  };
  export const deleteQuestionById = async (questionId: string): Promise<void> => {
    const response = await fetch(`/api/questions/${questionId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      },
    });
  
    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "La respuesta de la red no fue satisfactoria");
    }
  };