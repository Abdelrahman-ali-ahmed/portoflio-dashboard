// redux/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session"; // 🧠 sessionStorage
import loginReducer from "./slices/loginSlice";
import roleReducer from "./slices/roleSlice";
import openReducer from "./slices/openSlice";
import darkReducer from "./slices/darkSlice"; // optional

const rootReducer = combineReducers({
  login: loginReducer,
  role: roleReducer,
  dark: darkReducer,
  open: openReducer,
});

const persistConfig = {
  key: "root",
  storage: sessionStorage,
  whitelist: ["login", "role", "dark","open"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these redux-persist actions
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
