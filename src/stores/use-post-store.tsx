/* eslint-disable */
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

/**
 * Post Store: User Review Management System
 * -------------------------------------------
 *
 * Features:
 * - Server-side initial data support
 * - Optimistic updates
 * - Indipendent for each operation Loading & Error states
 * - Type-safe operations
 *
 *
 * State Structure:
 * - posts: Array of post objects
 * - status: Loading and error states for operations
 *   - fetch: Overall fetch status
 *   - create: New post creation status
 * - actions: Operations to interact with the store
 *   - setPosts: Set posts array.
 *   - createPost: Create a new post.
 *   - refreshPosts: Fetch posts from the server.
 *
 *
 * Error Handling:
 * - Error messages are stored in status object.
 *
 */

declare global {
  type Post = {
    id: string;
    user: {
      name: string;
      avatar: string;
      details?: {
        size?: string;
        height?: string;
      };
    };
    product: {
      id: string;
      name: string;
      image: string;
      description: string;
      hashtags: string[];
      url: string;
    };
    comment: string;
    stars: number;
    likes: number;
    helpful: number;
    createdAt: string;
  };
}

type NewPost = {
  comment: string;
  stars: number;
  productId: string;
  images?: File[];
};

interface StatusState {
  status: "idle" | "loading" | "success" | "error";
  message: string | null;
}

interface PostStateFields {
  posts: Post[];
  state: {
    global: StatusState;
    create: StatusState;
    refresh: StatusState;
  };
}

interface PostActionFields {
  setPosts: (posts: Post[]) => void;
  createPost: (post: NewPost) => Promise<void>;
  refreshPosts: () => void;
}

type PostState = PostStateFields & PostActionFields;
type PostSlice = PostStateFields;
type PostActionsSlice = PostActionFields;

const IdleStatus: StatusState = { status: "idle", message: null };
const StateSlice = (set: Set, initial: Post[]): PostSlice => ({
  posts: initial || [],
  state: {
    global: IdleStatus,
    create: IdleStatus,
    refresh: IdleStatus,
  },
});

const ActionSlice = (set: Set, get: Get): PostActionsSlice => ({
  createPost: async (post: NewPost) => {},
  refreshPosts: async () => {},
  setPosts: (posts: Post[]) => {},
});

// Provider Implementation
export function PostStoreProvider({
  children,
  initial = [],
}: PostStoreProviderProps) {
  const [store] = useState(() =>
    createStore<PostState>()(
      immer((set, get) => ({
        ...StateSlice(set, initial),
        ...ActionSlice(set, get),
      })),
    ),
  );

  return (
    <PostStoreContext.Provider value={store}>
      {children}
    </PostStoreContext.Provider>
  );
}

const PostStoreContext = createContext<PostStoreContextType>(undefined);
function usePostStoreInitial<T>(selector: PostStoreSelector<T>): T {
  const context = useContext(PostStoreContext);

  if (!context) {
    throw new Error("Post Store Provider not found.");
  }

  return useStore(context, selector);
}

export const usePostStore = () => {
  return usePostStoreInitial((state) => state);
};

// This types not necessary for the implementation just for the reference
// prettier-ignore
interface PostStoreProviderProps extends PropsWithChildren {initial?: Post[];}
type PostStoreSelector<T> = (state: PostState) => T;
type PostStoreContextType = StoreApi<PostState> | undefined;
type Set = (fn: (state: PostState) => void) => void;
type Get = () => PostState;
