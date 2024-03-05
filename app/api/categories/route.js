import { connectToDB } from "@/lib/mongoose";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";



export async function POST(req, res) {
  const { method } = req;
 
  // const session = await getServerSession(req, res, authOptions)
  // console.log(session)

  try {
    await connectToDB();
    if (method === "POST") {
     
        const { name, parentCategory, properties } = await req.json();
      
        
        const categoryDoc = await Category.create({ name, parent: parentCategory || undefined , properties});
      
       
        // Send a successful response
        return new Response(categoryDoc)
      } else {
        // Send a 405 Method Not Allowed response for other HTTP methods
        return new Response("Method Not Allowed", { status: 405 });
      }
  } catch (error) {
    return new Response("Error adding category", {status:500})
  }
}

export async function PUT(req) {
  const { method } = req;

  try {
    await connectToDB();
    if (method === "PUT") {
     
        const { name, parentCategory,properties, _id } = await req.json();
      
        
        const categoryDoc = await Category.updateOne({_id},{ name, parent: parentCategory || undefined, properties});
      
       
        // Send a successful response
        return new Response(categoryDoc)
      } else {
        // Send a 405 Method Not Allowed response for other HTTP methods
        return new Response("Method Not Allowed", { status: 405 });
      }
  } catch (error) {
    return new Response("Error editing category", {status:500})
  }
}

export async function GET(req) {
    const { method } = req;
    const searchParams = req.nextUrl.searchParams
    const categoryId = searchParams.get('id')
    console.log(categoryId)
  
    try {
      await connectToDB();
      if (method === "GET") {
        if(categoryId){
            console.log("query found")
           return NextResponse.json(await Product.findOne({_id:categoryId}))
          }else{
             const categories = await Category.find().populate('parent')
      
        return NextResponse.json(categories)
          }
       
       
        
         
        
        } else {
          // Send a 405 Method Not Allowed response for other HTTP methods
          return new Response("Method Not Allowed", { status: 405 });
        }
    } catch (error) {
      return new Response("Error adding product", {status:500})
    }
  }

  export async function DELETE ( req) {
    const {method} = req
    console.log(method)
    const searchParams = req.nextUrl.searchParams
    const categoryId = searchParams.get('_id')
  
     try {
       await connectToDB();
   
       if (method === "DELETE"){
  
        if(categoryId){
           await Category.deleteOne({_id: categoryId})
         return new Response("Category deleted", {status: 200})
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
  
  
  
