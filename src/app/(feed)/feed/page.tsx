import FeedPage from "@/components/(feed)";
import { DummyPosts } from "@/constants/posts";
import { PostStoreProvider } from "@/stores/use-post-store";

export default function Home() {
  return (
    <PostStoreProvider initial={DummyPosts}>
      <FeedPage />
    </PostStoreProvider>
  );
}
