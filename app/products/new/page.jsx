"use client";

import { useState } from "react";
import axios from "axios";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import ProductForm from "@/components/ProductForm";

export default function NewProduct() {
 return <div>
  <h1>New Product</h1>
  <ProductForm/>
  </div>
}
