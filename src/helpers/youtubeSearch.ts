import type { YoutubeState } from "@contexts/youtubeContext";
import { searchYoutube } from "@data/youtubesearch";
import type { IResponse } from "@src/types";

type Video = YoutubeState["videos"][number];

type Action =
  | { type: "loading" }
  | { type: "success"; payload: { videos: Video[]; nextPageToken?: string, append?: boolean } }
  | { type: "error"; payload: string };

export const runYoutubeSearch = async (
  query: string,
  dispatch: React.Dispatch<Action>,
  opts?: {pageToken?: string; append?: boolean}
) => {
  const q = query.trim();

  if (!q) {
    dispatch({ type: "success", payload: { videos: [], nextPageToken: undefined, append: false } });
    return;
  }

  dispatch({ type: "loading" });

  const res: IResponse = await searchYoutube({ query: q, pageSize: 9, pageToken: opts?.pageToken });

  if (res.status !== 200) {
    dispatch({ type: "error", payload: res.message || "Request failed" });
    return;
  }

  const data = res.data as { videos: Video[]; nextPageToken?: string } | undefined;

  dispatch({
    type: "success",
    payload: {
      videos: data?.videos ?? [],
      nextPageToken: data?.nextPageToken,
      append: opts?.append ?? false
    },
  });
};