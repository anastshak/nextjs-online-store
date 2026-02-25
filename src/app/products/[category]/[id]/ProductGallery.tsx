import Image from 'next/image';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import { BLUR_DATA_URL } from '@/lib/helpers/blur';

interface ProductGalleryProps {
  images: string[];
  title: string;
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const hasImages = images.length > 1;

  return (
    <Carousel className="w-full max-w-md mx-14">
      <CarouselContent>
        {images.map((imageUrl, index) => (
          <CarouselItem key={imageUrl}>
            <div className="relative aspect-square">
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover rounded-lg"
                priority={index === 0}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {hasImages && (
        <>
          <CarouselPrevious />
          <CarouselNext />
        </>
      )}
    </Carousel>
  );
}
