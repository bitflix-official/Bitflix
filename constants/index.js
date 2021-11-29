import { router } from 'next';
import { supabaseUrl } from 'utils/supabaseClient';
import { HOME_ROUTE, PROFILE_ROUTE } from '../routes';

export const appName = 'Bitflix';

export const shortcuts = [
  {
    id: 'home',
    name: 'Home',
    shortcut: ['h'],
    keywords: 'home',
    perform: () => { router.push(HOME_ROUTE); },
  },
  {
    id: 'profile',
    name: 'Profile',
    shortcut: ['p'],
    keywords: 'profile',
    perform: () => { router.push(PROFILE_ROUTE); },
  },
];

export const YTS_API_URL = 'https://yts.mx/api/v2';

export const supabaseBucketPhotosURL = `${supabaseUrl}/storage/v1/object/public/photos`;

export const defaultProfilePicture = `${supabaseBucketPhotosURL}/cat.png`;

export const primaryColor = '#2361e0';

export const summaryUnavailablePlaceholder = 'Summary not available for this title.';
