import { Button, Sidebar, TextInput, Tooltip } from "flowbite-react";
import { FC, useState } from "react";
import {
  HiBell,
  HiCog,
  HiLockClosed,
  HiSearch,
  HiUser,
  HiOutlineHome,
  HiOutlineClipboardList,
  HiQuestionMarkCircle,
  HiViewGridAdd,
  HiViewGrid
} from "react-icons/hi";
import { MdOutlineBalance } from "react-icons/md";
import { BiSpreadsheet } from "react-icons/bi";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineRateReview } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { GoTrophy } from "react-icons/go";
import { useUser } from "../context/useUser";

interface AppSidebarProps {
  isDrawerOpen: boolean;
}

interface MenuItem {
  path: string;
  label: string;
  icon: React.ComponentType;
  group?: string;
}

const AppSidebar: FC<AppSidebarProps> = ({ isDrawerOpen }) => {
  const location = useLocation();
  const { user } = useUser();
  const [expandedCollapse, setExpandedCollapse] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

 

  const handleCollapseClick = (collapseName: string) => {
    setExpandedCollapse(expandedCollapse === collapseName ? null : collapseName);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const topMenuItems: MenuItem[] = [
    { path: "/", label: "Inicio", icon: HiOutlineHome },
    { path: "/ask", label: "Preguntas", icon: HiQuestionMarkCircle },
    { path: "/test", label: "Realizar Test", icon: HiOutlineClipboardList },
    { path: "/case", label: "Casos", icon: MdOutlineBalance },
    { path: "/learning", label: "Ficha de aprendizaje", icon: BiSpreadsheet },
    { path: "/review", label: "Repasar", icon: MdOutlineRateReview },
    { path: "/savedquestion", label: "Preguntas Guardadas", icon: FaBookmark },
    { path: "/trophi", label: "Mis Trofeos", icon: GoTrophy },
    
  ];

  const adminMenuItems: MenuItem[] = [
    { path: "/", label: "Dashboard", icon: HiOutlineHome },
    { path: "/createask", label: "Agregar preguntas", icon: HiQuestionMarkCircle },
    { path: "/createcategory", label: "Categorías", icon: HiViewGridAdd },
    { path: "/createsubcategory", label: "Subcategorías", icon:  HiViewGrid },
    { path: "/createtest", label: "Test", icon: HiOutlineClipboardList },
    
    
    // Otras opciones de administrador
  ];

  const bottomMenuItems: MenuItem[] = [
    { path: "/security/change-password", label: "Contraseña", icon: HiLockClosed, group: "seguridad" },
    { path: "/notification", label: "Notificaciones", icon: HiBell },
  ];

  const filteredTopItems = topMenuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm)
  );
  const filteredTopItemsAdmin = adminMenuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm)
  );
  const filteredBottomItems = bottomMenuItems.filter((item) =>
    item.label.toLowerCase().includes(searchTerm)
  );

  const renderMenuItem = (item: MenuItem) => (
    <Sidebar.Item
      key={item.path}
      as={Link}
      to={item.path}
      icon={item.icon}
      style={location.pathname === item.path ? { backgroundColor: '#C8AB37' } : {}}
    >
      {item.label}
    </Sidebar.Item>
  );

  return (
    <Sidebar className={`transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}`}>
      <div className="flex h-full flex-col justify-between">
        <div>
          <form className="pb-3 md:hidden" onSubmit={(e) => e.preventDefault()}>
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Buscar"
              required
              size={32}
              value={searchTerm}
              onChange={handleSearch}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              {user?.roles.includes('ADMINISTRADOR') && filteredTopItemsAdmin.map(renderMenuItem)}
              {user?.roles.includes('USUARIO') && filteredTopItems.map(renderMenuItem)}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              {(searchTerm === "" || filteredBottomItems.some((item) => item.group === "seguridad")) && (
                <Sidebar.Collapse
                  icon={HiLockClosed}
                  label="Seguridad"
                  open={expandedCollapse === "seguridad"}
                  onClick={() => handleCollapseClick("seguridad")}
                >
                  {filteredBottomItems.filter((item) => item.group === "seguridad").map(renderMenuItem)}
                </Sidebar.Collapse>
              )}
              {filteredBottomItems.filter((item) => !item.group).map(renderMenuItem)}
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
        <div className="flex items-center justify-center gap-2">
          <Tooltip content="Perfil">
            <Button
              as={Link}
              to="/configuration/profile"
              className={`inline-flex cursor-pointer justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white focus:ring-0 ring-0 p-0 border-0 rounded-lg ${location.pathname === "/configuration/profile" ? "bg-gray-100 dark:bg-gray-700" : ""}`}
            >
              <HiUser className="text-2xl cursor-pointer" />
            </Button>
          </Tooltip>
          <Tooltip content="Aplicación">
            <Button
              as={Link}
              to="/configuration/setting"
              className={`inline-flex cursor-pointer justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white focus:ring-0 ring-0 p-0 border-0 rounded-lg ${location.pathname === "/configuration/setting" ? "bg-gray-100 dark:bg-gray-700" : ""}`}
            >
              <HiCog className="text-2xl cursor-pointer" />
            </Button>
          </Tooltip>
        </div>
      </div>
    </Sidebar>
  );
};

export default AppSidebar;