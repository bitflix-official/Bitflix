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

export const TMDB_CAST_URL = 'https://www.themoviedb.org/t/p/w90_and_h90_face';

export const primaryColor = '#2361e0';

export const summaryUnavailablePlaceholder = 'SUMMARY_UNAVAILABLE';

export const genres = [{ id: 28, name: 'ACTION' }, { id: 12, name: 'ADVENTURE' }, { id: 16, name: 'ANIMATION' }, { id: 35, name: 'COMEDY' }, { id: 80, name: 'CRIME' }, { id: 99, name: 'DOCUMENTARY' }, { id: 18, name: 'DRAMA' }, { id: 10751, name: 'FAMILY' }, { id: 14, name: 'FANTASY' }, { id: 36, name: 'HISTORY' }, { id: 27, name: 'HORROR' }, { id: 10402, name: 'MUSIC' }, { id: 9648, name: 'MISTERY' }, { id: 10749, name: 'ROMANCE' }, { id: 878, name: 'SCIFI' }, { id: 53, name: 'THRILLER' }, { id: 10752, name: 'WAR' }, { id: 37, name: 'WESTERN' }];

export const companies = [
  {
    id: '2|3475',
    name: 'Disney',
    img: 'https://anthoncode.com/wp-content/uploads/2020/03/Disney-logo-white.png',
  },
  {
    id: '3',
    name: 'Pixar',
    img: 'https://www.pngplay.com/wp-content/uploads/9/Pixar-Logo-PNG-Clipart-Background.png',
  },
  {
    id: '7505|420',
    name: 'Marvel',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Marvel_Logo.svg/2560px-Marvel_Logo.svg.png',
  },
  {
    id: '9993|429',
    name: 'DC',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/1200px-DC_Comics_logo.svg.png',
  },
  {
    id: '7521',
    name: 'National Geographic',
    img: 'https://i.natgeofe.com/n/4da26b5c-18ee-413f-96dd-4cf3fb4a68a0/2fl-white.png',
  },
  {
    id: '17',
    name: 'Warner Bros',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Warner_Bros_logo.svg/1965px-Warner_Bros_logo.svg.png',
  },
  {
    id: '1',
    name: 'Lucas Film',
    img: 'https://www.storylandstudios.com/wp-content/uploads/2017/11/lucas-film-logo.png',
  },
  {
    id: '4',
    name: 'Paramount',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Paramount_Pictures_logo_%282021%29.svg/1200px-Paramount_Pictures_logo_%282021%29.svg.png',
  },
  {
    id: '34',
    name: 'Sony',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d2/Sony_logo_%28white%29.svg/1200px-Sony_logo_%28white%29.svg.png',
  },
  {
    id: '21',
    name: 'Metro-Goldwyn-Mayer',
    img: 'https://upload.wikimedia.org/wikipedia/ru/f/f2/MGM_logo.png',
  },
  {
    id: '5',
    name: 'Columbia Pictures',
    img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Columbia_Sportswear_Co_logo.svg/2560px-Columbia_Sportswear_Co_logo.svg.png',
  },
  {
    id: '7',
    name: 'DreamWorks',
    img: 'https://1000marcas.net/wp-content/uploads/2020/02/logo-DreamWorks-1.png',
  },
];
