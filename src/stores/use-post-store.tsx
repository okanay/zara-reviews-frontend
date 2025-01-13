"use client";
/* eslint-disable */
// prettier-ignore
import { createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import { createStore, StoreApi, useStore } from "zustand";
import { immer } from "zustand/middleware/immer";

/**
 * Post Store: User Review Management System
 * -------------------------------------------
 *
 * Features:
 * - Server-side initial data support
 * - User data management
 *   - Current user information storage
 *   - Initial user data setup via PostStoreInitUser
 * - Optimistic updates for interactions and posts
 * - Independent loading & error states for operations
 * - Type-safe operations
 *
 * State Structure:
 * - posts: Array of post objects
 * - user: Current user information
 *   - Required for creating posts
 *   - Initialized through PostStoreInitUser component
 * - state: Loading and error states for operations
 *   - fetch: Overall fetch status
 *   - create: New post creation status
 *   - refresh: Posts refresh status
 *
 * Actions:
 * - setPosts: Set posts array
 * - setUserData: Set current user information
 * - createPost: Create a new post
 * - refreshPosts: Fetch posts from server
 * - setInteraction: Update post interactions (like/dislike)
 *
 * User Data Flow:
 * 1. Provider Setup:
 *    <PostStoreProvider initial={posts}>
 *      <FeedPage />
 *      <PostStoreInitUser />
 *    </PostStoreProvider>
 *
 * 2. User Initialization:
 *    PostStoreInitUser component handles:
 *    - Getting user data from auth or external source
 *    - Setting user data to store via setUserData
 *
 * Error Handling:
 * - Error messages stored in status object
 * - Operations requiring user data fail gracefully if user not set
 */

declare global {
  type Post = {
    id: string;
    comment: string;
    stars: number;
    images?: string[];
    userInteraction: "IDLE" | "LIKED" | "DISLIKED" | "OWN-POST";
    // Interaction metrics
    metrics: {
      likes: number;
      dislikes: number;
    };
    // User information
    user: {
      name: string;
      avatar: string;
      details?: {
        size?: string;
        height?: string;
      };
    };
    // Product information
    product: {
      id: string;
      name: string;
      image: string;
      description: string;
      hashtags: string[];
      url: string;
    };
    // Date of creation
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

interface StateFields {
  posts: Post[];
  user: {
    name: string;
    avatar: string;
    details?: {
      size?: string;
      height?: string;
    };
  } | null;
  state: {
    fetch: StatusState;
    create: StatusState;
    refresh: StatusState;
  };
}

interface ActionFields {
  setPosts: (posts: Post[]) => void;
  setUserData: (user: StateFields["user"]) => void;
  refreshPosts: () => void;
  createPost: (post: NewPost) => Promise<void>;
  setInteraction: (postId: string, interaction: "LIKED" | "DISLIKED") => void;
}

type PostState = StateFields & ActionFields;
type PostSlice = StateFields;
type PostActionsSlice = ActionFields;

const IdleStatus: StatusState = { status: "idle", message: null };
const StateSlice = (set: Set, initial: Post[]): PostSlice => ({
  posts: initial || [],
  user: null,
  state: {
    fetch: IdleStatus,
    create: IdleStatus,
    refresh: IdleStatus,
  },
});

const ActionSlice = (set: Set, get: Get): PostActionsSlice => ({
  setPosts: (posts: Post[]) => {},
  setUserData: (user: StateFields["user"]) => {
    set((state) => {
      state.user = user;
    });
  },
  refreshPosts: async () => {},
  createPost: async (post: NewPost) => {
    /*
     * 1. User Control
     * - Önce store'dan user verisini al
     * - User verisi yoksa early return (kullanıcı bilgisi olmadan post oluşturulamaz)
     *
     * 2. Optimistic Post Oluşturma
     * - Geçici unique id oluştur (`temp_${timestamp}`)
     * - Store'da olan user bilgisi ile yeni bir post datası oluştur
     * - Post datası içerisinde:
     *   - Geçici ID
     *   - Kullanıcıdan gelen yeni post verileri (comment, stars)
     *   - Store'dan gelen user bilgileri
     *   - Default/placeholder product verileri (API'den gelecek)
     *   - Images varsa placeholder url'ler
     *   - userInteraction "OWN-POST" olarak işaretlenmeli
     *   - metrics sıfırlanmalı { likes: 0, dislikes: 0 }
     *
     * 3. Optimistic Update
     * - Loading state'i set et (state.create.status = "loading")
     * - Oluşturulan geçici postu store'a ekle (en başa)
     * - Bu noktada UI'da post görünür olacak (placeholder verilerle)
     *
     * 4. API Request
     * - Eğer image varsa FormData kullan
     * - Post verilerini API'ye gönder
     * - API'den gerçek post verisi gelene kadar UI'da geçici post gösterilecek
     *
     * 5. Success Case
     * - API'den gelen yanıtı al
     * - Geçici ID ile store'daki postu bul
     * - Post'u API'den gelen gerçek verilerle güncelle:
     *   - Gerçek post ID
     *   - Gerçek product bilgileri
     *   - Gerçek image URL'leri
     * - Loading state'i success olarak güncelle
     *
     * 6. Error Case
     * - API'den hata gelirse:
     *   - Geçici ID'li postu store'dan sil (rollback)
     *   - Error state'i set et
     *   - Error message'ı state'e kaydet
     *
     * Not: Bu flow sayesinde:
     * - Kullanıcı post'unu anında görür
     * - Network gecikmesi UI'ı bloklamamış olur
     * - Hata durumunda temiz rollback yapılır
     */
  },
  setInteraction: (postId: string, interaction: "LIKED" | "DISLIKED") => {
    /*
     * 1. Get the post from the state
     * - store.posts array'inden postId'ye göre postu bul
     * - Post yoksa return et
     *
     * 2. State Control Logic
     * - Mevcut interaction state'ini kontrol et (post.userInteraction)
     * - Yeni gelen interaction ile karşılaştır
     *
     * 3. Interaction State Update
     * Case 1: Aynı interaction'a tıklanmış (toggle off)
     * - Eğer post.userInteraction === yeni interaction
     * - userInteraction'ı "IDLE" yap
     * - İlgili metric'i 1 azalt
     *
     * Case 2: Farklı interaction'a tıklanmış
     * - Eğer önceki interaction varsa, onun metric'ini 1 azalt
     * - Yeni interaction'ın metric'ini 1 artır
     * - userInteraction'ı yeni değere set et
     *
     * Case 3: İlk interaction (önceki "IDLE")
     * - İlgili metric'i 1 artır
     * - userInteraction'ı yeni değere set et
     *
     * 4. Metrics Update
     * - Her interaction değişiminde ilgili metric'leri güncelle
     * - likes/dislikes değerlerini artır veya azalt
     *
     * Not: Tüm bu işlemler optimistic olarak yapılacak
     * - Önce local state güncelle
     * - Sonra API call yap
     * - Hata durumunda original state'e dön
     */
  },
});

// (This part just for the reference do not focus on it)
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

export const PostStoreInitUser = () => {
  const { setUserData } = usePostStore();
  const user = {
    id: "1",
    name: "Emily Chee",
    avatar: "https://picsum.photos/40/40?random=2",
    details: {
      size: "M",
      height: "170cm",
    },
  };

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  return null;
};

// This types not necessary for the implementation just for the reference
// prettier-ignore
interface PostStoreProviderProps extends PropsWithChildren {initial?: Post[];}
type PostStoreSelector<T> = (state: PostState) => T;
type PostStoreContextType = StoreApi<PostState> | undefined;
type Set = (fn: (state: PostState) => void) => void;
type Get = () => PostState;
