import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../utils/localstorage";
import { Common } from "../../utils/common";
import { Encryption } from "../../utils/encryption";

// const user = LocalStorage.getItem("user") || "";

// const applicationuser = user ? Encryption.decryptData(user) : "";

const userSlice = createSlice({
  name: "userslice",
  initialState: {
    currentuser: LocalStorage.getItem("user") || null,
  },
  reducers: {
    SIGNIN: (state, action) => {
      state.currentuser = action.payload;
      Common.EncryptAndStoreInLocalStorage(action.payload);
    },
    SIGNOUT: (state) => {
      state.currentuser = null;
      LocalStorage.removeItem("user");
    },
  },
});

export const { SIGNIN, SIGNOUT } = userSlice.actions;
export default userSlice.reducer;
