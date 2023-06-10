"use client";
import React from "react";
import axios from "axios";
import { DataDisplay } from "@/app/components/DataDisplay";

export const AxiosDelete = ({ input }: any) => {
  const [responseData, setResponseData] = React.useState(null);

  const handleDelete = (e: any) => {
    axios
      .delete("https://jsonplaceholder.typicode.com/users/1")
      .then((response) => {
        console.log(response);
        setResponseData(response.data); // Set the response data
      });
  };

  return (
    <>
      <button className="btn" onClick={handleDelete}>
        Delete
      </button>

      {/* Display the data if available */}
      {responseData && <DataDisplay data={responseData} />}
    </>
  );
};
