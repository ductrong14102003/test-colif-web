import React, { useEffect, useState } from "react";
import "./OrderList.css";
import apiClient from "../../api/apiClient";
import { formatPrice } from "../../utils";
import dayjs from "dayjs";

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await apiClient.get("/orders");
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="order">
      <h1>Order List</h1>
      <div className="order-format-main">
        <p>Customer</p>
        <p>Address</p>
        <p>Status</p>
        <p>Total Price</p>
        <p>Order At</p>
      </div>
      <div className="order-allproducts">
        <hr />

        {orders.map((it, index) => (
          <div key={index}>
            <div className="order-format-main order-format">
              <div>
                <p>{it.customerName}</p>
                <p>{it.customerPhone}</p>
                <p>{it.customerEmail}</p>
              </div>

              <p className="cartitems-product-title">{it.address}</p>
              <p>{it.status}</p>
              <p>{formatPrice(it.totalPrice)}đ</p>
              <p>{dayjs(it.createdAt).format("DD/MM/YYYY HH:mm:ss")}</p>
            </div>
            <hr />
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderList;
