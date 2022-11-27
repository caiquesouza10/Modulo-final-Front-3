import { createSlice } from '@reduxjs/toolkit';

const initialState = '';

const userLoggedSlice = createSlice({
  name: 'userLogged',
  initialState,
  reducers: {
    createUserLogged(state, action) {
      return action.payload;
    },
    clearUserLogged() {
      return initialState;
    },
  },
});

export const { createUserLogged, clearUserLogged } = userLoggedSlice.actions;
export default userLoggedSlice.reducer;
