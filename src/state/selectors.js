/* eslint-disable import/prefer-default-export */
import isEqual from 'lodash/isEqual';

import { initialState } from './gameSlice';

export const isGameNotPlayed = (state) => isEqual(state.root, initialState);
