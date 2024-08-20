"use client";

import { differenceInDays } from "date-fns";
import { useReservation } from "./ReservationsContext";
import { creatingNewResevations } from "@/lib/actions";
import UpdateButton from "./UpdateButton";
import { useState } from "react";

function ReservationForm({ cabin, user }) {
  // CHANGE
  const [hasBreakfast, setHasBreakfast] = useState(false);
  const { range, resetRange } = useReservation();
  const { maxCapacity, regularPrice, discount, id } = cabin;
  const startDate = range.from;
  const endDate = range.to;
  const numNights = differenceInDays(endDate, startDate);
  const cabinPrice = numNights * (regularPrice - discount);
  const reservationData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinID: id,
  };
  //alternative way to pass data with teh form data
  const reservationWithData = creatingNewResevations.bind(
    null,
    reservationData
  );
  console.log(hasBreakfast);
  return (
    <div className="scale-[1.01]">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as </p>

        <div className="flex gap-4 items-center">
          <img
            // Important to display google profile images
            referrerPolicy="no-referrer"
            className="h-8 rounded-full"
            src={user.image}
            alt={user.name}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          await reservationWithData(formData);
          resetRange();
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="numGuests">
            Would You Like a Breakfast?{" "}
            <span className=" text-sm">will add 150$</span>
          </label>
          <select
            name="hasBreakfast"
            id="hasBreakfast"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            defaultValue={hasBreakfast}
            required
            onChange={() => setHasBreakfast(!hasBreakfast)}
          >
            <option value={false} key="no">
              No
            </option>
            <option value={true} key="yes">
              Yes
            </option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <UpdateButton name="Reserve now" />
          )}
        </div>
      </form>
    </div>
  );
}

export default ReservationForm;
