/* eslint-disable react/jsx-indent */
/* eslint-disable no-nested-ternary */
import React from 'react';
import {
  Header, AppWrapper,
} from 'components';
import { useTranslation } from 'react-i18next';

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Header />
      <AppWrapper>
        <span className="h-screen flex items-center justify-center text-white text-2xl">{t('PAGE_NOT_FOUND')}</span>
      </AppWrapper>
    </div>
  );
};
export default NotFoundPage;
