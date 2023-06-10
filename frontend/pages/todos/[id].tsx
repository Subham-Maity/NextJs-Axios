import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
// import TodoDetails from "../../components/TodoDetails";

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
      {/* <TodoDetails todo={todo} onUpdate={handleUpdateTodo} /> */}
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
