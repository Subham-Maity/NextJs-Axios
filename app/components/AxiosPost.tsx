"use client";
import React from "react";
import axios from "axios";
import { DataDisplay } from "@/app/components/DataDisplay";

export const AxiosPost = ({ input, setInput }: any) => {
  const [responseData, setResponseData] = React.useState(null);

  const handleData = (e: any) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(input);
    axios
      .post("https://jsonplaceholder.typicode.com/users", input)
      .then((response) => {
        console.log(response);
        setResponseData(response.data); // Set the response data
      });
  };

  const handleUpdate = (data: any) => {
    setInput(data);
  };

  return (
    <>
      <input
        className="input"
        type="text"
        name="firstName"
        value={input.firstName}
        onChange={handleData}
        placeholder="First Name"
      />

      <input
        className="input"
        type="text"
        name="lastName"
        value={input.lastName}
        onChange={handleData}
        placeholder="Last Name"
      />
      <button className="btn" onClick={handleSubmit}>
        Submit
      </button>

      {/* Display the data if available */}
      {responseData && (
        <DataDisplay
          data={responseData}
          onUpdate={handleUpdate}
          onDelete={() => setResponseData(null)}
        />
      )}
    </>
  );
};
