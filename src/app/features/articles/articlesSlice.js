import { createSlice } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const token =
  typeof window !== undefined ? localStorage.getItem('token') : null;

export const getArticlesandTagList = createAsyncThunk(
  'articles/fetchData',
  async (offset = 0) => {
    const articles_url = `https://api.realworld.io/api/articles?offset=${offset}&limit=10`;

    const tags_url = 'https://api.realworld.io/api/tags';
    // const token = localStorage.getItem("token");

    const data = token
      ? await Promise.all([
          fetch(articles_url, {
            headers: { Authorization: `Bearer ${token}` },
          }).then((response) => response.json()),
          fetch(tags_url).then((response) => response.json()),
        ])
      : await Promise.all([
          fetch(articles_url, { headers: {} }).then((response) =>
            response.json()
          ),
          fetch(tags_url).then((response) => response.json()),
        ]);

    // try {
    //   const response = token
    //   ? await axios.get(articles_url, {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   })
    //   : await axios.get(articles_url);
    return {
      articles: data[0].articles,
      tags: data[1].tags,
      articlesCount: data[0].articlesCount,
    };
  }
  //   catch(error) {
  //     throw new Error("Failed to fetch articles");
  //   }
  // }
);

export const getArticlesByTag = createAsyncThunk(
  'articles/fetchByTag',
  async (tag) => {
    const response = await fetch(
      `https://api.realworld.io/api/articles?tag=${tag}`
    );
    return response.json();
  }
);

const initialState = {
  articles: [],
  tags: [],
  status: 'loading',
  paginationCount: 0,
  error: null,
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getArticlesandTagList.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.tags = action.payload.tags;
        state.paginationCount = action.payload.articlesCount;
      })
      .addCase(getArticlesByTag.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.paginationCount = action.payload.articlesCount;
      })

      .addMatcher(
        (action) =>
          [getArticlesandTagList.rejected, getArticlesByTag.rejected].includes(
            action.type
          ),
        (state, action) => {
          state.status = 'failed';
          state.error = action.error.message;
        }
      );
  },
});

export default articlesSlice.reducer;

// import { createSlice } from '@reduxjs/toolkit';
// import { createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// // Async thunk to fetch articles and tag list
// export const getArticlesandTagList = createAsyncThunk(
//   'articles/fetchData',
//   async (offset = 0, { getState }) => {
//     try {
//       const { token } = getState().auth; // Retrieve token from state, adjust this according to your actual state structure
//       const articles_url = `https://api.realworld.io/api/articles?offset=${offset}&limit=10`;

//       const [articlesResponse, tagsResponse] = await Promise.all([
//         token
//           ? axios.get(articles_url, {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             })
//           : axios.get(articles_url),
//         axios.get('https://api.realworld.io/api/tags'),
//       ]);

//       return {
//         articles: articlesResponse.data.articles,
//         tags: tagsResponse.data.tags,
//         articlesCount: articlesResponse.data.articlesCount,
//       };
//     } catch (error) {
//       throw new Error('Failed to fetch articles and tags');
//     }
//   }
// );

// // Async thunk to fetch articles by tag
// export const getArticlesByTag = createAsyncThunk(
//   'articles/fetchByTag',
//   async (tag) => {
//     const response = await axios.get(`https://api.realworld.io/api/articles?tag=${tag}`);
//     return response.data;
//   }
// );

// const initialState = {
//   articles: [],
//   tags: [],
//   status: 'idle', // Initialize status to 'idle'
//   paginationCount: 0,
//   error: null,
// };

// const articlesSlice = createSlice({
//   name: 'articles',
//   initialState,
//   reducers: {},
//   extraReducers(builder) {
//     builder
//       .addCase(getArticlesandTagList.pending, (state, action) => {
//         state.status = 'loading'; // Set status to 'loading' when fetching data
//       })
//       .addCase(getArticlesandTagList.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.articles = action.payload.articles;
//         state.tags = action.payload.tags;
//         state.paginationCount = action.payload.articlesCount;
//         state.error = null; // Clear any previous errors
//       })
//       .addCase(getArticlesandTagList.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       })
//       .addCase(getArticlesByTag.pending, (state, action) => {
//         state.status = 'loading';
//       })
//       .addCase(getArticlesByTag.fulfilled, (state, action) => {
//         state.status = 'succeeded';
//         state.articles = action.payload.articles;
//         state.paginationCount = action.payload.articlesCount;
//         state.error = null;
//       })
//       .addCase(getArticlesByTag.rejected, (state, action) => {
//         state.status = 'failed';
//         state.error = action.error.message;
//       });
//   },
// });

// export default articlesSlice.reducer;
