import { ProductTypes } from "@/@types/ProductTypes";
import { Pencil, Trash } from "phosphor-react";
import React from "react";

interface ProductTableCardProps {
  item: ProductTypes;
  onEdit: (item: ProductTypes) => void;
  onDelete: (item: ProductTypes) => void;
  index: number;
}

export function ProductTableCard({
  item,
  onEdit,
  onDelete,
  index
}: ProductTableCardProps) {
  return (
    <tr
      key={item.id}
      className={`
    text-gray-700 hover:bg-zinc-200
    ${index % 2 === 0 ? "bg-white" : "bg-zinc-100"}
    `}
    >
      <td className="text-center py-3 hidden md:table-cell">{item.id}</td>
      <td className="text-center py-3 px-4">
        <div className="flex items-center justify-center text-5xl">
          {/* <Image
          src={produto.imagem}
          alt={produto.name}
          width={50}
          height={50}
          className="object-cover filter bg-transparent"
        /> */}
          🍔
        </div>
      </td>
      <td className="text-center py-3 px-4">
        <div className="flex items-center justify-center">{item.name}</div>
      </td>
      <td className="text-center py-3 px-4 hidden md:table-cell">
        <div className="flex items-center justify-center">{item.price}</div>
      </td>
      <td className="text-center py-3 px-4 hidden md:table-cell">
        <div className="flex items-center justify-center">
          {item.category.name}
        </div>
      </td>
      <td className="text-center py-3 px-4">
        <div className="flex item-center justify-center gap-2">
          <button 
          onClick={() => onEdit(item)}
          className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-2 py-1 hover:bg-gradient-to-r hover:from-blue-700 transition-all duration-500 hover:to-blue-500 shadow-sm hover:shadow-inner rounded hover:rounded-2xl">
            <Pencil />
          </button>
          <button 
          onClick={() => onDelete(item)}
            className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-700 text-white px-2 py-1 hover:bg-gradient-to-r hover:from-blue-700 transition-all duration-500 hover:to-blue-500 shadow-sm hover:shadow-inner rounded hover:rounded-2xl">
            <Trash />
          </button>
        </div>
      </td>
    </tr>
  );
}
