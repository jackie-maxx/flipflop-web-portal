import { Service } from "@/lib/services/services";
import Image from "next/image";

export default function ImageUrl({
  width = 300,
  height = 300,
  src,
  className,
  alt = "",
}: {
  width?: number;
  height?: number;
  src: any;
  className?: string;
  alt?: string;
}) {
  if (src === null) {
    src = "/assets/icons/no-product-img.png";
  } else {
    if (Service.applicationMode.isDebug()) {
      src = src.replace("https", "http");
    }
  }

  return (
    <Image
      width={width}
      height={height}
      className={className}
      src={src}
      alt={alt}
    />
  );
}
