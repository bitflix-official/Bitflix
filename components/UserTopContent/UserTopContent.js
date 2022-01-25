import React, { useState, useRef, useContext } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { useNotification } from 'hooks';
import AppContext from 'context/AppContext';
import { updateProfile, uploadAvatar } from 'utils';
import { defaultProfilePicture, supabaseBucketPhotosURL } from 'constants';

const UserTopContent = () => {
  const showError = useNotification('An error ocurred', 'error');
  const { data: { userData }, actions: { handleUserData } } = useContext(AppContext);
  const [uploadingProfilePhoto, setUploadingProfilePhoto] = useState({ status: false, message: '' });
  const uploadInputEl = useRef(null);

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

  return (
    <>
      <div className="flex items-center mt-12 w-full">
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
                  src={userData?.profile_photo ? `${supabaseBucketPhotosURL}/${userData?.profile_photo}` : defaultProfilePicture}
                  className={`transition-all duration-700 rounded-full w-28 h-28 ${uploadingProfilePhoto.status && 'opacity-0'}`}
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
          <span className="font-semibold text-white text-xl mt-4">{`${userData?.first_name} ${userData?.last_name}`}</span>
        </div>
      </div>
      <div className="w-full mx-auto border border-gray-900 my-10" />
    </>
  );
};

export default UserTopContent;
