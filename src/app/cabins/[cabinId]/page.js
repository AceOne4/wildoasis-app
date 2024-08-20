import Cabin from "@/components/Cabin";
import Reservation from "@/components/Reservation";
import Spinner from "@/components/Spinner";
import { getCabin, getCabins } from "@/lib/data-service";
import { unstable_noStore as noStore } from "next/cache";
import { Suspense } from "react";

// dynamicaly generate metadata
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return {
    title: `Cabin ${name}`,
  };
}
// how to change dynamic route to static route
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}

export default async function Page({ params }) {
  noStore();
  const cabin = await getCabin(params.cabinId);

  const { name, maxCapacity, image, description } = cabin;
  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin
        name={name}
        maxCapacity={maxCapacity}
        image={image}
        description={description}
      />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {name} today. Pay on arrival.
        </h2>
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
