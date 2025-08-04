import {
  Alert,
  Button,
  Label,
  Modal,
  TextInput,
  Select,
} from "flowbite-react";
import { FC, useState, useEffect } from "react";
import { HiCheckCircle, HiInformationCircle } from "react-icons/hi";
import {
  Subcategory,
  InitialSubcategoryStateCategory,
  Category,
} from "../../../models/modelsadmin/Category";
import { createSubcategory } from "../../../services/servicesadmin/SubcategoryService";
import { allCategory } from "../../../services/servicesadmin/CategoryService";
import CustomModal from "../../../utils/CustomModal";

interface AddCategoryModalProps {
  isAddModalOpen: boolean;
  setIsAddModalOpen: (isOpen: boolean) => void;
  refreshCategories: () => void;
}

const AddSubcategoryModal: FC<AddCategoryModalProps> = ({
  isAddModalOpen,
  setIsAddModalOpen,
  refreshCategories,
}) => {
  const [newSubcategory, setNewCategory] = useState<Subcategory>(
    InitialSubcategoryStateCategory
  );
  const [categories, setCategories] = useState<Category[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await allCategory();
        setCategories(response.items); // Extraer la propiedad items
      } catch {
        setErrorMessage("Error al obtener las categorías");
      }
    };

    fetchCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      console.log("New SubCategory:", newSubcategory); // Verificar el valor de newCategory
      await createSubcategory(newSubcategory);
      setSuccessMessage("Categoría agregada correctamente");
      setIsAddModalOpen(false);
      setErrorMessage(null);
      refreshCategories();
      setNewCategory(InitialSubcategoryStateCategory);
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
    setNewCategory(InitialSubcategoryStateCategory);
  };

  return (
    <>
      <Modal show={isAddModalOpen} onClose={handleCloseModal} dismissible>
        <Modal.Header>Agregar Categoría</Modal.Header>
        <Modal.Body>
          <form className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="name" value="Nombre" />
              <TextInput
                id="name"
                placeholder="Nombre de la categoría"
                value={newSubcategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newSubcategory, name: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description" value="Descripción" />
              <TextInput
                id="description"
                placeholder="Descripción de la categoría"
                value={newSubcategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newSubcategory,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="category" value="Categoría" />
              <Select
                id="category"
                value={newSubcategory.categoryId}
                onChange={(e) =>
                  setNewCategory({
                    ...newSubcategory,
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
          <Button color="success" onClick={handleAddCategory}>
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

export default AddSubcategoryModal;