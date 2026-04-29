import Image from "next/image";

interface MdxImageProps {
  src?: string;
  alt?: string;
}

export default function MdxImage({ src, alt }: MdxImageProps) {
  if (!src) return null;
  return (
    <figure className="not-prose my-8">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-slate-100">
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>
      {alt && (
        <figcaption className="text-center text-sm text-slate-400 mt-2 italic">
          {alt}
        </figcaption>
      )}
    </figure>
  );
}
