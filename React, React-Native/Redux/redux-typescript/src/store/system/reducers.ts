import { SystemState, UPDATE_SESSION, UpdateSessionAction } from './types';
import { createReducer } from 'reduxsauce';

const initialState: SystemState = {
  loggedIn: false,
  session: '',
  userName: '',
};

export const applyUpdateSession = (state: SystemState, action: UpdateSessionAction) => {
  return {
    ...state,
    ...action.payload,
  };
};

const handler = {
  [UPDATE_SESSION]: applyUpdateSession,
};

export const systemReducer = createReducer(initialState, handler);
