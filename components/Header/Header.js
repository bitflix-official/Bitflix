import PropTypes from 'prop-types';
import React from 'react';
import HeaderMenu from './HeaderMenu';
import styles from './header.module.css';

const Header = ({ leftContent }) => (
  <div className={`${styles.header} fixed w-full bg-black px-12 2xl:px-16 h-18 flex items-center z-10`}>
    <div className="py-5 flex items-center w-full justify-between">
      <div className="flex items-center">
        {leftContent}
      </div>
      <HeaderMenu />
    </div>
  </div>
);

Header.propTypes = {
  leftContent: PropTypes.element.isRequired,
};

export default Header;
