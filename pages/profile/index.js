import React, { useContext, useRef, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import AppContext from 'context/AppContext';
import { useNotification } from 'hooks';
import { useRouter } from 'next/router';
import {
  AppWrapper, BackButton, Header, Loading,
} from 'components';
import { HOME_ROUTE, LOGIN_ROUTE } from 'routes';
import * as Tooltip from '@radix-ui/react-tooltip';
import { updateProfile, uploadAvatar } from 'utils';
import { defaultProfilePicture, supabaseBucketPhotosURL } from 'constants';

const Profile = () => {
  const { push } = useRouter();
  const showError = useNotification('An error ocurred', 'error');
  const { data: { userData }, actions: { handleUserData } } = useContext(AppContext);
  const [uploadingProfilePhoto, setUploadingProfilePhoto] = useState({ status: false, message: '' });
  const uploadInputEl = useRef(null);
  const isLoading = !userData.id;

  if (process.browser && !userData) {
    push(LOGIN_ROUTE);
  }

  const handleFileUpload = (e) => {
    setUploadingProfilePhoto({ status: true, message: 'Uploading your new profile photo...' });
    uploadAvatar(e, userData)
      .then((data) => {
        handleUserData(data);
        updateProfile(data).then(() => {
          setUploadingProfilePhoto({ status: true, message: 'Looks great!' });
          setTimeout(() => {
            setUploadingProfilePhoto({ ...uploadingProfilePhoto, status: false });
          }, 2000);
        });
      })
      .catch(() => {
        showError();
      });
  };

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <Header
        leftContent={(
          <BackButton link={HOME_ROUTE} />
          )}
      />
      <AppWrapper>
        <div className="pt-16 transition-all duration-300">
          <div className="flex items-center my-12 w-full">
            <div className="flex flex-col items-center w-full">
              <input
                type="file"
                id="single"
                accept="image/*"
                hidden
                ref={uploadInputEl}
                onChange={handleFileUpload}
              />
              <Tooltip.Root>
                <Tooltip.Trigger className="cursor-default">
                  <button
                    type="button"
                    className={`outline-none border-none transition-all duration-300 hover:opacity-80 ${uploadingProfilePhoto.status && 'cursor-default'}`}
                    onClick={() => {
                      if (!uploadingProfilePhoto.status) {
                        uploadInputEl?.current.click();
                      }
                    }}
                  >
                    <img
                      src={userData.profile_photo ? `${supabaseBucketPhotosURL}/${userData.profile_photo}` : defaultProfilePicture}
                      className={`transition-all duration-700 rounded-full w-32 h-32 ${uploadingProfilePhoto.status && 'opacity-0'}`}
                      alt="user_profile_photo"
                    />
                  </button>
                </Tooltip.Trigger>
                {
                    !uploadingProfilePhoto.status && (
                    <Tooltip.Content side="right">
                      <div className="text-white bg-gray-800 shadow-md rounded-md px-2 text-sm py-2 ml-4">Change profile photo</div>
                    </Tooltip.Content>
                    )
                  }
              </Tooltip.Root>
              <div className={`transition-all w-80 text-center duration-700 text-white bg-primary mt-12 absolute py-2 px-4 rounded-md cursor-default ${uploadingProfilePhoto.status ? 'visible opacity-100' : 'invisible opacity-0'}`}>{uploadingProfilePhoto.message}</div>
              <span className="font-semibold text-white text-xl mt-4">{`${userData.first_name} ${userData.last_name}`}</span>
              <span className="text-gray-200 text-sm">
                {`@${userData.username}`}
              </span>
            </div>
          </div>
        </div>
      </AppWrapper>
    </div>
  );
};

export default Profile;
