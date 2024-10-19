import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import themeReducer from './theme/themeSlice';
import cartReducer from './cart/cartSlice';

// Combine all reducers
const rootReducer = combineReducers({
  user: userReducer,
  theme: themeReducer,
  shop: cartReducer,
});

// Configure the store without persistence
export const store = configureStore({
  reducer: rootReducer, // Use rootReducer directly without persisting
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// No need for persistor anymore, so you can remove it entirely.
