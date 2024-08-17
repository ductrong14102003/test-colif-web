import React from "react";
import { Link } from "react-router-dom";
import { backend_url } from "../../App";
import styles from "./index.module.css";
import { formatPrice } from "../../utils";
import { FaStar } from "react-icons/fa";

const ProductItem = (props) => {
  return (
    <div className={styles.wrapper}>
      <Link to={`/product/${props.id}`}>
        <div className={styles.imageWrap}>
          <img
            onClick={window.scrollTo(0, 0)}
            src={backend_url + props.image}
            alt="products"
            className={styles.image}
          />

          <p className={styles.tag}>37%</p>
        </div>
      </Link>

      <div className={styles.productInfo}>
        <Link to={`/products/${props.id}`} className={styles.productName}>
          {props.name}
        </Link>

        <div className={styles.freeShip}>
          <img
            src="/svg/delivery-blue.svg"
            alt="Free ship icon"
            className={styles.freeShipIcon}
          />

          <p className={styles.freeShipTxt}>Freeship</p>
        </div>

        <p className={styles.price}>{formatPrice(props.new_price)} đ</p>

        <div className={styles.ratingWrap}>
          <div className={styles.ratingInner}>
            <FaStar className={styles.ratingIcon} />
            <p className={styles.rating}>(4.5)</p>
          </div>

          <p className={styles.sold}>Đã bán: 25</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
