import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

export type BlogCardType = {
  id: number;
  image: string;
  title: string;
  description: string;
  url: string;
  position: number;
};

const BlogData: BlogCardType[] = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1564485377539-4af72d1f6a2f?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fGZhc2hpb24lMjBtb2RlbHxlbnwwfHwwfHx8MA%3D%3D",
    title: "How to Become a Zara Product Reviewer in 2025",
    description:
      "A comprehensive guide to joining Zara's affiliate program, becoming a product reviewer, and earning through authentic fashion content creation.",
    url: "#",
    position: 0,
  },
  {
    id: 2,
    title: "The Ultimate Guide to Zara's Winter Perfumes For Women 2025",
    description:
      "A luxurious exploration of Zara's feminine winter fragrances, their prestigious equivalents, and the perfect moments to wear these enchanting winter scents.",
    image:
      "https://images.unsplash.com/photo-1593631595508-193348a18b9d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8emFyYSUyMHBlcmZ1bWV8ZW58MHx8MHx8fDA%3D",
    url: "#",
    position: 1,
  },
  {
    id: 3,
    title: "The Ultimate Guide to Zara's Winter Perfumes For Men 2025",
    description:
      "A comprehensive exploration of Zara's top winter fragrances, their luxury equivalents, and why they deserve a place in your winter scent wardrobe.",
    image:
      "https://images.unsplash.com/photo-1631573578554-e4f049493cd9?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    url: "#",
    position: 2,
  },
  {
    id: 4,
    title: "Top 29 Ultimate Autumn Must-haves for Zara Woman 2023",
    description:
      "Elevate your Autumn wardrobe with the crème de la crème of Zara's 2023 collection. Curated from extensive reviews, social media buzz, and style metrics.",
    image:
      "https://static.zara.net/photos/2023/I/0/1/p/4548/275/303/2/w/750/4548275303_1_1_1.jpg?ts=1691579760435",
    url: "#",
    position: 3,
  },
  {
    id: 5,
    title: "Why Does Zara Not Have Reviews?",
    description:
      "Exploring the intriguing decision by Zara to not include reviews on their website, analyzing the potential reasons, and the implications for e-commerce businesses.",
    image:
      "https://static.zara.net/photos/2023/I/0/1/p/3199/802/805/2/w/750/3199802805_1_1_1.jpg?ts=1692865109223",
    url: "#",
    position: 4,
  },
];

const MAX_SCREEN_SIZE = 1240;
const CARD_WIDTH = 288;
const CARD_GAP = 6;
const STACK_GAP = 24;

export const BlogCards = () => {
  const [cards, setCards] = useState(BlogData);
  const [controlButtons, setControlButtons] = useState({
    left: true,
    right: false,
  });

  const moveLeft = () => {
    setCards((prevCards) =>
      prevCards.map((card) => ({
        ...card,
        position: card.position === 0 ? 0 : card.position - 1,
      })),
    );
  };

  const moveRight = () => {
    setCards((prevCards) => {
      const zeroPositionCards = prevCards.filter((card) => card.position === 0);

      if (zeroPositionCards.length > 0) {
        const maxIndexAtZero = Math.max(
          ...zeroPositionCards.map((card) =>
            prevCards.findIndex((c) => c.id === card.id),
          ),
        );

        const newCards = prevCards.map((card, index) => ({
          ...card,
          position:
            card.position === 0 && index === maxIndexAtZero
              ? card.position + 1
              : card.position === 0
                ? 0
                : card.position + 1,
        }));

        return newCards;
      }

      const newCards = prevCards.map((card) => ({
        ...card,
        position: card.position + 1,
      }));

      return newCards;
    });
  };

  const forceMove = (clickedIndex: number) => {
    const card = cards[clickedIndex];

    // Sadece position 0 olan kartlar için işlem yap
    if (card.position === 0) {
      const zeroPositionCards = cards.filter((c) => c.position === 0);
      const clickedCardStackIndex = zeroPositionCards.findIndex(
        (c) => c.id === card.id,
      );

      // Tıklanan karttan sonraki kartların sayısı kadar moveRight tetikle
      const movesNeeded = zeroPositionCards.length - clickedCardStackIndex - 1;

      // moveRight'ı gerekli sayıda tetikle
      for (let i = 0; i < movesNeeded; i++) {
        setTimeout(() => {
          moveRight();
        }, i * 200); // Her hareket arasında 200ms bekle
      }
    }
  };

  useEffect(() => {
    // Görünür kartları hesapla (position > 0 olanlar)
    const visibleCards = cards.filter((card) => card.position > 0);
    const stackedCards = cards.filter((card) => card.position === 0);

    // Genişlik hesaplamaları
    const totalVisibleWidth = visibleCards.length * (CARD_WIDTH + CARD_GAP);
    const stackedWidth = CARD_WIDTH + (stackedCards.length - 1) * STACK_GAP;
    const totalUsedWidth = stackedWidth + totalVisibleWidth + CARD_WIDTH;

    const currentScreenSize = Math.min(window.innerWidth, MAX_SCREEN_SIZE);
    const maxPosition = cards.length - 1;

    // Buton durumlarını güncelle
    setControlButtons({
      // Sol buton: Ekrana sığmayan kartlar varsa ve en az bir kart 0 pozisyonunda değilse
      left:
        totalUsedWidth > currentScreenSize &&
        !cards.every((card) => card.position === 0),
      // Sağ buton: Hiçbir kart maximum pozisyonda değilse
      right: !cards.some((card) => card.position >= maxPosition),
    });
  }, [cards]);

  return (
    <div className="relative mt-12">
      <div className="absolute -top-16 right-0 flex gap-4">
        <button
          onClick={moveLeft}
          disabled={!controlButtons.left}
          className="group rounded-full border border-neutral-400 bg-primary-300 p-2 shadow transition-[opacity_transform] duration-300 ease-out hover:opacity-75 disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-200"
        >
          <ChevronLeft className="size-6 translate-x-[-1px] stroke-primary-50 transition-colors duration-100 group-disabled:stroke-primary-800" />
        </button>
        <button
          onClick={moveRight}
          disabled={!controlButtons.right}
          className="group rounded-full border border-neutral-400 bg-primary-300 p-2 shadow transition-[opacity_transform] duration-300 ease-out hover:opacity-75 disabled:cursor-not-allowed disabled:border-neutral-300 disabled:bg-neutral-200"
        >
          <ChevronRight className="size-6 translate-x-[1px] stroke-primary-50 transition-colors duration-100 group-disabled:stroke-primary-800" />
        </button>
      </div>

      <div className="relative h-[400px] overflow-x-hidden">
        {cards.map((blog, index) => (
          <motion.div
            initial={{
              x: blog.position * (CARD_WIDTH + CARD_GAP) + index * STACK_GAP,
              zIndex: blog.id,
            }}
            animate={{
              x: blog.position * (CARD_WIDTH + CARD_GAP) + index * STACK_GAP,
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            style={{
              width: CARD_WIDTH,
              height: "400px",
            }}
            className="group absolute cursor-pointer overflow-hidden rounded-sm border border-neutral-400 bg-primary-200 shadow-lg"
            onMouseEnter={() => forceMove(index)}
            key={blog.title + index}
          >
            {/* Image Container */}
            <div className="relative h-[200px] w-full overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                width={288}
                height={200}
                className="h-full w-full object-cover object-top"
              />
            </div>

            {/* Content Container */}
            <div className="relative h-[200px]">
              {/* Default Content */}
              <div className="flex h-full flex-col justify-between p-4 transition-opacity duration-300 group-hover:opacity-0">
                <h3 className="text-xl font-bold leading-tight tracking-tight text-primary-800">
                  {blog.title}
                </h3>
                <motion.div
                  className="mt-2 flex items-center text-primary-400"
                  whileHover={{ x: 5 }}
                >
                  <span className="font-mono text-sm font-bold text-primary-800">
                    Read Article
                  </span>
                  <span className="ml-1.5 font-bold text-primary-800">→</span>
                </motion.div>
              </div>

              {/* Hover Overlay */}
              <motion.div className="absolute inset-0 bg-primary-400 bg-gradient-to-t opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute top-0 flex h-full flex-col justify-between p-4">
                  <p className="text-sm leading-relaxed text-neutral-50">
                    {blog.description}
                  </p>
                  <motion.div className="inline-flex items-center text-primary-400">
                    <span className="font-mono text-sm font-bold text-primary-50">
                      Read Article
                    </span>
                    <span className="ml-1.5 font-bold text-primary-50">→</span>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
