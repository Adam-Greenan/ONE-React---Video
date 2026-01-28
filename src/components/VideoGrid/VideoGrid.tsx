import * as React from 'react';
import styles from './VideoGrid.module.css';
import type { Video } from '@data/youtubesearch';
import { VirtuosoGrid } from 'react-virtuoso';

export interface IVideoGridProps {
  videos: Video[];
}
export const VideoGrid: React.FunctionComponent<IVideoGridProps> = ({ videos }) => {
  return (
    <VirtuosoGrid
      useWindowScroll
      totalCount={videos.length}
      itemContent={(index) => {
        const video = videos[index];
        return (
          <a
            key={video.id}
            href={video.url}
            target="_blank"
            rel="noreferrer"
            className={styles.container}
          >
            <img
              src={video.thumbnailUrl}
              alt={video.title}
              width={160}
              className={styles.thumbnail}
            />
            <div className={styles.innerContainer}>
              <div className={styles.title}>{video.title}</div>
              <div className={styles.detailsContainer}>
                <div className={styles.channelTitle}>{video.channelTitle}</div>
                <div className={styles.date}>{new Date(video.publishedAt).toLocaleString()}</div>
              </div>
            </div>
          </a>
        );
      }}
      listClassName={styles.videoGrid}
      itemClassName={styles.videoGridItem}
    />
  );
};
