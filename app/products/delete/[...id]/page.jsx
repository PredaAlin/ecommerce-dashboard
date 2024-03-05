"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DeleteProductPage = ({ params }) => {
  const router = useRouter();
  const [productInfo, setProductInfo] = useState(null)
  const { id } = params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/products?id=${id}`);
        setProductInfo(response.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);
  function goBack() {
    router.back();
  }

  async function deleteProduct() {
    axios.delete('/api/products?id='+id)
    goBack();
  }
  return (
    <div>
      <h1 className="text-center">Do you really want to delete product "{productInfo?.title}"?</h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteProduct}className="btn-red">Yes</button>
      <button className="btn-default" onClick={goBack}>No</button>
      </div>
      
    </div>
  );
};

export default DeleteProductPage;
