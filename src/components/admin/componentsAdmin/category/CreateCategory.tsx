import { Breadcrumb, TextInput, Button, Table, Pagination, Select } from "flowbite-react";
import { FC, useEffect, useState, useCallback } from "react";
import { HiArchive, HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import { allCategory } from "../../../services/servicesadmin/CategoryService";
import { Category,Categorie} from "../../../models/modelsadmin/Category"; 
import AddCategoryModal from "./AddCategory";
import EditCategoryModal from "./EditCategory";
import DeleteCategoryModal from "./DeleteCategory";

const CreateCategory: FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [orderBy, setOrderBy] = useState("name");
  const [orderDirection, setOrderDirection] = useState("asc");
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<Categorie | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await allCategory(pageSize, searchTerm);
      setCategories(response.items);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [pageSize, searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEditCategory = (category: Categorie) => {
    setSelectedCategory(category);
    setIsEditModalOpen(true);
  };
  const handleDeleteCategory = (category: Categorie) => {
    setSelectedCategory(category);
    setIsDeleteModalOpen(true);
  };
  return (
    <>
    <div className="mx-4 mt-4">
        <Breadcrumb>
          <Breadcrumb.Item icon={HiArchive}>Casos</Breadcrumb.Item>
          <Breadcrumb.Item>Categorías</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="flex flex-col mx-4 mt-4 space-y-4">
        <div className="w-full flex justify-between items-center">
          <TextInput 
            placeholder="Buscar categoría..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <Button className="text-gray-900 border-gray-200 bg-white  focus:ring-gray-300 enabled:hover:bg-gray-100 dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:focus:ring-gray-800 dark:enabled:hover:bg-gray-700" 
          size="mc"
          onClick={() => setIsAddModalOpen(true)}>
            <HiPlus className="mr-2 self-center" />
            Agregar categoría
          </Button>
        </div>

        <div className="w-full p-4 bg-white rounded-lg shadow dark:bg-gray-800">
          <div className="flex justify-between items-center pb-2">
            <Select value={orderBy} onChange={(e) => setOrderBy(e.target.value)}>
              <option value="name">Nombre</option>
              <option value="description">Descripción</option>
            </Select>
            <Select value={orderDirection} onChange={(e) => setOrderDirection(e.target.value)}>
              <option value="asc">Ascendente</option>
              <option value="desc">Descendente</option>
            </Select>
            <Select value={pageSize} onChange={(e) => setPageSize(Number(e.target.value))}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </Select>
          </div>

          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Nombre</Table.HeadCell>
              <Table.HeadCell>Descripción</Table.HeadCell>
              <Table.HeadCell>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {categories.map((category) => (
                <Table.Row key={category.id}>
                  <Table.Cell>{category.name}</Table.Cell>
                  <Table.Cell>{category.description}</Table.Cell>
                  <Table.Cell>
                    <div className="flex space-x-2">
                      <Button color="success" onClick={() => handleEditCategory(category)}>
                        <HiPencil />
                      </Button>
                      <Button color="failure" onClick={() => handleDeleteCategory(category)}>
                        <HiTrash />
                      </Button>
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>

          <div className="flex justify-center mt-4">
            <Pagination
              currentPage={pageNumber}
              totalPages={totalPages}
              onPageChange={(page) => setPageNumber(page)}
            />
          </div>
        </div>
      </div>

      <AddCategoryModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        refreshCategories={fetchCategories}
      />

      {selectedCategory && (
        <EditCategoryModal
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          refreshCategories={fetchCategories}
        />
      )}
       {selectedCategory && (
        <DeleteCategoryModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedCategory={selectedCategory}
          refreshCategories={fetchCategories}
        />
      )}
    </>
  );
};

export default CreateCategory;