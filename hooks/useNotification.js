/* eslint-disable default-param-last */
import { toast } from 'react-toastify';

const useNotification = (message, type = 'default', { ...args } = {}) => () => {
  toast(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
    type,
    ...args,
  });
};

export default useNotification;
