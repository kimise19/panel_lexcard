import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="relative h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 to-transparent dark:from-red-900/30 dark:to-gray-900/30" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <h1 className="text-8xl sm:text-9xl lg:text-10xl font-bold text-gray-900 dark:text-white">
            404
          </h1>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-4">
            Página no encontrada
          </h2>
          <p className="mt-6 text-xl max-w-2xl text-gray-700 dark:text-gray-300 mx-auto">
            Lo sentimos, pero la página que estás buscando no existe.
          </p>
          <div className="mt-10">
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 transition-colors"
            >
              Volver al inicio
              <FaArrowLeft className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
