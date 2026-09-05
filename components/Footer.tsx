export default function Footer() {
  return (
    <footer className="relative z-[2] mt-32 border-t border-ink/10 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-ink/50">
          <p className="flex items-center gap-1.5">
            © {new Date().getFullYear()} Molly Francis. Designed &amp; built in Austin, TX.
            {/* Texas, drawn from the state's own outline (panhandle, the Rio
                Grande diagonal, the Gulf coast) in a 100x95.3 box. Height is
                1em and the fill is currentColor, so it matches the line's
                size and colour wherever this text goes. */}
            <svg
              viewBox="0 0 100 95.3"
              aria-hidden="true"
              className="h-[1em] w-auto shrink-0 fill-current opacity-80"
            >
              <path d="M 27.5 0 L 50.4 0 L 50.4 17.3 L 56.5 17.3 L 65.6 21.4 L 71.8 23.2 L 74 23.2 L 77.9 24.9 L 86.3 23.2 L 95.9 26.3 L 95.9 49 L 100 55.2 L 96.9 59.7 L 88.5 60.6 L 77.9 69.5 L 71.8 77.5 L 70.2 86.4 L 72.1 94 L 64.1 93.1 L 57.3 89.9 L 54.2 81.9 L 48.1 75.7 L 45 65.9 L 39.7 59.7 L 32.1 59.7 L 27.5 66.8 L 19.8 64.1 L 14.5 56.1 L 7.6 49 L 0.8 41.9 L 0 40.1 L 27.5 40.1 Z" />
            </svg>
          </p>
          <p className="font-mono tracking-tight">
            v2026.05 · refreshed with care &amp; a little AI
          </p>
        </div>
      </div>
    </footer>
  );
}
