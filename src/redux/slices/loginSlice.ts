import { createSlice } from '@reduxjs/toolkit';

interface LoginState {
  value: boolean;
}

const initialState: LoginState = {
  value: false,
};

const LoginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    changeLogin: (state) => {
      state.value =!state.value ;
    },
   
  },
});

export const { changeLogin} = LoginSlice.actions;
export default LoginSlice.reducer;
