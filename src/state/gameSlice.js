/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import cloneDeep from 'lodash/cloneDeep';

export const initialState = {
  currentRoom: 'intro',
  unlockedRooms: [],
  visitedRooms: [],
  room2SafeUnlocked: false,
  room3CipherSafeUnlocked: false,
};

export const gameSlice = createSlice({
  name: 'counter',
  initialState: cloneDeep(initialState),
  reducers: {
    changeRoom: (state, action) => {
      state.currentRoom = action.payload;
    },
    unlockRoom: (state, action) => {
      if (!state.unlockedRooms.includes(action.payload)) {
        state.unlockedRooms = [...state.unlockedRooms, action.payload];
      }
    },
    visitRoom: (state, action) => {
      if (!state.visitedRooms.includes(action.payload)) {
        state.visitedRooms = [...state.visitedRooms, action.payload];
      }
    },
    unlockSafe: (state, action) => {
      state[action.payload] = true;
    },
    resetGame: (state) => cloneDeep(initialState),
  },
});

export const {
  changeRoom, unlockRoom, unlockSafe, visitRoom, resetGame,
} = gameSlice.actions;

export default gameSlice.reducer;
