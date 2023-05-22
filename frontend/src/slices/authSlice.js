//  automatically generate reducers and actions
import { createSlice } from "@reduxjs/toolkit";

// Set initial state for the slice of the Redux store that we're managing.
// It looks for a 'userInfo' item in local storage, and if it exists, it parses it from JSON to an object and sets it as the initial state.
// If it doesn't exist, the initial state will be null.
const initialState = {
  userinfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

// createSlice is used to generate a reducer and actions for handling user authentication information.
// The slice of state being managed is named "auth"
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // The 'setCredentials' reducer function updates the 'userInfo' state to the new value provided as 'action.payload' when the 'setCredentials' action is dispatched.
    // It also updates the 'userInfo' item in localStorage to match the new state.
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    // The 'logout' reducer function clears the 'userInfo' state and removes the 'userInfo' item from localStorage when the 'logout' action is dispatched.
    logout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});

// The generated actions (setCredentials and logout) are exported so they can be used elsewhere in the application.
export const { setCredentials, logout } = authSlice.actions;

// The generated reducer is exported as the default export so it can be used in the Redux store.
export default authSlice.reducer;

/* 
-used to handle user auth info in the app
-Redux stores for quick access during a session 
    - also stores in localStorage for persistence across sessions
*/
