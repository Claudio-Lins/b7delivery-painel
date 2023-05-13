import { CategoryTypes } from "@/@types/CategoryTypes";
import { OrderStatusTypes } from "@/@types/OrderStatusTypes";
import { OrderTypes } from "@/@types/OrderTypes";
import { ProductTypes } from "@/@types/ProductTypes";

const fakeProduct: ProductTypes = {
  id: 1,
  imagem: "/burgerImg.png",
  category: {
    id: 1,
    name: "Categoria 1",
  },
  name: "Produto 1",
  price: 10,
  description: "Descrição 1",
};

export const api = {
  login: async (
    email: string,
    password: string
  ): Promise<{ error: string; message?: string; token?: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email !== "claudio.lins@me.com") {
          resolve({
            error: "Email não encontrado",
          });
        } else {
          resolve({
            error: "",
            token: "123",
          });
        }
      }, 2000);
    });
  },

  forgotPassword: async (email: string): Promise<{ error: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          error: "",
        });
      }, 2000);
    });
  },

  redefinePassword: async (
    password: string,
    token: string
  ): Promise<{ error: string }> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          error: "",
        });
      }, 1000);
    });
  },

  getOrders: async (): Promise<OrderTypes[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const orders: OrderTypes[] = [];
        const statuses: OrderStatusTypes[] = ["preparing", "sent", "delivered"];
        for (let i = 0; i < 6; i++) {
          orders.push({
            id: parseInt("11" + i),
            status: statuses[Math.floor(Math.random() * 3)],
            orderDate: "2021-01-01",
            userId: "123",
            userName: "Claudio Lins",
            shippingAddress: {
              id: 1,
              street: "Rua 1" + i,
              number: "123",
              complement: "Casa B",
              neighborhood: "Bairro " + i,
              city: "Cidade 1",
              state: "Estado 1",
              zipCode: "12345-678",
            },
            shippingPrice: 10,
            paymentType: "card",
            changeValue: 0,
            cupom: "BR20",
            cupomDiscount: 2,
            products: [
              {
                quantity: 2,
                product: fakeProduct,
              },
              {
                quantity: 1,
                product: {
                  ...fakeProduct,
                  id: 2,
                  name: "Produto 2",
                  price: 20,
                  imagem: "/burgerImg.png",
                },
              },
            ],
            subtotal: 10,
            total: 20,
          });
        }

        resolve(orders);
      }, 0);
    });
  },
  updateOrderStatus: async (orderId: number, status: OrderStatusTypes) => {
    return true;
  },

  getCateories: async (): Promise<CategoryTypes[]> => {
    const categoryList = [
      {
        id: 1,
        name: "Burgers",
      },
      {
        id: 2,
        name: "Bebidas",
      },
      {
        id: 3,
        name: "Sobremesas",
      },
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(categoryList);
      }, 0);
    });
  },

  getProducts: async (): Promise<ProductTypes[]> => {
    const productList: ProductTypes[] = [
      { ...fakeProduct, id: 123 },
      { ...fakeProduct, id: 124 },
      { ...fakeProduct, id: 125 },
      { ...fakeProduct, id: 126 },
      { ...fakeProduct, id: 127 },
      { ...fakeProduct, id: 128 },
      { ...fakeProduct, id: 129 },
      { ...fakeProduct, id: 130 },
    ];
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(productList);
      }, 0);
    });
  },

  deleteProduct: async (id: number): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 0);
    });
  },

  createProduct: async (form: FormData)  => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 0);
    });
  },

  updateProduct: async (form: FormData)  => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 0);
    });
  }
};
