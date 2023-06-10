// AxiosGet.tsx
"use client"
import React, {useEffect, useState} from "react";
import axios from "axios";

export const AxiosGet = () => {
    const [userData, setData] = useState<any[]>([]);

    useEffect(() => {
        // declare an async function
        const fetchData = async () => {
            // use try/catch to handle errors
            try {
                // use await to pause until the promise is resolved
                const response = await axios.get("https://jsonplaceholder.typicode.com/users");
                console.log(response);
                setData(response.data);
            } catch (error) {
                // handle error
                console.log(error);
            }
        };
        // call the async function
        fetchData();
    }, []);

    return (
        <div>
            {userData.map((data: any, index: number) => {
                return <p key={index}>{data.name}</p>;
            })}
        </div>
    );
};
