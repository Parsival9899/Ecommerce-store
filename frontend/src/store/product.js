import { create } from "zustand";

export const useProductStore = create((set,get) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    // Validate input
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all the fields" };
    }

      // Make API request to create a new product
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newProduct)
      });

      const data = await response.json()
      // Update the products array in the state
      set((state)=>({ products: [...state.products, data.data] }))
      // Return success message
      return { success: true, message: "Product created successfully!" }
     
  }, 
  fetchProducts : async () => {
    const res = await fetch('/api/product');
    const data = await res.json()
    set(({ products: data.data }))
  },
  deleteProduct: async (pid) => {
    // Make API request to delete the product
    const response = await fetch(`/api/product/${pid}`, {
      method: 'DELETE',
    });
    const data = await response.json(); 
    // Update the products array in the state
    if(!data.success) return {success:false, message:data.message}; 
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return {success:true, message : data.message}; 
  },
  updateProduct : async(pid,updatedProduct) =>{
    const response = await fetch(`/api/product/${pid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedProduct)
    });
    const data = await response.json();
    // Update the products array in the state
    if(!data.success) return {success:false, message:data.message};
    
    // Update the products without needing to refresh the page
    set((state) => ({ 
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return {success:true, message : data.message};

  }
}));
