import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
  /** Larger label + X — used on case-study pages. */
  large?: boolean;
};

/**
 * Case-study exit control — "Close" + X. The X spins 360° on hover.
 */
export default function CloseLink({ href = "/", className = "", large = false }: Props) {
  return (
    <Link
      href={href}
      aria-label="Back to home"
      className={`group pointer-events-auto -m-3 flex items-center justify-center font-semibold uppercase leading-none tracking-[0.14em] transition-opacity hover:opacity-60 ${
        large
          ? "min-h-12 min-w-12 gap-2.5 p-3 text-[15px]"
          : "min-h-11 min-w-11 gap-1.5 p-3 text-[11px]"
      } ${className}`}
    >
      Close
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className={`shrink-0 transition-transform duration-500 ease-out group-hover:rotate-[360deg] ${
          large ? "size-4" : "size-2.5"
        }`}
        fill="none"
      >
        <path
          d="M1.5 1.5l9 9M10.5 1.5l-9 9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </Link>
  );
}
