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
    <section className=" bg-green-50 text-center transform duration-500 hover:scale-95 cursor-pointer rounded-lg h-full">
      <img src={img} alt="" />
      <h1 className="text-xl my-2">{title}</h1>
      <p className="mb-2 mx-2">{description}</p>
    </section>
  );
}
