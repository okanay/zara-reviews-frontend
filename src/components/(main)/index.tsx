import { DragCloseDrawer } from "../globals/drag-close-modal";
import { SearchInput } from "./search-input.tsx";

const IndexPage = () => {
  return (
    <>
      <DragCloseDrawer>Content</DragCloseDrawer>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <SearchInput />
      </main>
    </>
  );
};

export default IndexPage;
