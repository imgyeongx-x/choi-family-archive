export type Visibility = 'unlisted' | 'private';

export type Video = {
  id: string;
  youtubeId: string;
  title: string;
  note?: string;
  shotAt: string; // ISO date
  eventTags: string[];
  durationSec?: number;
  featured?: boolean;
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
