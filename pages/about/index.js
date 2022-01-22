import React from 'react';
import {
  Header, AppWrapper, BackButton,
} from 'components';
import { HOME_ROUTE } from 'routes';
import { useTranslation } from 'react-i18next';
import { appSocialNetworks } from 'constants';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

const About = () => {
  const { t } = useTranslation();

  if (!appSocialNetworks) {
    return null;
  }

  return (
    <div>
      <Header
        leftContent={(
          <BackButton link={HOME_ROUTE} />
          )}
      />
      <AppWrapper>
        <div className="pt-16 transition-all duration-300 text-white mt-16">
          <h1 className="font-semibold text-2xl">{t('ABOUT_US')}</h1>
          <span className="text-gray-300 text-lg mt-4 block">{t('ABOUT_US_DESCRIPTION')}</span>
          <a href={appSocialNetworks.github} className="mt-4 rounded-sm py-1 px-4 bg-white text-gray-800 inline-flex items-center" target="_blank" rel="noreferrer">
            <GitHubLogoIcon className="mr-2" />
            {t('START_CONTRIBUTING')}
          </a>
        </div>
      </AppWrapper>
    </div>
  );
};

export default About;
