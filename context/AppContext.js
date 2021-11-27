import React from 'react';

export const defaultValue = {
  data: {
    userSession: null,
    userData: {},
  },
  actions: {
    handleUserData: () => undefined,
  },
};

const AppContext = React.createContext(defaultValue);

export default AppContext;
