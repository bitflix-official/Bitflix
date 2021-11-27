import PropTypes from 'prop-types';
import React from 'react';
import { useRouter } from 'next/router';
import { getTitle } from '../../../api/titles';

const Title = ({ pageProps }) => {
  const { push } = useRouter();
  const { title } = pageProps;
  const titleIsValid = title && title.torrents?.length > 0;

  if (process.browser && !titleIsValid) {
    push('/404');
  }

  return (
    <div className="text-white">{title.title}</div>
  );
};

Title.propTypes = {
  pageProps: PropTypes.shape({
    title: PropTypes.shape({
      title: PropTypes.string,
      torrents: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
};

export const getStaticPaths = () => ({
  paths: [],
  fallback: 'blocking',
});

export const getStaticProps = async (context) => {
  const { params: { id: titleId } } = context;
  try {
    const { status, data: { movie: title } } = await getTitle(titleId);
    return { props: { title, status } };
  } catch (err) {
    return { props: { title: {} } };
  }
};

export default Title;
