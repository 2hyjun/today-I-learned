import * as React from 'react';

import { AppState } from './store';
import { ChatState, sendMessage, deleteMessage } from './store/chat/types';
import { SystemState, updateSession } from './store/system/types';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators, AnyAction } from 'redux';
import { Button } from 'reactstrap';

interface StateProps {
  chat: ChatState; // state
  system: SystemState; // state
}

interface DispatchProps {
  sendMessage: typeof sendMessage; // action,
  updateSession: typeof updateSession; // action
  deleteMessage: typeof deleteMessage;
}

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  chat: state.chat,
});

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
  console.log(
    bindActionCreators(
      {
        sendMessage,
        deleteMessage,
        updateSession,
      },
      dispatch,
    ),
  );
  return bindActionCreators(
    {
      sendMessage,
      deleteMessage,
      updateSession,
    },
    dispatch,
  );
};

class App extends React.Component<StateProps & DispatchProps, { value: string }> {
  constructor(props: StateProps & DispatchProps) {
    super(props);

    this.state = {
      value: '',
    };
  }
  public render() {
    return (
      <div>
        <div>{JSON.stringify(this.props.chat, null, 2)}</div>
        <div>{JSON.stringify(this.props.system, null, 2)}</div>
        <button
          onClick={() =>
            this.props.sendMessage({
              user: '2hyjun',
              message: Math.random().toFixed(10),
              timestamp: new Date().getTime(),
            })
          }
        >
          sendMessage
        </button>
        <hr />
        <input onChange={(e) => this.setState({ value: e.target.value })} value={this.state.value} />
        <button onClick={() => this.props.deleteMessage(parseInt(this.state.value, 10))}>deleteMessage</button>
        <hr />
        <Button
          color='primary'
          onClick={() =>
            this.props.updateSession({
              loggedIn: true,
              session: '123',
              userName: '2hyjun',
            })
          }
        >
          updateSession
        </Button>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
