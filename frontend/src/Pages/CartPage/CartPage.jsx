import React, { useContext } from "react";
import "./CartItems.css";
import cross_icon from "../../Components/Assets/cart_cross_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url } from "../../App";
import { formatPrice } from "../../utils";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { products } = useContext(ShopContext);
  const { cartItems, removeFromCart, getTotalCartAmount } =
    useContext(ShopContext);

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Sản phẩm</p>
        <p>Tên</p>
        <p>Giá</p>
        <p>Số lượng</p>
        <p>Tổng</p>
        <p>Xóa</p>
      </div>
      <hr />
      {products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={`product-item-${e.id}`}>
              <div className="cartitems-format-main cartitems-format">
                <img
                  className="cartitems-product-icon"
                  src={backend_url + e.image}
                  alt=""
                />
                <p>{e.name}</p>
                <p>{formatPrice(e.new_price)} đ</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>{formatPrice(e.new_price * cartItems[e.id])} đ</p>
                <img
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  className="cartitems-remove-icon"
                  src={cross_icon}
                  alt=""
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>TỔNG SỐ GIỎ HÀNG</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>{formatPrice(getTotalCartAmount())} đ</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>{formatPrice(getTotalCartAmount())} đ</h3>
            </div>
          </div>

          <Link to="/checkout">
            <button>PROCEED TO CHECKOUT</button>
          </Link>
        </div>
        <div className="cartitems-promocode">
          <p>If you have a promo code, Enter it here</p>
          <div className="cartitems-promobox">
            <input type="text" placeholder="promo code" />
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
