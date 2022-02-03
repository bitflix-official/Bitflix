import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { supabase } from 'utils/supabaseClient';
import { useTranslation } from 'react-i18next';
import AppContext from './AppContext';

const AppProvider = ({ children }) => {
  const { i18n } = useTranslation();
  const [userSession, setUserSession] = useState(undefined);
  const [userData, setUserData] = useState(undefined);

  useEffect(() => {
    setUserSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setUserSession(session);
    });
  }, []);

  useEffect(() => {
    if (userData?.language) {
      i18n.changeLanguage(userData?.language || 'en');
    }
  }, [userData]);

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
      return { ...data, email: user.email };
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

  const changeUserLanguage = async (language) => {
    const user = supabase.auth.user();
    const { data, error } = await supabase
      .from('profiles')
      .update({ language })
      .eq('id', user.id);
    if (error) {
      throw error;
    } else {
      handleUserData();
    }
    return data;
  };

  const addItemToMyList = async (id, type) => {
    const user = supabase.auth.user();
    const currentList = userData?.list ? JSON.parse(userData.list) : [];
    currentList.push({ id, type });
    const newList = JSON.stringify(currentList);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ list: newList })
        .eq('id', user.id);

      if (error) {
        throw error;
      } else {
        handleUserData();
      }
      return data;
    } catch (err) {
      return err;
    }
  };

  const removeItemFromMyList = async (id) => {
    const user = supabase.auth.user();
    const currentList = userData?.list ? JSON.parse(userData.list) : [];
    const newList = JSON.stringify(currentList.filter((el) => el.id !== id));
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ list: newList })
        .eq('id', user.id);

      if (error) {
        throw error;
      } else {
        handleUserData();
      }
      return data;
    } catch (err) {
      return err;
    }
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
      addItemToMyList,
      removeItemFromMyList,
      changeUserLanguage,
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
