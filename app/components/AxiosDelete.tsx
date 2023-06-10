"use client";
import React from "react";
import axios from "axios";

export const AxiosDelete = ({ input }: any) => {
  const handleDelete = (e: any) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        console.log(response);
      });
  };

  return (
    <>
      <button className="btn" onClick={handleDelete}>
        Delete
      </button>
    </>
  );
};
