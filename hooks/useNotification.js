import { toast } from 'react-toastify';

const useNotification = (message, type) => () => {
  toast(message, {
    position: 'bottom-left',
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
    type,
  });
};

export default useNotification;
