// initialState 생성
// apply함수 생성
// handler로 apply함수들 묶어서 reducer 생성

import { ChatState, SEND_MESSAGE, DELETE_MESSAGE, SendMessageAction, DeleteMessageAction } from './types';
import { createReducer } from 'reduxsauce';

const initialState: ChatState = {
  messages: [],
};
function applySendMessage(state: ChatState, action: SendMessageAction): ChatState {
  return {
    messages: [...state.messages, action.payload],
  };
}

function applyDeleteMessage(state: ChatState, action: DeleteMessageAction): ChatState {
  return {
    messages: state.messages.filter((msg) => msg.timestamp !== action.meta.timestamp),
  };
}

const handler = {
  [SEND_MESSAGE]: applySendMessage,
  [DELETE_MESSAGE]: applyDeleteMessage,
};

export const chatReducer = createReducer(initialState, handler);
