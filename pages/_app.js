import PropTypes from 'prop-types';
import React from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import { KBarProvider } from 'kbar';
import { ToastContainer } from 'react-toastify';
import Logo from 'assets/logo.png';
import { appName, shortcuts } from '../constants';
import AppProvider from '../context/AppProvider';
import 'tailwindcss/tailwind.css';
import 'nprogress/nprogress.css';
import './index.css';

const TopProgressBar = dynamic(
  () => import('../components/TopProgressBar'),
  { ssr: false },
);

const App = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>{appName}</title>
      <meta charSet="UTF-8" />
      <meta name="description" content="Watch HD movies instantly for free, directly in your browser." />
      <meta name="keywords" content="movies,hd,streaming,torrents,free" />
      <meta name="author" content="Nuzze" />
      <meta name="viewport" content="width=device-width,initial-scale=1.0" />
      <link rel="icon" href={Logo.src} type="image/png" />
    </Head>
    <AppProvider>
      <KBarProvider actions={shortcuts}>
        <TopProgressBar />
        <Component pageProps={pageProps} />
        <ToastContainer />
      </KBarProvider>
    </AppProvider>
  </>
);

App.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.shape({}).isRequired,
};

export default App;
