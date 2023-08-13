import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { combineReducers, getDefaultMiddleware } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import Participant from "./Reducers/Participant";
import Tournament from "./Reducers/Tournament";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";


const root = ReactDOM.createRoot(document.getElementById("root"));
const persistConfig = {
  key: "root",
  version: 1,
  storage
};
const reducer = combineReducers({
  participant: Participant,
  tournament: Tournament
});
const persistedReducer = persistReducer(persistConfig, reducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
let persistor = persistStore(store);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <PersistGate persistor={persistor}>
        <App />
      </PersistGate>
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
