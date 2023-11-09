import { createSlice } from "@reduxjs/toolkit";

export interface HomeState {
  menu: boolean;
  name: string;
  email: string;
  empresa_id: string;
}

const initialState: HomeState = {
  menu: true,
  name: "",
  email: "",
  empresa_id: "",
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
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmpresaId: (state, action) => {
      state.empresa_id = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toogleMenu,
  openMenu,
  closeMenu,
  setEmail,
  setName,
  setEmpresaId,
} = HomeSlice.actions;

export default HomeSlice.reducer;
