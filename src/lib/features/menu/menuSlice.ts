// src/store/slices/counterSlice.ts

import { AppRecord, AppRecordStatus } from "@/utils/appRecord";
import { createSlice } from "@reduxjs/toolkit";

interface MenuSlice {
  menuState: AppRecord;
  userShopProductGroups: any[];
  userShop: any;
  selectedProductGroupCode: string;
}

const initialState: MenuSlice = {
  menuState: {
    currentPage: 1,
    currentIndex: 0,
    nextPageUrl: "",
    totalRecord: 0,
    loadingStatus: AppRecordStatus.loading,
  },

  userShop: {},
  userShopProductGroups: [],
  selectedProductGroupCode: "",
};

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.menuState = action.payload;
    },
    setSelectedProductGroupCode(state, action) {
      state.selectedProductGroupCode = action.payload;
    },
    setUserShop(state, action) {
      state.userShop = action.payload;
    },
    setShopMenu(state, action) {
      state.userShopProductGroups = action.payload;
      if (state.userShopProductGroups.length > 0) {
        state.selectedProductGroupCode =
          state.userShopProductGroups[0]["product_group_id"];
      }
    },
    setShopMenu2(state, action) {
      state.userShopProductGroups = action.payload;
    },
  },
});

export const {
  setLoading,
  setShopMenu,
  setSelectedProductGroupCode,
  setShopMenu2,
  setUserShop,
} = menuSlice.actions;

const menuReducer = menuSlice.reducer;
export default menuReducer;
