import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { addProduct, increaseQuantity, decreaseQuantity } from "../../slices/add-cart/addCartSlice";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  const cartItem = cart.find((item) => item.id === product.id);
  const cartQuantity = cartItem?.quantity || 0;

  return (
    <div className="container mt-4">
      <div className="card h-100 p-5">
        <div className="card-body d-flex justify-content-center align-items-center">
          <div className="text-center">
            <img
              src={product.image}
              alt={product.title}
              className="card-img-top img-fluid w-50"
            />
          </div>
          <div>
            <h2 className="card-title">{product.title}</h2>
            <p className="card-text">Category: {product.category}</p>
            <p className="card-text">{product.description}</p>
            <p className="card-text">
              <strong>Price: ${product.price}</strong>
            </p>
            <p>
              <strong>Quantity in Cart: {cartQuantity}</strong>
            </p>
            <button className="btn btn-dark me-2" onClick={() => dispatch(addProduct(product))}>
              Add to Cart
            </button>
            <button
              className="btn btn-primary me-2"
              onClick={() => dispatch(increaseQuantity(product.id))}
              disabled={cartQuantity === 0}
            >
              Increase Quantity
            </button>
            <button
              className="btn btn-danger"
              onClick={() => dispatch(decreaseQuantity(product.id))}
              disabled={cartQuantity <= 1}
            >
              Decrease Quantity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
