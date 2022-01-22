import React from 'react';

export const defaultValue = {
  data: {
    userSession: undefined,
    userData: undefined,
  },
  actions: {
    handleUserData: () => undefined,
    addItemToMyList: () => undefined,
    removeItemFromMyList: () => undefined,
    changeUserLanguage: () => undefined,
  },
};

const AppContext = React.createContext(defaultValue);

export default AppContext;
