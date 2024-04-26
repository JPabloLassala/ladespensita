import logo from "/ladespenlogo.png";

export function Hero() {
  return (
    <a className="hero shrink-0 font-semibold" href="https://www.google.com">
      <p className="text-nowrap">
        <img src={logo} className="inline aspect-auto w-14 pr-2" />
        La Despencita
      </p>
    </a>
  );
}
