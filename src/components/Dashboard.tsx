import { Breadcrumb } from "flowbite-react";
import { FC } from "react";
import { HiChartBar } from "react-icons/hi";
import DashboardCards from "./dashboard/DashboardCards";

import SalesThisWeek from "./dashboard/SalesWeek";

const DashboardPage: FC = () => {
  return (
    <>
      <div className="mx-4 mt-4">
        <Breadcrumb>
          <Breadcrumb.Item icon={HiChartBar}>Panel</Breadcrumb.Item>
          <Breadcrumb.Item>Administrativo</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="px-4 pt-4">
        <DashboardCards />
        <SalesThisWeek />
       
      </div>
    </>
  );
};

export default DashboardPage;
