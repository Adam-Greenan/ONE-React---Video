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
    await runYoutubeSearch(youtubeState.query, youtubeDispatch, {
      pageToken: youtubeState.nextPageToken,
      append: true,
    });
  };

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          value={youtubeState.query}
          placeholder="Search YouTube..."
          onChange={(e) => youtubeDispatch({ type: 'setQuery', payload: e.target.value })}
          onKeyDown={(e) => {
            if (e.key === 'Enter') onSearch();
          }}
        />

        <button onClick={onSearch} disabled={youtubeState.status === 'loading'}>
          {youtubeState.status === 'loading' ? 'Searching...' : 'Search'}
        </button>
      </div>

      {youtubeState.status === 'error' && (
        <p style={{ marginTop: 12 }}>Error: {youtubeState.error}</p>
      )}

      <VideoGrid videos={youtubeState.videos} />
      <button onClick={handleLoadMore}>Next page</button>
    </div>
  );
}

export default App;
