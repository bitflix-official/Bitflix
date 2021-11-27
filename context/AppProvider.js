import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { downloadImage } from 'utils';
import { supabase } from 'utils/supabaseClient';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {
  const [userSession, setUserSession] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
    });
  }, []);

  const getProfile = async () => {
    try {
      const user = supabase.auth.user();
      const { data, error, status } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }
      return { email: user.email, ...data };
    } catch (err) {
      return err;
    }
  };

  const handleUserData = () => {
    getProfile().then(async (data) => {
      setUserData({
        ...data,
      });
    });
  };

  useEffect(async () => {
    getProfile().then(async (data) => {
      setUserData({
        ...data,
      });
    });
  }, [userSession]);

  const providerValue = {
    data: {
      userSession,
      userData,
    },
    actions: {
      handleUserData,
    },
  };

  return (
    <AppContext.Provider value={providerValue}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppProvider;
