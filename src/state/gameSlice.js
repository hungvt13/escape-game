/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

export const gameSlice = createSlice({
  name: 'counter',
  initialState: {
    currentRoom: 'intro',
  },
  reducers: {
    changeRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
  },
});

export const { changeRoom } = gameSlice.actions;

export default gameSlice.reducer;
