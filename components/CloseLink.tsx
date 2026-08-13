import Link from "next/link";

type Props = {
  href?: string;
  className?: string;
};

/**
 * Case-study exit control — "Close" + X. The X spins 360° on hover.
 */
export default function CloseLink({ href = "/", className = "" }: Props) {
  return (
    <Link
      href={href}
      aria-label="Back to home"
      className={`group pointer-events-auto -m-3 flex min-h-11 min-w-11 items-center justify-center gap-1.5 p-3 text-[11px] font-semibold uppercase leading-none tracking-[0.14em] transition-opacity hover:opacity-60 ${className}`}
    >
      Close
      <svg
        aria-hidden
        viewBox="0 0 12 12"
        className="size-2.5 shrink-0 transition-transform duration-500 ease-out group-hover:rotate-[360deg]"
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
