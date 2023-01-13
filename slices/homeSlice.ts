import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface HomeState {
  menu: boolean;
}

const initialState: HomeState = {
  menu: true,
};

export const HomeSlice = createSlice({
  name: "Home",
  initialState,
  reducers: {
    toogleMenu: (state) => {
      state.menu = !state.menu;
    },
    openMenu: (state) => {
      state.menu = true;
    },
    closeMenu: (state) => {
      state.menu = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { toogleMenu, openMenu, closeMenu } = HomeSlice.actions;

export default HomeSlice.reducer;
