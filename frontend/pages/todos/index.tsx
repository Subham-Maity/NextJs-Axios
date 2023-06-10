import { GetServerSideProps } from "next";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";


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

    </div>
  );
}

// Define a function to get the server-side props for the page
export const getServerSideProps: GetServerSideProps = async () => {
  try {
    // Get all to-dos using axios
    const response = await axios.get("http://localhost:5000/");
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
