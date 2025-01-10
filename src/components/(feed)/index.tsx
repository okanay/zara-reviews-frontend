import Feed from "./feed";
import Filter from "./filter";
import SharePost from "./share-post";

const FeedPage = () => {
  return (
    <main className="mx-auto min-h-[calc(100dvh_-72px)] max-w-5xl px-4 py-20">
      <Filter />
      <div>
        <SharePost />
        <Feed />
      </div>
    </main>
  );
};

export default FeedPage;
