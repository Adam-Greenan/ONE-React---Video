import { Youtube } from "@api/Youtube/Youtube";
import type { IResponse } from "@src/types";

export type Video = {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
  url: string;
};

export type YoutubeSearchResult = {
  videos: Video[];
  nextPageToken?: string;
};

const toWatchUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;

const pickThumb = (thumbs: any): string =>
  thumbs?.high?.url ?? thumbs?.medium?.url ?? thumbs?.default?.url ?? "";

export const searchYoutube = async (args: {
  query: string;
  pageSize?: number;
  pageToken?: string;
}): Promise<IResponse> => {
  const response = await Youtube({
    path: "/search",
    params: {
      part: "snippet",
      type: "video",
      q: args.query,
      maxResults: args.pageSize ?? 9,
      pageToken: args.pageToken,
    },
  });

  if (!response.status || response.status !== 200) {
    return response;
  }

  const data = response.data as any;

  const videos: Video[] =
    data?.items?.map((item: any) => {
      const id = item?.id?.videoId ?? "";
      const snippet = item?.snippet ?? {};

      return {
        id,
        title: snippet.title ?? "",
        channelTitle: snippet.channelTitle ?? "",
        publishedAt: snippet.publishedAt ?? "",
        thumbnailUrl: pickThumb(snippet.thumbnails),
        url: toWatchUrl(id),
      };
    })?.filter((v: Video) => v.id.length > 0) ?? [];

  const mapped: YoutubeSearchResult = {
    videos,
    nextPageToken: data?.nextPageToken,
  };

  return {
    ...response,
    data: mapped,
  };
};
