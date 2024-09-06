// import { RequestApi } from "@/lib/RequestApi";
// import { createSlice } from "@reduxjs/toolkit";
// import { AppRecord } from "@/app/models/AppRecord";
// import { Snackbar } from "@/components/snackbar/Snackbar";
// import { StatusMsg } from "@/app/models/ReturnMsg";

// const initialState = {
//   menuState: AppRecord,
//   menus: [],
// };

// export const menuSlice = createSlice({
//   name: "menu",
//   initialState,
//   reducers: {
//     setShopMenu(state, action) {
//       state.menus = action.payload;
//     },

//     setLoading(state, action) {
//       state.menuState = action.payload;
//     },
//   },
// });

// const { setShopMenu, setLoading } = menuSlice.actions;

// export const initPage =
//   ({ shopID }: { shopID: string }) =>
//   async (dispatch: any) => {
//     try {
//       const menuState = new AppRecord();
//       dispatch(setLoading(menuState));

//       let url = `/get-home-marketplace-qr-menu?`;
//       const data = JSON.stringify({
//         shop_id: shopID,
//       });

//       RequestApi(url, { data })
//         .then((respones) => {
//           if (respones.status === "success") {
//             // dispatch(setQrMenu(respones.data.user_shop_product_groups));
//           } else {
//             Snackbar({
//               message: respones.msg,
//               status: StatusMsg.getType(respones.status),
//             });
//           }

//           dispatch(setLoading(false));
//         })
//         .catch((err) => {
//           console.log(err);
//           dispatch(setLoading(false));

//           Snackbar({
//             message: err.toString(),
//             status: StatusMsg.getType(respones.status),
//           });
//         });
//     } catch (ex: any) {
//       dispatch(setLoading(false));
//     }
//   };

// export const fetchShopMenu =
//   ({ shopID }: { shopID: string }) =>
//   async (dispatch: any) => {
//     try {

//       initialState.menus = [];
//     } catch (ex: any) {}
//   };

// const menuReducer = menuSlice.reducer;

// export default menuReducer;
