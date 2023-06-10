import React from "react";

export const DataDisplay = ({ data }: any) => {
  return (
    <div>
      <p>First Name: {data.firstName}</p>
      <p>Last Name: {data.lastName}</p>
    </div>
  );
};
