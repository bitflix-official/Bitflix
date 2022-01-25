/* eslint-disable no-console */
import PropTypes from 'prop-types';
import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import Logo from 'assets/logo.png';
import { appName } from 'constants';
import AppContext from 'context/AppContext';
import { isEmail } from 'utils';
import { HOME_ROUTE } from 'routes';
import { signUp } from 'api/auth';
import { ErrorMessage, Header } from 'components';
import styles from './signup.module.css';

const InputElement = ({
  name, label, placeholder, type, value, refEl, onChange,
}) => (
  <label className="flex flex-col my-2" htmlFor={name}>
    <div className="text-gray-200">{label}</div>
    <input
      id={name}
      className="my-2 bg-gray-800 px-4 w-80 py-2 rounded-sm focus:border-primary border-2 border-transparent focus:outline-none transition duration-500"
      type={type}
      placeholder={placeholder}
      value={value}
      ref={refEl}
      onChange={onChange}
    />
  </label>
);

const Signup = () => {
  const { data: { userSession } } = useContext(AppContext);
  const userIsLoggedIn = userSession?.access_token;
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const firstNameEl = useRef(null);

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setError({});
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setError({});
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setError({});
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setError({});
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { message, status } = await signUp(email, password, {
        first_name: firstName,
        last_name: lastName,
      });
      if (status === 400) {
        setError({ description: t(message.toUpperCase().replaceAll(' ', '_')), status });
      } else router.push(HOME_ROUTE);
      return;
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (process.browser) {
      firstNameEl.current?.focus();
    }
  }, []);

  if (userIsLoggedIn) {
    router.push(HOME_ROUTE);
  }

  const isDisabled = loading || !isEmail(email) || password.length < 8 || !firstName || !lastName;

  return (
    <>
      <Header leftContent={<Link href={HOME_ROUTE}><div className="cursor-pointer relative w-10 h-10"><Image src={Logo.src} layout="fill" /></div></Link>} />
      <div className="flex pt-32 mx-auto w-max text-white">
        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">
              {t('SIGN_UP_ON')}
              &nbsp;
              {appName}
            </h1>
            <p className="mt-2 text-lg text-gray-300 w-96">
              {t('BY_SIGNING_UP_ON')}
              &nbsp;
              {appName}
              &nbsp;
              {t('REASON_TO_SIGN_UP')}
            </p>
          </div>
          <form onSubmit={handleSignUp} className="mt-8 mb-16 flex flex-col w-full">
            {error.description && <ErrorMessage message={error.description} />}
            <InputElement name="first_name" label={t('FIRST_NAME')} placeholder={t('FIRST_NAME')} type="text" value={firstName} onChange={handleFirstName} refEl={firstNameEl} />
            <InputElement name="last_name" label={t('LAST_NAME')} placeholder={t('LAST_NAME')} type="text" value={lastName} onChange={handleLastName} />
            <InputElement name="email" label={t('EMAIL')} placeholder={t('EMAIL')} type="email" value={email} onChange={handleEmail} />
            <InputElement name="password" label={t('PASSWORD')} placeholder="********" type="password" value={password} onChange={handlePassword} />
            <div>
              <input
                type="submit"
                className={`${styles.authButton} bg-primary hover:bg-blue-800 px-8 py-1 rounded-sm mt-4 cursor-pointer transition duration-500`}
                disabled={isDisabled}
                value={t('SIGN_UP')}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

InputElement.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  refEl: PropTypes.shape({}),
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

InputElement.defaultProps = {
  refEl: null,
};

export default Signup;
