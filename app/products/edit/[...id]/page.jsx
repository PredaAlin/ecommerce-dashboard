"use client"

import ProductForm from '@/components/ProductForm'
import axios from 'axios'
import { useSearchParams, usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function EditProductPage({params}) {
  const [productInfo, setProductInfo] = useState(null)
  const {id} = params

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products?id=${id}`);
        setProductInfo(response.data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);
  return (
    <div>
      <h1>Edit Product</h1>
      {productInfo &&(<ProductForm {...productInfo}/> ) }
        
    </div>
 
  )
}

