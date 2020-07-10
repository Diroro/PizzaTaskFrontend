import {shallowEqual, useSelector} from 'react-redux';

export const useShallowSelector = <TState, TSelected>(selector: (state: TState) => TSelected) =>
  useSelector(selector, shallowEqual);
