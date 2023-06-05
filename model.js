const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
    _id:{
     type: String,
     required:true   
    },
    firstName:{
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    profileImg:{
        type: String,
        required:true
    },
    location:{
        type: String,
        required:true
    },
    instruments:{
        type: Array,
        required:true
    },
    friends:{
        type: Array,
        required:true
    },
    comments:{
        type: Array,
        required:true
    },
    bio:{
        type: String,
        required:true
    },
})
const Product = mongoose.model("Product",productSchema)
module.exports = Product;
