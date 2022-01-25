import React, { useState, useContext } from 'react';
import AppContext from 'context/AppContext';
import { getTitleYear } from 'utils';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';
import { searchTitles } from 'api/titles';
import { TMDB_PHOTO_URL } from 'constants';
import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { TITLE_ROUTE, SEARCH_ROUTE } from 'routes';

const SearchBar = () => {
  const [searchText, setSearchText] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const { data: { userData } } = useContext(AppContext);
  const { push } = useRouter();
  const { t } = useTranslation();
  const [data, setData] = useState([]);

  const handleChange = (event) => {
    setSearchText(event.target.value);
    if (event.target.value !== '') {
      setTimeout(async () => {
        const { results } = await searchTitles(
          { language: userData.language, query: event.target.value },
        );
        setData(results);
      }, 2000);
    } else {
      setData([]);
    }
  };

  const handleSearch = (event) => {
    if (event.key === 'Enter') {
      push(`${SEARCH_ROUTE}?query=${searchText}`);
    }
  };

  return (
    <>
      <div className={`flex items-center bg-gray-800 rounded-sm border px-4 py-1 mr-4 md:mr-8 xl:mr-12 ${isFocus ? 'border-primary' : 'border-gray-800'}`}>
        <MagnifyingGlassIcon className={`${isFocus ? 'text-primary' : 'text-white'} mr-4`} />
        <input
          type="text"
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleSearch}
          className="bg-transparent focus:outline-none outline-none border-none text-white xl:w-48"
          onFocus={() => {
            setIsFocus(true);
          }}
          onBlur={() => {
            setTimeout(() => {
              setIsFocus(false);
            }, 500);
          }}
          placeholder={t('SEARCH_PLACEHOLDER')}
        />
      </div>
      {data?.length > 0 && isFocus && (
      <div className="flex flex-col absolute bg-gray-900 px-2 py-2 rounded-sm shadow-sm top-16 w-64">
        {data.map((title, index) => {
          if (index <= 9) {
            return (
              <Link href={`${TITLE_ROUTE}/${title.id}`}>
                <div className="flex items-center justify-between mb-1 py-1 hover:bg-gray-800 rounded-sm cursor-pointer transition duration-300" key={`search-item-${title.id}`}>
                  <img src={`${TMDB_PHOTO_URL}/${title.poster_path}`} className="rounded-sm" width="28" alt={`search-item-poster-${title.id}`} />
                  <div className="flex flex-col">
                    <span className="text-white overflow-hidden overflow-ellipsis w-48 whitespace-nowrap">{title.title}</span>
                    <span className="text-gray-400 text-xs">{title.release_date && getTitleYear(title.release_date)}</span>
                  </div>
                </div>
              </Link>
            );
          }
          return null;
        })}
      </div>
      )}
    </>
  );
};

export default SearchBar;
