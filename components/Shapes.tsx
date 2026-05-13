/**
 * Decorative shape primitives. Used as background accents (e.g. behind
 * the Sixbees photo) — purely visual, no semantic meaning.
 */

export function Triangle({
  color = "#a48bff",
  size = 220,
  rotate = 0,
  className = "",
}: {
  color?: string;
  size?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <polygon points="50,10 90,90 10,90" fill={color} />
    </svg>
  );
}

export function Diamond({
  color = "#f7c948",
  size = 200,
  rotate = 0,
  className = "",
}: {
  color?: string;
  size?: number;
  rotate?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      style={{ transform: `rotate(${rotate}deg)` }}
      aria-hidden
    >
      <polygon points="50,5 95,50 50,95 5,50" fill={color} />
    </svg>
  );
}

export function Circle({
  color = "#f0997b",
  size = 220,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      aria-hidden
    >
      <circle cx="50" cy="50" r="45" fill={color} />
    </svg>
  );
}

export function Blob({
  color = "#c8744a",
  size = 240,
  className = "",
}: {
  color?: string;
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      className={className}
      aria-hidden
    >
      <path
        d="M40,100 C40,30 90,20 130,40 C170,60 180,110 160,150 C140,190 80,180 50,150 C20,120 40,100 40,100Z"
        fill={color}
      />
    </svg>
  );
}
