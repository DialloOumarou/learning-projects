import { Container, Flex,Text, HStack,Button,useColorMode} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { PlusSquareIcon } from '@chakra-ui/icons';
import { IoMoon } from "react-icons/io5";
import { FaSun } from "react-icons/fa"; // Use a valid icon from the 'fa' set
import { useProductStore } from "../store/product";

const Navbar = () => {

  const {colorMode,toggleColorMode} = useColorMode();
  const {products} = useProductStore();

  return (
    <div>
      <Container maxW={"1114px"} px={4} >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"} 
              flexDir={{
                base:"column",
                sm:"row"
              }}
        >

	      <Text
					fontSize={{ base: "22", sm: "28" }}
					fontWeight={"bold"}
					textTransform={"uppercase"}
					textAlign={"center"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
				>
					<Link to={"/"}>Product Store 🛒</Link>

				</Text>

        <HStack spacing={2} alignItems={"center"}>
              <Link to={"/create"}> 
                <Button>
                  <PlusSquareIcon fontSize={20}/>
                </Button>
              </Link>
              <Button onClick={toggleColorMode}>{colorMode === "light" ? <IoMoon /> : <FaSun size='20' />}</Button>
        </HStack>

           
        </Flex>
      </Container>
    </div>
  )
}

export default Navbar
