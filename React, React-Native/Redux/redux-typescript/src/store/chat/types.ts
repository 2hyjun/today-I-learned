// 1. State 타입 정의
// 2. ActionType, ActionCreators 정의 (createActions) 및 export
// 5. Action typing 정의 (AnyAction inherit)

// 타입정의 => State, ActionType, ActionCreator
// operation => readuxsauce를 통해 ActionType, ActionCreator 생성

import { createActions } from 'reduxsauce';
import { AnyAction } from 'redux';
export interface Message {
  user: string;
  message: string;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
}

export interface SendMessageAction extends AnyAction {
  payload: Message;
}

export interface DeleteMessageAction extends AnyAction {
  type: typeof DELETE_MESSAGE;
  meta: {
    timestamp: number;
  };
}

const { Types, Creators: ActionCreators } = createActions({
  sendMessage: ['payload'],
  deleteMessage: ['meta'],
});

export const { SEND_MESSAGE, DELETE_MESSAGE } = Types;
export const { sendMessage, deleteMessage } = ActionCreators;
