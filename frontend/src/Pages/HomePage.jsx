import { Container, Text, VStack, Link} from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx"

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  console.log("products" ,products)


  return (
    <Container maxW={"1200px"} py={12} >

      <VStack spacing={8}>
        <Text
          bgGradient="linear(to-l, cyan.400, blue.500)"
          bgClip="text"
          fontSize={"xx-large"}
          fontWeight={"bold"}
        >
          Current Products!
        </Text>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacing={4}
          w={'full'}
        >
          {
            products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          }
        </SimpleGrid>
        
//if products length is 0 then show this text
        {products.length === 0 && (
          <Text fontSize={"xl"}>
          No Product Found 😥
          <Link href={"/create"} color='blue.500' > Create Product</Link>
        </Text>
        )}

      </VStack>
    </Container>
  )
};
export default HomePage;
