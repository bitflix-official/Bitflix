import PropTypes from 'prop-types';
import React, {
  useState, useContext, useRef, useEffect,
} from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '../../assets/logo.png';
import { appName } from '../../constants';
import AppContext from '../../context/AppContext';
import { isEmail } from '../../utils';
import { HOME_ROUTE } from '../../routes';
import styles from './login.module.css';
import { signIn } from '../../api/auth';
import { Header } from '../../components';

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

const Login = () => {
  const { data: { userSession } } = useContext(AppContext);
  const userIsLoggedIn = userSession?.access_token;
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState({});
  const emailEl = useRef(null);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error: signInError } = await signIn(email, password);
      if (signInError) throw error;
      else router.push(HOME_ROUTE);
    } catch (err) {
      setError({ description: err.error_description, message: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (process.browser) {
      emailEl.current?.focus();
    }
  }, []);

  if (userIsLoggedIn) {
    router.push(HOME_ROUTE);
  }

  const isDisabled = loading || !isEmail(email) || password.length < 8;

  return (
    <>
      <Header leftContent={<Link href={HOME_ROUTE}><div className="cursor-pointer relative w-10 h-10"><Image src={Logo.src} layout="fill" /></div></Link>} />
      <div className="flex pt-48 mx-auto w-max text-white">
        <div className="flex flex-col w-full">
          <div className="flex flex-col">
            <h1 className="text-3xl font-bold">
              Sign in on&nbsp;
              {appName}
            </h1>
          </div>
          <form onSubmit={handleSignIn} className="mt-8 mb-16 flex flex-col w-full">
            <InputElement name="email" label="Email" placeholder="Email" type="email" value={email} onChange={handleEmail} refEl={emailEl} />
            <InputElement name="password" label="Password" placeholder="********" type="password" value={password} onChange={handlePassword} />
            <div>
              <input
                type="submit"
                className={`${styles.authButton} bg-primary hover:bg-blue-800 px-8 py-1 rounded-sm mt-4 cursor-pointer transition duration-500`}
                disabled={isDisabled}
                value="Sign in"
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

export default Login;
