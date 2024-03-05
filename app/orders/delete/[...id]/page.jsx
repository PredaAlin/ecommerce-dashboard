"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const DeleteCategoryPage = ({ params }) => {
  const router = useRouter();
  const [categoryInfo, setCategoryInfo] = useState(null)
  const { id } = params;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/categories?id=${id}`);
        setCategoryInfo(response.data);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);
  function goBack() {
    router.back();
  }

  async function deleteCategory() {
    axios.delete('/api/categories?id='+id)
    goBack();
  }
  return (
    <div>
      <h1 className="text-center">Do you really want to delete category "{categoryInfo?.name}"?</h1>
      <div className="flex gap-2 justify-center">
        <button onClick={deleteCategory}className="btn-red">Yes</button>
      <button className="btn-default" onClick={goBack}>No</button>
      </div>
      
    </div>
  );
};

export default DeleteCategoryPage;
