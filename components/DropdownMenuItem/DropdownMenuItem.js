/* eslint-disable react/jsx-props-no-spreading */
import PropTypes from 'prop-types';
import React from 'react';
import { DropdownMenuItem as RadixDropdownMenuItem } from '@radix-ui/react-dropdown-menu';

const DropdownMenuItem = ({ className, children, ...args }) => (
  <RadixDropdownMenuItem className={`cursor-pointer flex items-center justify-between px-4 py-1 outline-none border-0 transition duration-300 select-none ${className}`} {...args}>
    {children}
  </RadixDropdownMenuItem>
);

DropdownMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

DropdownMenuItem.defaultProps = {
  className: '',
};

export default DropdownMenuItem;
