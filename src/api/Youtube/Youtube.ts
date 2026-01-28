import type { IResponse } from "@src/types";

export interface IYoutubeRequest {
  path: "/search" | "/videos";
  params?: Record<string, string | number | boolean | undefined>;
}

const YT_BASE = "https://www.googleapis.com/youtube/v3";

const buildUrl = (path: string, params?: IYoutubeRequest["params"]) => {
  const url = new URL(`${YT_BASE}${path}`);
  if (!params) return url.toString();

  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined) return;
    url.searchParams.set(k, String(v));
  });

  return url.toString();
};

export const Youtube = async (request: IYoutubeRequest): Promise<IResponse> => {
  try {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;

    if (!apiKey) {
      return {
        status: 0,
        code: "YOUTUBE_MISSING_KEY",
        message: "Missing VITE_YOUTUBE_API_KEY",
      };
    }

    const url = buildUrl(request.path, {
      key: apiKey,
      ...(request.params ?? {}),
    });

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    let data: any = undefined;

    try {
      data = await response.json();
    } catch {
      data = undefined;
    }

    return {
      status: response.status,
      message: response.statusText,
      data,
    };
  } catch (err: any) {
    return {
      status: 0,
      code: "YOUTUBE_NETWORK_ERROR",
      message: err?.message ?? "Network error",
    };
  }
};
