import React, { useContext, useState } from "react";
import { GlobalContext } from "../../context/GlobalState";

function Orders() {
  const { orders } = useContext(GlobalContext);
  return (
    <div className="cart-list">
      {orders.map((order) => (
        <div className="checkout-container" key={order.orderId}>
          <h3>#ID-62Z-{order.orderId}</h3>
          {order.items.map((item) => (
            <div className="cart-item" key={item.id}>
              <div className="item-price">${item.price}</div>
              <div className="item-name">{item.name}</div>
              <div className="item-expectedDelivery">
                (Expected cash on delivery 3 - 6 days)
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Orders;
