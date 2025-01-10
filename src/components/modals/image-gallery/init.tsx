import { useInitImageGallery } from "./use-image-gallery";

export const ImageGalleryInit = ({ children }: LayoutProps) => {
  useInitImageGallery();
  return <>{children}</>;
};
