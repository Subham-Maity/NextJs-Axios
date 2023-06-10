"use client";
import React from "react";
import axios from "axios";

export const AxiosPut = ({ input }: any) => {
  const handleUpdate = (e: any) => {
    axios
      .put("https://jsonplaceholder.typicode.com/users/1", input)
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <button className="btn" onClick={handleUpdate}>
        update
      </button>
    </>
  );
};
