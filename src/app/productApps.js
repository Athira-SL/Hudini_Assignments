import React, { useEffect } from 'react';
import { useProductState, useProductDispatch } from './context';

export default function App() {
  const { products, query, selectedCategories, sortByPrice } =
    useProductState();
  const dispatch = useProductDispatch();

  const url = 'https://dummyjson.com/products';

  useEffect(() => {
    const fetchApi = async () => {
        const productResponse = await fetch(url);
        const productList = await productResponse.json();
        dispatch({ type: 'SET_PRODUCTS', value: productList.products });
    };
    fetchApi();
  }, [dispatch]);

  const onChange = (e) => {
    dispatch({ type: 'SET_QUERY', value: e.target.value });
  };

  const onSelectHandler = (category) => {
    dispatch({ type: 'TOGGLE_CATEGORY', value: category });
  };

  const onSortHandler = (e) => {
    dispatch({ type: 'SET_SORT_BY_PRICE', value: e.target.value });
  };

  const getCategoryList = () => {
    let categoryArr = ['All'];
    products.forEach((item) => {
      if (!categoryArr.includes(item.category)) {
        categoryArr.push(item.category);
      }
    });
    return categoryArr;
  };

  const getFilteredProductList = () => {
    let productArray = [...products];

    if (selectedCategories.length > 0 && !selectedCategories.includes('All')) {
      productArray = products.filter((item) =>
        selectedCategories.includes(item.category)
      );
    }

    productArray = productArray.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    if (sortByPrice) {
      productArray = productArray.sort((a, b) => {
        if (sortByPrice === 'asc') {
          return a.price - b.price;
        } else if (sortByPrice === 'desc') {
          return b.price - a.price;
        }
        return 0;
      });
    }

    return productArray;
  };

  const displayArr = getFilteredProductList();

  return (
    <>
      <h1>PRODUCTS</h1>
      <div className="categoryButtons">
        Filter by category
        {getCategoryList().map((category) => (
          <button
            className={`btn ${
              selectedCategories.includes(category) ? 'active' : ''
            }`}
            key={category}
            onClick={() => onSelectHandler(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="searchContainer">
        <input
          className="searchBar"
          value={query}
          onChange={onChange}
          placeholder="Search products"
        />

        <label className="sorting">
          Sort by price
          <select
            className="sortDropdown"
            value={sortByPrice}
            onChange={onSortHandler}
          >
            <option value="">None</option>
            <option value="asc">Low to High</option>
            <option value="desc">High to Low</option>
          </select>
        </label>
        {/* <p>Products Found : {displayArr.length}</p> */}
      </div>
      <p>Products Found : {displayArr.length}</p>

      <ul className="filter">
        {displayArr.map((product) => (
          <li key={product.id}>
            <img
              style={{ width: '15px', height: '15px' }}
              alt={product.title}
              src={product.images[0]}
            ></img>
            <h2>{product.title}</h2>
            <p>{product.price + '/-'}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
