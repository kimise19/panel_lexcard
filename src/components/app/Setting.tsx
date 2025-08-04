import { Alert, Breadcrumb, Button, Table, TextInput } from "flowbite-react";
import { FC, useState } from "react";
import { HiInformationCircle, HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import { AppVersion } from "../models/AppVersion";
import AddAppVersionModal from "./AddAppVersionModal";
import DeleteAppVersionModal from "./DeleteAppVersionModal";
import EditAppVersionModal from "./EditAppVersionModal";

const Setting: FC = () => {
  const [appVersions] = useState<AppVersion[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedAppVersion, setSelectedAppVersion] =
    useState<AppVersion | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filteredAppVersions = appVersions.filter((version) =>
    version.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="mx-4 mt-4">
        <Breadcrumb>
          <Breadcrumb.Item>Configuración</Breadcrumb.Item>
          <Breadcrumb.Item>Versiones</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="flex flex-col mx-4 mt-4 space-y-4">
        <div className="w-full">
          <div className="flex justify-between items-center">
            <TextInput
              placeholder="Buscar versión"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button
              className="text-gray-900 border-gray-200 bg-white  focus:ring-gray-300 enabled:hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-800 dark:enabled:hover:bg-gray-700"
              size="mc"
              onClick={() => setIsAddModalOpen(true)}
            >
              <HiPlus className="mr-2 self-center" />
              Agregar Versión
            </Button>
          </div>
        </div>
        {errorMessage && (
          <div className="mt-4">
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
        <div className="w-full p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="overflow-x-auto">
            <Table
              hoverable
              className="min-w-full divide-y divide-gray-200 dark:divide-gray-600"
            >
              <Table.Head>
                <Table.HeadCell>Plataforma</Table.HeadCell>
                <Table.HeadCell>Versión Actual</Table.HeadCell>
                <Table.HeadCell>URL de Actualización</Table.HeadCell>
                <Table.HeadCell>Acciones</Table.HeadCell>
              </Table.Head>
              <Table.Body>
                {filteredAppVersions.map((version) => (
                  <Table.Row key={version.id}>
                    <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-900 dark:text-white">
                      {version.platform}
                    </Table.Cell>
                    <Table.Cell>{version.currentVersion}</Table.Cell>
                    <Table.Cell>{version.updateUrl}</Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Button
                          color="success"
                          size="mc"
                          onClick={() => {
                            setSelectedAppVersion(version);
                            setIsEditModalOpen(true);
                          }}
                        >
                          <HiPencil />
                        </Button>
                        <Button
                          color="failure"
                          size="mc"
                          onClick={() => {
                            setSelectedAppVersion(version);
                            setIsDeleteModalOpen(true);
                          }}
                        >
                          <HiTrash />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>

      <AddAppVersionModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        refreshAppVersions={() => {}}
      />

      <EditAppVersionModal
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        selectedAppVersion={selectedAppVersion}
        refreshAppVersions={() => {}}
      />

      <DeleteAppVersionModal
        isDeleteModalOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        selectedAppVersion={selectedAppVersion}
        refreshAppVersions={() => {}}
      />
    </>
  );
};

export default Setting;
