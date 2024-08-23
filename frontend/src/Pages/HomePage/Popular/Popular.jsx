import React from "react";
import "./Popular.css";
import WrapperContent from "../../../Components/WrapperContent/WrapperContent";
import ProductItem from "../../../Components/ProductItem/ProductItem";

import styles from "./index.module.css";

const Popular = (props) => {
  return (
    <div className={styles.wrapper}>
      <WrapperContent>
        <div className="popular">
          <h1>ĐÈN THÔNG MINH</h1>
          <hr />

          <div className={styles.listProduct}>
            {props.data.map((item, index) => {
              return (
                <ProductItem
                  id={item.id}
                  key={index}
                  name={item.name}
                  images={item.images}
                  new_price={item.new_price}
                  old_price={item.old_price}
                />
              );
            })}
          </div>
        </div>
      </WrapperContent>
    </div>
  );
};

export default Popular;
