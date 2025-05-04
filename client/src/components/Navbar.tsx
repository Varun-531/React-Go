import { Button, Flex, Heading } from "@chakra-ui/react";
import { Moon, Sun } from "lucide-react";
import { useColorMode } from "./ui/color-mode";
import { useColorModeValue } from "./ui/color-mode";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      borderRadius="sm"
      w={{ base: "100%", md: "50%" }}
      overflow="hidden"
      bg={useColorModeValue("gray.200", "gray.700")}
      px={{ base: 2, sm: 4 }}
      py={{ base: 1, sm: 2 }}
    >
      <Heading fontSize={"xl"}>Daily Tasks</Heading>

      <div>
        <Button variant="outline" border={0} onClick={toggleColorMode}>
          {colorMode === "dark" ? <Sun /> : <Moon />}
        </Button>
      </div>
    </Flex>
  );
};

export default Navbar;
