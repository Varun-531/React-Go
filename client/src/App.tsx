import { Stack } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import Todos from "@/components/Todos";

export const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:5000/api" : "/api";

function App() {
  return (
    <>
      <Stack h="100vh" p={{ base: 4, md: 10 }} alignItems="center">
        <Navbar />
        <Todos />
      </Stack>
    </>
  );
}

export default App;
