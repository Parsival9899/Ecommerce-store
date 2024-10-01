import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Flex, useColorMode } from '@chakra-ui/react'
import { Text, HStack, Button} from '@chakra-ui/react'
import { BsPlusSquare } from "react-icons/bs";
import { IoSunnyOutline} from "react-icons/io5";
import { AiOutlineMoon } from "react-icons/ai";


const Navbar = () => {
    const {colorMode, toggleColorMode} = useColorMode(true)

  return (
    <Container maxW={'1200px'} px={4} py={2} >
        <Flex 
            alignItems={'center'}
            justifyContent={'space-between'}
            fontSize={'2xl'}
            fontWeight={'bold'}
            color={'gray.800'}
            cursor={'pointer'}
        >
            <Text
            fontSize={{base:'22', sm:'28'}} 
            fontWeight ='bold'
            textTransform={'uppercase'}
            textAlign={'center'}
             bgGradient='linear(to-l, cyan.400, blue.500)'
             bgClip='text'
            >
                <Link to="/">Product store 🛒</Link>
            </Text>
            
            <HStack
                spacing={4}
                fontSize={'xl'}
            >

                <Link to="/create" >
                    <Button> <BsPlusSquare fontSize={20} /></Button>
                </Link>
                <Button  onClick={toggleColorMode}  >
                {colorMode === 'light' ? <IoSunnyOutline /> : <AiOutlineMoon />}
                </Button>

            </HStack>
        

        </Flex>
       

  </Container>
  )
}

export default Navbar
