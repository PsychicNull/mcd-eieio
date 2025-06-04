"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import '../../styles/swiper.css'

import { Navigation } from "swiper/modules";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.ImageCarouselSlice} ImageCarouselSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImageCarouselSlice>} ImageCarouselProps
 * @type {import("react").FC<ImageCarouselProps>}
 */
const ImageCarousel = ({ slice }) => {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const slides = slice.primary.carousel_images.map((item) => ({
    src: item.carousel_image.url,
    alt: item.carousel_image.alt,
    description: item.image_caption?.[0]?.text || "",
  }));

  return (
    <section className="w-full max-w-5xl mx-auto py-12 px-4">
      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        navigation
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        className="!px-4"
      >
        {slice.primary.carousel_images.map((item, i) => (
          <SwiperSlide key={item.carousel_image.url} className="flex justify-center">
            <button
              className="w-[100%] border border-black"
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
            >
              <PrismicNextImage
                field={item.carousel_image}
                className="w-full h-auto max-w-[100%] max-h-[500px] object-contain mx-auto"                
                imgixParams={{ w: 800, h: 600, fit: "contain" }}
              />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={slides}
        index={index}
        on={{ view: ({ index }) => setIndex(index) }}
      />
    </section>
  );
};

export default ImageCarousel;
