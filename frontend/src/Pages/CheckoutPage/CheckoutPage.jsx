import React, { useContext } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url } from "../../App";
import { formatPrice } from "../../utils";
import styles from "./index.module.css";
import classnames from "classnames";
import { useForm } from "react-hook-form";
import apiClient from "../../api/apiClient";
import classNames from "classnames";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { products } = useContext(ShopContext);
  const { cartItems, getTotalCartAmount, removeAllCart } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (values) => {
    try {
      await apiClient.post("/orders", {
        ...values,
        totalPrice: getTotalCartAmount(),
      });

      removeAllCart();
      toast.success("Đặt hàng thành công");
      navigate("/");
    } catch (error) {
      toast.error("Có lỗi xảy ra, vui lòng thử lại");
    }
  };

  return (
    <div className="cartitems">
      <div className={classnames("cartitems-format-main", styles.tableHeader)}>
        <p>Sản phẩm</p>
        <p>Tên</p>
        <p>Giá</p>
        <p>Số lượng</p>
        <p>Tổng</p>
      </div>
      <hr />
      {products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={`product-item-${e.id}`}>
              <div
                className={classNames(
                  "cartitems-format-main cartitems-format",
                  styles.tableHeader
                )}
              >
                <img
                  className="cartitems-product-icon"
                  src={backend_url + e.image}
                  alt=""
                />
                <p>{e.name}</p>
                <p>{formatPrice(e.new_price)} đ</p>
                <p>{cartItems[e.id]}</p>
                <p>{formatPrice(e.new_price * cartItems[e.id])} đ</p>
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}

      <div className="cartitems-down">
        <div className={classnames("cartitems-total", styles.cartItemTotal)}>
          <h1>TỔNG SỐ GIỎ HÀNG: {formatPrice(getTotalCartAmount())} đ</h1>

          <h2 className={styles.title}>Thông tin nhận hàng</h2>

          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.formGroup}>
              <label htmlFor="customerName" className={styles.formLabel}>
                Họ và tên
              </label>
              <input
                id="customerName"
                type="text"
                placeholder="Họ và tên"
                className={styles.inputField}
                {...register("customerName", {
                  required: "Vui lòng nhập họ tên",
                })}
              />

              {errors.customerName && (
                <p className={styles.errorMsg}>{errors.customerName.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="customerPhone" className={styles.formLabel}>
                Số điện thoại
              </label>
              <input
                id="customerPhone"
                {...register("customerPhone", {
                  required: "Vui lòng nhập số điện thoại",
                  pattern: {
                    value: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                    message: "Số điện thoại không đúng định dạng",
                  },
                })}
                type="text"
                placeholder="Số điện thoại"
                className={styles.inputField}
              />

              {errors.customerPhone && (
                <p className={styles.errorMsg}>
                  {errors.customerPhone.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="customerEmail" className={styles.formLabel}>
                Email
              </label>
              <input
                id="customerEmail"
                {...register("customerEmail", {
                  required: "Vui lòng nhập email",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Email không đúng định dạng",
                  },
                })}
                type="text"
                placeholder="Email"
                className={styles.inputField}
              />

              {errors.customerEmail && (
                <p className={styles.errorMsg}>
                  {errors.customerEmail.message}
                </p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="address" className={styles.formLabel}>
                Địa chỉ
              </label>
              <input
                id="address"
                type="text"
                {...register("address", {
                  required: "Vui lòng nhập địa chỉ nhận hàng",
                })}
                placeholder="Địa chỉ"
                className={styles.inputField}
              />

              {errors.address && (
                <p className={styles.errorMsg}>{errors.address.message}</p>
              )}
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.formLabel}>
                Ghi chú
              </label>
              <textarea
                id="message"
                {...register("message")}
                type="text"
                placeholder="Ghi chú"
                className={styles.inputField}
              />
            </div>

            <button>PAYMENT</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
