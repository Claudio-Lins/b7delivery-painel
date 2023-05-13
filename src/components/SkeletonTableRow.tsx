import React from "react";

export function SkeletonTableRow() {
  return (
    <tr className="divide-y table-row animate-pulse">
      <th className="text-center py-3 uppercase font-semibold text-sm hidden md:table-cell w-14">
        <div className="w-14 bg-zinc-300 h-4 rounded-md" />
      </th>
      <th className="py-3 flex justify-center">
        <div className="w-12 h-12 bg-zinc-300 rounded-full" />
      </th>
      <th className="text-center py-3 px-4 uppercase font-semibold text-sm">
        <div className=" bg-zinc-300 h-4 rounded-md" />
      </th>
      <th className="text-center py-3 px-4 uppercase font-semibold text-sm hidden  md:table-cell">
        <div className=" bg-zinc-300 h-4 rounded-md" />
      </th>
      <th className="text-center py-3 px-4 uppercase font-semibold text-sm hidden  md:table-cell">
        <div className=" bg-zinc-300 h-4 rounded-md" />
      </th>
      <th className="text-center w-14 sm:w-32 py-3 px-4 uppercase font-semibold text-sm">
        <div className=" bg-zinc-300 h-4 rounded-md" />
      </th>
    </tr>
  );
}
