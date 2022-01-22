import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import * as Tooltip from '@radix-ui/react-tooltip';
import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { canGoBack } from 'utils';

const BackButton = ({ link, customText }) => {
  const { push, back } = useRouter();
  const { t } = useTranslation();
  const goBack = () => {
    if (canGoBack()) { back(); } else push(link);
  };
  return (
    <Tooltip.Root>
      <Tooltip.Trigger>
        <button
          type="button"
          className="text-white text-base font-semibold cursor-pointer select-none flex items-center px-4 py-1 hover:bg-gray-800 rounded-md -ml-4 transition duration-300"
          onClick={goBack}
        >
          <ArrowLeftIcon className="mr-2" />
          {customText || t('BACK')}
        </button>
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div className="text-white bg-gray-800 shadow-md rounded-md px-2 py-1.5 text-xs mt-4">{t('GO_PREVIOUS')}</div>
      </Tooltip.Content>
    </Tooltip.Root>
  );
};

BackButton.propTypes = {
  link: PropTypes.string.isRequired,
  customText: PropTypes.string,
};

BackButton.defaultProps = {
  customText: '',
};

export default BackButton;
