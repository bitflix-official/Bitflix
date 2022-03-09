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
import InfiniteScroll from 'react-infinite-scroll-component';

const Home = () => {
  const { data: { userSession, userData } } = useContext(AppContext);
  const { t, i18n } = useTranslation();
  const [loading, setLoading] = useState(true);
  const showError = useNotification('An error ocurred when getting latest titles', 'error');
  const [recentlyAdded, setRecentlyAdded] = useState([{}]);
  const [popularMovies, setPopularMovies] = useState([{}]);
  const [dataByGenre, setDataByGenre] = useState([]);

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
        setLoading(false);
      } catch (err) {
        showError();
      }
    };
    if (userSession !== undefined && userData !== undefined) {
      getData(userData.language || i18n.language);
    }
  }, [userSession, userData, userData?.language]);

  const getGenres = async () => {
    try {
      const genreToFetch = genres[dataByGenre.length];
      const { results } = await getTitles(
        { genres: genreToFetch.id, language: userData.language },
      );
      setDataByGenre([...dataByGenre, { items: await results, title: t(genreToFetch.name) }]);
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (window) {
      const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
      if (userData !== undefined && !hasScrollbar) {
        getGenres();
      }
    }
  }, [userData]);

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
          <InfiniteScroll
            dataLength={dataByGenre.length}
            next={getGenres}
            hasMore={dataByGenre.length !== genres.length}
            loader={(
              <TitlesCarousel />
            )}
            scrollThreshold={1}
          >
            {
              recentlyAdded?.map((carousel, index) => (
                <TitlesCarousel
                  title={carousel.title}
                  subtitle={carousel.subtitle}
                  items={carousel.items}
                  key={`${carousel.item}-${index}`}
                />
              ))
            }
            {
              popularMovies?.map((carousel, index) => (
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
          </InfiniteScroll>
        </div>
      </AppWrapper>
    </div>
  );
};

export default Home;
