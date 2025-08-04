import { Alert, Button, Label, Modal, TextInput } from "flowbite-react";
import { FC, useEffect, useState } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { AppVersion, InitialAppVersionState } from "../models/AppVersion";
import CustomModal from "../utils/CustomModal";

interface EditAppVersionModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  selectedAppVersion: AppVersion | null;
  refreshAppVersions: () => void;
}

const EditAppVersionModal: FC<EditAppVersionModalProps> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedAppVersion,
  refreshAppVersions,
}) => {
  const [appVersion, setAppVersion] = useState<AppVersion>(
    selectedAppVersion || InitialAppVersionState
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (selectedAppVersion) {
      setAppVersion(selectedAppVersion);
    }
  }, [selectedAppVersion]);

  const handleUpdateAppVersion = async () => {
    try {
      if (appVersion.id) {
        console.log("Updated App Version:", appVersion);
        setSuccessMessage("Versión actualizada correctamente");
        setIsEditModalOpen(false);
        setErrorMessage(null);
        refreshAppVersions();
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocurrió un error desconocido");
      }
    }
  };

  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setErrorMessage(null);
  };

  return (
    <>
      <Modal show={isEditModalOpen} onClose={handleCloseModal} dismissible>
        <Modal.Header>Editar Versión</Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="platform" value="Plataforma" />
              <TextInput
                id="platform"
                placeholder="Plataforma"
                value={appVersion.platform}
                onChange={(e) =>
                  setAppVersion({
                    ...appVersion,
                    platform: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="version" value="Versión" />
              <TextInput
                id="version"
                placeholder="1.0.0"
                value={appVersion.currentVersion}
                onChange={(e) =>
                  setAppVersion({
                    ...appVersion,
                    currentVersion: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="updateUrl" value="URL de Actualización" />
              <TextInput
                id="updateUrl"
                placeholder="URL de Actualización"
                value={appVersion.updateUrl}
                onChange={(e) =>
                  setAppVersion({
                    ...appVersion,
                    updateUrl: e.target.value,
                  })
                }
              />
            </div>
          </form>
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
        </Modal.Body>
        <Modal.Footer>
          <Button color="success" onClick={handleUpdateAppVersion}>
            Actualizar
          </Button>
          <Button color="failure" onClick={handleCloseModal}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
      <CustomModal
        show={!!successMessage}
        onClose={() => setSuccessMessage("")}
        icon={HiCheckCircle}
        message={successMessage}
        iconColor="text-green-500"
      />
    </>
  );
};

export default EditAppVersionModal;
