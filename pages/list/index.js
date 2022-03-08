/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import React, {
  useContext, useState, useEffect,
} from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from 'context/AppContext';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  AppWrapper, BackButton, Header, Loading, TitlesCarousel, UserTopContent,
} from 'components';
import { HOME_ROUTE, LOGIN_ROUTE } from 'routes';
import { getTitleData } from 'api/titles';
import { t } from 'i18next';

const List = () => {
  const { push } = useRouter();
  const { data: { userData, userSession }, actions: { handleUserData } } = useContext(AppContext);
  const [myList, setMyList] = useState([]);

  const isLoading = () => {
    if (!userData?.id
      || (userData?.list && JSON.parse(userData.list).length && !myList.length)) return true;
    return false;
  };

  if (process.browser && !isLoading() && !userData.id) {
    push(LOGIN_ROUTE);
  }

  useEffect(() => {
    if (userSession?.user && !userData?.id) {
      handleUserData();
    }
  }, [userSession]);

  useEffect(async () => {
    if (userData?.list) {
      const currentUserList = JSON.parse(userData.list);
      const listWithData = [];
      for (const titles of currentUserList) {
        const title = await getTitleData({ id: titles.id, language: userData.language, type: titles.type || 'movie' });
        listWithData.push(title);
      }
      setMyList(listWithData);
    }
  }, [userData]);

  if (isLoading()) {
    return (
      <Loading />
    );
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
          {myList.length ? <TitlesCarousel title={t('MY_LIST')} items={myList} /> : (
            <div className="flex flex-col items-center justify-center w-full">
              <h1 className="text-2xl text-white">{t('NO_TITLE_ADDED')}</h1>
              <span className="text-base text-gray-300 mt-1.5">{t('NO_TITLE_ADDED_2')}</span>
              <Link href={HOME_ROUTE}><button type="button" className="bg-primary hover:bg-blue-700 px-8 transition duration-300 py-1.5 rounded-sm mt-5 text-white">{t('EXPLORE')}</button></Link>
            </div>
          )}
        </div>
      </AppWrapper>
    </div>
  );
};

export default List;
