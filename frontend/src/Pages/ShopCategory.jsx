import React, { useEffect, useState } from "react";
import "./CSS/ShopCategory.css";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/ProductItem/ProductItem";
import { Link } from "react-router-dom";
import slugify from "slugify";
import WrapperContent from "../Components/WrapperContent/WrapperContent";

import styles from "./index.module.css";

const formatCategoryName = (name) => {
  return slugify(name, { locale: "vi", lower: true });
};

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => {
    fetch("http://localhost:4000/allproducts")
      .then((res) => res.json())
      .then((data) => setAllProducts(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1 - 12</span> out of 54 Products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>

      <WrapperContent>
        <div className={styles.listProduct}>
          {allproducts.map((item, i) => {
            if (
              formatCategoryName(props.category) ===
              formatCategoryName(item.category)
            ) {
              return (
                <Item
                  id={item.id}
                  key={i}
                  name={item.name}
                  image={item.image}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
      </WrapperContent>

      <div className="shopcategory-loadmore">
        <Link to="/" style={{ textDecoration: "none" }}>
          Explore More
        </Link>
      </div>
    </div>
  );
};

export default ShopCategory;
