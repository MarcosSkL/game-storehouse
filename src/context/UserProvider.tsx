import React, { createContext, useReducer, Dispatch } from 'react';

interface UserData {
  photoURL: string;
  displayName: string;
  // adicione outros campos conforme necessário
}

interface UserState {
  userData: UserData | null;
}

interface UserAction {
  type: 'SET_USER_DATA';
  payload: UserData | null;
}

const initialState: UserState = {
  userData: null,
};

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<{
  state: UserState;
  dispatch: Dispatch<UserAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const userReducer = (state: UserState, action: UserAction) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
};

export const UserProvider = ({ children }: UserProviderProps) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};