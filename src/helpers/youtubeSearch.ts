import type { YoutubeState } from "@contexts/youtubeContext";
import { searchYoutube } from "@data/youtubesearch";
import type { IResponse } from "@src/types";

type Video = YoutubeState['videos'][number];

type Action =
  | { type: 'loading' }
  | { type: 'success'; payload: { videos: Video[]; nextPageToken?: string } }
  | { type: 'error'; payload: string };

export const runYoutubeSearch = async (
  query: string,
  dispatch: React.Dispatch<Action>
) => {
  const q = query.trim();

  if (!q) {
    dispatch({ type: 'success', payload: { videos: [], nextPageToken: undefined } });
    return;
  }

  dispatch({ type: 'loading' });

  const res: IResponse = await searchYoutube({ query: q, pageSize: 9 });

  if (res.status !== 200) {
    dispatch({ type: 'error', payload: res.message || 'Request failed' });
    return;
  }

  const data = res.data as { videos: Video[]; nextPageToken?: string } | undefined;

  dispatch({
    type: 'success',
    payload: {
      videos: data?.videos ?? [],
      nextPageToken: data?.nextPageToken,
    },
  });
};