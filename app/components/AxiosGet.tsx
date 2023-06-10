"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const AxiosGet = () => {
  const [userData, setData] = useState<any[]>([]);

  useEffect(() => {
    axios.get("https://jsonplaceholder.typicode.com/users").then((response) => {
      console.log(response);
      setData(response.data);
    });
  }, []);

  return (
    <div>
      {userData.map((data: any, index: number) => {
        return <p key={index}>{data.name}</p>;
      })}
    </div>
  );
};
