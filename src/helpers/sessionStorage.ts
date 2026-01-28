import type { YoutubeState } from "@contexts/youtubeContext";

const YOUTUBE_CACHE_KEY = "youtube-cache"

export const loadCache = () => {
  try {
    const raw = sessionStorage.getItem(YOUTUBE_CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const saveCache = (state: YoutubeState) => {
  try {
    sessionStorage.setItem(YOUTUBE_CACHE_KEY, JSON.stringify({
      query: state.query,
      videos: state.videos,
      nextPageToken: state.nextPageToken,
      status: state.status,
    }));
  } catch(err:any) {
    console.log("Failed to load cached data err: ", err)
  }
};