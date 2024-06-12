import { createSlice } from "@reduxjs/toolkit";
import { LocalStorage } from "../../utils/localstorage";
import { Common } from "../../utils/common";
import { Encryption } from "../../utils/encryption";

const userSlice = createSlice({
  name: "userslice",
  initialState: {
    currentuser: Encryption.decryptData(LocalStorage.getItem("user")) || null,
    question: 1,
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
    SETQUESTION: (state, action) => {
      state.question = action.payload;
    },
  },
});

export const { SIGNIN, SIGNOUT, SETQUESTION } = userSlice.actions;
export default userSlice.reducer;
