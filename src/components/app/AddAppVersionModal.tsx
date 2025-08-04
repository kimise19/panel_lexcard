import { Alert, Button, Label, Modal, TextInput } from "flowbite-react";
import { FC, useState } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { AppVersion, InitialAppVersionState } from "../models/AppVersion";
import CustomModal from "../utils/CustomModal";

interface AddAppVersionModalProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  refreshAppVersions: () => void;
}

const AddAppVersionModal: FC<AddAppVersionModalProps> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  refreshAppVersions,
}) => {
  const [newAppVersion, setNewAppVersion] = useState<AppVersion>(
    InitialAppVersionState
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleAddAppVersion = async () => {
    try {
      setSuccessMessage("Versión agregada correctamente");
      setIsAddModalOpen(false);
      setErrorMessage(null);
      refreshAppVersions();
      setNewAppVersion(InitialAppVersionState);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Ocurrió un error desconocido");
      }
    }
  };

  const handleCloseModal = () => {
    setIsAddModalOpen(false);
    setErrorMessage(null);
    setNewAppVersion(InitialAppVersionState);
  };

  return (
    <>
      <Modal show={isAddModalOpen} onClose={handleCloseModal} dismissible>
        <Modal.Header>Agregar Versión</Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="platform" value="Plataforma" />
              <TextInput
                id="platform"
                placeholder="Plataforma"
                value={newAppVersion.platform}
                onChange={(e) =>
                  setNewAppVersion({
                    ...newAppVersion,
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
                value={newAppVersion.currentVersion}
                onChange={(e) =>
                  setNewAppVersion({
                    ...newAppVersion,
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
                value={newAppVersion.updateUrl}
                onChange={(e) =>
                  setNewAppVersion({
                    ...newAppVersion,
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
          <Button color="success" onClick={handleAddAppVersion}>
            Agregar
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

export default AddAppVersionModal;
