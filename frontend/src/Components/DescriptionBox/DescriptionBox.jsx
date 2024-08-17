import React from "react";
import "./DescriptionBox.css";

const DescriptionBox = () => {
  return (
    <div className="descriptionbox">
      <div className="descriptionbox-navigator">
        <div className="descriptionbox-nav-box">Description</div>
        <div className="descriptionbox-nav-box fade">Reviews (122)</div>
      </div>
      <div className="descriptionbox-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates quia
        repellat pariatur, architecto velit, eaque nostrum amet alias nesciunt
        magnam, provident fuga error dolor perferendis voluptatum ipsa.
        Pariatur, sapiente ipsa.
      </div>
    </div>
  );
};

export default DescriptionBox;
