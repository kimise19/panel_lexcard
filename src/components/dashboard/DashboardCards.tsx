import { FC, useEffect, useState } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { RiProgress3Fill } from "react-icons/ri";
import { FaTrophy } from "react-icons/fa";
import { Link } from "react-router-dom";

const DashboardCards: FC<{
  icon: JSX.Element;
  title: string;
  number: string;
  link: string;
}> = ({ icon, title, number, link }) => {
  return (
    <Link
      to={link}
      className="flex items-center p-4 bg-white rounded-lg shadow dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
    >
      <div className="p-3 mr-4 text-yellow-400 rounded-full dark:bg-yellow-100 text-3xl">
        {icon}
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
          {title}
        </p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
          {number}
        </p>
      </div>
    </Link>
  );
};

const Cards: FC = () => {
  const [branchCount, setBranchCount] = useState<number>(0);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [customerCount, setCustomerCount] = useState<number>(0);
  const [, setProductCount] = useState<number>(0);

  useEffect(() => {
    setBranchCount(0);
    setCategoryCount(0);
    setCustomerCount(0);
    setProductCount(0);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <DashboardCards
        icon={<HiCheckCircle />}
        title="Pruebas superadas"
        number={branchCount.toString()}
        link="/branch"
      />
      <DashboardCards
        icon={<RiProgress3Fill />}
        title="Progreso del tema"
        number={customerCount.toString()}
        link="/customer"
      />
      <DashboardCards
        icon={<FaTrophy />}
        title="Trofeos obtenidos"
        number={categoryCount.toString()}
        link="/category"
      />
      {/*<DashboardCards
        icon={<HiCube />}
        title="Productos"
        number={productCount.toString()}
        link="/product"
      />*/}
    </div>
  );
};

export default Cards;
export { DashboardCards };