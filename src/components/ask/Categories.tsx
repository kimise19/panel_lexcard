import React from 'react';
import { FaArrowRight, FaCheck, FaTimes } from 'react-icons/fa';
import { Category } from '../models/Category';
import { Subcategory } from '../models/Subcategory';
import { Question } from '../models/Question';
import { getImageUrl, getReviewedQuestionsCount } from './AskQuestionService';

// Category List Component
interface CategoryListProps {
  categories: Category[];
  onCategoryClick: (category: Category) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, onCategoryClick }) => {
  return (
    <>
      {categories.map(category => (
        <div 
          key={category.id} 
          className="bg-white border border-gray-300 rounded-lg shadow-md p-6 flex overflow-hidden cursor-pointer"
          onClick={() => onCategoryClick(category)}
        >
          <div className="w-1/3 flex-shrink-0 bg-[#FFF1B8B8] rounded-lg">
            <img 
              src={typeof category.image === 'string' ? getImageUrl(category.image) : undefined}
              alt={category.name} 
              className="w-full h-full object-cover rounded-lg opacity-50" 
            />
          </div>
          <div className="w-2/3 pl-4">
            <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
            <p className="text-gray-700 text-sm mb-2">{category.description}</p>
            <ul className="text-gray-700 text-sm space-y-1">
              {category.subcategories.map((subcategory) => (
                <li key={subcategory.id}>• {subcategory.name}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </>
  );
};

// Subcategory List Component
interface SubcategoryListProps {
  category: Category;
  reviewedQuestionsMap: Record<number, string>;
  onBackClick: () => void;
  onSubcategoryClick: (subcategory: Subcategory) => void;
}

export const SubcategoryList: React.FC<SubcategoryListProps> = ({ 
  category, reviewedQuestionsMap, onBackClick, onSubcategoryClick 
}) => {
  return (
    <div className="col-span-1 md:col-span-2">
      <button onClick={onBackClick} className="mb-4 text-blue-500">Volver</button>
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Subcategorías de {category.name}</h2>
      {category.subcategories.length === 0 ? (
         <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-md">
         <p className="text-center">
           No hay subcategorías disponibles para esta categoría.
         </p>
       </div>
        ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {category.subcategories.map((subcategory) => (
          <div 
            key={subcategory.id} 
            className="bg-white border border-gray-300 rounded-lg shadow-md p-6 flex flex-col overflow-hidden relative"
          >
            <div className="flex items-center gap-4">
              <div className="w-24 h-24 flex-shrink-0 bg-[#FFF1B8B8] rounded-lg overflow-hidden">
                <img
                  src={typeof category.image === 'string' ? getImageUrl(category.image) : undefined}
                  alt={category.name}
                  className="w-full h-full object-cover opacity-50"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2">{subcategory.name}</h3>
                <p className="text-gray-700 text-sm">
                  {subcategory.description || 'Sin descripción'}
                </p>
                {reviewedQuestionsMap[subcategory.id] && (
                  <div className="mt-2">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      Preguntas revisadas: {reviewedQuestionsMap[subcategory.id]}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex justify-end items-start gap-4">
              <button
                className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center gap-2"
                style={{ color: '#C8AB37', borderColor: '#C8AB37' }}
                onClick={() => onSubcategoryClick(subcategory)}
              >
                Revisar Preguntas
                <FaArrowRight />
              </button>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

// Question List Component
interface QuestionListProps {
  subcategory: Subcategory;
  loading: boolean;
  onBackClick: () => void;
  onExplanationClick: (question: Question) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({ 
  subcategory, loading, onBackClick, onExplanationClick 
}) => {
  return (
    <div className="col-span-1 md:col-span-2">
      <button onClick={onBackClick} className="mb-4 text-blue-500">Volver</button>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Preguntas de {subcategory.name}
        </h2>
        <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded">
          Preguntas revisadas: {getReviewedQuestionsCount(subcategory)}
        </span>
      </div>
      
      {loading ? (
        <div className="text-center p-6">Cargando preguntas...</div>
      ) : subcategory.questions && subcategory.questions.length === 0 ? (
        <div className="text-center p-6">No hay preguntas disponibles para esta subcategoría</div>
      ) : subcategory.questions && (
        <div className="grid grid-cols-1 gap-6">
          {subcategory.questions.map((question, index) => (
            <QuestionItem 
              key={question.id || index}
              question={question}
              onExplanationClick={onExplanationClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Question Item Component
interface QuestionItemProps {
  question: Question;
  onExplanationClick: (question: Question) => void;
}

export const QuestionItem: React.FC<QuestionItemProps> = ({ question, onExplanationClick }) => {
  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 flex flex-col overflow-hidden relative">
      {question.reviewed && (
        <div className="absolute top-2 right-2">
          <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
            Revisada
          </span>
        </div>
      )}
      <h3 className="text-xl font-semibold mb-2">{question.question}</h3>
      <hr className="my-4" />
      <div className="space-y-2">
        {question.answers.map((answer: string, idx: number) => (
          <div
            key={idx}
            className="p-2 rounded-md flex items-center gap-2 bg-white text-black"
          >
            {answer === question.correctAnswer ? (
              <div className="w-6 h-6 bg-green-500 flex items-center justify-center rounded-full">
                <FaCheck className="text-white" />
              </div>
            ) : (
              <div className="w-6 h-6 bg-red-500 flex items-center justify-center rounded-full">
                <FaTimes className="text-white" />
              </div>
            )}
            <span>{answer}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-end items-start gap-4">
        <button
          className={`px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center gap-2 ${
            question.reviewed ? 'bg-gray-300' : 'bg-green-600'
          }`}
          style={{ color: 'white', borderColor: question.reviewed ? '#6B7280' : '#C8AB37' }}
          onClick={() => onExplanationClick(question)}
        >
          {question.reviewed ? 'Ver explicación de nuevo' : 'Ver explicación'}
        </button>
      </div>
    </div>
  );
};