import {React, useState} from "react";
import { useDisclosure,VStack,Input ,Button} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import {
  Box,
  Image,
  Text,
  IconButton,
  useColorModeValue,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { DeleteIcon } from "@chakra-ui/icons";
import { useProductStore } from "../store/product";
import { useToast } from "@chakra-ui/react";

const ProductCard = ({ product }) => {

    const [updatedProduct, setupdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.800", "gray.200");
  const bg = useColorModeValue("white", "gray.900");
  const { deleteProduct} = useProductStore();
  const {updateProduct} = useProductStore(); 
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

    const handleUpdateProduct = async (pid, updatedProduct) => {
        const {success, message} = await updateProduct(product._id, updatedProduct);
       onClose();
       if(success){
        toast({
            title: "Success",
            description: "Product updated successfully!",
            status: "success",
            duration: 2000,
            isClosable: true,
          })
       }else{
        toast({
            title: "Error",
            description: message,
            status: "error",
            duration: 2000,
            isClosable: true,
          })
       }
      
    };


  const deleteHandleProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Success",
        description: "Product deleted successfully!",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };



  return (
    <Box
      shadow={"xl"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.2s"}
      bg={bg}
      _hover={{
        transform: "translateY(-5px)",
        shadow: "lg",
      }}
    >
      <Image
        src={product.image}
        alt={product.name}
        w={"full"}
        h={48}
        objectFit={"cover"}
      />

      <Box p={4}>
        <Heading as="h3" size={"md"} mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton
            icon={<EditIcon />}
            onClick={onOpen}
            bg={"blue.500"}
            textColor={"Black"}
          ></IconButton>
          <IconButton
            icon={<DeleteIcon />}
            bg={"red.600"}
            textColor={"Black"}
            onClick={() => deleteHandleProduct(product._id)}
          ></IconButton>
        </HStack>
      </Box>
      {/* modal */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input type="text" name="name" placeholder="Product Name" value={updatedProduct.name} 
              onChange={(e) => setupdatedProduct({...updatedProduct, name: e.target.value})} />

              <Input type="number" name="price" placeholder="Product Price" value={updatedProduct.price}  
              onChange={(e) => setupdatedProduct({...updatedProduct, price: e.target.value})} />

              <Input type="text" name="image" placeholder="Product Image" value={updatedProduct.image}  
              onChange={(e) => setupdatedProduct({...updatedProduct, image: e.target.value})} />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} 
            onClick={()=>handleUpdateProduct(product._id, updatedProduct)}>
              Update
            </Button>
            <Button variant='ghost' onClick={onClose}>Cancel</Button>
          </ModalFooter>

        </ModalContent>
      </Modal>

      {/* modal */}
    </Box>
  );
};

export default ProductCard;
