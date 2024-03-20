export function GalleryItem({
  img,
  title,
  description,
}: {
  img: string;
  title: string;
  description: string;
}) {
  return (
    <div className="w-72 rounded-xl bg-white shadow-md duration-500 hover:scale-105 hover:shadow-xl">
      <a href="#">
        <img src={img} alt="Product" className="h-80 w-72 rounded-t-xl object-cover" />
        <div className="w-72 px-4 py-3">
          <p className="block truncate text-lg font-bold capitalize text-black">{title}</p>
          <p className="block truncate text-black">{description}</p>
        </div>
      </a>
    </div>
  );
}
