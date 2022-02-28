/* eslint-disable no-async-promise-executor */
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
      }
    };
    if (userSession !== undefined && userData !== undefined) {
      getData(userData.language || i18n.language);
    }
  }, [userSession, userData, userData?.language]);

  useEffect(async () => {
    if (
      userSession !== undefined && userData !== undefined
      && dataByGenre.length === 1 && loading
    ) {
      const genreData = new Promise(async (resolve, reject) => {
        const items = [];
        if (loading && dataByGenre.length !== genres.length) {
          try {
            for await (const genre of genres) {
              const { results } = await getTitles(
                { genres: genre.id, language: userData.language },
              );
              items.push({ items: await results, title: t(genre.name) });
              if (genres.length === items.length) {
                setTimeout(() => {
                  setLoading(false);
                }, 2000);
              }
            }
            resolve(items);
          } catch (err) {
            reject(err);
          }
        }
      });
      if (loading && dataByGenre.length !== genres.length) {
        Promise.all([genreData]).then((d) => {
          if (genres.length === d[0].length) {
            setDataByGenre(d[0]);
          }
        });
      }
      return null;
    }
    return null;
  }, [userData?.language]);

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
            dataByGenre.map((carousel, index) => (
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
