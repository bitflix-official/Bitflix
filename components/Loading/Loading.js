import React from 'react';
import { Spinner } from 'components';

const Loading = () => (
  <div className="flex items-center justify-center h-screen text-white w-full">
    <Spinner />
  </div>
);

export default Loading;
