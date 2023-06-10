"use client"
import React, {useState} from "react";
import axios from "axios";

export const AxiosPost = () => {

        const data = {firstName: "", lastName: ""};
        const [input, setInput] = useState(data);
        const handleData = (e: any) => {
            setInput({...input, [e.target.name]: e.target.value});
        }
        const handleSubmit = (e: any) => {
            e.preventDefault();
            console.log(input);
            axios.post("https://jsonplaceholder.typicode.com/users", input)
                .then((response) => {
                    console.log(response);
                });
        }

        return (
            <>
                <input className="input" type="text" name="firstName" value={input.firstName} onChange={handleData}
                       placeholder="First Name"/>

                <input className="input" type="text" name="lastName" value={input.lastName} onChange={handleData}
                       placeholder="Last Name"/>

                <button className="btn" onClick={handleSubmit}>Submit</button>
            </>
        );
    }
;
