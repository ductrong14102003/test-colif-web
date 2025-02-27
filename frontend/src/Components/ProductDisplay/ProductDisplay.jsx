import React, { useContext } from "react";
import "./ProductDisplay.css";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";
import { backend_url, currency } from "../../App";

const ProductDisplay = ({product}) => {

  const {addToCart} = useContext(ShopContext);
  

  return (
    <div className="productdisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img-list">
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
          <img src={backend_url + product.image} alt="img" />
        </div>
        <div className="productdisplay-img">
          <img className="productdisplay-main-img" src={backend_url + product.image} alt="img" />
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
          <div className="productdisplay-right-price-old">{currency}{product.old_price}</div>
          <div className="productdisplay-right-price-new">{currency}{product.new_price}</div>
        </div>
        <div className="productdisplay-right-description">
        {product.description}
        </div>
        <div className="productdisplay-right-size">
          <h1>Select Size</h1>
          <div className="productdisplay-right-sizes">
            {
              Object.entries({
                "1M2": 500000 ,
                "1M5": 700000 ,
                "1M8": 900000
              }).map(([size, price]) => (
                <div key={size}>
                  {size} - {currency}{price}
                </div>
              ))
            }
          </div>
        </div>

           {/* Select Color */}
      <div className="productdisplay-right-color">
        <h1>Màu sắc</h1>
        <div className="productdisplay-right-colors">
       
          <div>Vàng</div>
          <div>Xám than</div>
          <div>Xám trắng</div>
          <div>Xanh dương</div>
          <div>Xám đen</div>
        
      </div>
      </div>

        <button onClick={()=>addToCart(product.id)}>ADD TO CART</button>
        <p className="productdisplay-right-category"><span>Category :</span> Sofa, Giường</p>
        <p className="productdisplay-right-category"><span>Chất liệu :</span> vải lanh,gỗ thông nguyên khối</p>
      </div>
    </div>
  );
};

export default ProductDisplay;
