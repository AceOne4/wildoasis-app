"use client";

import { useFormStatus } from "react-dom";

// this how to follow the status of teh form we use useformstatsu and it should be on new component
//we cant use it in the same form compnent
function UpdateButton({ name }) {
  const { pending } = useFormStatus();
  return (
    <button
      button
      className="bg-accent-500 px-8 py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300"
      disabled={pending}
    >
      {pending ? "Updating.." : name}
    </button>
  );
}

export default UpdateButton;
