'use client';

import { useMemo, useEffect, useState } from 'react';

export default function App() {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(['All']);
  const [sortByPrice, setSortByPrice] = useState('');
  const url = 'https://dummyjson.com/products';

  const fetchApi = async () => {
    const productResponse = await fetch(url);
    const productList = await productResponse.json();
    const prodArray = productList.products;
    setProducts(prodArray);
  };

  useEffect(() => {
    fetchApi();
  }, []);

  function getFilteredProductList() {
    let productArray = [...products];

    if (!selectedCategories.includes('All')) {
      productArray = products.filter((items) =>
        selectedCategories.includes(items.category)
      );
    }

    productArray = productArray.filter((items) =>
      items.title.toLowerCase().includes(query.toLowerCase())
    );

    if (sortByPrice) {
      productArray = productArray.sort((a, b) => {
        if (sortByPrice === 'asc') {
          return a.price - b.price;
        } else if (sortByPrice === 'desc') {
          return b.price - a.price;
        }
      });
    }

    return productArray;
  }

  let displayArr = useMemo(
    () => getFilteredProductList(),
    [products, selectedCategories, sortByPrice, query]
  );

  const onChange = (e) => {
    setQuery(e.target.value);
  };

  const onSelectHandler = (category) => {
    setSelectedCategories((prevCategories) => {
      if (category === 'All') {
        return prevCategories.includes('All')
          ? prevCategories.filter((cat) => cat !== 'All')
          : ['All'];
      } else {
        const newCategories = prevCategories.includes('All')
          ? prevCategories.filter((cat) => cat !== 'All')
          : [...prevCategories];

        if (newCategories.includes(category)) {
          return newCategories.filter((cat) => cat !== category);
        } else {
          return [...newCategories, category];
        }
      }
    });
  };

  const onSortHandler = (e) => {
    setSortByPrice(e.target.value);
  };

  function getCategoryList() {
    let categoryArr = ['All'];
    products.forEach((items) => {
      if (!categoryArr.includes(items.category)) {
        categoryArr.push(items.category);
      }
    });
    return categoryArr;
  }

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
        <p>Products Found : {displayArr.length}</p>
      </div>

      {/* <p>Products Found : {displayArr.length}</p> */}

      <ul className="filter">
        {displayArr.map((product) => (
          <li key={product.id}>
            <img
              style={{ width: '150px', height: '150px' }}
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




