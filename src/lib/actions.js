"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import {
  createBooking,
  deleteBooking,
  getBookings,
  updateBooking,
} from "./data-service";
import { redirect } from "next/navigation";

export async function creatingNewResevations(reservationData, formData) {
  console.log(reservationData, formData);
  const session = await auth();
  if (!session) throw new Error("You must login");

  const bookingData = {
    ...reservationData,
    guestID: session.user.guestID,
    numGuests: Number(formData.get("numGuests")),
    observation: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    TotalPrice: reservationData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unConfirmed",
  };

  await createBooking(bookingData);

  revalidatePath(`/cabins/${reservationData.cabinID}`);
  redirect("/cabins/thankyou");
}

//Updates
export async function updateProfile(formData) {
  const session = await auth();
  if (!session) throw new Error("You must login");

  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // Define the regex pattern
  const regex = /^[a-zA-Z0-9]{6,12}$/;

  // Test the nationalID against the regex pattern
  if (!regex.test(nationalID)) throw new Error("Invalid nationalID");
  const updatedProfile = {
    nationality,
    countryFlag,
    nationalID,
  };

  const { error } = await supabase
    .from("guests")
    .update(updatedProfile)
    .eq("id", session.user.guestID);

  if (error) throw new Error("Guest could not be updated");

  //to keep the fresh data always update
  revalidatePath("./account/profile");
}

export async function updateReservation(formData) {
  const bookingId = Number(formData.get("reservationId"));

  //1) authentication
  const session = await auth();
  if (!session) throw new Error("You must login");

  // to make another guard so no one can delet reservation that not his own
  //2) authorization
  const guestBookings = await getBookings(session.user.guestID);
  const bookingsIds = guestBookings.map((booking) => booking.id);
  if (!bookingsIds.includes(bookingId))
    throw new Error("You are not allowed to update This reservation");

  //3) builidng update data
  const updatedFields = {
    numGuests: Number(formData.get("numGuests")),
    observation: formData.get("observations").slice(0, 1000),
  };

  //4) mutation
  await updateBooking(bookingId, updatedFields);

  //5)revalidation
  revalidatePath(`/account/reservation/edit/${bookingId}`);
  revalidatePath("/account/reservation");

  //6) redirecting
  redirect("/account/reservation");
}

//Deleting
export async function deleteReservation(bookingId) {
  //adding a guard to mmake sure the person is logged in
  const session = await auth();
  if (!session) throw new Error("You must login");

  // to make another guard so no one can delet reservation that not his own
  const guestBookings = await getBookings(session.user.guestID);
  const bookingsIds = guestBookings.map((booking) => booking.id);
  if (!bookingsIds.includes(bookingId))
    throw new Error("You are not allowed to delete This reservation");

  await deleteBooking(bookingId);

  revalidatePath("./account/reservation");
}

//Auth
export async function singInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
