export type Visibility = 'unlisted' | 'private';

export type Video = {
  id: number;
  youtubeId: string;
  title: string;
  note: string | null;
  shotAt: string;
  eventTags: string[];
  durationSec: number | null;
  featured: boolean;
};

export type ViewMode = 'GRID' | 'LIST';
export type SortMode = 'NEW' | 'OLD';

export type Filters = {
  q: string;
  year: number | 'ALL';
  tag: string | 'ALL';
  sort: SortMode;
  view: ViewMode;
};
