import { VideoGrid } from '@components/VideoGrid';
import { useYoutube } from '@contexts/youtubeContext';
import { runYoutubeSearch } from '@helpers/youtubeSearch';
import styles from './App.module.css';

function App() {
  const [youtubeState, youtubeDispatch] = useYoutube();

  const onSearch = async () => {
    await runYoutubeSearch(youtubeState.query, youtubeDispatch);
  };

  const handleLoadMore = async () => {
    youtubeDispatch({ type: 'enableInfiniteScroll' });

    await runYoutubeSearch(youtubeState.query, youtubeDispatch, {
      pageToken: youtubeState.nextPageToken,
      append: true,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div className={styles.searchContainer}>
          <input
            value={youtubeState.query}
            className={styles.textInput}
            placeholder="Search YouTube..."
            onChange={(e) => youtubeDispatch({ type: 'setQuery', payload: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === 'Enter') onSearch();
            }}
          />

          <button
            onClick={onSearch}
            disabled={youtubeState.status === 'loading'}
            className={styles.actionButton}
          >
            {youtubeState.status === 'loading' ? 'Searching...' : 'Search'}
          </button>

          <button
            disabled={youtubeState.status === 'loading'}
            onClick={() => {
              youtubeDispatch({ type: 'clear' });
            }}
            className={styles.actionButton}
          >
            Clear search results
          </button>
        </div>
        <div className={styles.filterContainer}>
          <label className={styles.label} htmlFor="filter">Filter:</label>
          <input type="text" name="filter" className={styles.textInput} aria-disabled="true" />
        </div>
      </div>

      {youtubeState.status === 'error' && (
        <p className={styles.errorMessage}>Error: {youtubeState.error}</p>
      )}

      <VideoGrid
        videos={youtubeState.videos}
        onEndReached={() =>
          runYoutubeSearch(youtubeState.query, youtubeDispatch, {
            pageToken: youtubeState.nextPageToken,
            append: true,
          })
        }
        isLoading={youtubeState.status === 'loading'}
        infiniteScrollEnabled={youtubeState.infiniteScrollEnabled}
      />
      <div className={styles.actionButtonsContainer}>
        <button className={styles.actionButton} onClick={handleLoadMore}>
          Next page
        </button>
      </div>
    </div>
  );
}

export default App;
