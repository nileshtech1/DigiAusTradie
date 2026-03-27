import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const item = action.payload;
      // 🛡️ safety check
      if (!item || !item.id) return;

      const exists = state.favorites.find(fav => fav?.id === item.id);
      if (exists) {
        state.favorites = state.favorites.filter(fav => fav?.id !== item.id);
      } else {
        state.favorites.push(item);
      }

      // 🧹 remove null or undefined entries if any exist
      state.favorites = state.favorites.filter(Boolean);
    },
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { toggleFavorite, clearFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
