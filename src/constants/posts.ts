export const DummyPosts: Post[] = [
  // Emily Chee's review
  {
    id: "1",
    user: {
      name: "Emily Chee",
      avatar: "https://picsum.photos/40/40?random=2",
      details: {
        size: "M",
        height: "170cm",
      },
    },
    product: {
      id: "101",
      name: "OVERSIZED LINEN BLEND SHIRT",
      image: "https://picsum.photos/80/80?random=2",
      description:
        "Long sleeve collared shirt in a linen blend fabric. Relaxed fit with dropped shoulders. Button-up front.",
      hashtags: ["#sample", "#product"],
      url: "https://example.com/product",
    },
    comment:
      "Perfect for hot weather! The linen blend keeps you cool and the oversized fit is very flattering. I normally wear S but sized down to XS for this one.",
    stars: 5,
    userInteraction: "IDLE",
    metrics: {
      likes: 0,
      dislikes: 0,
    },
    createdAt: "5h",
  },
  // Michael Brown's review
  {
    id: "2",
    user: {
      name: "Michael Brown",
      avatar: "https://picsum.photos/40/40?random=3",
      details: {
        size: "L",
        height: "180cm",
      },
    },
    product: {
      id: "102",
      name: "SLIM FIT JEANS",
      image: "https://picsum.photos/80/80?random=3",
      description:
        "Classic slim fit jeans with a hint of stretch for comfort. Five-pocket styling and zip fly.",
      hashtags: ["#fashion", "#jeans"],
      url: "https://example.com/product2",
    },
    comment:
      "Great fit and very comfortable. The stretch makes it easy to move around in these jeans.",
    stars: 4,
    userInteraction: "LIKED",
    metrics: {
      likes: 5,
      dislikes: 1,
    },
    createdAt: "2d",
  },
  // Jane Smith's review
  {
    id: "3",
    user: {
      name: "Jane Smith",
      avatar: "https://picsum.photos/40/40?random=4",
      details: {
        size: "S",
        height: "165cm",
      },
    },
    product: {
      id: "103",
      name: "COTTON T-SHIRT",
      image: "https://picsum.photos/80/80?random=4",
      description:
        "Soft cotton t-shirt with a crew neck and short sleeves. Available in multiple colors.",
      hashtags: ["#casual", "#tshirt"],
      url: "https://example.com/product3",
    },
    comment:
      "Very comfortable and soft. I bought it in three different colors!",
    stars: 5,
    userInteraction: "LIKED",
    metrics: {
      likes: 12,
      dislikes: 0,
    },
    createdAt: "1w",
  },
  // Alice Johnson's review
  {
    id: "4",
    user: {
      name: "Alice Johnson",
      avatar: "https://picsum.photos/40/40?random=5",
      details: {
        size: "XL",
        height: "175cm",
      },
    },
    product: {
      id: "104",
      name: "WOOL SWEATER",
      image: "https://picsum.photos/80/80?random=5",
      description:
        "Cozy wool sweater with a round neck and ribbed cuffs. Perfect for chilly days.",
      hashtags: ["#winter", "#sweater"],
      url: "https://example.com/product4",
    },
    comment: "Keeps me warm and looks great. The wool is not itchy at all.",
    stars: 4,
    userInteraction: "DISLIKED",
    metrics: {
      likes: 7,
      dislikes: 2,
    },
    createdAt: "3d",
  },
];
