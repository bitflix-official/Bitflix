/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'context/AppContext';
import Link from 'next/link';
import {
  AppWrapper, Header, Loading, TitlesCarousel,
} from 'components';
import { useNotification } from 'hooks';
import { HOME_ROUTE } from 'routes';
import { getTitles } from 'api/titles';
import { genres } from 'constants';

const Home = () => {
  const { data: { userSession, userData } } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const showError = useNotification('An error ocurred when getting latest titles', 'error');
  const [recentlyAdded, setRecentlyAdded] = useState([{}]);
  const [dataByGenre, setDataByGenre] = useState([{}]);

  useEffect(async () => {
    const getData = async (language) => {
      try {
        const { results } = await getTitles({ language });
        setRecentlyAdded([
          { title: t('RECENTLY_ADDED'), subtitle: t('DISCOVER_NEW_TITLES'), items: results },
        ]);
      } catch (err) {
        showError();
      } finally {
        setLoading(false);
      }
    };
    if (!recentlyAdded[0].items && userSession !== undefined && userData !== undefined) {
      getData(userData.language || i18n.language);
    }
  }, [userSession, userData, userData?.language]);

  useEffect(async () => {
    if (recentlyAdded[0].items) {
      const items = [];
      for await (const genre of genres) {
        const { results } = await getTitles({ genres: genre.id, language: userData.language });
        items.push({ items: results, title: t(genre.name) });
      }
      setDataByGenre(items);
    }
  }, [recentlyAdded]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <Header leftContent={(
        <Link href={HOME_ROUTE}>
          <span className="text-white text-2xl font-semibold cursor-pointer select-none">
            {t('MOVIES')}
          </span>
        </Link>
    )}
      />
      <AppWrapper>
        <div className="mt-16">
          {
            recentlyAdded.map((carousel, index) => (
              <TitlesCarousel
                title={carousel.title}
                subtitle={carousel.subtitle}
                items={carousel.items}
                key={`${carousel.item}-${index}`}
              />
            ))
          }
          {
            dataByGenre?.map((carousel, index) => (
              <TitlesCarousel
                title={carousel.title}
                subtitle={carousel.subtitle}
                items={carousel.items}
                key={`carousel-item-by-genre-${index}`}
              />
            ))
          }
        </div>
      </AppWrapper>
    </div>
  );
};

export default Home;
