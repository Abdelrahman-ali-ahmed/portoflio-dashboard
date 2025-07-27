import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface roleState {
  value: string;
}

const initialState: roleState = {
  value: "",
};

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    changeRole: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
   
  },
});

export const { changeRole } = roleSlice.actions;
export default roleSlice.reducer;
