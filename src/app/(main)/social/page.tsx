"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  SlidersHorizontal,
  ArrowUpDown,
  Ban,
  ExternalLink,
  Flag,
  Heart,
  MoreVertical,
  Star,
  ThumbsUp,
  Image as ImageIcon,
  Map,
  Camera,
  GalleryThumbnails,
  SmilePlus,
  Pen,
} from "lucide-react";
import { RippleButton } from "@/components/globals/ripple-button";
type SortOption = "recent" | "highest_rated" | "most_liked" | "most_helpful";

type FilterState = {
  sizes: string[];
  minRating: number;
  verifiedOnly: boolean;
  withPhotos: boolean;
};

const FilterPanel = ({
  filters,
  setFilters,
  sortBy,
  setSortBy,
}: {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  sortBy: SortOption;
  setSortBy: React.Dispatch<React.SetStateAction<SortOption>>;
}) => {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "recent", label: "Most Recent" },
    { value: "highest_rated", label: "Highest Rated" },
    { value: "most_liked", label: "Most Liked" },
    { value: "most_helpful", label: "Most Helpful" },
  ];

  return (
    <div className="w-60 space-y-4 rounded-sm border border-neutral-200 bg-white p-4">
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
        <SlidersHorizontal className="size-4 text-neutral-600" />
        <span className="font-sans text-sm font-semibold text-neutral-800">
          Filter Reviews
        </span>
      </div>

      {/* Sort Options */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="size-4 text-neutral-600" />
          <span className="font-sans text-sm font-medium text-neutral-700">
            Sort by
          </span>
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as SortOption)}
          className="w-full rounded-sm border border-neutral-200 bg-white px-2 py-1.5 text-xs text-neutral-600 focus:border-primary-500 focus:outline-none"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2">
        <span className="font-sans text-sm font-medium text-neutral-700">
          Minimum Rating
        </span>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  minRating: prev.minRating === rating ? 0 : rating,
                }))
              }
              className="group relative"
            >
              <Star
                className={`size-4 transition-colors ${
                  filters.minRating >= rating
                    ? "fill-primary-400 stroke-primary-400"
                    : "fill-neutral-100 stroke-neutral-300 hover:fill-neutral-200"
                }`}
              />
            </button>
          ))}
        </div>
        {filters.minRating > 0 && (
          <span className="text-xs text-neutral-500">
            Showing {filters.minRating} stars & up
          </span>
        )}
      </div>

      {/* Size Filter */}
      <div className="space-y-2">
        <span className="font-sans text-sm font-medium text-neutral-700">
          Size
        </span>
        <div className="flex flex-wrap gap-1">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() =>
                setFilters((prev) => ({
                  ...prev,
                  sizes: prev.sizes.includes(size)
                    ? prev.sizes.filter((s) => s !== size)
                    : [...prev.sizes, size],
                }))
              }
              className={`rounded-sm border px-2.5 py-1 text-xs transition-colors ${
                filters.sizes.includes(size)
                  ? "border-primary-500 bg-primary-50 text-primary-700"
                  : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      <div className="space-y-2">
        <span className="font-sans text-sm font-medium text-neutral-700">
          Options
        </span>
        <div className="space-y-2">
          <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-600">
            <input
              type="checkbox"
              checked={filters.verifiedOnly}
              onChange={(e) =>
                setFilters({ ...filters, verifiedOnly: e.target.checked })
              }
              className="accent-primary-500"
            />
            Verified Purchases Only
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-600">
            <input
              type="checkbox"
              checked={filters.withPhotos}
              onChange={(e) =>
                setFilters({ ...filters, withPhotos: e.target.checked })
              }
              className="accent-primary-500"
            />
            With Photos
          </label>
        </div>
      </div>
    </div>
  );
};

type FeedPost = {
  id: string;
  user: {
    name: string;
    avatar: string;
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
  createdAt: string;
  details?: {
    size?: string;
    height?: string;
    purchaseDate?: string;
  };
  likes: number;
  helpful: number;
};

const AddReview = () => {
  return (
    <div className="rounded-sm border border-neutral-200 bg-white">
      <div className="flex gap-3 p-4">
        {/* User Avatar */}
        <div className="flex-shrink-0">
          <div className="size-10 overflow-hidden rounded-full bg-neutral-100">
            <Image
              src="https://picsum.photos/40/40"
              alt="User avatar"
              width={40}
              height={40}
              className="size-full object-cover"
            />
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-1">
          <textarea
            placeholder="Write a review..."
            className="min-h-[80px] w-full resize-none border-0 bg-transparent p-0 text-base placeholder:text-neutral-500 focus:outline-none focus:ring-0"
          />

          {/* Action Toolbar */}
          <div className="mt-3 flex items-center justify-between">
            <div className="-ml-2 flex items-center gap-1">
              <button className="p-1.5">
                <ImageIcon className="size-5 stroke-primary-800" />
              </button>
              <button className="p-1.5">
                <GalleryThumbnails className="size-5 stroke-primary-800" />
              </button>
              <button className="p-1.5">
                <SmilePlus className="size-5 stroke-primary-800" />
              </button>
              <button className="p-1.5">
                <Camera className="size-5 stroke-primary-800" />
              </button>
              <button className="p-1.5">
                <Map className="size-5 stroke-primary-800" />
              </button>
            </div>

            <RippleButton
              className="relative flex cursor-pointer items-center justify-center overflow-hidden rounded-3xl border border-neutral-600 bg-gradient-to-bl from-neutral-50 to-neutral-100 px-4 py-3 text-center text-sm tracking-tight text-neutral-700 antialiased transition-all duration-300 ease-in-out focus:outline-none focus:ring-1 focus:ring-primary-500 focus:ring-opacity-50 active:scale-95 active:bg-primary-600"
              rippleColor="rgb(var(--neutral-200))"
            >
              <span className="flex items-center justify-center gap-2">
                <span className="font-sans text-xs font-semibold tracking-tight">
                  Write Now
                </span>
                <Pen className="size-3 stroke-primary-600" />
              </span>
            </RippleButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const ActionMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center rounded-sm p-0.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
      >
        <MoreVertical className="size-4 stroke-primary-800" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-6 z-10 w-48 rounded-sm border border-neutral-200 bg-white py-1 shadow-md">
          <button className="flex w-full items-center gap-2 px-4 py-2 text-xs text-neutral-600 transition-colors hover:bg-neutral-50">
            <Flag className="size-3" />
            Report Review
          </button>
          <button className="flex w-full items-center gap-2 px-4 py-2 text-xs text-neutral-600 transition-colors hover:bg-neutral-50">
            <Ban className="size-3" />
            Block User
          </button>
        </div>
      )}
    </div>
  );
};

const FeedItem = ({ post }: { post: FeedPost }) => {
  return (
    <article className="border border-b-0 border-neutral-200 bg-white p-4 transition-colors">
      <div className="flex gap-3">
        {/* Avatar ve Kullanıcı Bilgisi */}
        <div className="flex-shrink-0">
          <Image
            src={post.user.avatar}
            alt={post.user.name}
            width={40}
            height={40}
            className="size-[40px] rounded-full bg-neutral-100"
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Header Area */}
          <div className="flex items-start justify-between gap-1">
            <div className="flex flex-col gap-1">
              <h3 className="font-sans text-sm font-semibold text-neutral-800">
                {post.user.name}
              </h3>
              <span className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`size-3.5 ${
                      i < post.stars ? "fill-primary-400" : "fill-neutral-300"
                    } stroke-none`}
                  />
                ))}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-neutral-500">
                {post.createdAt}
              </span>
              <ActionMenu />
            </div>
          </div>

          {/* Comment */}
          <p className="mt-2 font-sans text-sm leading-relaxed text-neutral-800">
            {post.comment}
          </p>

          {/* User Details */}
          {(post.details?.size ||
            post.details?.height ||
            post.details?.purchaseDate) && (
            <div className="mt-2.5 flex flex-wrap gap-2">
              {post.details.size && (
                <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1">
                  <span className="text-xs font-medium text-neutral-400">
                    Size
                  </span>
                  <span className="ml-1.5 text-xs font-semibold text-neutral-700">
                    {post.details.size}
                  </span>
                </div>
              )}
              {post.details.height && (
                <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1">
                  <span className="text-xs font-medium text-neutral-400">
                    Height
                  </span>
                  <span className="ml-1.5 text-xs font-semibold text-neutral-700">
                    {post.details.height}
                  </span>
                </div>
              )}
              {post.details.purchaseDate && (
                <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-50 px-2.5 py-1">
                  <span className="text-xs font-medium text-neutral-400">
                    Purchased
                  </span>
                  <span className="ml-1.5 text-xs font-semibold text-neutral-700">
                    {post.details.purchaseDate}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Product Card */}
          <Link
            href={`/products/${post.product.id}`}
            className="mt-3 flex gap-3 rounded-sm border border-neutral-200 bg-neutral-50 p-3 transition-all hover:bg-neutral-100 hover:shadow-sm"
          >
            <Image
              src={post.product.image}
              alt={post.product.name}
              width={80}
              height={80}
              className="rounded object-cover"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-serif text-sm font-medium text-neutral-800">
                    {post.product.name}
                  </h4>
                  <div className="mt-1 flex flex-wrap gap-1.5">
                    {post.product.hashtags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-medium italic text-primary-500 hover:text-primary-600"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <ExternalLink className="size-4 stroke-primary-800" />
                </div>
              </div>
              <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-neutral-600">
                {post.product.description}
              </p>
            </div>
          </Link>

          {/* Interactions */}
          <div className="mt-3 flex items-center gap-4">
            <button className="flex items-center gap-1.5 text-neutral-500 transition-colors hover:text-primary-500">
              <Heart className="size-4" />
              <span className="text-xs">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1.5 text-neutral-500 transition-colors hover:text-primary-500">
              <ThumbsUp className="size-4" />
              <span className="text-xs">{post.helpful}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

// Örnek veri
const posts: FeedPost[] = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      avatar: "https://picsum.photos/40/40",
    },
    product: {
      id: "prod_123",
      name: "DRESS WITH MATCHING BELT",
      description:
        "Sleeveless midi dress with a round neck. Adjustable belt with metal buckle. Matching fabric details. Flared hem.",
      image: "https://picsum.photos/80/80",
      hashtags: ["elegant", "comfortable", "summer"],
      url: "/products/dress-with-matching-belt",
    },
    comment:
      "This dress exceeded my expectations! The fabric quality is excellent and the belt adds such a nice touch. I'm 1.70m and size M fits perfectly.",
    stars: 4,
    createdAt: "2h",
    details: {
      size: "M",
      height: "170cm",
    },
    likes: 24,
    helpful: 12,
  },
  {
    id: "2",
    user: {
      name: "Emily Chen",
      avatar: "https://picsum.photos/40/40?random=2",
    },
    product: {
      id: "prod_456",
      name: "OVERSIZED LINEN BLEND SHIRT",
      description:
        "Long sleeve collared shirt in a linen blend fabric. Relaxed fit with dropped shoulders. Button-up front.",
      image: "https://picsum.photos/80/80?random=2",
      hashtags: ["casual", "linen", "oversized"],
      url: "/products/oversized-linen-shirt",
    },
    comment:
      "Perfect for hot weather! The linen blend keeps you cool and the oversized fit is very flattering. I normally wear S but sized down to XS for this one.",
    stars: 5,
    createdAt: "5h",
    details: {
      size: "XS",
    },
    likes: 18,
    helpful: 8,
  },
];

export default function Feed() {
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [filters, setFilters] = useState<FilterState>({
    sizes: [],
    minRating: 0,
    verifiedOnly: false,
    withPhotos: false,
  });

  // Filtreleme ve sıralama işlemleri burada yapılacak
  const filteredPosts = posts
    .filter((post) => {
      if (filters.sizes.length > 0 && post.details?.size) {
        if (!filters.sizes.includes(post.details.size)) return false;
      }
      if (filters.minRating > 0 && post.stars < filters.minRating) return false;
      if (filters.verifiedOnly && !post.details?.purchaseDate) return false;
      // withPhotos filtresi için post'a photo array eklenecek
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "highest_rated":
          return b.stars - a.stars;
        case "most_liked":
          return b.likes - a.likes;
        case "most_helpful":
          return b.helpful - a.helpful;
        default:
          // "recent" - createdAt string'ini tarihe çevirmek gerekecek
          return 0;
      }
    });

  return (
    <div className="mx-auto flex min-h-screen max-w-5xl gap-6 px-4 py-20">
      {/* Sticky Filter Panel */}
      <div className="sticky top-4 h-fit">
        <FilterPanel
          filters={filters}
          setFilters={setFilters}
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
      </div>

      {/* Feed */}
      <div className="flex-1 space-y-0">
        <AddReview />
        {filteredPosts.map((post) => (
          <FeedItem key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
