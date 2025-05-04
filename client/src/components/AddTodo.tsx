import { Box, Button, Flex, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BASE_URL } from "@/App";
import { Toaster, toaster } from "@/components/ui/toaster";
const AddTodo = ({
  onTodoAdded,
}: {
  onTodoAdded: (internal?: boolean) => void;
}) => {
  const [newTodo, setNewTodo] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(newTodo);
    try {
      const response = await axios.post(`${BASE_URL}/todos`, {
        body: newTodo,
      });

      if (response.status !== 200) {
        toaster.create({
          title: "Error",
          description: "Failed to add todo",
        });
      } else {
        toaster.create({
          title: "Added",
          description: "Todo added successfully",
        });
      }

      onTodoAdded(true);
      setNewTodo("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <Box w="390px">
        <Flex gap={2}>
          <Input
            placeholder="Add a todo"
            name="newtodo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <Button type="submit">Add</Button>
          <Toaster />
        </Flex>
      </Box>
    </form>
  );
};

export default AddTodo;
