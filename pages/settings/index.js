import React, {
  useContext, useState,
} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from 'context/AppContext';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import { useNotification } from 'hooks';
import {
  AppWrapper, BackButton, Header, Loading, Spinner, UserTopContent,
} from 'components';
import { HOME_ROUTE, LOGIN_ROUTE } from 'routes';

const Settings = () => {
  const { push } = useRouter();
  const { t, i18n: app } = useTranslation();
  const dataSaved = useNotification(t('CHANGES_SAVED'), null, {
    closeButton: false, position: 'bottom-center', className: 'text-center',
  });
  const showError = useNotification(t('ERROR_OCURRED_CHANGING_LANGUAGE'), 'error');
  const { data: { userData }, actions: { changeUserLanguage } } = useContext(AppContext);
  const [updatingLanguage, setUpdatingLanguage] = useState(false);

  const changeAppLanguage = async () => {
    setUpdatingLanguage(true);
    try {
      await changeUserLanguage(app.language === 'en' ? 'es' : 'en');
      dataSaved();
    } catch (error) {
      showError();
    } finally {
      setUpdatingLanguage(false);
    }
  };

  const items = [
    {
      id: 1,
      title: t('LANGUAGE'),
      child: (
        <button
          type="button"
          className="text-gray-300 hover:text-primary transition duration-300 text-left md:text-center"
          onClick={changeAppLanguage}
          disabled={updatingLanguage}
        >
          {updatingLanguage ? (
            <div className="flex items-center">
              <Spinner size="0.8rem" />
              <span className="ml-2">
                {t('UPDATING_APP_LANGUAGE')}
                ...
              </span>
            </div>
          ) : `${t('CHANGE_LANGUAGE_TO')} ${app.language === 'en' ? 'Spanish' : 'Inglés'}`}
        </button>
      ),
    },
  ];

  if (userData === undefined) {
    return (
      <Loading />
    );
  }

  if (userData !== undefined && !userData.id) {
    push(LOGIN_ROUTE);
  }

  return (
    <div>
      <Header
        leftContent={(
          <BackButton link={HOME_ROUTE} />
        )}
      />
      <AppWrapper>
        <div className="pt-16 transition-all duration-300">
          <UserTopContent />
          <div className="flex flex-col items-center justify-center w-full">
            <h1 className="text-2xl text-white mb-4">{t('SETTINGS')}</h1>
            {items.map((setting) => (
              <div className="flex flex-col flex-wrap md:flex-row items-start md:items-center py-3 px-8 bg-gray-800 rounded-sm my-2 w-11/12 lg:w-9/12" key={`setting-id-${setting.id}`}>
                <span className="text-white mr-6 font-semibold">{setting.title}</span>
                {setting.child}
              </div>
            ))}
          </div>
        </div>
      </AppWrapper>
    </div>
  );
};

export default Settings;
