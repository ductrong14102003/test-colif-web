import React from "react";
import "./NewCollections.css";
import styles from "./index.module.css";
import WrapperContent from "../../../Components/WrapperContent/WrapperContent";
import ProductItem from "../../../Components/ProductItem/ProductItem";

const NewCollections = (props) => {
  return (
    <div className={styles.wrapper}>
      <WrapperContent>
        <div className="new-collections">
          <h1>NEW COLLECTIONS</h1>
          <hr />
          <div className={styles.listProduct}>
            {props.data.map((item, index) => {
              return (
                <ProductItem
                  id={item.id}
                  key={index}
                  name={item.name}
                  image={item.image}
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

export default NewCollections;
