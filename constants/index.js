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

export const TMDB_PHOTO_URL = 'https://www.themoviedb.org/t/p/w200';

export const TMDB_PHOTO_URL_FULL = 'https://www.themoviedb.org/t/p/original';

export const TMDB_CAST_PHOTO_URL = 'https://www.themoviedb.org/t/p/original';

export const TMDB_EPISODE_PHOTO_URL = 'https://www.themoviedb.org/t/p/original';

export const primaryColor = '#2361e0';

export const summaryUnavailablePlaceholder = 'SUMMARY_UNAVAILABLE';

export const genres = [{ id: 28, name: 'ACTION' }, { id: 12, name: 'ADVENTURE' }, { id: 16, name: 'ANIMATION' }, { id: 35, name: 'COMEDY' }, { id: 80, name: 'CRIME' }, { id: 99, name: 'DOCUMENTARY' }, { id: 18, name: 'DRAMA' }, { id: 10751, name: 'FAMILY' }, { id: 14, name: 'FANTASY' }, { id: 36, name: 'HISTORY' }, { id: 27, name: 'HORROR' }, { id: 10402, name: 'MUSIC' }, { id: 9648, name: 'MISTERY' }, { id: 10749, name: 'ROMANCE' }, { id: 878, name: 'SCIFI' }, { id: 53, name: 'THRILLER' }, { id: 10752, name: 'WAR' }, { id: 37, name: 'WESTERN' }];

export const companies = [
  {
    id: '2|3475',
    name: 'Disney',
    img: `${supabaseBucketPhotosURL}/Disney-logo-white.png`,
  },
  {
    id: '3',
    name: 'Pixar',
    img: `${supabaseBucketPhotosURL}/Pixar-Logo-PNG-Clipart-Background.png`,
  },
  {
    id: '7505|420',
    name: 'Marvel',
    img: `${supabaseBucketPhotosURL}/Marvel_Logo.svg.png`,
  },
  {
    id: '9993|429',
    name: 'DC',
    img: `${supabaseBucketPhotosURL}/DC_Comics_logo.svg.png`,
  },
  {
    id: '7521',
    name: 'National Geographic',
    img: `${supabaseBucketPhotosURL}/2fl-white.webp`,
  },
  {
    id: '17',
    name: 'Warner Bros',
    img: `${supabaseBucketPhotosURL}/Warner_Bros_logo.svg.png`,
  },
  {
    id: '1',
    name: 'Lucas Film',
    img: `${supabaseBucketPhotosURL}/lucas-film-logo.png`,
  },
  {
    id: '4',
    name: 'Paramount',
    img: `${supabaseBucketPhotosURL}/paramount-plus-logo-1.png`,
  },
  {
    id: '34',
    name: 'Sony',
    img: `${supabaseBucketPhotosURL}/Sony_logo_%28white%29.svg.png`,
  },
  {
    id: '21',
    name: 'Metro-Goldwyn-Mayer',
    img: `${supabaseBucketPhotosURL}/MGM_logo.png`,
  },
  {
    id: '5',
    name: 'Columbia Pictures',
    img: `${supabaseBucketPhotosURL}/2560px-Columbia_Sportswear_Co_logo.svg.png`,
  },
  {
    id: '7',
    name: 'DreamWorks',
    img: `${supabaseBucketPhotosURL}/logo-DreamWorks-1.png`,
  },
];
