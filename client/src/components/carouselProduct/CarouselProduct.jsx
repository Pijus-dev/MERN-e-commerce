import React from "react";

import { Link } from "react-router-dom";

import "./carouselProduct.scss"

const CarouselProduct = ({ item }) => {
  const { _id, image, name, price, sex } = item;
  return (
      <Link to={`/product/${sex}/${_id}`}>
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
  );
};

export default CarouselProduct;
