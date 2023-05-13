"use client";

import { CategoryTypes } from "@/@types/CategoryTypes";
import { ProductTypes } from "@/@types/ProductTypes";
import { ModalProductEdit } from "@/components/ModalProductEdit";
import { ProductTableCard } from "@/components/ProductTableCard";
import { SkeletonTableRow } from "@/components/SkeletonTableRow";
import { api } from "@/libs/api";
import { FormEvent, useEffect, useState } from "react";

export default function Produtos() {
  const [loading, setLoading] = useState(false);
  const [produtos, setProdutos] = useState<ProductTypes[]>([]);
  const [categories, setCategories] = useState<CategoryTypes[]>([]);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductTypes>();
  const [loadingDelete, setLoadingDelete] = useState(false);

  const [isOpenroductEditModal, setIsOpenroductEditModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState<ProductTypes>();
  const [loadingEdit, setLoadingEdit] = useState(false);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setLoading(true);
    setProdutos(await api.getProducts());
    setCategories(await api.getCateories());
    setLoading(false);
  }

  function handleProductDelete(product: ProductTypes) {
    setProductToDelete(product);
    setShowModalDelete(true);
    console.log("handleProductDelete");
  }

  async function handleConfirmDelete() {
    if (productToDelete) {
      setLoadingDelete(true);
      await api.deleteProduct(productToDelete.id);
      setShowModalDelete(false);
      setLoadingDelete(false);
      getProducts();
    }
  }

  function handleNewProduct() {
    setProductToEdit(undefined);
    setIsOpenroductEditModal(true);
  }

  async function handleProductEdit(product: ProductTypes) {
    await setProductToEdit(product);
    await setIsOpenroductEditModal(true);
    console.log({productToEdit});
  }

  async function handleSaveEditModal(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let form = new FormData(event.currentTarget)
    console.log({form});
    setLoadingEdit(true)
    if(productToEdit) {
      form.append('id', productToEdit.id.toString())
      await api.updateProduct(form)
    } else {
      await api.createProduct(form)
    }
    setLoadingEdit(false)
    setIsOpenroductEditModal(false)
    getProducts()
  }

  return (
    <main className="flex flex-col w-full my-4 items-center px-4">
      <div className="flex items-center w-full justify-between border-b pb-4 mb-4 gap-4">
        <h5>Produtos</h5>
        <button
          onClick={handleNewProduct}
          className="flex items-center gap-2 mt-1 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-2 py-1 hover:bg-gradient-to-r hover:from-blue-700 transition-all duration-500 hover:to-blue-500 shadow-sm hover:shadow-inner rounded hover:rounded-lg"
        >
          Novo produto
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <tr className="divide-y table-row">
            <th className="text-center py-3 uppercase font-semibold text-sm hidden md:table-cell w-14">
              Id
            </th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
              Imagem
            </th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
              Nome
            </th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm hidden  md:table-cell">
              Preço
            </th>
            <th className="text-center py-3 px-4 uppercase font-semibold text-sm hidden  md:table-cell">
              Categoria
            </th>
            <th className="text-center w-14 sm:w-32 py-3 px-4 uppercase font-semibold text-sm">
              Ações
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <SkeletonTableRow />
          ) : (
            <>
              {produtos.map((produto, index) => (
                <ProductTableCard
                  key={produto.id}
                  item={produto}
                  index={index}
                  onDelete={handleProductDelete}
                  onEdit={handleProductEdit}
                />
              ))}
            </>
          )}
        </tbody>
      </table>
      {showModalDelete && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-title"
                    >
                      Deletar produto
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Tem certeza que deseja deletar o produto #
                        {productToDelete?.id}?
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  disabled={loadingDelete}
                  onClick={handleConfirmDelete}
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-base font-medium text-white hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm
                  ${
                    loadingDelete
                      ? "cursor-not-allowed bg-gray-100 text-gray-200"
                      : ""
                  }
                  `}
                >
                  Deletar
                </button>
                <button
                  disabled={loadingDelete}
                  onClick={() => setShowModalDelete(false)}
                  type="button"
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-base font-medium text-white hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm
                  ${
                    loadingDelete
                      ? "cursor-not-allowed bg-gray-100 text-gray-200"
                      : ""
                  }
                  `}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ModalProductEdit
        isOpen={isOpenroductEditModal}
        onClose={() => setIsOpenroductEditModal(false)}
        onSave={handleSaveEditModal}
        disable={loadingEdit}
        categories={categories}
        product={productToEdit}
      />

    </main>
  );
}
