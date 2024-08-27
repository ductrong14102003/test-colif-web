import React, { useContext, useState } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url } from "../../App";
import { formatPrice } from "../../utils";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

const ProductDisplay = ({ product }) => {
  const navigate = useNavigate();

  const [variantSelected, setVariantSelected] = useState(product.variants[0]);

  const { addToCart } = useContext(ShopContext);

  const onAddCart = () => {
    addToCart(
      {
        productId: product._id,
        variantId: variantSelected._id,
      },
      () => {
        navigate("/cart");
      }
    );
  };

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          {product.images.slice(1, 5).map((it, index) => (
            <img
              key={index}
              src={backend_url + it}
              alt="img"
              style={{ objectFit: "cover" }}
            />
          ))}
        </div>
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={backend_url + product.images[0]}
            alt="img"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>
      </div>
      <div className="productdisplay-right">
        <h1>{product.name}</h1>
        <div className="productdisplay-right-stars">
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_icon} alt="" />
          <img src={star_dull_icon} alt="" />
          <p>(122)</p>
        </div>
        <div className="productdisplay-right-prices">
          {/* <div className="productdisplay-right-price-old">
            {formatPrice(product.old_price)} đ
          </div> */}
          <div className="productdisplay-right-price-new">
            {formatPrice(variantSelected.price)} đ
          </div>
        </div>
        <div className="productdisplay-right-description">
          {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {product.variants.map((it) => (
              <div
                key={it._id}
                className={classNames({
                  active: it._id === variantSelected._id,
                })}
                onClick={() => setVariantSelected(it)}
              >
                {it.name} - {formatPrice(it.price)}đ
              </div>
            ))}
          </div>
        </div>

        {/* Select Color */}
        {/* <div className="productdisplay-right-color">
          <h1>Màu sắc</h1>
          <div className="productdisplay-right-colors">
            <div>Vàng</div>
            <div>Xám than</div>
            <div>Xám trắng</div>
            <div>Xanh dương</div>
            <div>Xám đen</div>
          </div>
        </div> */}

        <button onClick={onAddCart}>ADD TO CART</button>
        <p className="productdisplay-right-category">
          <span>Category :</span> Sofa, Giường
        </p>
        <p className="productdisplay-right-category">
          <span>Chất liệu :</span> vải lanh,gỗ thông nguyên khối
        </p>
      </div>
    </div>
  );
};

export default ProductDisplay;
