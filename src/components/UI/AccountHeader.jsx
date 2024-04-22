export function AccountHeader() {
  return (
    <div className="flex items-center gap-4">
      <a href="#">Log in</a>
      <a
        href="#"
        className="rounded border-2 border-transparent bg-black px-4 py-2 text-center text-white ring-gray-200 ring-offset-2 transition  hover:bg-gray-800 focus-visible:ring-2"
      >
        Sign up{" "}
      </a>
    </div>
  );
}
