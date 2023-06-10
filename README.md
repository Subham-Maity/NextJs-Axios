## Table of Contents

- [Axios Get Request in NextJS](#axios-get-request-in-nextjs)
  - [What is Axios and why use it?](#what-is-axios-and-why-use-it)
  - [How to install and use Axios in NextJS?](#how-to-install-and-use-axios-in-nextjs)
  - [How does it work and what are the key concepts?](#how-does-it-work-and-what-are-the-key-concepts)
_________
## Axios Get Request in NextJS 

In this article, you will learn how to use Axios, a popular library for making HTTP requests in JavaScript, in your NextJS app. You will also learn how to fetch data from an API using Axios and display it on your page using React hooks.

### What is Axios and why use it?

Axios is a library that allows you to make HTTP requests from your browser or Node.js server. It has many features, such as:

- Interceptors: You can intercept requests or responses before they are handled by then or catch.
- Cancel token: You can cancel a request using a cancel token.
- Transform request and response data: You can modify the request or response data before it is sent or received.
- Automatic JSON data transformation: You can send and receive JSON data without manually parsing or stringifying it.
- Customizable headers: You can set or modify the headers for each request.
- CSRF protection: You can automatically send a CSRF token with each request if needed.

Axios is a good choice for making HTTP requests in NextJS because it works both on the client-side and the server-side. NextJS is a framework that allows you to create React apps with server-side rendering (SSR) and static site generation (SSG). This means that some of your pages may be rendered on the server before being sent to the browser, while others may be rendered on the browser after fetching data from an API.

Axios can handle both scenarios seamlessly, as it can detect whether it is running on the browser or the server and use the appropriate method to make requests. For example, if you use axios.get() on the server, it will use Node.js's http module, while if you use it on the browser, it will use XMLHttpRequest or fetch.

### How to install and use Axios in NextJS?

To install Axios in your NextJS project, you can run the following command:

```bash
npm install --save axios
```

To use Axios in your NextJS app, you can import it in any component or page where you need to make HTTP requests. For example, let's say you want to fetch some user data from an API and display it on your page using React hooks. You can create a component called `AxiosGet.tsx` and write the following code:

```tsx
// AxiosGet.tsx
"use client"
import React, {useEffect, useState} from "react";
import axios from "axios";

export const AxiosGet = () => {
    const [userData, setData] = useState<any[]>([]);

    useEffect(() => {
        axios.get("https://jsonplaceholder.typicode.com/users")
            .then((response) => {
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
```

Let's break down this code:

- First, we import React, useEffect, useState and axios. We also use `"use client"` to indicate that this component should only run on the client-side, not on the server-side.
- Next, we create a state variable called `userData` using useState hook. We initialize it with an empty array and set its type to `any[]`. This means that we can store any kind of data in this array, but we lose some type safety. If you want to be more specific about the type of data you are fetching, you can define an interface or a type for it and use that instead of `any`.
- Then, we use useEffect hook to run a function when the component mounts. This function will make a GET request to `https://jsonplaceholder.typicode.com/users`, which is a fake API that returns some user data. We use axios.get() method to make the request and pass the URL as an argument. We also chain a then() method to handle the response. We log the response object to the console and set the `userData` state with the response.data property, which contains an array of user objects.
- Finally, we return a JSX element that maps over the `userData` array and renders a paragraph for each user with their name.

To use this component in your page, you can import it and render it inside your page component. For example, you can create a page called `page.tsx` and write the following code:

```tsx
// page.tsx
import React from "react";
import { AxiosGet } from "./components/AxiosGet";

export default function Page() {
  return (
    <div>
      <h1>Axios Get Example</h1>
      <AxiosGet />
    </div>
  );
}
```

This page will render a heading with the text "Axios Get Example" and the `AxiosGet` component below it. The `AxiosGet` component will fetch the user data from the API and display it on the page.

Here is the folder structure of your NextJS app:

```FolderStructure 
axios-tutorial/
├── app/
│   ├── components/
│   │   └── AxiosGet.tsx
│   ├── page.tsx
│   └── layout.tsx
├── public/
├── .eslintrc.json
├── .gitignore
├── README.md
├── next.config.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── tsconfig.json
```

### How does it work and what are the key concepts?

Let's review some of the key concepts and how they work in this example:

- **HTTP requests**: HTTP requests are messages that are sent from a client to a server to request or send some data. There are different types of HTTP requests, such as GET, POST, PUT, DELETE, etc. Each type has a different purpose and meaning. For example, GET requests are used to fetch data from a server, while POST requests are used to send data to a server. Axios allows you to make any type of HTTP request using its methods, such as axios.get(), axios.post(), axios.put(), etc.
- **Axios methods**: Axios methods are functions that allow you to make HTTP requests using axios. They take an optional argument called `config`, which is an object that contains various options for customizing the request, such as headers, params, data, etc. For example, if you want to make a GET request with some query parameters, you can use axios.get() method and pass an object with a `params` property, like this:

```tsx
axios.get("https://example.com/api", {
  params: {
    name: "John",
    age: 25,
  },
});
```

This will make a GET request to `https://example.com/api?name=John&age=25`.

- **Axios responses**: Axios responses are objects that contain the data and information about the HTTP response from the server. They have several properties, such as data, status, statusText, headers, config, etc. For example, if you make a GET request to `https://jsonplaceholder.typicode.com/users`, you will get a response object like this:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Leanne Graham",
      "username": "Bret",
      "email": "Sincere@april.biz",
      // ...
    },
    // ...
  ],
  "status": 200,
  "statusText": "OK",
  "headers": {
    // ...
  },
  "config": {
    // ...
  },
}
```

The most important property is the `data` property, which contains the actual data from the server. In this case, it is an array of user objects. You can access this property using response.data or destructure it like this:

```tsx
axios.get("https://jsonplaceholder.typicode.com/users").then(({ data }) => {
  // do something with data
});
```

- **Promises**: Promises are objects that represent the eventual completion or failure of an asynchronous operation. They have two methods: then() and catch(). You can use then() method to handle the successful outcome of a promise and catch() method to handle the error outcome of a promise. For example, if you make a GET request using axios.get(), it will return a promise that will either resolve with a response object or reject with an error object. You can use then() and catch() methods to handle both cases:

```tsx
axios
  .get("https://jsonplaceholder.typicode.com/users")
  .then((response) => {
    // handle success
    console.log(response);
  })
  .catch((error) => {
    // handle error
    console.log(error);
  });
```

You can also use async/await syntax to handle promises in a more readable way. Async/await syntax allows you to write asynchronous code as if it was synchronous code. You can use async keyword before a function declaration or expression to indicate that it is an asynchronous function. You can use await keyword before a promise to pause the execution of the function until the promise is resolved or rejected. For example,You can rewrite this code using async/await syntax like this:

```tsx
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
```

This code is equivalent to the previous one, but it is easier to read and understand.

- **React hooks**: React hooks are functions that let you use state and other React features in your function components. They have a special syntax that starts with `use`, such as useState, useEffect, useContext, etc. You can also create your own custom hooks by combining the built-in hooks. React hooks have some rules that you need to follow, such as:

    - Only call hooks at the top level of your component. Don't call them inside loops, conditions, or nested functions.
    - Only call hooks from React function components or custom hooks. Don't call them from regular JavaScript functions or class components.

- **useState hook**: useState hook lets you declare a state variable in your function component. It takes an initial value as an argument and returns an array with two elements: the current state value and a function to update it. For example, in our code, we use useState hook to declare a state variable called `userData` and initialize it with an empty array:

```tsx
const [userData, setData] = useState<any[]>([]);
```

The first element of the array is the current value of `userData`, which is an empty array at first. The second element of the array is a function that we can use to update `userData` with a new value. We name this function `setData`, but you can name it anything you want. To update `userData` with a new value, we call `setData` with the new value as an argument:

```tsx
setData(response.data);
```

This will update `userData` with the data from the API response and re-render the component with the new state.

- **useEffect hook**: useEffect hook lets you perform side effects in your function component. Side effects are anything that affects something outside of your component, such as fetching data from an API, setting up subscriptions, manipulating the DOM, etc. useEffect hook takes a function as an argument and runs it after every render by default. You can also pass a second argument, which is an array of dependencies, to control when the effect runs. For example, in our code, we use useEffect hook to fetch data from an API when the component mounts:

```tsx
useEffect(() => {
  // fetch data from API
}, []);
```

The second argument is an empty array, which means that the effect will only run once when the component mounts and not on subsequent renders. This is similar to componentDidMount lifecycle method in class components. If we want to run the effect on every render, we can omit the second argument:

```tsx
useEffect(() => {
  // fetch data from API
});
```

This is similar to componentDidUpdate lifecycle method in class components. If we want to run the effect only when some value changes, we can pass that value as a dependency in the array:

```tsx
useEffect(() => {
  // fetch data from API based on roomId
}, [roomId]);
```

This means that the effect will only run when `roomId` changes and not on other renders. This is useful for optimizing performance and avoiding unnecessary requests.

