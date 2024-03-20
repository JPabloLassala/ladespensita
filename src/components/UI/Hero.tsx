import logo from "/public/ladespenlogo.png";

export function Hero() {
  return (
    <a className="hero font-semibold shrink-0" href="https://www.google.com">
      <p className="text-nowrap">
        <img src={logo} className="aspect-auto w-14 inline pr-2" />
        La Despen
      </p>
    </a>
  );
}
