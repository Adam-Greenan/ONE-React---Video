import React, { createContext, useContext, useReducer, type ReactNode } from 'react';

type Video = {
  id: string;
  title: string;
  thumbnailUrl: string;
  channelTitle: string;
  publishedAt: string;
  url: string;
};

export interface YoutubeState {
  query: string;
  videos: Video[];
  nextPageToken?: string;
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
}

type Action =
  | { type: 'setQuery'; payload: string }
  | { type: 'loading' }
  | { type: 'success'; payload: { videos: Video[]; nextPageToken?: string } }
  | { type: 'error'; payload: string }
  | { type: 'clear' };

const initialState: YoutubeState = {
  query: '',
  videos: [],
  nextPageToken: undefined,
  status: 'idle',
  error: undefined,
};

const youtubeReducer = (
  state: YoutubeState = initialState,
  action: Action
): YoutubeState => {
  let newState = state;

  switch (action.type) {
    case 'setQuery':
      newState = {
        ...state,
        query: action.payload,
      };
      break;

    case 'loading':
      newState = {
        ...state,
        status: 'loading',
        error: undefined,
      };
      break;

    case 'success':
      newState = {
        ...state,
        status: 'success',
        videos: action.payload.videos,
        nextPageToken: action.payload.nextPageToken,
        error: undefined,
      };
      break;

    case 'error':
      newState = {
        ...state,
        status: 'error',
        error: action.payload,
      };
      break;

    case 'clear':
      newState = {
        ...initialState,
      };
      break;

    default:
      newState = state;
  }

  return newState;
};

export const YoutubeContext = createContext<[YoutubeState, React.Dispatch<Action>]>([
  initialState,
  () => {},
]);

export const useYoutube = (): [YoutubeState, React.Dispatch<Action>] =>
  useContext(YoutubeContext);

interface YoutubeProviderProps {
  children: ReactNode;
  value?: YoutubeState;
}

export const YoutubeProvider: React.FC<YoutubeProviderProps> = ({ children, value }) => {
  const [youtubeState, youtubeDispatch] = useReducer(
    youtubeReducer,
    value || initialState
  );

  return (
    <YoutubeContext.Provider value={[youtubeState, youtubeDispatch]}>
      {children}
    </YoutubeContext.Provider>
  );
};
