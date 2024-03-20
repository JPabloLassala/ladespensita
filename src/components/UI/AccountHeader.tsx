export function AccountHeader() {
  return (
    <div className="flex items-center gap-4">
      <a href="#">Log in</a>
      <a
        href="#"
        className="rounded text-center transition focus-visible:ring-2 ring-offset-2 ring-gray-200 px-4 py-2 bg-black text-white hover:bg-gray-800  border-2 border-transparent"
      >
        Sign up{" "}
      </a>
    </div>
  );
}
