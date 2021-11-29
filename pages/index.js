/* eslint-disable react/no-array-index-key */
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppWrapper, Header, TitlesCarousel } from 'components';
import { HOME_ROUTE } from 'routes';
import { getTitles } from 'api/titles';

const Home = ({ pageProps }) => {
  const { lastAdded } = pageProps;
  const [initialData, setInitialData] = useState([{}]);
  const [secondData, setSecondData] = useState([{}]);
  const [thirdData, setThirdData] = useState([{}]);
  const [quarterData, setQuarterData] = useState([{}]);

  useEffect(async () => {
    const { data: { movies: actionMovies } } = await getTitles({ genre: 'action' });
    const { data: { movies: dramaMovies } } = await getTitles({ genre: 'drama' });
    const { data: { movies: romanceMovies } } = await getTitles({ genre: 'romance' });
    const { data: { movies: sciFiMovies } } = await getTitles({ genre: 'sci-fi' });
    setInitialData([
      { title: 'Action', items: actionMovies },
      { title: 'Drama', items: dramaMovies },
      { title: 'Romance', items: romanceMovies },
      { title: 'Sci-Fi', items: sciFiMovies },
    ]);
  }, []);

  useEffect(async () => {
    if (initialData.length > 1) {
      const { data: { movies: comedyMovies } } = await getTitles({ genre: 'comedy' });
      const { data: { movies: horrorMovies } } = await getTitles({ genre: 'horror' });
      const { data: { movies: animationMovies } } = await getTitles({ genre: 'animation' });
      const { data: { movies: fantasyMovies } } = await getTitles({ genre: 'fantasy' });
      setSecondData([
        { title: 'Comedy', items: comedyMovies },
        { title: 'Horror', items: horrorMovies },
        { title: 'Animation', items: animationMovies },
        { title: 'Fantasy', items: fantasyMovies },
      ]);
    }
  }, [initialData]);

  useEffect(async () => {
    if (secondData.length > 1) {
      const { data: { movies: thrillerMovies } } = await getTitles({ genre: 'thriller' });
      const { data: { movies: mysteryMovies } } = await getTitles({ genre: 'mystery' });
      const { data: { movies: crimeMovies } } = await getTitles({ genre: 'crime' });
      const { data: { movies: historyMovies } } = await getTitles({ genre: 'history' });
      setThirdData([
        { title: 'Thriller', items: thrillerMovies },
        { title: 'Mystery', items: mysteryMovies },
        { title: 'Crime', items: crimeMovies },
        { title: 'History', items: historyMovies },
      ]);
    }
  }, [secondData]);

  useEffect(async () => {
    if (thirdData.length > 1) {
      const { data: { movies: thisYearMovies } } = await getTitles({ sortBy: 'year' });
      const { data: { movies: mostWatchedMovies } } = await getTitles({ sortBy: 'download_count' });
      const { data: { movies: mostLikedMovies } } = await getTitles({ sortBy: 'like_count' });
      const { data: { movies: mostValoratedMovies } } = await getTitles({ sortBy: 'rating' });
      setQuarterData([
        { title: 'From this year', items: thisYearMovies },
        { title: 'Most watched', items: mostWatchedMovies },
        { title: 'Most liked', items: mostLikedMovies },
        { title: 'Top rated', items: mostValoratedMovies },
      ]);
    }
  }, [thirdData]);

  return (
    <div>
      <Header leftContent={(
        <Link href={HOME_ROUTE}>
          <span className="text-white text-2xl font-semibold cursor-pointer select-none">
            Movies
          </span>
        </Link>
    )}
      />
      <AppWrapper>
        <div className="mt-16">
          {
            lastAdded.map((carousel) => (
              <TitlesCarousel
                title={carousel.title}
                subtitle={carousel.subtitle}
                items={carousel.items}
                key={carousel.title}
              />
            ))
          }
          {
            initialData?.map((carousel, index) => (
              <TitlesCarousel
                title={carousel.title}
                subtitle={carousel.subtitle}
                items={carousel.items}
                key={`carousel-item-${index}`}
              />
            ))
          }
          {
            secondData?.map((carousel, index) => (
              <TitlesCarousel
                title={carousel.title}
                subtitle={carousel.subtitle}
                items={carousel.items}
                key={`carousel-item-${index}`}
              />
            ))
          }
          {
            thirdData?.map((carousel, index) => (
              <TitlesCarousel
                title={carousel.title}
                subtitle={carousel.subtitle}
                items={carousel.items}
                key={`carousel-item-${index}`}
              />
            ))
          }
          {
            quarterData?.map((carousel, index) => (
              <TitlesCarousel
                title={carousel.title}
                subtitle={carousel.subtitle}
                items={carousel.items}
                key={`carousel-item-${index}`}
              />
            ))
          }
        </div>
      </AppWrapper>
    </div>
  );
};

Home.propTypes = {
  pageProps: PropTypes.shape({
    lastAdded: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export const getStaticProps = async () => {
  const { data: { movies: lastAddedItems } } = await getTitles({});
  return {
    props: {
      lastAdded: [
        { title: 'Last added', subtitle: 'The latest movies added on YTS', items: lastAddedItems },
      ],
    },
  };
};

export default Home;
