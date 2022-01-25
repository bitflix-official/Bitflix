/* eslint-disable no-restricted-syntax */
/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import AppContext from 'context/AppContext';
import {
  AppWrapper, CompaniesContainer, Header, Loading, TitlesCarousel,
} from 'components';
import { useNotification } from 'hooks';
import { getTitles } from 'api/titles';
import { genres } from 'constants';

const Home = () => {
  const { data: { userSession, userData } } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const showError = useNotification('An error ocurred when getting latest titles', 'error');
  const [recentlyAdded, setRecentlyAdded] = useState([{}]);
  const [popularMovies, setPopularMovies] = useState([{}]);
  const [dataByGenre, setDataByGenre] = useState([{}]);

  useEffect(async () => {
    const getData = async (language) => {
      try {
        const { results } = await getTitles({ language });
        const { results: popularity } = await getTitles({ language, sortBy: 'vote_count.desc' });
        setRecentlyAdded([
          { title: t('RECENTLY_ADDED'), subtitle: t('DISCOVER_NEW_TITLES'), items: results },
        ]);
        setPopularMovies([
          { title: t('POPULARITY'), items: popularity },
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
    if (popularMovies[0].items) {
      const items = [];
      for await (const genre of genres) {
        const { results } = await getTitles({ genres: genre.id, language: userData.language });
        items.push({ items: results, title: t(genre.name) });
      }
      setDataByGenre(items);
    }
  }, [popularMovies]);

  if (loading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <Header />
      <AppWrapper>
        <div className="mt-16">
          <CompaniesContainer />
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
            popularMovies.map((carousel, index) => (
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
