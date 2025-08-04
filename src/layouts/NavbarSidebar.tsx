import { Footer } from "flowbite-react";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { FaDribbble, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import { MdFacebook } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

interface NavbarSidebarLayoutProps {
  isFooter?: boolean;
}

const NavbarSidebarLayout: FC<PropsWithChildren<NavbarSidebarLayoutProps>> =
  function ({ children, isFooter = true }) {
    const [isDrawerOpen, setIsDrawerOpen] = useState(window.innerWidth >= 1024);

    const toggleDrawer = () => {
      setIsDrawerOpen(!isDrawerOpen);
    };

    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 1024) {
          setIsDrawerOpen(false);
        } else {
          setIsDrawerOpen(true);
        }
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
      <>
        <Navbar isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
        <div className="flex items-start pt-16">
          <Sidebar isDrawerOpen={isDrawerOpen} />
          <MainContent isDrawerOpen={isDrawerOpen} isFooter={isFooter}>
            {children}
          </MainContent>
        </div>
      </>
    );
  };

const MainContent: FC<
  PropsWithChildren<NavbarSidebarLayoutProps> & { isDrawerOpen: boolean }
> = function ({ children, isFooter, isDrawerOpen }) {
  return (
    <main
      className={`relative h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 transition-all duration-300 ${
        isDrawerOpen ? "lg:ml-64" : "lg:ml-0"
      }`}
    >
      {children}
      {isFooter && (
        <div className="mx-4 mt-4">
          <MainContentFooter />
        </div>
      )}
    </main>
  );
};

const MainContentFooter: FC = function () {
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <>
      <Footer container>
        <div className="flex w-full flex-col gap-y-6 sm:flex-row sm:justify-between sm:items-center">
          <Footer.LinkGroup className="flex flex-col sm:flex-row sm:items-center">
            <Link to="/terms-and-conditions" className="mr-3 mb-3 sm:mb-0">
              Términos y condiciones
            </Link>
          </Footer.LinkGroup>
          <Footer.LinkGroup className="flex flex-col sm:flex-row sm:items-center">
            <div className="flex gap-x-1">
              <Footer.Link
                href="https://www.facebook.com/kaizensoftwareec"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <MdFacebook className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="https://www.instagram.com/kaizensoftwareec"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaInstagram className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="https://www.linkedin.com/company/kaizen-software-ec"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaLinkedin className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="#"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaGithub className="text-lg" />
              </Footer.Link>
              <Footer.Link
                href="https://kaizensoftware.com.ec"
                className="hover:[&>*]:text-black dark:hover:[&>*]:text-gray-300"
              >
                <FaDribbble className="text-lg" />
              </Footer.Link>
            </div>
          </Footer.LinkGroup>
        </div>
      </Footer>
      <p className="mt-4 mb-0 text-center text-sm text-gray-500 dark:text-gray-300">
        &copy;{currentYear} <span className="font-bold">LEXCARD</span>{" "}
        Reservados todos los derechos.
      </p>
      <p className="mb-4 text-center text-sm text-gray-500 dark:text-gray-300">
        Desarrollado por{" "}
        <span className="font-bold">KAIZENSOFTWARE S.A.S.</span>
      </p>
    </>
  );
};

export default NavbarSidebarLayout;
