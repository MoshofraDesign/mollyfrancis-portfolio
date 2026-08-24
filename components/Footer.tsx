export default function Footer() {
  return (
    <footer className="relative z-[2] mt-32 border-t border-ink/10 bg-cream">
      <div className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs text-ink/50">
          <p>
            © {new Date().getFullYear()} Molly Francis. Designed &amp; built in Austin, TX.
          </p>
          <p className="font-mono tracking-tight">
            v2026.05 · refreshed with care &amp; a little AI
          </p>
        </div>
      </div>
    </footer>
  );
}
