"use client";
import React from "react";
import axios from "axios";
import { DataDisplay } from "@/app/components/DataDisplay";

export const AxiosPut = ({ input }: any) => {
  const [responseData, setResponseData] = React.useState(null);

  const handleUpdate = (e: any) => {
    axios
      .put("https://jsonplaceholder.typicode.com/users/1", input)
      .then((response) => {
        console.log(response);
        setResponseData(response.data); // Set the response data
      });
  };

  return (
    <>
      <button className="btn" onClick={handleUpdate}>
        Update
      </button>

      {/* Display the data if available */}
      {responseData && <DataDisplay data={responseData} />}
    </>
  );
};
