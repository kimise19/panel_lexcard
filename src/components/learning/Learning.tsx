import { FC } from "react";

const Learning: FC = () => {
  return (
    <div className="flex flex-col lg:flex-row-reverse h-screen items-center justify-center">
      <div className="flex-1 px-4 pt-4 overflow-y-auto">
        <div className="text-center">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mt-4">
            Estamos trabajando en ello
          </h2>
          <p className="mt-6 text-xl max-w-2xl text-gray-700 dark:text-gray-300 mx-auto">
            Por favor, vuelva más tarde.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Learning;
