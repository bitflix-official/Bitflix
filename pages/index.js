import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import { AppWrapper, Header, TitlesCarousel } from 'components';
import { HOME_ROUTE } from 'routes';
import { getTitles } from 'api/titles';

const Home = ({ pageProps }) => {
  const { lastAddedItems, actionItems } = pageProps;
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
          <TitlesCarousel title="Last added" subtitle="The latest movies added on YTS" items={lastAddedItems} />
          <TitlesCarousel title="Action" items={actionItems} />
        </div>
      </AppWrapper>
    </div>
  );
};

Home.propTypes = {
  pageProps: PropTypes.shape({
    lastAddedItems: PropTypes.arrayOf(PropTypes.shape({})),
    actionItems: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export const getStaticProps = async () => {
  const { data: { movies: lastAddedItems } } = await getTitles({});
  const { data: { movies: actionItems } } = await getTitles({ genre: 'action' });
  return {
    props: {
      lastAddedItems,
      actionItems,
    },
  };
};

export default Home;
