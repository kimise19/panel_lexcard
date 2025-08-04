import {Avatar,Button,DarkThemeToggle,Dropdown,Navbar,} from "flowbite-react";
import { FC } from "react";
import { HiBars3 } from "react-icons/hi2";
import { Link,useNavigate} from "react-router-dom";
import { useUser } from "../context/useUser";
import { logout } from "./services/AccountService";

interface AppNavbarProps {
  toggleDrawer: () => void;
  isDrawerOpen: boolean;
}

const AppNavbar: FC<AppNavbarProps> = function ({
  toggleDrawer,
  isDrawerOpen,
}) {
  const navigate = useNavigate();
  const { user,setUser } = useUser();

  const disconnect = async () => {
    await logout();
    setUser(null); // Actualiza el contexto de usuario
  navigate("/login", { replace: true });
    
  };

  return (
    <>
      <Navbar fluid>
        <div className={`w-full p-3 lg:px-5 lg:pl-3 ${
          isDrawerOpen ? "lg:ml-64" : "lg:ml-0"
        } transition-all duration-300`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Button
                onClick={toggleDrawer}
                className="inline-flex cursor-pointer justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white focus:ring-0 ring-0 p-0 border-0 rounded-lg mr-3"
                size="mc"
              >
                <HiBars3 className="text-2xl cursor-pointer" />
              </Button>
              <Navbar.Brand to="/">
                <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white hidden sm:block">
                  LexCard
                </span>
              </Navbar.Brand>
            </div>
            <div className="flex items-center">
              <DarkThemeToggle className="focus:ring-0 ring-0" />
              <div className="flex md:order-2 pl-4">
                <Dropdown
                  arrowIcon={false}
                  inline
                  label={
                    <Avatar
                   
                      rounded
                      bordered
                    />
                  }
                >
                  <Dropdown.Header>
                    <span className="block text-sm">
                      {user?.displayName || "Usuario"}
                    </span>
                    <span className="block truncate text-sm font-medium">
                      {user?.email || "email@copyxpress.com"}
                    </span>
                  </Dropdown.Header>
                  <Dropdown.Item as={Link} to={"/"}>
                    Panel
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={disconnect}>Desconectar</Dropdown.Item>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
      </Navbar>
    </>
  );
};

export default AppNavbar;
