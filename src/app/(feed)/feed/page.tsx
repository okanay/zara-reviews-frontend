import FeedPage from "@/components/(feed)";
import { DummyPosts } from "@/constants/posts";
import { PostStoreInitUser, PostStoreProvider } from "@/stores/use-post-store";

export default async function Home() {
  return (
    <PostStoreProvider initial={DummyPosts}>
      <FeedPage />
      <PostStoreInitUser />
    </PostStoreProvider>
  );
}
