import { createSlice } from '@reduxjs/toolkit';

interface DarkState {
  value: boolean;
}

const initialState: DarkState = {
  value: true,
};

const darkSlice = createSlice({
  name: 'dark',
  initialState,
  reducers: {
    changeDark: (state) => {
      state.value =!state.value ;
    },
   
  },
});

export const { changeDark } = darkSlice.actions;
export default darkSlice.reducer;
