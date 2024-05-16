import Image from "next/image";
import * as React from "react";

interface ProductImageGalleryProps {
  images: string[];
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({
  images,
}) => {
  const [selectedImage, setSelectedImage] = React.useState(images[0]);
  return (
    <div className="mt-6 flex flex-1 flex-col-reverse lg:mt-0 lg:self-start">
      <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
        <div className="grid grid-cols-4 gap-6" role="tablist">
          {images.map((image, index) => (
            <button
              key={image}
              onClick={() => setSelectedImage(image)}
              className={`aspect-h-3 aspect-w-4 rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-blue-900 ${
                selectedImage === image
                  ? "ring-2 ring-offset-2 ring-offset-blue-800 ring-blue-900"
                  : ""
              }`}
              role="tab"
              aria-selected={selectedImage === image ? "true" : "false"}
              tabIndex={0}
            >
              <Image
                src={image}
                alt="Product image"
                fill
                sizes="(min-width: 1540px) 293px, (min-width: 1280px) 256px, (min-width: 400px) 293px, calc(31.25vw + 174px)"
                priority
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
      <div className="aspect-h-3 aspect-w-4 w-full h-full relative rounded-lg overflow-hidden">
        <Image
          src={selectedImage}
          alt="Product image"
          fill
          sizes="(min-width: 1540px) 293px, (min-width: 1280px) 256px, (min-width: 400px) 293px, calc(31.25vw + 174px)"
          priority
          className="object-cover"
        />
      </div>
    </div>
  );
};

export default ProductImageGallery;
