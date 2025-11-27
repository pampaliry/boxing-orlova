import { ref } from 'vue';

export interface YouTubeItem {
  url: string;
}

export const useVideos = () => {
  const videos = ref<YouTubeItem[]>([
    { url: 'https://www.youtube.com/watch?v=tA14uRHqqWs' },
    { url: 'https://www.youtube.com/watch?v=0vnOfawuQF4' },
    { url: 'https://www.youtube.com/watch?v=-QI4x_D9aI8&t=40s' },
  ]);

  return { videos };
};
