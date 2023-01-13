import { combineReducers, configureStore } from "@reduxjs/toolkit";

import type { PreloadedState } from "@reduxjs/toolkit";

//Service
import { homeApi } from "./services/home";
import { loginApi } from "./services/login";

//Slices
import homeReducer from "./slices/homeSlice";

console.debug(loginApi.reducerPath, homeApi.reducerPath);

const rootReducer = combineReducers({
  home: homeReducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [homeApi.reducerPath]: homeApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(loginApi.middleware, homeApi.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
