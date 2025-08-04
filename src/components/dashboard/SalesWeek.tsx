import { Alert } from "flowbite-react";
import { FC, useState } from "react";
import { HiArrowNarrowUp, HiInformationCircle } from "react-icons/hi";
import { SalesSummary } from "../models/Order";

import SalesChart from "./SalesChart";

const SalesThisWeek: FC = function () {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Datos quemados
  const salesSummary: SalesSummary[] = [
    { date: "2025-02-12", totalSales: 1500, orders: 10 },
    { date: "2025-02-13", totalSales: 2000, orders: 15 },
    { date: "2025-02-14", totalSales: 2500, orders: 20 },
    { date: "2025-02-15", totalSales: 3000, orders: 25 },
    { date: "2025-02-16", totalSales: 3500, orders: 30 },
    { date: "2025-02-17", totalSales: 4000, orders: 35 },
    { date: "2025-02-18", totalSales: 500, orders: 40 },
  ];

  const totalOrders = salesSummary.reduce(
    (sum, summary) => sum + summary.orders,
    0
  );

  const percentageChange = ((salesSummary[salesSummary.length - 1].orders - salesSummary[0].orders) / salesSummary[0].orders) * 100;



  return (
    <div className="rounded-lg bg-white p-4 shadow dark:bg-gray-800 sm:p-6 xl:p-8">
      <div className="mb-4 flex items-center justify-between">
        <div className="shrink-0">
          <span className="text-2xl font-bold leading-none text-gray-900 dark:text-white sm:text-3xl">
            {totalOrders}%
          </span>
          <h3 className="text-base font-normal text-gray-600 dark:text-gray-400">
            Porcentaje de avance esta semana
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-end text-base font-bold text-green-600 dark:text-green-400">
          {percentageChange.toFixed(1)}%
          <HiArrowNarrowUp className="text-2xl ml-1" />
        </div>
      </div>
      {errorMessage && (
        <div className="mb-4">
          <Alert
            color="failure"
            icon={HiInformationCircle}
            onDismiss={() => setErrorMessage(null)}
            rounded
          >
            <span className="font-medium">Error:</span> {errorMessage}
          </Alert>
        </div>
      )}
      {!errorMessage && <SalesChart salesSummary={salesSummary} />}
      
    </div>
  );
};

export default SalesThisWeek;