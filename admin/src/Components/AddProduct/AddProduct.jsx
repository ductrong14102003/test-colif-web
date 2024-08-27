import React, { useState } from "react";
import "./AddProduct.css";
import upload_area from "../Assets/upload_area.svg";
import { backend_url } from "../../App";
import Editor from "../Editor/Editor";

const CATEGORY = ["Sofa bed", "Đèn", "Ghế lười", "Bàn đa năng"];

const AddProduct = () => {
  const [images, setImages] = useState([]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    description: "",
    images: [],
    category: CATEGORY[0],
    // new_price: "",
    // old_price: "",
    content: "",
  });

  const AddProduct = async () => {
    let dataObj;
    let product = productDetails;

    let formData = new FormData();
    images.forEach((file) => formData.append("images", file));

    await fetch(`${backend_url}/upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        dataObj = data;
      });

    if (dataObj.success) {
      product.images = dataObj.images;
      await fetch(`${backend_url}/addproduct`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Product Added") : alert("Failed");
        });
    }
  };

  const changeHandler = (e) => {
    setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    const files = e.target.files;
    setImages([...files]);
  };

  return (
    <div className="addproduct">
      <div className="addproduct-itemfield">
        <p>Product title</p>
        <input
          type="text"
          name="name"
          value={productDetails.name}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Type here"
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Product description</p>
        <input
          type="text"
          name="description"
          value={productDetails.description}
          onChange={(e) => {
            changeHandler(e);
          }}
          placeholder="Type here"
        />
      </div>

      {/* <div className="addproduct-price">
        <div className="addproduct-itemfield">
          <p>Price</p>
          <input
            type="number"
            name="old_price"
            value={productDetails.old_price}
            onChange={(e) => {
              changeHandler(e);
            }}
            placeholder="Type here"
          />
        </div>

        <div className="addproduct-itemfield">
          <p>Offer Price</p>
          <input
            type="number"
            name="new_price"
            value={productDetails.new_price}
            onChange={(e) => {
              changeHandler(e);
            }}
            placeholder="Type here"
          />
        </div>
      </div> */}

      <div className="addproduct-itemfield">
        <p>Product category</p>
        <select
          value={productDetails.category}
          name="category"
          className="add-product-selector"
          onChange={changeHandler}
        >
          {CATEGORY.map((it, idx) => (
            <option key={idx} value={it}>
              {it}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="addproduct-itemfield-label">Product content</p>

        <Editor
          value={productDetails.content}
          onChange={(content) => {
            setProductDetails((prev) => ({
              ...prev,
              content,
            }));
          }}
          placeholder="Enter content"
        />
      </div>

      <div className="addproduct-itemfield">
        <p>Product image</p>
        <label htmlFor="file-input">
          <img className="addproduct-thumbnail-img" src={upload_area} alt="" />
        </label>
        <input
          onChange={onFileChange}
          type="file"
          name="image"
          id="file-input"
          accept="image/*"
          hidden
          multiple
        />
      </div>

      {!!images.length && (
        <div className="list-image-preview">
          {images.map((it, index) => (
            <div key={index}>
              <img src={URL.createObjectURL(it)} alt="Preview" />
            </div>
          ))}
        </div>
      )}

      <button
        className="addproduct-btn"
        onClick={() => {
          AddProduct();
        }}
      >
        ADD
      </button>
    </div>
  );
};

export default AddProduct;
