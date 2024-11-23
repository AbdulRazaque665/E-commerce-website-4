import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../slices/add-cart/addCartSlice';
import { Link } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const cart = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();


  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
      
        const uniqueCategories = [
          'All', 
          ...new Set(data.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
      });
  }, []);


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };


  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((product) => product.category === selectedCategory);

  
  const handleAddToCart = (product) => {
    dispatch(addProduct(product));
  };

  return (
    <div className="container mt-4 df">
     <div className='d-flex w-100 h-100 justify-content-between align-items-center'>
     <h2>Product List</h2>
     <div className="mb-4 d-flex align-items-center w-auto">
        <label htmlFor="category-select" className="form-label me-3">
          Filter:
        </label>
        <select
          id="category-select"
          className="form-select w-100"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
     </div>
     
      
     
      

      <div className="row">
        {filteredProducts.map((product) => {
          const cartItem = cart.find((item) => item.id === product.id);
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={product.id}>
              <div className="card h-100 w-100">
                <div className="card-body d-flex justify-content-between flex-column">
                  <div className="w-100 h-100 d-flex justify-content-center align-items-center">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="card-img-top img-fluid w-50 p-3"
                    />
                  </div>
                  <div>
                    <h5 className="card-title">{product.title}</h5>
                    <p>
                      <strong>Price: ${product.price}</strong>
                    </p>
                    <p>
                      <strong>Quantity in Cart: {cartItem ? cartItem.quantity : 0}</strong>
                    </p>

                    <div className="mt-3 d-flex justify-content-between">
                      <button
                        className="btn btn-dark"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>
                      <Link to={`/product/${product.id}`} className="btn btn-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
