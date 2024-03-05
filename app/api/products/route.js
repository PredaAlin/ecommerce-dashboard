

import clientPromise from "@/lib/mongodb";
import { connectToDB } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";


export async function POST (req) {
  const { method } = req;
  console.log(method);
  try {
    await connectToDB();


    if (method === "POST") {
     
      const { title, description, price, images, category, properties } = await req.json();
    
      
      const productDoc = await Product.create({ title, description, price, images, category, properties});
    
     
      // Send a successful response
      return new Response(productDoc)
    } else {
      // Send a 405 Method Not Allowed response for other HTTP methods
      return new Response("Method Not Allowed", { status: 405 });
    }
  } catch (error) {
    // Send an error response with a 500 status code
    return new Response("Failed to create a new product", { status: 500 });
  }
};

export async function GET ( req) {
 
  const { method } = req;
  console.log(method);
  
  const searchParams = req.nextUrl.searchParams
  const productId = searchParams.get('id')
  //console.log(productId)

  try {
    await connectToDB();

    if (method === "GET"){
      //console.log(searchParams)
      if(productId){
        console.log("query found")
       return NextResponse.json(await Product.findOne({_id:productId}))
      }else{
         const products = await Product.find()
      
      return NextResponse.json(products)
    }
      }
      

 else {
      // Send a 405 Method Not Allowed response for other HTTP methods
      return new Response("Method Not Allowed", { status: 405 });
    }
  } catch (error) {
    // Send an error response with a 500 status code
    return new Response("Failed to create a new product", { status: 500 });
  }
};

export async function PUT ( req) {
 const {method} = req
 console.log(method)
  try {
    await connectToDB();

    if (method === "PUT"){
       const { title, description, price,images,category,properties,   _id } = await req.json();
      await Product.updateOne({_id}, {title, description, price, images, category, properties})
      return new Response("Product updated", {status: 200})
      }
      

 else {
      // Send a 405 Method Not Allowed response for other HTTP methods
      return new Response("Method Not Allowed", { status: 405 });
    }
  } catch (error) {
    // Send an error response with a 500 status code
    return new Response("Failed to create a new product", { status: 500 });
  }
};

export async function DELETE ( req) {
  const {method} = req
  console.log(method)
  const searchParams = req.nextUrl.searchParams
  const productId = searchParams.get('id')

   try {
     await connectToDB();
 
     if (method === "DELETE"){

      if(productId){
         await Product.deleteOne({_id: productId})
       return new Response("Product deleted", {status: 200})
      }
       
      
       }
       
 
  else {
       // Send a 405 Method Not Allowed response for other HTTP methods
       return new Response("Method Not Allowed", { status: 405 });
     }
   } catch (error) {
     // Send an error response with a 500 status code
     return new Response("Failed to create a new product", { status: 500 });
   }
 };

