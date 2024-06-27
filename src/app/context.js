import React, { createContext, useReducer, useContext } from 'react';

const ProductContext = createContext();

const initialProductState = {
  products: [],
  query: '',
  selectedCategories: ['All'],
  sortByPrice: '',
};

const productReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return { ...state, products: action.value };
    case 'SET_QUERY':
      return { ...state, query: action.value };
    case 'TOGGLE_CATEGORY':
      const { value } = action;
      if (state.selectedCategories.includes(value)) {
        return {
          ...state,
          selectedCategories: state.selectedCategories.filter(
            (cat) => cat !== value
          ),
        };
      } else {
        return {
          ...state,
          selectedCategories: [...state.selectedCategories, value],
        };
      }
    case 'SET_SORT_BY_PRICE':
      return { ...state, sortByPrice: action.value };
    default:
      return state;
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialProductState);

  return (
    <ProductContext.Provider value={{ state, dispatch }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductState = () => {
  const context = useContext(ProductContext);
  return context.state;
};

export const useProductDispatch = () => {
  const context = useContext(ProductContext);
  return context.dispatch;
};
