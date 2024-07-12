export function ProductoImage({ src, alt }: { src: string; alt: string }) {
  return <img src={src} alt={alt} className="w-full rounded-t-md object-scale-down" />;
}
