import { createSlice } from '@reduxjs/toolkit';

interface OpenState {
  value: boolean;
}

const initialState: OpenState = {
  value: false,
};

const OpenSlice = createSlice({
  name: 'open',
  initialState,
  reducers: {
    changeOpen: (state) => {
      state.value =!state.value ;
    },
   
  },
});

export const { changeOpen} = OpenSlice.actions;
export default OpenSlice.reducer;
