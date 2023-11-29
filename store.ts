import { combineReducers, configureStore } from "@reduxjs/toolkit";

import type { PreloadedState } from "@reduxjs/toolkit";

//Service
import { homeApi } from "./services/home";
import { loginApi } from "./services/login";
import { reportePersonasApi } from "./services/reportePersonas";
import { reporteDetalleApi } from "./services/reporteDetalle";
import { usersApi } from "./services/users";
import { userDataApi } from "./services/dataUser";
import { uploadArchiveApi } from "./services/upload";

//Slices
import homeReducer from "./slices/homeSlice";

const rootReducer = combineReducers({
  home: homeReducer,
  [loginApi.reducerPath]: loginApi.reducer,
  [homeApi.reducerPath]: homeApi.reducer,
  [reportePersonasApi.reducerPath]: reportePersonasApi.reducer,
  [reporteDetalleApi.reducerPath]: reporteDetalleApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [userDataApi.reducerPath]: userDataApi.reducer,
  [uploadArchiveApi.reducerPath]: uploadArchiveApi.reducer,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        loginApi.middleware,
        homeApi.middleware,
        reportePersonasApi.middleware,
        reporteDetalleApi.middleware,
        usersApi.middleware,
        userDataApi.middleware,
        uploadArchiveApi.middleware
      ),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
