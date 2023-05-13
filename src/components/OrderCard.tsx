import { OrderStatusTypes } from "@/@types/OrderStatusTypes";
import { OrderTypes } from "@/@types/OrderTypes";
import { dateFormat } from "@/libs/dateFormat";
import Image from "next/image";
import React from "react";

interface OrderCardProps {
  item: OrderTypes;
  onChangeStatus: (id: number, newStatus: OrderStatusTypes) => void;
  onPrint: (order: OrderTypes) => void
}

export function OrderCard({ item, onChangeStatus, onPrint }: OrderCardProps) {
  const handleStatusChange = (event: any) => {
    onChangeStatus(item.id, event.target.value as OrderStatusTypes);
  };

  const handlePrint = () => {
    onPrint(item)
  }

  return (
    <div
      className={`border shadow rounded-md p-4 max-w-sm w-full mx-auto text-white
    ${item.status === "preparing" ? "bg-blue-600" : ""}
    ${item.status === "sent" ? "bg-emerald-600" : ""}
    ${item.status === "delivered" ? "bg-zinc-400" : ""}
    `}
    >
      <div className="flex items-center justify-between">
        <div className="">
          <p className="font-bold">
            {dateFormat(new Date())}
          </p>
          <p>{item.userName}</p>
          <button 
          onClick={handlePrint}
            className="flex items-center gap-2 mt-1">Imprimir</button>
        </div>
        <div className="">
          <p className="text-xl">#{item.id}</p>
        </div>
      </div>
      <select
        value={item.status}
        onChange={handleStatusChange}
        className="w-full mt-4 text-zinc-600 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
      >
        <option value="preparing">Preparando</option>
        <option value="sent">Enviado</option>
        <option value="delivered">Entregue</option>
      </select>
      <div className="bg-white text-zinc-900 mt-2 rounded-sm p-2">
        {item.products.map((productItem, i) => (
          <div key={i} className="flex items-center justify-between">
            <p>
              {productItem.quantity}x {productItem.product.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
