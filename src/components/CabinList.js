import { unstable_noStore as noStore } from "next/cache";
import CabinCard from "./CabinCard";
import { getCabins } from "@/lib/data-service";

async function CabinList({ filter }) {
  //to orevent data cahsing
  noStore();
  ////////////////////////////////
  const cabins = await getCabins();
  if (!cabins.length) return null;

  let displaycabins;
  if (filter === "all") displaycabins = cabins;

  if (filter === "small")
    displaycabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);

  if (filter === "medium")
    displaycabins = cabins.filter(
      (cabin) => cabin.maxCapacity > 3 && cabin.maxCapacity < 7
    );

  if (filter === "large")
    displaycabins = cabins.filter((cabin) => cabin.maxCapacity >= 7);
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {displaycabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
