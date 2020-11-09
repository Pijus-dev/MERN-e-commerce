import React from "react";

import { Link } from "react-router-dom";

import "./carouselProduct.scss"

const CarouselProduct = ({ item }) => {
  const { _id, image, name, price } = item;
  return (
    <div>
      <Link to={`/product/${_id}`}>
        <div className="product">
          <div
            className="productImage"
            style={{ backgroundImage: `url(${image})` }}
          ></div>
          <div className="productInfo">
            <h3>{name}</h3>
            <p>&euro;{price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CarouselProduct;
