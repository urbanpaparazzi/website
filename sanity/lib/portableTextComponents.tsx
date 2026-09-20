import Image from "next/image";
import type { PortableTextComponents } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";

function getImageDimensions(ref?: string) {
  const match = ref?.match(/-(\d+)x(\d+)-/);
  return match
    ? { width: Number(match[1]), height: Number(match[2]) }
    : { width: 1600, height: 900 };
}

// Shared renderer so images embedded in rich text (news body, video
// description, legal pages, etc.) actually show up — by default
// @portabletext/react skips block types it doesn't recognize.
export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset) return null;
      const { width, height } = getImageDimensions(value.asset._ref);

      return (
        <Image
          src={urlFor(value).width(1000).url()}
          alt={value.alt || ""}
          width={width}
          height={height}
          sizes="(max-width: 640px) 100vw, 384px"
          className="not-prose my-4 h-auto w-full rounded-lg sm:float-left sm:mr-6 sm:mb-4 sm:w-auto sm:max-w-sm"
        />
      );
    },
  },
};
