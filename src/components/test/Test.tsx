import {useState, useEffect} from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { getAllTests } from '../services/TestsService';
import { SubcategoryWithTests} from '../models/Tets'; // Corregido de Tets a Test
import { HiChartBar } from "react-icons/hi";
import { Breadcrumb} from "flowbite-react";
const Test = () => {
  const [subcategories, setSubcategories] = useState<SubcategoryWithTests[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchTests = async () => {
      try {
        setLoading(true);
        const data = await getAllTests();
        if (!data || !data.items) {
          setError('Formato de datos incorrecto');
          setLoading(false);
          return;
        }
        setSubcategories(data.items);
        setLoading(false);
      } catch (err) {
        console.error("Error en fetchTests:", err);
        setError('Error al cargar las pruebas');
        setLoading(false);
      }
    };

    fetchTests();
  }, []);
  // Función para obtener la URL de la imagen
  const getImageUrl = (imagePath: string | undefined): string => {
    const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;
    if (!imagePath) return '/default-category.webp';
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return imagePath;
    }
    const formattedPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    return `${baseUrl}/${formattedPath}`;
  };
  // Calcular un progreso aleatorio para simular el progreso (puedes eliminar esto cuando tengas datos reales de progreso)
  const getRandomProgress = (): number => {
    return Math.floor(Math.random() * 100);
  };
  if (loading) {
    return <div className="p-6 text-center">Cargando pruebas...</div>;
  }
  if (error) {
    console.log("Renderizando estado de error:", error);
    return <div className="p-6 text-center text-red-500">{error}</div>;
  }
  return (
    <div>
       <div className="mx-4 mt-4">
              <Breadcrumb>
                <Breadcrumb.Item icon={HiChartBar}>Preguntas</Breadcrumb.Item>
                <Breadcrumb.Item>Temario</Breadcrumb.Item>
                
              </Breadcrumb>
            </div>
    <div className="flex flex-col gap-6 p-6">
      {subcategories.length === 0 ? (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 p-4 rounded-md">
          <p className="text-center">No hay pruebas disponibles en este momento.</p>
        </div>
      ) : (
        subcategories.map((subcategory) => {
          const progress = getRandomProgress();
          
          return (
            <div
              key={subcategory.id}
              className="bg-white border border-gray-300 rounded-lg shadow-md p-6 flex flex-col overflow-hidden relative"
            >
              <div className="w-1/6 bg-gray-200 rounded-full dark:bg-gray-700 absolute top-4 right-4">
                <div
                  className="bg-red-400 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
                  style={{ width: `${progress}%`, height: '20px' }}
                >
                  {progress}%
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 flex-shrink-0 bg-[#FFF1B8B8] rounded-lg overflow-hidden">
                  <img
                    src={getImageUrl(subcategory.category?.image)}
                    alt={subcategory.name}
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">{subcategory.name}</h3>
                  <p className="text-gray-700 mb-2">{subcategory.description}</p>
                  <ul className="text-gray-700 text-sm space-y-1">
                    {subcategory.tests && subcategory.tests.map((test) => (
                      <li key={test.id}>• {test.name} {test.description ? `- ${test.description}` : ''}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="mt-4 flex justify-end items-start gap-4">
                <button
                  className="px-4 py-2 border rounded-md hover:bg-gray-100 flex items-center gap-2"
                  style={{ color: '#C8AB37', borderColor: '#C8AB37' }}
                >
                  Realizar Pruebas
                  <FaArrowRight />
                </button>
              </div>
            </div>
          );
        })
      )}
    </div>
    </div>
  );
};

export default Test;