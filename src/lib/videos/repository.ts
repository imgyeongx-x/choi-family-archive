import "server-only";

import type { Video } from "@/lib/videos/types";
import { listVideos } from "@/lib/videos/service";

export async function getVideos(): Promise<Video[]> {
  return listVideos({
    sort: "NEW",
  });
}