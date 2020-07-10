import {createStore, Store, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {reducer} from './reducers/rootReducer';
import {ApplicationAction} from './actions/actions';

export type ApplicationState = ReturnType<typeof reducer>;
export type ApplicationStore = Store<ApplicationState, ApplicationAction>;

export const store = createStore(reducer, applyMiddleware(thunk));
