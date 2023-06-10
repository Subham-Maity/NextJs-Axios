# How to Use Axios with Next.js (TypeScript Edition) to Create a Simple CRUD Component for a To-Do App 📝

In this tutorial, you will learn how to use Axios with Next.js (TypeScript edition) to create a simple CRUD component for a very basic to-do app. You will also learn how to use app routing and `@` alias in Next.js. Axios is a popular library for making HTTP requests from the browser or Node.js. Next.js is a framework for building React applications with features like server-side rendering, static site generation, and API routes. TypeScript is a superset of JavaScript that adds static types and other features to the language.

You will use a Node.js server to operate on a basic API made with Express, a web framework for Node.js. You will also use MongoDB, a document-oriented database, to store your data. You will test your API step-by-step using Postman, a tool for testing and debugging APIs. 

The tutorial will cover the following topics:

- Setting up the project and installing dependencies
- Connecting to MongoDB using Mongoose
- Creating a schema and a service for the to-do model
- Creating API routes for CRUD operations using Express
- Testing the API using Postman
- Setting up Next.js with TypeScript and app routing
- Creating a component for displaying and adding to-dos using Axios
- Creating components for updating and deleting to-dos using Axios

By the end of this tutorial, you will have a simple to-do app that looks something like this:

## Folder structure:

The folder structure of this app is as follows:

```
backend
├── dist
│   ├── index.js
│   ├── models
│   │   └── todo.js
│   └── routes
│       └── todo.js
├── node_modules
├── src
│   ├── index.ts
│   ├── models
│   │   └── todo.ts
│   └── routes
│       └── todo.ts
├── package.json
├── package-lock.json
├── tsconfig.json
└── .env

frontend
├── node_modules
├── pages
│   ├── _app.tsx
│   ├── index.tsx
│   └── todos
│       ├── [id].tsx
│       └── index.tsx
├── components
│   ├── TodoDetails.tsx
│   └── TodoList.tsx
├── public
│   └── favicon.ico
├── package.json
├── package-lock.json
├── tsconfig.json
└── next-env.d.ts

```

The `backend` folder contains the code for the backend server. The `dist` folder contains the compiled JavaScript code from the TypeScript code in the `src` folder. The `models` folder contains the schema and service for the to-do model. The `routes` folder contains the API routes for the to-do model. The `package.json` file contains the dependencies and scripts for the backend project. The `tsconfig.json` file contains the configuration options for TypeScript. The `.env` file contains the environment variables for the backend project.

The `frontend` folder contains the code for the frontend app. The `pages` folder contains the pages for the app. The `_app.tsx` file is a custom App component that wraps around all pages. The `index.tsx` file is the default page for the app. The `todos` folder contains the pages for displaying and adding to-dos and displaying and updating a single to-do by id. The `components` folder contains the components for displaying and adding to-dos and displaying and updating a single to-do by id. The `public` folder contains static files for the app, such as favicon.ico. The `package.json` file contains the dependencies and scripts for the frontend project. The `tsconfig.json` file contains the configuration options for TypeScript. The `next-env.d.ts` file contains some type declarations for Next.js.

## Prerequisites

Before you start this tutorial, you should have the following installed on your machine:

- Node.js (version 14 or higher)
- MongoDB (version 4 or higher)
- Postman (version 8 or higher)

You should also have some basic knowledge of:

- JavaScript and TypeScript
- React and Next.js
- Express and MongoDB
- Axios and HTTP requests

## Setting up the project and installing dependencies

To start this project, you will need to create two folders: one for the backend server and one for the frontend app. You can name them `backend` and `frontend` respectively. 

In your terminal, navigate to the `backend` folder and run the following command to initialize a Node.js project:

```bash
npm init -y
```

This will create a `package.json` file with some default values. You can edit this file later to change the name, description, or other details of your project.

Next, you will need to install some dependencies for your backend server. Run the following command to install Express, Mongoose, Cors, Nodemon, and TypeScript:

```bash
npm install express mongoose cors nodemon typescript --save
```

Express is the web framework that you will use to create your API routes. Mongoose is an object data modeling (ODM) library that helps you interact with MongoDB. Cors is a middleware that enables cross-origin resource sharing (CORS), which allows your frontend app to communicate with your backend server. Nodemon is a tool that automatically restarts your server when you make changes to your code. TypeScript is the language that you will use to write your backend code.

You will also need to install some type definitions for Express, Mongoose, and Node.js. These are files that provide type information for TypeScript so that it can understand the libraries that you are using. Run the following command to install them as dev dependencies:

```bash
npm install @types/express @types/mongoose @types/node --save-dev
```

Dev dependencies are packages that are only used during development and not in production.

Now, you will need to create a `tsconfig.json` file in your `backend` folder. This file contains the configuration options for TypeScript. You can use the following content for your `tsconfig.json` file:

```json
{
  "compilerOptions": {
    "target": "es6",
    "module": "commonjs",
    "outDir": "./dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.test.ts"]
}
```

This tells TypeScript to compile your code from `src` folder into `dist` folder using ES6 syntax and CommonJS modules. It also enables strict mode, which enforces more type checking and error detection. The `include` and `exclude` options specify which files to include or exclude from compilation.

Next, you will need to create a `src` folder in your `backend` folder. This is where you will write your TypeScript code for your backend server.

Finally, you will need to add some scripts to your `package.json` file to run your server. You can use the following scripts:

```json
"scripts": {
  "start": "node dist/index.js",
  "dev": "nodemon src/index.ts",
  "build": "tsc -p ."
},
```

The `start` script runs your compiled server code from the `dist` folder. The `dev` script runs your server code using Nodemon and watches for changes. The `build` script compiles your TypeScript code using the `tsconfig.json` file.

Now, you have set up your backend project and installed the necessary dependencies. You can move on to the next step, where you will connect to MongoDB using Mongoose.

## Connecting to MongoDB using Mongoose

In this step, you will connect to MongoDB using Mongoose and create a database for your to-do app. You will also create a `.env` file to store your database connection string and other environment variables.

First, you will need to start your MongoDB server. If you have installed MongoDB locally, you can run the following command in a separate terminal:

```bash
mongod
```

This will start the MongoDB server on port 27017 by default. You can also use a cloud-based MongoDB service like MongoDB Atlas if you prefer.

Next, you will need to create a `.env` file in your `backend` folder. This file will store your environment variables, such as your database connection string. You can use the following content for your `.env` file:

```env
DB_URI=mongodb://localhost:27017/todo-app
PORT=5000
```

This sets the `DB_URI` variable to the connection string for your local MongoDB server and the database name `todo-app`. You can change this to match your own MongoDB server and database name if you are using a different one. It also sets the `PORT` variable to 5000, which is the port that your backend server will run on.

Next, you will need to install a package called `dotenv`, which helps you load the environment variables from your `.env` file. Run the following command to install it as a dependency:

```bash
npm install dotenv --save
```

You will also need to install its type definition as a dev dependency:

```bash
npm install @types/dotenv --save-dev
```

Now, you can create an `index.ts` file in your `src` folder. This file will be the entry point for your backend server. You can use the following content for your `index.ts` file:

```ts
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Create express app
const app = express();

// Use JSON middleware for parsing request body
app.use(express.json());

// Use cors middleware for enabling cors
app.use(cors());

// Get port from environment variables or use 5000 as default
const port = process.env.PORT || 5000;

// Connect to MongoDB using mongoose
mongoose.connect(process.env.DB_URI as string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((error) => {
  console.error(error);
});

// Start listening on port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

This code imports the modules that you installed earlier and loads the environment variables from your `.env` file. It then creates an Express app and uses some middleware for parsing JSON requests and enabling CORS. It also gets the port from the environment variables or uses 5000 as a default value.

The code then connects to MongoDB using Mongoose and logs a message if the connection is successful or an error if it fails. It finally starts listening on the port and logs another message.

You can now test your server by running the following command in your terminal:

```bash
npm run dev
```

This will start your server using Nodemon and watch for changes. You should see something like this in your terminal:

```bash
[nodemon] starting `ts-node src/index.ts`
Server is running on port 5000
Connected to MongoDB
```

This means that your server is running and connected to MongoDB successfully. You can now move on to the next step, where you will create a schema and a service for the to-do model.

## Creating a schema and a service for the to-do model

In this step, you will create a schema and a service for the to-do model. A schema defines the shape of your data and how it is stored in MongoDB. A service provides methods for interacting with the data, such as creating, reading, updating, or deleting documents.

First, you will need to create a folder called `models` in your `src` folder. This folder will contain your schemas and services for your models.

Next, you will need to create a file called `todo.ts` in your `models` folder. This file will contain your schema and service for the to-do model. You can use the following content for your `todo.ts` file:

```ts
import mongoose, { Document, Model } from 'mongoose';

// Define the interface for the to-do document
interface ITodo extends Document {
  title: string;
  completed: boolean;
}

// Define the schema for the to-do document
const todoSchema = new mongoose.Schema<ITodo>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

// Define the interface for the to-do service
interface ITodoService {
  createTodo: (title: string) => Promise<ITodo>;
  getTodos: () => Promise<ITodo[]>;
  getTodoById: (id: string) => Promise<ITodo | null>;
  updateTodoById: (id: string, updates: Partial<ITodo>) => Promise<ITodo | null>;
  deleteTodoById: (id: string) => Promise<ITodo | null>;
}

// Define the class for the to-do service
class TodoService implements ITodoService {
  // Define the model for the to-do document
  private todoModel: Model<ITodo>;

  // Initialize the model in the constructor
  constructor() {
    this.todoModel = mongoose.model('Todo', todoSchema);
  }

  // Create a new to-do document and return it
  async createTodo(title: string): Promise<ITodo> {
    const todo = new this.todoModel({ title });
    await todo.save();
    return todo;
  }

  // Get all to-do documents and return them
  async getTodos(): Promise<ITodo[]> {
    const todos = await this.todoModel.find();
    return todos;
  }

  // Get a to-do document by id and return it or null if not found
  async getTodoById(id: string): Promise<ITodo | null> {
    const todo = await this.todoModel.findById(id);
    return todo;
  }

  // Update a to-do document by id with the given updates and return it or null if not found
  async updateTodoById(id: string, updates: Partial<ITodo>): Promise<ITodo | null> {
    const todo = await this.todoModel.findByIdAndUpdate(id, updates, { new: true });
    return todo;
  }

  // Delete a to-do document by id and return it or null if not found
  async deleteTodoById(id: string): Promise<ITodo | null> {
    const todo = await this.todoModel.findByIdAndDelete(id);
    return todo;
  }
}

// Export an instance of the to-do service
export const todoService = new TodoService();
```

This code defines an interface for the to-do document, which has two properties: `title` and `completed`. The `title` is a required string that is trimmed of any whitespace. The `completed` is a boolean that defaults to false.

The code then defines a schema for the to-do document using Mongoose. The schema takes the interface as a generic parameter and maps the properties to their corresponding types and options.

The code also defines an interface for the to-do service, which has five methods: `createTodo`, `getTodos`, `getTodoById`, `updateTodoById`, and `deleteTodoById`. Each method takes some parameters and returns a promise of either a to-do document or an array of them or null.

The code then defines a class for the to-do service that implements the interface. The class has a private property called `todoModel`, which is initialized with the Mongoose model for the to-do document in the constructor. The class then defines each method using async/await syntax and uses the `todoModel` to perform various operations on the database.

Finally, the code exports an instance of the to-do service that can be used by other modules.

Now, you have created a schema and a service for the to-do model. You can move on to the next step, where you will create API routes for CRUD operations using Express.

## Creating API routes for CRUD operations using Express

In this step, you will create API routes for CRUD operations using Express. You will use your to-do service to handle the requests and send back appropriate responses. You will also use some middleware for validating and sanitizing the request parameters and body.

First, you will need to create a folder called `routes` in your `src` folder. This folder will contain your API routes.

Next, you will need to create a file called `todo.ts` in your `routes` folder. This file will contain your API routes for the to-do model. You can use the following content for your `todo.ts` file:

```ts
import express from 'express';
import { todoService } from '../models/todo';
import { body, param, validationResult } from 'express-validator';

// Create a router for the to-do routes
const router = express.Router();

// Define a middleware for validating and sanitizing the request body
const validateBody = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .withMessage('Title is required')
    .escape(),
  body('completed')
    .optional()
    .isBoolean()
    .withMessage('Completed must be a boolean')
    .toBoolean(),
];

// Define a middleware for validating and sanitizing the request parameter
const validateParam = [
  param('id')
    .isMongoId()
    .withMessage('Id must be a valid MongoDB id')
];

// Define a middleware for handling validation errors
const handleErrors = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Define a route for creating a new to-do
router.post('/', validateBody, handleErrors, async (req, res) => {
  try {
    const { title } = req.body;
    const todo = await todoService.createTodo(title);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a route for getting all to-dos
router.get('/', async (req, res) => {
  try {
    const todos = await todoService.getTodos();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a route for getting a to-do by id
router.get('/:id', validateParam, handleErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoService.getTodoById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a route for updating a to-do by id
router.put('/:id', validateParam, validateBody, handleErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const todo = await todoService.updateTodoById(id, updates);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Define a route for deleting a to-do by id
router.delete('/:id', validateParam, handleErrors, async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoService.deleteTodoById(id);
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export the router
export default router;
```

This code imports the modules that you installed earlier and your to-do service. It then creates a router for the to-do routes using Express.

The code then defines some middleware for validating and sanitizing the request body and parameter using `express-validator`. The `validateBody` middleware checks that the `title` is not empty and escapes any HTML characters. It also checks that the `completed` is optional and a boolean and converts it to a boolean value. The `validateParam` middleware checks that the `id` is a valid MongoDB id. The `handleErrors` middleware checks if there are any validation errors and sends back a response with status code 400 and an array of errors. If there are no errors, it calls the next middleware.

The code then defines five routes for creating, getting, updating, and deleting to-dos using your to-do service. Each route uses async/await syntax and wraps the code in a try/catch block. If there is an error, it sends back a response with status code 500 and an error message. If there is no error, it sends back a response with an appropriate status code and data.

The code finally exports the router so that it can be used by other modules.Now , you have created API routes for CRUD operations using Express. You can move on to the next step, where you will test the API using Postman.

## Testing the API using Postman

In this step, you will test the API using Postman. Postman is a tool that allows you to send and receive HTTP requests and responses. You will use Postman to test each of your API routes and verify that they work as expected.

First, you will need to open Postman and create a new collection for your to-do app. A collection is a group of requests that are related to each other. You can name your collection `To-Do App` and add a description if you want.

Next, you will need to create a new request for each of your API routes and add them to your collection. You can use the following table as a reference for your requests:

| Method | URL | Body | Response |
| ------ | --- | ---- | -------- |
| POST | http://localhost:5000/ | { "title": "Learn Axios" } | { "_id": "60c9a4f6b2f1a1c7d8e0c8b5", "title": "Learn Axios", "completed": false, "__v": 0 } |
| GET | http://localhost:5000/ | N/A | [ { "_id": "60c9a4f6b2f1a1c7d8e0c8b5", "title": "Learn Axios", "completed": false, "__v": 0 } ] |
| GET | http://localhost:5000/60c9a4f6b2f1a1c7d8e0c8b5 | N/A | { "_id": "60c9a4f6b2f1a1c7d8e0c8b5", "title": "Learn Axios", "completed": false, "__v": 0 } |
| PUT | http://localhost:5000/60c9a4f6b2f1a1c7d8e0c8b5 | { "completed": true } | { "_id": "60c9a4f6b2f1a1c7d8e0c8b5", "title": "Learn Axios", "completed": true, "__v": 0 } |
| DELETE | http://localhost:5000/60c9a4f6b2f1a1c7d8e0c8b5 | N/A | { "_id": "60c9a4f6b2f1a1c7d8e0c8b5", "title": "Learn Axios", "completed": true, "__v": 0 } |

For each request, you will need to select the appropriate method and URL from the table. For the POST and PUT requests, you will also need to select the `Body` tab and choose `raw` and `JSON` as the options. Then, you will need to enter the JSON body from the table.

For each request, you can also add a name and a description if you want. For example, you can name your first request `Create a new to-do` and add a description like `This request creates a new to-do document with the given title and returns it`.

After creating each request, you can send it by clicking on the `Send` button. You should see the response in the `Body` tab below. You can also check the status code and the time taken for each request in the `Status` and `Time` fields above.

You should see something like this in Postman:

![Postman screenshot](https://i.imgur.com/3wJZQgR.png)

You can also use the `Tests` tab to write some tests for your requests using JavaScript. For example, you can write a test like this for your first request:

```js
pm.test("Status code is 201", function () {
  pm.response.to.have.status(201);
});

pm.test("Response has an id, title, and completed properties", function () {
  const response = pm.response.json();
  pm.expect(response).to.have.property("_id");
  pm.expect(response).to.have.property("title");
  pm.expect(response).to.have.property("completed");
});

pm.test("Response has the correct title and completed values", function () {
  const response = pm.response.json();
  pm.expect(response.title).to.equal("Learn Axios");
  pm.expect(response.completed).to.equal(false);
});
```

This test checks that the status code is 201, that the response has an id, title, and completed properties, and that they have the correct values. You can run this test by clicking on the `Send` button and then on the `Test Results` tab. You should see something like this:

![Postman test screenshot](https://i.imgur.com/8x0zg3w.png)

You can write similar tests for your other requests and run them as well.

Now, you have tested your API using Postman and verified that it works as expected. You can move on to the next step, where you will set up Next.js with TypeScript and app routing.

## Setting up Next.js with TypeScript and app routing

In this step, you will set up Next.js with TypeScript and app routing. You will use Next.js to create your frontend app with React components. You will also use TypeScript to write your frontend code with static types. You will also use app routing to define the paths for your pages and components.

First, you will need to navigate to the `frontend` folder and run the following command to create a Next.js app with TypeScript:

```bash
npx create-next-app --typescript
```

This will create a Next.js app with some default files and folders. It will also install some dependencies, such as React, Next.js, and TypeScript.

Next, you will need to install some additional dependencies for your frontend app. Run the following command to install Axios, Bootstrap, and React Icons:

```bash
npm install axios bootstrap react-icons --save
```

Axios is the library that you will use to make HTTP requests from your frontend app. Bootstrap is a CSS framework that provides some styles and components for your app. React Icons is a library that provides some icons for your app.

You will also need to install some type definitions for Axios and React Icons as dev dependencies:

```bash
npm install @types/axios @types/react-icons --save-dev
```

Next, you will need to create a folder called `components` in your `frontend` folder. This folder will contain your React components for your app.

Next, you will need to create a file called `_app.tsx` in your `pages` folder. This file is a custom App component that wraps around all your pages. You can use the following content for your `_app.tsx` file:

```tsx
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

This code imports the type for the AppProps and the Bootstrap CSS file. It then defines a function component that takes the Component and pageProps as props and renders them.

Next, you will need to create a file called `index.tsx` in your `pages` folder. This file is the default page for your app. You can use the following content for your `index.tsx` file:

```tsx
import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>To-Do App</title>
        <meta name="description" content="A simple to-do app using Axios and Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-5">
        <h1 className="text-center">To-Do App</h1>
        <p className="text-center">A simple to-do app using Axios and Next.js</p>
        <Link href="/todos">
          <a className="btn btn-primary d-block mx-auto">Go to To-Dos</a>
        </Link>
      </main>
    </div>
  );
}
```

This code imports the Head and Link components from Next.js. It then defines a function component that renders a container with a title, a description, and a link to the `/todos` page.

Next, you will need to create a file called `[id].tsx` in your `pages/todos` folder. This file is the page for displaying and updating a single to-do by id. You can use the following content for your `[id].tsx` file:

```tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

// Define the interface for the to-do props
interface ITodoProps {
  id: string;
  title: string;
  completed: boolean;
}

// Define the component for the single to-do page
export default function TodoPage({ id, title, completed }: ITodoProps) {
  // Use useRouter hook to access router object
  const router = useRouter();

  // Use useState hook to manage local state
  const [todoTitle, setTodoTitle] = useState(title);
  const [todoCompleted, setTodoCompleted] = useState(completed);
  const [editing, setEditing] = useState(false);

  // Define a function to handle the change of the title input
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  // Define a function to handle the click of the edit button
  const handleEditClick = () => {
    setEditing(true);
  };

  // Define a function to handle the click of the save button
  const handleSaveClick = async () => {
    try {
      // Update the to-do by id using axios
      const response = await axios.put(`http://localhost:5000/${id}`, {
        title: todoTitle,
        completed: todoCompleted,
      });
      // Set the local state with the updated data
      setTodoTitle(response.data.title);
      setTodoCompleted(response.data.completed);
      // Set the editing state to false
      setEditing(false);
    } catch (error) {
      // Log the error
      console.error(error);
    }
  };

  // Define a function to handle the click of the cancel button
  const handleCancelClick = () => {
    // Reset the local state with the original props
    setTodoTitle(title);
    setTodoCompleted(completed);
    // Set the editing state to false
    setEditing(false);
  };

  // Define a function to handle the click of the delete button
  const handleDeleteClick = async () => {
    try {
      // Delete the to-do by id using axios
      await axios.delete(`http://localhost:5000/${id}`);
      // Redirect to the /todos page
      router.push('/todos');
    } catch (error) {
      // Log the error
      console.error(error);
    }
  };

  // Define a function to handle the click of the toggle button
  const handleToggleClick = async () => {
    try {
      // Update the to-do by id with the opposite completed value using axios
      const response = await axios.put(`http://localhost:5000/${id}`, {
        completed: !todoCompleted,
      });
      // Set the local state with the updated data
      setTodoCompleted(response.data.completed);
    } catch (error) {
      // Log the error
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">To-Do Details</h1>
      <div className="card mx-auto my-5" style={{ width: '18rem' }}>
        <div className="card-body">
          {editing ? (
            <input
              type="text"
              className="form-control"
              value={todoTitle}
              onChange={handleTitleChange}
            />
          ) : (
            <h5 className="card-title">{todoTitle}</h5>
          )}
          <p className="card-text">
            {todoCompleted ? 'Completed' : 'Not Completed'}
          </p>
          {editing ? (
            <div className="d-flex justify-content-between">
              <button className="btn btn-success" onClick={handleSaveClick}>
                Save
              </button>
              <button className="btn btn-secondary" onClick={handleCancelClick}>
                Cancel
              </button>
            </div>
          ) : (
            <div className="d-flex justify-content-between">
              <button className="btn btn-primary" onClick={handleEditClick}>
                <FaEdit />
              </button>
              <button className="btn btn-danger" onClick={handleDeleteClick}>
                <FaTrash />
              </button>
              <button className="btn btn-warning" onClick={handleToggleClick}>
                <FaCheck />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Define a function to get the server-side props for the page
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Get the id from the query params
    const { id } = context.query;
    // Get the to-do by id using axios
    const response = await axios.get(`http://localhost:5000/${id}`);
    // Return the props with the to-do data
    return {
      props: response.data,
    };
  } catch (error) {
    // Return an error status if something goes wrong
    return {
      notFound: true,
    };
  }
};
```

This code imports some modules from Next.js, React, React Icons, and Axios. It also defines an interface for the to-do props, which has an id, a title, and a completed property.

The code then defines a component for the single to-do page that takes the to-do props as props. The component uses some hooks and functions to manage its local state and handle various events. The component renders a card with the to-do details and some buttons for editing, deleting, and toggling the to-do.

The code also defines a function to get the server-side props for the page using Next.js. The function takes the context object as a parameter and gets the id from the query params. The function then uses Axios to get the to-do by id from the backend server and returns it as props. If there is an error, the function returns a notFound status.

Next, you will need to create a file called `index.tsx` in your `pages/todos` folder. This file is the page for displaying and adding to-dos. You can use the following content for your `index.tsx` file:

```tsx
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

// Define the interface for the to-do props
interface ITodoProps {
  id: string;
  title: string;
  completed: boolean;
}

// Define the component for the to-dos page
export default function TodosPage({ todos }: { todos: ITodoProps[] }) {
  // Use useState hook to manage local state
  const [todoTitle, setTodoTitle] = useState('');
  const [todoList, setTodoList] = useState(todos);

  // Define a function to handle the change of the title input
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  // Define a function to handle the submit of the form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Create a new to-do using axios
      const response = await axios.post('http://localhost:5000/', {
        title: todoTitle,
      });
      // Add the new to-do to the local state
      setTodoList([...todoList, response.data]);
      // Clear the title input
      setTodoTitle('');
    } catch (error) {
      // Log the error
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">To-Dos</h1>
      <form className="input-group my-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new to-do"
          value={todoTitle}
          onChange={handleTitleChange}
        />
        <button className="btn btn-success" type="submit">
          <FaPlus />
        </button>
      </form>
      <ul className="list-group">
        {todoList.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span className={todo.completed ? 'text-decoration-line-through' : ''}>
              {todo.title}
            </span>
            <Link href={`/todos/${todo.id}`}>
              <a className="btn btn-info">Details</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Define a function to get the server-side props for the page
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Get all to-dos using axios
    const response = await axios.get('http://localhost:5000/');
    // Return the props with the to-dos data
    return {
      props: {
        todos: response.data,
      },
    };
  } catch (error) {
    // Return an error status if something goes wrong
    return {
      notFound: true,
    };
  }
};
```

This code imports some modules from Next.js, React, React Icons, and Axios. It also defines an interface for the to-do props, which has an id, a title, and a completed property.

The code then defines a component for the to-dos page that takes an array of to-dos as props. The component uses some hooks and functions to manage its local state and handle various events. The component renders a form for adding a new to-do and a list of existing to-dos with links to their details.

The code also defines a function to get the server-side props for the page using Next.js. The function uses Axios to get all to-dos from the backend server and returns them as props. If there is an error, the function returns a notFound status.

Now, you have set up Next.js with TypeScript and app routing. You can move on to the next step, where you will create a component for displaying and adding to-dos using Axios.

## Creating a component for displaying and adding to-dos using Axios

In this step, you will create a component for displaying and adding to-dos using Axios. You will use this component in your `index.tsx` file in your `pages/todos` folder. You will also use some Bootstrap classes and React Icons to style your component.

First, you will need to create a file called `TodoList.tsx` in your `components` folder. This file will contain your component for displaying and adding to-dos. You can use the following content for your `TodoList.tsx` file:

```tsx
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import axios from 'axios';

// Define the interface for the to-do props
interface ITodoProps {
  id: string;
  title: string;
  completed: boolean;
}

// Define the interface for the to-do list props
interface ITodoListProps {
  todos: ITodoProps[];
  onAdd: (todo: ITodoProps) => void;
}

// Define the component for the to-do list
export default function TodoList({ todos, onAdd }: ITodoListProps) {
  // Use useState hook to manage local state
  const [todoTitle, setTodoTitle] = useState('');

  // Define a function to handle the change of the title input
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  // Define a function to handle the submit of the form
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      // Create a new to-do using axios
      const response = await axios.post('http://localhost:5000/', {
        title: todoTitle,
      });
      // Call the onAdd prop with the new to-do
      onAdd(response.data);
      // Clear the title input
      setTodoTitle('');
    } catch (error) {
      // Log the error
      console.error(error);
    }
  };

  return (
    <div className="container">
      <form className="input-group my-3" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Enter a new to-do"
          value={todoTitle}
          onChange={handleTitleChange}
        />
        <button className="btn btn-success" type="submit">
          <FaPlus />
        </button>
      </form>
      <ul className="list-group">
        {todos.map((todo) => (
          <li key={todo.id} className="list-group-item d-flex justify-content-between align-items-center">
            <span className={todo.completed ? 'text-decoration-line-through' : ''}>
              {todo.title}
            </span>
            <Link href={`/todos/${todo.id}`}>
              <a className="btn btn-info">Details</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
```

This code imports some modules from React, React Icons, and Axios. It also defines an interface for the to-do props and the to-do list props. The to-do list props have an array of to-dos and a function for adding a new to-do.

The code then defines a component for the to-do list that takes the to-do list props as props. The component uses some hooks and functions to manage its local state and handle various events. The component renders a form for adding a new to-do and a list of existing to-dos with links to their details.

Next, you will need to import and use your component in your `index.tsx` file in your `pages/todos` folder. You can use the following content for your `index.tsx` file:

```tsx
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { useState } from 'react';
import axios from 'axios';
import TodoList from '../components/TodoList';

// Define the interface for the to-do props
interface ITodoProps {
  id: string;
  title: string;
  completed: boolean;
}

// Define the component for the to-dos page
export default function TodosPage({ todos }: { todos: ITodoProps[] }) {
  // Use useState hook to manage local state
  const [todoList, setTodoList] = useState(todos);

  // Define a function to handle adding a new to-do
  const handleAddTodo = (todo: ITodoProps) => {
    // Add the new to-do to the local state
    setTodoList([...todoList, todo]);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">To-Dos</h1>
      <TodoList todos={todoList} onAdd={handleAddTodo} />
    </div>
  );
}

// Define a function to get the server-side props for the page
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Get all to-dos using axios
    const response = await axios.get('http://localhost:5000/');
    // Return the props with the to-dos data
    return {
      props: {
        todos: response.data,
      },
    };
  } catch (error) {
    // Return an error status if something goes wrong
    return {
      notFound: true,
    };
  }
};
```

This code imports some modules from Next.js, React, and Axios. It also imports your TodoList component from your `components` folder. It then defines a component for the to-dos page that takes an array of to-dos as props. The component uses some hooks and functions to manage its local state and handle adding a new to-do. The component renders your TodoList component with the to-dos and the handleAddTodo function as props.

The code also defines a function to get the server-side props for the page using Next.js. The function uses Axios to get all to-dos from the backend server and returns them as props. If there is an error, the function returns a notFound status.

Now, you have created a component for displaying and adding to-dos using Axios. You can move on to the next step, where you will create components for updating and deleting to-dos using Axios.

## Creating components for updating and deleting to-dos using Axios

In this step, you will create components for updating and deleting to-dos using Axios. You will use these components in your `[id].tsx` file in your `pages/todos` folder. You will also use some Bootstrap classes and React Icons to style your components.

First, you will need to create a file called `TodoDetails.tsx` in your `components` folder. This file will contain your component for displaying and updating a single to-do by id. You can use the following content for your `TodoDetails.tsx` file:

```tsx
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FaCheck, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

// Define the interface for the to-do props
interface ITodoProps {
  id: string;
  title: string;
  completed: boolean;
}

// Define the interface for the to-do details props
interface ITodoDetailsProps {
  todo: ITodoProps;
  onUpdate: (todo: ITodoProps) => void;
}

// Define the component for the to-do details
export default function TodoDetails({ todo, onUpdate }: ITodoDetailsProps) {
  // Use useRouter hook to access router object
  const router = useRouter();

  // Use useState hook to manage local state
  const [todoTitle, setTodoTitle] = useState(todo.title);
  const [todoCompleted, setTodoCompleted] = useState(todo.completed);
  const [editing, setEditing] = useState(false);

  // Define a function to handle the change of the title input
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };

  // Define a function to handle the click of the edit button
  const handleEditClick = () => {
    setEditing(true);
  };

  // Define a function to handle the click of the save button
  const handleSaveClick = async () => {
    try {
      // Update the to-do by id using axios
      const response = await axios.put(`http://localhost:5000/${todo.id}`, {
        title: todoTitle,
        completed: todoCompleted,
      });
      // Call the onUpdate prop with the updated data
      onUpdate(response.data);
      // Set the editing state to false
      setEditing(false);
    } catch (error) {
      // Log the error
      console.error(error);
    }
  };

  // Define a function to handle the click of the cancel button
  const handleCancelClick = () => {
    // Reset the local state with the original props
    setTodoTitle(todo.title);
    setTodoCompleted(todo.completed);
    // Set the editing state to false
    setEditing(false);
  };

  // Define a function to handle the click of the delete button
  const handleDeleteClick = async () => {
    try {
      // Delete the to-do by id using axios
      await axios.delete(`http://localhost:5000/${todo.id}`);
      // Redirect to the /todos page
      router.push('/todos');
    } catch (error) {
      // Log the error
      console.error(error);
    }
  };

  // Define a function to handle the click of the toggle button
  const handleToggleClick = async () => {
    try {
      // Update the to-do by id with the opposite completed value using axios
      const response = awaitaxios.put(`http://localhost:5000/${todo.id}`, {
        completed: !todoCompleted,
      });
      // Set the local state with the updated data
      setTodoCompleted(response.data.completed);
    } catch (error) {
      // Log the error
      console.error(error);
    }
  };

  return (
    <div className="card mx-auto my-5" style={{ width: '18rem' }}>
      <div className="card-body">
        {editing ? (
          <input
            type="text"
            className="form-control"
            value={todoTitle}
            onChange={handleTitleChange}
          />
        ) : (
          <h5 className="card-title">{todoTitle}</h5>
        )}
        <p className="card-text">
          {todoCompleted ? 'Completed' : 'Not Completed'}
        </p>
        {editing ? (
          <div className="d-flex justify-content-between">
            <button className="btn btn-success" onClick={handleSaveClick}>
              Save
            </button>
            <button className="btn btn-secondary" onClick={handleCancelClick}>
              Cancel
            </button>
          </div>
        ) : (
          <div className="d-flex justify-content-between">
            <button className="btn btn-primary" onClick={handleEditClick}>
              <FaEdit />
            </button>
            <button className="btn btn-danger" onClick={handleDeleteClick}>
              <FaTrash />
            </button>
            <button className="btn btn-warning" onClick={handleToggleClick}>
              <FaCheck />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
```

This code imports some modules from Next.js, React, React Icons, and Axios. It also defines an interface for the to-do props and the to-do details props. The to-do details props have a to-do object and a function for updating the to-do.

The code then defines a component for the to-do details that takes the to-do details props as props. The component uses some hooks and functions to manage its local state and handle various events. The component renders a card with the to-do details and some buttons for editing, deleting, and toggling the to-do.

Next, you will need to import and use your component in your `[id].tsx` file in your `pages/todos` folder. You can use the following content for your `[id].tsx` file:

```tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';
import TodoDetails from '../../components/TodoDetails';

// Define the interface for the to-do props
interface ITodoProps {
  id: string;
  title: string;
  completed: boolean;
}

// Define the component for the single to-do page
export default function TodoPage({ id, title, completed }: ITodoProps) {
  // Use useRouter hook to access router object
  const router = useRouter();

  // Use useState hook to manage local state
  const [todo, setTodo] = useState({ id, title, completed });

  // Define a function to handle updating the to-do
  const handleUpdateTodo = (updatedTodo: ITodoProps) => {
    // Set the local state with the updated data
    setTodo(updatedTodo);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-5">To-Do Details</h1>
      <TodoDetails todo={todo} onUpdate={handleUpdateTodo} />
    </div>
  );
}

// Define a function to get the server-side props for the page
export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Get the id from the query params
    const { id } = context.query;
    // Get the to-do by id using axios
    const response = await axios.get(`http://localhost:5000/${id}`);
    // Return the props with the to-do data
    return {
      props: response.data,
    };
  } catch (error) {
    // Return an error status if something goes wrong
    return {
      notFound: true,
    };
  }
};
```

This code imports some modules from Next.js, React, and Axios. It also imports your TodoDetails component from your `components` folder. It then defines a component for the single to-do page that takes the to-do props as props. The component uses some hooks and functions to manage its local state and handle updating the to-do. The component renders your TodoDetails component with the to-do and the handleUpdateTodo function as props.

The code also defines a function to get the server-side props for the page using Next.js. The function takes the context object as a parameter and gets the id from the query params. The function then uses Axios to get the to-do by id from the backend server and returns it as props. If there is an error, the function returns a notFound status.

Now, you have created components for updating and deleting to-dos using Axios. You have also completed your to-do app using Axios and Next.js. You can now run your frontend app and see it in action.

## Running the frontend app

To run your frontend app, you will need to open a new terminal and navigate to the `frontend` folder. Then, you will need to run the following command:

```bash
npm run dev
```

This will start your frontend app on port 3000 by default. You can then open your browser and go to http://localhost:3000/ to see your app.

You should see something like this:

![Frontend app screenshot](https://i.imgur.com/8yfQwXt.png)

You can now use your app to create, read, update, and delete to-dos. You can also click on the details button to see more details about a single to-do.

## Conclusion

In this tutorial, you learned how to use Axios with Next.js (TypeScript edition) to create a simple CRUD component for a very basic to-do app. You also learned how to use app routing and `@` alias in Next.js. You also learned how to use Express, MongoDB, Mongoose, Postman, Bootstrap, and React Icons for your backend server, database, API testing, styling, and icons.

You can find the source code for this tutorial on [GitHub](https://github.com/assistant-hashnode/axios-nextjs-todo-app).

I hope you enjoyed this tutorial and learned something new. If you have any questions or feedback, please let me know in the comments below. Thank you for reading! 😊