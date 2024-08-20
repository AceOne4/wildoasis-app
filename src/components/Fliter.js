"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function Fliter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const activeFilter = searchParams.get("capacity") ?? "all";

  const handleClick = (filter) => {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`);
  };
  return (
    <div className=" border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleClick}
        activeFilter={activeFilter}
        titel="All Cabins"
      />
      <Button
        filter="small"
        handleFilter={handleClick}
        activeFilter={activeFilter}
        titel="1&mdash; 2 Guests"
      />
      <Button
        filter="medium"
        handleFilter={handleClick}
        activeFilter={activeFilter}
        titel="3&mdash; 6 Guests"
      />
      <Button
        filter="large"
        handleFilter={handleClick}
        activeFilter={activeFilter}
        titel="7&mdash; 8 Guests"
      />
    </div>
  );
}
function Button({ filter, handleFilter, activeFilter, titel }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter && "bg-primary-700 text-primary-50"
      }`}
      onClick={() => handleFilter(filter)}
    >
      {titel}
    </button>
  );
}
export default Fliter;
