To create the server folder and install the packages, you can use the following commands in the terminal:

```bash
# Create a folder called backend
mkdir backend

# Navigate to the backend folder
cd backend

# Initialize a Node.js project with default settings
npm init -y

# Install Express, MongoDB, Mongoose, and Dotenv as dependencies
npm install express mongodb mongoose dotenv --save

# Install TypeScript, Nodemon, and ts-node as dev dependencies
npm install typescript nodemon ts-node --save-dev

# Create a src folder for the TypeScript code
mkdir src

# Create a models folder for the schema and service
mkdir src/models

# Create a routes folder for the API routes
mkdir src/routes

# Create an index.ts file for the server code
touch src/index.ts

# Create a todo.ts file for the schema and service
touch src/models/todo.ts

# Create a todo.ts file for the API routes
touch src/routes/todo.ts

# Create a tsconfig.json file for the TypeScript configuration
npx tsc --init

# Edit the tsconfig.json file to change some options
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

# Edit the package.json file to add some scripts
{
  "scripts": {
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts",
    "build": "tsc -p ."
  }
}

# Create a .env file for the environment variables
touch .env

# Edit the .env file to add the MongoDB connection string
MONGODB_URI=mongodb://localhost:27017/todo-app
```

To create the frontend folder and install the packages, you can use the following commands in the terminal:

```bash
# Navigate to the parent folder of the backend folder
cd ..

# Create a Next.js app with TypeScript
npx create-next-app --typescript frontend

# Navigate to the frontend folder
cd frontend

# Install Axios, Bootstrap, and React Icons as dependencies
npm install axios bootstrap react-icons --save

# Install type definitions for Axios and React Icons as dev dependencies
npm install @types/axios @types/react-icons --save-dev

# Create a components folder for the React components
mkdir components

# Create a TodoList.tsx file for the component for displaying and adding to-dos
touch components/TodoList.tsx

# Create a TodoDetails.tsx file for the component for displaying and updating a single to-do by id
touch components/TodoDetails.tsx

# Edit the _app.tsx file in the pages folder to import Bootstrap CSS
import type { AppProps } from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

# Edit the index.tsx file in the pages folder to add some content for the default page
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

# Create a todos folder in the pages folder for the to-dos pages
mkdir pages/todos

# Create an index.tsx file in the todos folder for the page for displaying and adding to-dos
touch pages/todos/index.tsx

# Edit the index.tsx file in the todos folder to add some content for the page for displaying and adding to-dos
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

# Create an [id].tsx file in the todos folder for the page for displaying and updating a single to-do by id
touch pages/todos/[id].tsx

# Edit the [id].tsx file in the todos folder to add some content for the page for displaying and updating a single to-do by id
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