"use client";
import { useEffect, useState } from "react";
import { ArrowsClockwise, MagnifyingGlass } from "phosphor-react";
import { Skeleton } from "@/components/Skeleton";
import { OrderTypes } from "@/@types/OrderTypes";
import { api } from "@/libs/api";
import { OrderCard } from "@/components/OrderCard";
import { OrderStatusTypes } from "@/@types/OrderStatusTypes";
import { KeyboardEvent } from "react";
import { dateFormat } from "@/libs/dateFormat";

export default function Pedidos() {
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<OrderTypes[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<OrderTypes[]>([]);
  const [printOrder, setPrintOrder] = useState<OrderTypes | null>(null);

  const getOrders = async () => {
    setSearchInput("");
    setOrders([]);
    setLoading(true);
    const orderList: OrderTypes[] = await api.getOrders();
    setOrders(orderList);
    setLoading(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    setSearchInput("");
    setFilteredOrders(orders);
  }, [orders]);

  function handleSearchKey(event: KeyboardEvent<HTMLInputElement>) {
    if (event.code.toLowerCase() === "enter") {
      if (searchInput != "") {
        let newOrders: OrderTypes[] = [];
        for (let i in orders) {
          if (orders[i].id.toString() === searchInput) {
            newOrders.push(orders[i]);
          }
        }
        setFilteredOrders(newOrders);
      } else {
        setFilteredOrders(orders);
      }
    }
  }

  async function handleChangeStatus(id: number, newStatus: OrderStatusTypes) {
    await api.updateOrderStatus(id, newStatus);
    getOrders();
  }

  function handlePrintAction(order: OrderTypes) {
    setPrintOrder(order);
    setTimeout(() => {
      window.print();
      setPrintOrder(null);
    }, 500);
  }

  return (
    <>
      <main className="my-4 print:hidden">
        <div className="flex items-center justify-between border-b pb-4 mb-4 px-4">
          <div className="flex items-center gap-4">
            <h5>Pedidos</h5>
            <button
              onClick={getOrders}
              className="flex items-center gap-2 mt-1"
            >
              <span className="hidden text-sm font-light md:block">
                Atualizar
              </span>
              <ArrowsClockwise
                size={20}
                color="#b4b1b1"
                weight="bold"
                className={`
              ${loading ? "animate-spin" : ""}`}
              />
            </button>
          </div>
          <div className="">
            <div className="relative">
              <input
                placeholder="Pesquisar"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyUp={handleSearchKey}
                disabled={loading}
                className={`border border-gray-400 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500
              ${
                loading
                  ? "bg-gray-100 border-gray-100 focus:border-gray-100 placeholder:text-gray-200 cursor-not-allowed"
                  : ""
              }
              `}
              />
              <div className="absolute top-[10px] right-3">
                <MagnifyingGlass size={20} color="#b4b1b1" />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center flex-wrap w-full gap-6 justify-center">
          {loading && (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          )}
          {!loading &&
            filteredOrders.map((item: OrderTypes) => {
              return (
                <OrderCard
                  key={item.id}
                  item={item}
                  onChangeStatus={handleChangeStatus}
                  onPrint={handlePrintAction}
                />
              );
            })}
        </div>
      </main>
      <div className="hidden print:block">
        {printOrder && (
          <div className="flex w-full p-4 flex-col items-center">
            <div className="flex flex-col w-full border-b border-t p-2">
              <h5 className="text-2xl">Pedido</h5>
              <p className="font-bold">Id: #{printOrder.id}</p>
              <p className="font-bold">
                Data: {dateFormat(printOrder.orderDate)}
              </p>
              <p className="font-bold">Nome: {printOrder.userName}</p>
              <h5 className="text-2xl mt-4">Pagamento</h5>
              <p className="">
                <strong>Tipo de pagamento:</strong>
                {printOrder.paymentType === "money" ? " Dinheiro" : " Cartão"}
              </p>
              <p className="">Subtotal: {printOrder.subtotal.toFixed(2)}</p>
              <p className="">Frete: {printOrder.shippingPrice.toFixed(2)}</p>
              {printOrder.cupomDiscount && (
                <p>Desconto: {printOrder.cupomDiscount.toFixed(2)}</p>
              )}
              <p className="font-bold">Total: {printOrder.total.toFixed(2)}</p>
              <h5 className="text-2xl mt-4">Endereço</h5>
              <div className="flex gap-2">
                <p className="">Rua: {printOrder.shippingAddress.street},</p>
                <p className=""> {printOrder.shippingAddress.number}</p>
                {printOrder.shippingAddress.complement && (
                  <p> - {printOrder.shippingAddress.complement}</p>
                )}
              </div>
              <p className="">
                Bairro: {printOrder.shippingAddress.neighborhood}
              </p>
              <p className="">Cidade: {printOrder.shippingAddress.city}</p>
              <p className="">Estado: {printOrder.shippingAddress.state}</p>
              <p className="">
                Código postal: {printOrder.shippingAddress.zipCode}
              </p>
            </div>
            <h5 className="text-2xl mt-4">Itens</h5>
            {printOrder.products.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between w-full border-b p-2"
              >
                <p>
                  {item.quantity}x {item.product.name}
                </p>
                <p>R$ {(item.quantity * item.product.price).toFixed(2)}</p>
              </div>
            ))}
              
          </div>
        )}
      </div>
    </>
  );
}
