"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("api/orders").then((response) => {
      console.log(response.data);
      setOrders(response.data);
    });
  }, []);
  return (
    <div>
      <h1>Orders</h1>
      <table className="basic mt-4">
        <thead>
          <tr>
            <th>DATE</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>

        <tbody>
          {orders?.length > 0 && (
            orders.map((order)=>(
              <tr>
            <td>{(new Date(order?.createdAt)).toLocaleString()}
            
            </td>
            <td className={order.paid ? 'text-green-600': 'text-red-600'}> 
              {order.paid ? 'YES': 'NO'}
            </td>
            <td>{order?.name} {order.email}<br/>
            {order.city} {order.postalCode}
            {order.country} <br />
            {order.streetAddress}</td>
            <td>{order?.line_items.map(item=>(
              <>{item.price_data.product_data.name} x {item.quantity}<br/></>
            ))}</td>
          </tr>
            ))
          )}
          
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
