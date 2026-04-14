import VideoBrowser from "@/components/home/VideoBrowser";
import { getVideos } from "@/lib/videos/repository";

export const revalidate = 300;

export default async function Page() {
  const initialVideos = await getVideos();

  return <VideoBrowser initialVideos={initialVideos} />;
}
