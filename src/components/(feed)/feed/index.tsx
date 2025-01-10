"use client";

import { useModal } from "@/components/modals/use-modal";
import { useImageGallery } from "@/stores/use-image-gallery";

const Feed = () => {
  const { openGallery } = useImageGallery();
  const modal = useModal();

  const handleOpenGallery = () => {
    openGallery(
      [
        "https://static.zara.net/photos/assets/public/d5b5/4f87/efd64fd087b7/b895ed6cd5d6/06045223811-p/w/750/06045223811-p.jpg?ts=1722945459294",
        "https://static.zara.net/photos/2023/I/0/1/p/3199/802/805/2/w/750/3199802805_1_1_1.jpg?ts=1692865109223",
        "https://static.zara.net/photos/2024/V/0/2/p/1538/460/800/2/w/750/1538460800_1_1_1.jpg?ts=1707468667945",
      ],
      1,
    );

    modal.setModal("image-gallery");
  };

  return (
    <section>
      <button onClick={handleOpenGallery}>Open Gallery</button>
    </section>
  );
};

export default Feed;
