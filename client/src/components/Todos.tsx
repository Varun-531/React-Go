import { Box, Button, Text } from "@chakra-ui/react";
import { Toaster, toaster } from "@/components/ui/toaster";
import AddTodo from "./AddTodo";
import axios from "axios";
import { useEffect, useState } from "react";
import { useColorMode } from "./ui/color-mode";
import { Tooltip } from "@/components/ui/tooltip";
import { Check, Trash2 } from "lucide-react";
import { BASE_URL } from "@/App";

const Todos = () => {
  const { colorMode } = useColorMode();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  interface Todo {
    _id: string;
    body: string;
    completed: boolean;
  }

  const fetchTodos = async (internal: boolean = false) => {
    try {
      const response = await axios.get<Todo[]>(`${BASE_URL}/todos`);

      if (response.status !== 200 && !internal) {
        toaster.create({
          title: "Error",
          description: "Failed to fetch todos",
        });
        return;
      }

      setTodos(response.data);
      if (!internal) {
        toaster.create({
          title: "Todos fetched",
          description: "Todos fetched successfully",
        });
      }
    } catch (error) {
      console.error(error);
      toaster.create({
        title: "Error",
        description: "Something went wrong while fetching todos",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/todos/${id}`);
      if (response.status !== 200) {
        toaster.create({
          title: "Error",
          description: "Failed to delete todo",
        });
        return;
      }

      setTodos(todos.filter((todo) => todo._id !== id));
      toaster.create({
        title: "Deleted",
        description: "Todo deleted successfully",
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleComplete = async (id: string) => {
    try {
      const response = await axios.patch(`${BASE_URL}/todos/${id}`);
      if (response.status !== 200) {
        toaster.create({
          title: "Error",
          description: "Failed to complete todo",
        });
      } else {
        toaster.create({
          title: "Marked as completed",
          description: "Todo completed successfully",
        });
      }
    } catch (error) {
      console.error(error);
    }
    await fetchTodos(true);
  };

  useEffect(() => {
    fetchTodos(true);
  }, []);

  return (
    <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
      <div>
        <AddTodo onTodoAdded={fetchTodos} />
      </div>
      <Toaster />
      <div>
        {!loading && Array.isArray(todos) && todos.length > 0
          ? todos.map((todo) => (
              <Box
                key={todo._id}
                bg={colorMode === "light" ? "gray.100" : "gray.700"}
                m={2}
                p={2}
                borderRadius={5}
                width={"400px"}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Tooltip content={todo.body}>
                  <Text
                    fontWeight={"semibold"}
                    truncate
                    textDecoration={todo.completed ? "line-through" : "none"}
                  >
                    {todo.body}
                  </Text>
                </Tooltip>
                <Box display={"flex"} gap={2}>
                  {!todo.completed && (
                    <Button
                      size={"xs"}
                      onClick={() => handleComplete(todo._id)}
                    >
                      <Check />
                    </Button>
                  )}
                  <Button size={"xs"} onClick={() => handleDelete(todo._id)}>
                    <Trash2 />
                  </Button>
                </Box>
              </Box>
            ))
          : !loading && <Text m={4}>No todos found.</Text>}
      </div>
    </Box>
  );
};

export default Todos;
