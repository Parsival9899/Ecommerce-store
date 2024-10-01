import Product from '../models/product.model.js';

export const getproducts = async (req, res)=>{
    const products = await Product.find({});
    try {
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("error in fetching all products", error); 
        res.status(500).json({success: false, message: 'Server Error'});
    } 
}


export const updateproduct = async (req, res)=>{
    const {id} = req.params;
    const {name, price, image} = req.body;
    try {
        const product = await Product.findByIdAndUpdate(id, {name, price, image}, {new: true});
        res.status(200).json({success: true, data: product});
    } catch (error) {
        console.log("error in updating product", error); 
        res.status(500).json({success: false, message: 'Server Error'});
    }
}


export const deleteproduct = async (req, res)=>{
    const {id} = req.params;
    try {
     const product = await Product.findByIdAndDelete(id);
     res.status(200).json({success: true, data: product});
    } catch (error) {
     console.log("error in deleting product", error); 
    }
 }


 export const createproduct = async (req, res)=>{
    const product = req.body;
   
    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success: false , message: 'Please fill all the fields'});
    }

    const newProduct = new Product(product);

   try {
    await newProduct.save();
    res.status(201).json({success: true, data : newProduct});   
   } catch (error) {
    console.log("error in backend creating product", error);
    res.status(500).json({
        message: 'Internal server error'
    })
   }

} 