import React, { useState, useEffect } from 'react';
import { Breadcrumb, Modal } from "flowbite-react";
import { HiChartBar } from "react-icons/hi";
import { getAllCategories } from '../services/CategoryService';
import { Category } from '../models/Category';
import { Subcategory } from '../models/Subcategory';
import { Question } from '../models/Question';
import { fetchQuestionsBySubcategoryId, saveReviewedQuestion,loadReviewedQuestionsFromStorage} from './AskQuestionService';
import { CategoryList, SubcategoryList, QuestionList } from './Categories';

const Ask: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState<boolean>(false);
  const [reviewedQuestionsMap, setReviewedQuestionsMap] = useState<Record<number, string>>({});

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
    loadReviewedQuestionsFromStorage();
  }, []);

  // Fetch categories from API
  const fetchCategories = async () => {
    try {
      setLoading(true);
      const categoriesData = await getAllCategories();
      setCategories(categoriesData);
      setLoading(false);
    } catch (err) {
      setError('Error fetching categories');
      setLoading(false);
      console.error(err);
    }
  };

  const handleCategoryClick = (category: Category) => {
    setSelectedCategory(category);
    setSelectedSubcategory(null);
  };

  const handleSubcategoryClick = async (subcategory: Subcategory) => {
    setLoadingQuestions(true);
    
    try {
      // Get questions for this subcategory
      const questions = await fetchQuestionsBySubcategoryId(subcategory.id);
      
      if (questions.length === 0) {
        console.log(`No questions found for subcategory ${subcategory.id}`);
      }
      
      // Apply any previously reviewed status
      const savedReviewedQuestions = localStorage.getItem('reviewedQuestions');
      const reviewedQuestions = savedReviewedQuestions ? JSON.parse(savedReviewedQuestions) : [];
      
      const questionsWithReviewStatus = questions.map(q => ({
        ...q,
        reviewed: reviewedQuestions.includes(q.question)
      }));
      
      const subcategoryWithQuestions = {
        ...subcategory,
        questions: questionsWithReviewStatus
      };
      
      setSelectedSubcategory(subcategoryWithQuestions);
      
      // Update the reviewed counts map for this subcategory
      const reviewedCount = questionsWithReviewStatus.filter(q => q.reviewed).length;
      const totalCount = questionsWithReviewStatus.length;
      const newMap = {...reviewedQuestionsMap};
      newMap[subcategory.id] = `${reviewedCount}/${totalCount}`;
      setReviewedQuestionsMap(newMap);
      
    } catch (error) {
      setError(`Error fetching questions for ${subcategory.name}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      console.error(error);
    } finally {
      setLoadingQuestions(false);
    }
  };

  const handleBackClick = () => {
    if (selectedSubcategory) {
      setSelectedSubcategory(null);
    } else {
      setSelectedCategory(null);
    }
  };

  const handleExplanationClick = (question: Question) => {
    setSelectedQuestion(question);
    setIsModalOpen(true);
    question.reviewed = true; // Mark the question as reviewed
    saveReviewedQuestion(question.question);
    
    // Update the reviewed counts when a question is marked as reviewed
    if (selectedSubcategory) {
      const updatedCount = selectedSubcategory.questions?.filter(q => q.reviewed || q === question).length || 0;
      const totalCount = selectedSubcategory.questions?.length || 0;
      const newMap = {...reviewedQuestionsMap};
      newMap[selectedSubcategory.id] = `${updatedCount}/${totalCount}`;
      setReviewedQuestionsMap(newMap);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedQuestion(null);
  };

  if (loading) {
    return <div className="p-6 text-center">Cargando categorías...</div>;
  }

  if (error) {
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }

  return (
    <div>
      <div className="mx-4 mt-4">
        <Breadcrumb>
          <Breadcrumb.Item icon={HiChartBar}>Preguntas</Breadcrumb.Item>
          <Breadcrumb.Item>Temario</Breadcrumb.Item>
          {selectedCategory && <Breadcrumb.Item>{selectedCategory.name}</Breadcrumb.Item>}
          {selectedSubcategory && <Breadcrumb.Item>{selectedSubcategory.name}</Breadcrumb.Item>}
        </Breadcrumb>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
        {selectedSubcategory && selectedSubcategory.questions ? (
          <QuestionList 
            subcategory={selectedSubcategory}
            loading={loadingQuestions}
            onBackClick={handleBackClick}
            onExplanationClick={handleExplanationClick}
          />
        ) : selectedCategory ? (
          <SubcategoryList 
            category={selectedCategory}
            reviewedQuestionsMap={reviewedQuestionsMap}
            onBackClick={handleBackClick}
            onSubcategoryClick={handleSubcategoryClick}
          />
        ) : (
          <CategoryList 
            categories={categories}
            onCategoryClick={handleCategoryClick}
          />
        )}
      </div>

      {selectedQuestion && (
        <Modal show={isModalOpen} onClose={closeModal}>
          <Modal.Header>
            Explicación
          </Modal.Header>
          <Modal.Body>
            <p className='text-gray-900 dark:text-white'>{selectedQuestion.explanation}</p>
          </Modal.Body>
          <Modal.Footer>
            <button
              className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center gap-2"
              style={{ backgroundColor: '#C8AB37', color: 'white', borderColor: '#C8AB37' }}
              onClick={closeModal}
            >
              Cerrar
            </button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Ask;