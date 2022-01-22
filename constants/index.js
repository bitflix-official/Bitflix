import { router } from 'next';
import { supabaseUrl } from 'utils/supabaseClient';
import {
  ABOUT_ROUTE, HOME_ROUTE, LIST_ROUTE, SETTINGS_ROUTE,
} from 'routes';

export const appName = 'Bitflix';

export const appSocialNetworks = {
  twitter: 'https://twitter.com/bitflixapp',
  instagram: 'https://www.instagram.com/bitflixapp/',
  github: 'https://github.com/bitflix-official/',
};

export const shortcuts = [
  {
    id: 'home',
    name: 'Home',
    shortcut: ['h'],
    keywords: 'home',
    perform: () => { router.push(HOME_ROUTE); },
  },
  {
    id: 'list',
    name: 'List',
    shortcut: ['l'],
    keywords: 'list',
    perform: () => { router.push(LIST_ROUTE); },
  },
  {
    id: 'settings',
    name: 'Settings',
    shortcut: ['s'],
    keywords: 'settings',
    perform: () => { router.push(SETTINGS_ROUTE); },
  },
  {
    id: 'about',
    name: 'About',
    shortcut: ['a'],
    keywords: 'about',
    perform: () => { router.push(ABOUT_ROUTE); },
  },
  {
    id: 'support',
    name: 'Support',
    shortcut: ['t'],
    keywords: 'support',
    perform: () => { window.open(appSocialNetworks.twitter, '_blank')?.focus(); },
  },
];

export const YTS_API_URL = 'https://yts.mx/api/v2';

export const TMDB_API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;

export const supabaseBucketPhotosURL = `${supabaseUrl}/storage/v1/object/public/photos`;

export const defaultProfilePicture = `${supabaseBucketPhotosURL}/cat.png`;

export const TMDB_PHOTO_URL = 'https://www.themoviedb.org/t/p/w1280';

export const primaryColor = '#2361e0';

export const summaryUnavailablePlaceholder = 'SUMMARY_UNAVAILABLE';

export const genres = [{ id: 28, name: 'ACTION' }, { id: 12, name: 'ADVENTURE' }, { id: 16, name: 'ANIMATION' }, { id: 35, name: 'COMEDY' }, { id: 80, name: 'CRIME' }, { id: 99, name: 'DOCUMENTARY' }, { id: 18, name: 'DRAMA' }, { id: 10751, name: 'FAMILY' }, { id: 14, name: 'FANTASY' }, { id: 36, name: 'HISTORY' }, { id: 27, name: 'HORROR' }, { id: 10402, name: 'MUSIC' }, { id: 9648, name: 'MISTERY' }, { id: 10749, name: 'ROMANCE' }, { id: 878, name: 'SCIFI' }, { id: 53, name: 'THRILLER' }, { id: 10752, name: 'WAR' }, { id: 37, name: 'WESTERN' }];
