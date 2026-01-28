import { useYoutube } from "@contexts/youtubeContext";
import { runYoutubeSearch } from "@helpers/youtubeSearch";

function App() {
  const [youtubeState, youtubeDispatch] = useYoutube();

  const onSearch = async () => {
    await runYoutubeSearch(youtubeState.query, youtubeDispatch);
  };

  const handleLoadMore = async () => {
    await runYoutubeSearch(youtubeState.query, youtubeDispatch, { pageToken: youtubeState.nextPageToken, append: true})
  }

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <input
          value={youtubeState.query}
          placeholder="Search YouTube..."
          onChange={(e) =>
            youtubeDispatch({ type: "setQuery", payload: e.target.value })
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") onSearch();
          }}
        />

        <button onClick={onSearch} disabled={youtubeState.status === "loading"}>
          {youtubeState.status === "loading" ? "Searching..." : "Search"}
        </button>
      </div>

      {youtubeState.status === "error" && (
        <p style={{ marginTop: 12 }}>Error: {youtubeState.error}</p>
      )}

      <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
        {youtubeState.videos.map((v) => (
          <a
            key={v.id}
            href={v.url}
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex",
              gap: 12,
              textDecoration: "none",
              border: "1px solid #ddd",
              padding: 12,
              borderRadius: 8,
              color: "inherit",
            }}
          >
            <img src={v.thumbnailUrl} alt={v.title} width={160} />
            <div>
              <div style={{ fontWeight: 600 }}>{v.title}</div>
              <div style={{ opacity: 0.7, marginTop: 4 }}>{v.channelTitle}</div>
              <div style={{ opacity: 0.7, marginTop: 4 }}>
                {new Date(v.publishedAt).toLocaleString()}
              </div>
            </div>
          </a>
        ))}
      </div>
      <button onClick={handleLoadMore}>Next page</button>
    </div>
  );
}

export default App;
