import { appName } from 'constants';
import { supabase } from './supabaseClient';

export const getMetaTitle = (str) => `${str} | ${appName}`;

export const isLastItem = (item, arr) => (item + 1 === arr.length);

export const isEmail = (str = '') => {
  const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(str);
};

export const downloadImage = async (path) => {
  try {
    const { data, error } = await supabase.storage.from('photos').download(path);
    if (error) throw error;
    const blobUrl = URL.createObjectURL(data);
    return blobUrl;
  } catch (err) {
    return err;
  }
};

export const updateProfile = async ({
  username, first_name: firstName, last_name: lastName,
  profile_photo: profilePhoto,
}) => {
  try {
    const user = supabase.auth.user();
    const updates = {
      id: user.id,
      username,
      first_name: firstName,
      last_name: lastName,
      profile_photo: profilePhoto,
      updated_at: new Date(),
    };
    const { error } = await supabase.from('profiles').upsert(updates, {
      returning: 'minimal',
    });
    if (error) throw error;
    return user;
  } catch (err) {
    return err;
  }
};

export const uploadAvatar = async (event, userData) => {
  try {
    if (!event.target.files || event.target.files.length === 0) {
      throw new Error('You must select an image to upload.');
    }
    const file = event.target.files[0];
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('photos')
      .upload(filePath, file);

    if (uploadError) {
      throw uploadError;
    }

    return ({ ...userData, profile_photo: filePath });
  } catch (err) {
    return err;
  }
};

export const canGoBack = () => {
  const { history: { length } } = window;
  if (length > 2) return true;
  return false;
};
