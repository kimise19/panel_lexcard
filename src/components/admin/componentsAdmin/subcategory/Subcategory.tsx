import { Breadcrumb, TextInput, Button, Table, Pagination, Select } from "flowbite-react";
import { FC, useEffect, useState, useCallback } from "react";
import { HiArchive, HiPencil, HiPlus, HiTrash } from "react-icons/hi";
import { allSubcategory } from "../../../services/servicesadmin/SubcategoryService";
import { Subcategory, Category } from "../../../models/modelsadmin/Category"; 
import AddSubcategoryModal from "./AddSubcategory";
import EditSubcategoryModal from "./EditSubcategory";
import DeleteSubcategoryModal from "./DeleteSubcategory";
import { allCategory } from "../../../services/servicesadmin/CategoryService";

const SubcategoryComponent: FC = () => {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([]);
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
  const [selectedSubcategory, setSelectedSubcategory] = useState<Subcategory | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await allCategory(10, ""); // Usar nueva interfaz
      setCategories(response.items);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const fetchSubcategories = useCallback(async () => {
    try {
      const response = await allSubcategory(pageSize, searchTerm); // Usar nueva interfaz
      const subcategoriesWithCategoryNames = response.items.map(subcategory => {
        const category = categories.find(cat => cat.id === subcategory.categoryId);
        return {
          ...subcategory,
          categoryName: category ? category.name : "N/A",
        };
      });
      setSubcategories(subcategoriesWithCategoryNames);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error(error);
    }
  }, [pageSize, searchTerm, categories]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchSubcategories();
  }, [fetchSubcategories]);

  const handleEditSubcategory = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsEditModalOpen(true);
  };

  const handleDeleteSubcategory = (subcategory: Subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsDeleteModalOpen(true);
  };

  return (
    <>
      <div className="mx-4 mt-4">
        <Breadcrumb>
          <Breadcrumb.Item icon={HiArchive}>Casos</Breadcrumb.Item>
          <Breadcrumb.Item>Subcategorías</Breadcrumb.Item>
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
            Agregar Subcategoría
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
              <Table.HeadCell>Categoría</Table.HeadCell>
              <Table.HeadCell>Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body>
              {subcategories.length === 0 ? (
                Array.from({ length: 6 }).map((_, idx) => (
                  <Table.Row key={`skeleton-${idx}`}>
                    <Table.Cell>
                      <div className="h-4 w-36 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-4 w-52 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="h-4 w-44 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                        <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              ) : (
                subcategories.map((subcategory) => (
                  <Table.Row key={subcategory.id}>
                    <Table.Cell>{subcategory.name}</Table.Cell>
                    <Table.Cell>{subcategory.description}</Table.Cell>
                    <Table.Cell>{subcategory.categoryName}</Table.Cell>
                    <Table.Cell>
                      <div className="flex space-x-2">
                        <Button color="success" onClick={() => handleEditSubcategory(subcategory)}>
                          <HiPencil />
                        </Button>
                        <Button color="failure" onClick={() => handleDeleteSubcategory(subcategory)}>
                          <HiTrash />
                        </Button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))
              )}
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
      <AddSubcategoryModal
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        refreshCategories={fetchSubcategories}
      />
      {selectedSubcategory && (
        <EditSubcategoryModal
          isEditModalOpen={isEditModalOpen}
          setIsEditModalOpen={setIsEditModalOpen}
          selectedSubcategory={selectedSubcategory}
          setSelectedSubcategory={setSelectedSubcategory}
          refreshCategories={fetchSubcategories}
        />
      )}
      {selectedSubcategory && (
        <DeleteSubcategoryModal
          isDeleteModalOpen={isDeleteModalOpen}
          setIsDeleteModalOpen={setIsDeleteModalOpen}
          selectedSubcategory={selectedSubcategory}
          refreshCategories={fetchSubcategories}
        />
      )}
    </>
  );
};

export default SubcategoryComponent;