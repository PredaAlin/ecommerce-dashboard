import { connectToDB } from "@/lib/mongoose"
import { Order } from "@/models/Order"
import { NextResponse } from "next/server"

export async function GET(req, res){
    const {method} = req
    console.log(method)
    if(method === "GET"){
        try {
            connectToDB()
            const ordersDoc = await Order.find().sort({createdAt:-1})
            return NextResponse.json(ordersDoc)

            
        } catch (error) {
            return Response(`error occured: ${error}`,{status:500} )
            
        }
    }


}