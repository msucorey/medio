import * as React from "react";

type SimpleGlobalState = Record<string, any>;
type Action = {
  type: string;
  payload?: any;
};
type Reducer = (state: SimpleGlobalState, action: Action) => SimpleGlobalState;

const StateContext = React.createContext({});

const StateProvider = ({
  reducer,
  initialState,
  children,
}: {
  reducer: Reducer;
  initialState: SimpleGlobalState;
  children: React.ReactNode;
}) => (
  <StateContext.Provider value={React.useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

const useStateValue = () => React.useContext(StateContext);

export { StateProvider, useStateValue };
