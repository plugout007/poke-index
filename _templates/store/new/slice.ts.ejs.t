---
to: src/stores/<%= dir %>/slice.ts
---
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialState } from '../types/<%= dir %>';

const initialState: InitialState = {

};

const <%= dir %>Slice = createSlice({
  name: '<%= dir %>',
  initialState,
  reducers: {
  },
});

export const {} = <%= dir %>Slice.actions;

export default <%= dir %>Slice.reducer;