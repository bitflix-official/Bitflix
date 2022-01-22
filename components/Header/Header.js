import PropTypes from 'prop-types';
import React from 'react';
import HeaderMenu from './HeaderMenu';
import styles from './header.module.css';

const Header = ({ leftContent, transparent }) => (
  <div style={{ backgroundColor: transparent ? 'transparent' : '#080808d9' }} className={`${!transparent && styles.header} fixed w-full px-16 md:px-24 2xl:px-32 h-16 flex items-center z-30 ${!transparent && 'shadow-xl'}`}>
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
  transparent: PropTypes.bool,
};

Header.defaultProps = {
  transparent: false,
};

export default Header;
