import { CategoryTypes } from "@/@types/CategoryTypes";
import { ProductTypes } from "@/@types/ProductTypes";
import React, { FormEvent } from "react";

interface ModalProductEditProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: FormEvent<HTMLFormElement>) => void;
  categories: CategoryTypes[];
  product?: ProductTypes;
  disable?: boolean;
  teste?: () => void;
}

export function ModalProductEdit({
  isOpen,
  onClose,
  onSave,
  categories,
  product,
  disable,
  teste,
}: ModalProductEditProps) {
  async function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(event);
  }

  return (
    <>
      {isOpen && (
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
                      {product ? "Editar produto" : "Novo produto"}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        {product && `Editar o produto # ${product?.id}`}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="my-4">
                  <form
                    onSubmit={handleFormSubmit}
                    encType="multipart/form-data"
                    className="flex flex-col gap-3"
                  >
                    <div className="flex flex-col">
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg"
                        disabled={disable}
                        className="border border-gray-400 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="text"
                        defaultValue={product?.name}
                        placeholder="Nome do produto"
                        disabled={disable}
                        className="border border-gray-400 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <input
                        type="number"
                        defaultValue={product?.price}
                        placeholder="Preço do produto"
                        disabled={disable}
                        className="border border-gray-400 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <textarea
                        rows={4}
                        defaultValue={product?.description}
                        placeholder="Descrição do produto"
                        disabled={disable}
                        className="border border-gray-400 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
                      />
                    </div>
                    <div className="flex flex-col">
                      <select
                        disabled={disable}
                        defaultValue={product?.category.id || categories[0]?.id}
                        className="border border-gray-400 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
                      >
                        <option value="">Selecione uma categoria</option>
                        {categories.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                      <button
                        type="submit"
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-base font-medium text-white hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm
                  
                  `}
                      >
                        Salvar
                      </button>
                      <button
                        onClick={onClose}
                        type="button"
                        className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-base font-medium text-white hover:from-blue-700 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm
                  
                  `}
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
