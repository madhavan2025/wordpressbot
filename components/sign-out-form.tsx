"use client";

import React from "react";


export const SignOutForm = () => {
  return (
    <form
      action={async () => {
        "use server";
        
      }}
      className="w-full"
    >
      <button
        className="w-full px-1 py-0.5 text-left text-red-500"
        type="submit"
      >
        Sign out
      </button>
    </form>
  );
};