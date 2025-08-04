import { Alert, Button, Label, Modal, TextInput, Select } from "flowbite-react";
import { FC, useState, useEffect } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import { Subcategory, Category } from "../../../models/modelsadmin/Category";
import { updateSubcategoryById } from "../../../services/servicesadmin/SubcategoryService";
import { allCategory } from "../../../services/servicesadmin/CategoryService";
import CustomModal from "../../../utils/CustomModal";

interface EditCategoryModalProps {
  isEditModalOpen: boolean;
  setIsEditModalOpen: (isOpen: boolean) => void;
  selectedSubcategory: Subcategory;
  setSelectedSubcategory: (category: Subcategory) => void;
  refreshCategories: () => void;
}

const EditSubcategoryModal: FC<EditCategoryModalProps> = ({
  isEditModalOpen,
  setIsEditModalOpen,
  selectedSubcategory,
  setSelectedSubcategory,
  refreshCategories,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await allCategory();
        setCategories(response.items);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("Error al obtener las categorías");
        }
      }
    };

    fetchCategories();
  }, []);

  const handleUpdateCategory = async () => {
    try {
      const updatedCategory = await updateSubcategoryById(
        String(selectedSubcategory.id),
        selectedSubcategory
      );
      setSelectedSubcategory(updatedCategory);
      setSuccessMessage("Categoría actualizada correctamente");
      setIsEditModalOpen(false);
      setErrorMessage(null);
      refreshCategories();
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
        <Modal.Header>Editar Categoría</Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name" value="Nombre" />
              <TextInput
                id="name"
                placeholder="Nombre de la categoría"
                value={selectedSubcategory?.name || ""}
                onChange={(e) =>
                  setSelectedSubcategory({
                    ...selectedSubcategory,
                    name: e.target.value || "",
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="description" value="Descripción" />
              <TextInput
                id="description"
                placeholder="Descripción de la categoría"
                value={selectedSubcategory?.description || ""}
                onChange={(e) =>
                  setSelectedSubcategory({
                    ...selectedSubcategory,
                    description: e.target.value || "",
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="category" value="Categoría" />
              <Select
                id="category"
                value={selectedSubcategory?.categoryId || ""}
                onChange={(e) =>
                  setSelectedSubcategory({
                    ...selectedSubcategory,
                    categoryId: Number(e.target.value), // Convertir a número
                  })
                }
              >
                <option value="">Seleccione una categoría</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>
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
          <Button color="success" onClick={handleUpdateCategory}>
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

export default EditSubcategoryModal;