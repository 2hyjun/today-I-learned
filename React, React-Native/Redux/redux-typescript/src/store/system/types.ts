import { AnyAction } from 'redux';
import { createActions } from 'reduxsauce';

export interface SystemState {
  loggedIn: boolean;
  session: string;
  userName: string;
}

export interface UpdateSessionAction extends AnyAction {
  payload: SystemState;
}

export const { Types, Creators: ActionCreators } = createActions({
  updateSession: ['payload'],
});

export const { UPDATE_SESSION } = Types;
export const { updateSession } = ActionCreators;
