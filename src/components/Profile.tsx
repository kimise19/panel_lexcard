import { Breadcrumb, Label, TextInput } from "flowbite-react";
import { FC } from "react";
import { HiCog } from "react-icons/hi";
import { useUser } from "../context/useUser";

const Profile: FC = () => {
  const { user } = useUser();

  return (
    <>
      <div className="mx-4 mt-4">
        <Breadcrumb>
          <Breadcrumb.Item icon={HiCog}>Configuración</Breadcrumb.Item>
          <Breadcrumb.Item>Perfil de usuario</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="flex flex-col mx-4 mt-4 space-y-4 md:flex-row md:space-y-0 md:space-x-4 items-stretch">
        {/* Fila 1 */}
        <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow dark:bg-gray-800 flex items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300 text-8xl font-bold rounded-xl h-40 w-40">
            {user
              ? `${user.email.charAt(0).toUpperCase()}${user.email
                  .charAt(0)
                  .toUpperCase()}`
              : "CX"}
          </div>
          <div className="ml-4 text-left">
            <h2 className="text-2xl font-medium text-gray-900 dark:text-white mb-2">
              {user?.displayName || "Usuario"}
            </h2>
            <p className="text-lg text-gray-500 dark:text-gray-400">
            {user?.roles || "UsuarioXD"}
            </p>
          </div>
        </div>
        {/* Fila 2 */}
        <div className="w-full md:w-1/2 p-6 bg-white rounded-lg shadow dark:bg-gray-800 flex flex-col justify-between">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Perfil de Usuario
          </h3>
          <form action="#">
            <div className="space-y-4">
              <div>
                <Label htmlFor="name" value="Nombre completo" />
                <TextInput
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Nombre completo"
                  defaultValue={`${user?.displayName || "Nombre"}`}
                  disabled
                />
              </div>
              <div>
                <Label htmlFor="email" value="Correo electrónico" />
                <TextInput
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Correo electrónico"
                  defaultValue={user?.email || "email@copyxpress.com"}
                  disabled
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
