import { combineReducers } from 'redux';
import { systemReducer } from './system/reducers';
import { chatReducer } from './chat/reducers';

export const rootReducer = combineReducers({
  system: systemReducer,
  chat: chatReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
