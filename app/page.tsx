"use client";
import React, { useState } from "react";
import { AxiosGet } from "@/app/components/AxiosGet";
import { AxiosPost } from "@/app/components/AxiosPost";
import { AxiosPut } from "@/app/components/AxiosPut";
import { AxiosDelete } from "@/app/components/AxiosDelete";

export default function Home() {
  const data = { firstName: "", lastName: "" };
  const [input, setInput] = useState(data);

  return (
    <div>
      <div className="text-center text-cyan-500 font-bold text-7xl mb-5">
        {" "}
        Axios Get
      </div>
      <AxiosGet />

      <div className="text-center text-cyan-500 font-bold text-7xl mb-5">
        {" "}
        Axios Post
      </div>
      <AxiosPost input={input} setInput={setInput} />

      <div className="text-center text-cyan-500 font-bold text-7xl mb-5">
        {" "}
        Axios Put
        <AxiosPut input={input} />
      </div>

      <div className="text-center text-cyan-500 font-bold text-7xl mb-5">
        {" "}
        Axios Delete
        <AxiosDelete input={input} />
      </div>
    </div>
  );
}
