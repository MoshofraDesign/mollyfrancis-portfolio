import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-4xl px-6 lg:px-10 py-32 text-center">
      <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
        Lost the trail
      </p>
      <h1 className="font-serif text-hero">
        404 — <em className="not-italic font-light text-ochre">that page isn&rsquo;t here.</em>
      </h1>
      <p className="mt-6 text-lg text-ink/70">
        Probably a redesigned URL. Let&rsquo;s get you back somewhere useful.
      </p>
      <div className="mt-10 flex justify-center gap-3 flex-wrap">
        <Link href="/" className="magnetic">
          Back home
        </Link>
        <Link href="/#work" className="magnetic ghost">
          Browse work
        </Link>
      </div>
    </section>
  );
}
