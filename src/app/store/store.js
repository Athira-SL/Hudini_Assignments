import { configureStore } from '@reduxjs/toolkit';
import articlesSlice from '../features/articles/articlesSlice';


console.log(articlesSlice, 'arrar');

export const makeStore = () => {
  return configureStore({
    reducer: {
      articles: articlesSlice,
    },
  });
};
