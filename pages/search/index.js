import React, { useState, useEffect, useContext } from 'react';
import {
  Header, AppWrapper, Loading, Item,
} from 'components';
import { searchTitles } from 'api/titles';
import { useTranslation } from 'react-i18next';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useRouter } from 'next/router';
import AppContext from 'context/AppContext';
import { useNotification } from 'hooks';
import i18n from 'i18n';

const Genre = () => {
  const { data: { userSession, userData } } = useContext(AppContext);
  const { query: { query } } = useRouter();
  const { t } = useTranslation();
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [prevQuery, setPrevQuery] = useState(query);
  const [isLoading, setIsLoading] = useState(true);
  const showError = useNotification('An error ocurred when getting latest titles', 'error');
  const [noMoreResults, setNoMoreResults] = useState(false);

  const getData = async () => {
    if (query) {
      try {
        if (query === prevQuery) {
          const { results } = await searchTitles({
            language: userData.language || i18n.language,
            query,
            page,
          });
          if (results.length > 0) {
            setData(data.concat(results));
            setPage(page + 1);
          } else {
            setNoMoreResults(true);
          }
        } else {
          const { results } = await searchTitles({
            language: userData.language || i18n.language,
            query,
            page: 1,
          });
          setData(results);
          setPage(page + 1);
          setPrevQuery(query);
        }
      } catch (err) {
        showError();
      } finally {
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    if (userSession !== undefined && userData !== undefined) {
      const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
      if (!noMoreResults || (query !== prevQuery || !hasScrollbar)) {
        getData();
      }
    }
  }, [userSession, userData, userData?.language, query, page]);

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div>
      <Header />
      <AppWrapper>
        {data.length ? (
          <div className="mt-24">
            <InfiniteScroll
              dataLength={data.length}
              next={getData}
              hasMore
              style={{ overflow: 'visible' }}
              className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-2 xl:gap-4 place-items-center"
            >
              {data.map((title) => (
                <Item item={title} index={0} key={`title-id-${title?.id}`} isOnList />
              ))}
            </InfiniteScroll>
          </div>
        ) : (
          <div className="text-white h-screen flex items-center justify-center text-2xl">
            {t('NO_SEARCH_RESULTS')}
          </div>
        )}
      </AppWrapper>
    </div>
  );
};

export default Genre;
