import { Container, Box } from "@chakra-ui/react";
import React from "react";
import { VStack, Heading, Input, Button} from "@chakra-ui/react";
import { useState } from "react";
import {useProductStore} from '../store/product.js'
import { useToast } from '@chakra-ui/react'

const CreatePage = () => {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const {createProduct} = useProductStore(); 

  const toast = useToast();

  const handleAddProduct = async () => {
    const {success , message} = await createProduct(product); 
    if(success){
      toast({
        title: 'Product Added',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
    else{
      toast({
        title: 'Product Not Added',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
    setProduct({
      name: "",
      price: "",
      image: "",
    })
  };

  return (
    <Container maxW={"1200px"} px={4} py={4} justifyContent={"center"}>
      <VStack spacing={8}>
        <Heading as={"p"}>Add Product to Store</Heading>
      </VStack>

      <Box maxW="container.sm" ml='21%' py={8} px={4} borderRadius="lg" boxShadow="lg">

        <VStack spacing={4}>
          <Input
            type="text"
            name="name"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />

          <Input
            type="number"
            name="price"
            placeholder="Product Price"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
          />

          <Input
            type="text"
            name="image"
            placeholder="Product Image"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
          
          <Button colorScheme={'blue'} onClick={handleAddProduct} w={"full"}> Add Product </Button>

        </VStack>
      </Box>
    </Container>
  );
};

export default CreatePage;
