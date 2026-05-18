"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";

const opportunities = [
  "Lead / Principal / Staff design role",
  "Design system or design ops leadership",
  "0 → 1 product engagement (fractional)",
  "AI / agentic product strategy",
  "Workshop, audit, or expert review",
  "Speaking, panels, or mentorship",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="page-shell">
      <section className="mx-auto max-w-7xl px-6 lg:px-10 pt-8 pb-12">
        <Reveal as="div">
          <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-6">
            Get in touch
          </p>
          <h1 className="font-serif text-hero">
            Tell me about the problem.
            <br />
            <em className="not-italic font-light text-ochre">
              I&rsquo;ll tell you if I&rsquo;m the right designer for it.
            </em>
          </h1>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 lg:px-10 py-10">
        <div className="grid lg:grid-cols-12 gap-12">
          {/* FORM */}
          <Reveal as="div" className="lg:col-span-7">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-8 p-8 lg:p-10 rounded-md bg-white border border-ink/10"
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="py-10 text-center"
                >
                  <div className="text-5xl mb-6">✦</div>
                  <h2 className="font-serif text-h1 mb-3">Thanks, got it.</h2>
                  <p className="text-ink/70 max-w-md mx-auto">
                    I&rsquo;ll get back to you within a few business days. If
                    it&rsquo;s urgent, please email{" "}
                    <a
                      href="mailto:yo@mollyfrancis.com"
                      className="link-underline"
                    >
                      yo@mollyfrancis.com
                    </a>
                    .
                  </p>
                </motion.div>
              ) : (
                <>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <Field label="Your name" name="name" required />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      required
                    />
                  </div>
                  <Field label="Company or team" name="company" />
                  <SelectField
                    label="What kind of work?"
                    name="topic"
                    options={opportunities}
                  />
                  <Field
                    label="Tell me about it"
                    name="message"
                    textarea
                    required
                  />

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-ink/50">
                      I read every inquiry personally. No automated replies.
                    </p>
                    <button type="submit" className="magnetic">
                      Send →
                    </button>
                  </div>
                </>
              )}
            </form>
          </Reveal>

          {/* SIDEBAR */}
          <Reveal as="div" className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-md border border-ink/10 bg-cream/60">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
                Or just email
              </p>
              <a
                href="mailto:yo@mollyfrancis.com"
                className="block font-serif text-3xl link-underline"
              >
                yo@mollyfrancis.com
              </a>
              <p className="mt-4 text-sm text-ink/60">
                Based in Austin, Texas (CT). Comfortable async, on-site for the
                right team.
              </p>
            </div>

            <div className="p-8 rounded-md border border-ink/10">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
                I&rsquo;m especially interested in
              </p>
              <ul className="space-y-2 text-ink/80">
                {opportunities.map((o) => (
                  <li key={o} className="flex gap-3">
                    <span className="text-ochre">✦</span> {o}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-8 rounded-md border border-ink/10">
              <p className="text-xs uppercase tracking-[0.25em] text-ink/50 mb-4">
                Elsewhere
              </p>
              <ul className="space-y-2 text-ink/80">
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.linkedin.com/in/molly-francis-89041515/"
                    className="link-underline"
                  >
                    LinkedIn ↗
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://dribbble.com/mollyfrancis"
                    className="link-underline"
                  >
                    Dribbble ↗
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://www.instagram.com/moshofra/"
                    className="link-underline"
                  >
                    Instagram ↗
                  </a>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea = false,
  required = false,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.18em] text-ink/50">
        {label}
        {required && <span className="text-ochre"> *</span>}
      </span>
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={6}
          className="mt-2 w-full bg-transparent border-b border-ink/20 focus:border-ink/60 outline-none py-2 font-serif text-lg resize-y"
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          className="mt-2 w-full bg-transparent border-b border-ink/20 focus:border-ink/60 outline-none py-2 font-serif text-lg"
        />
      )}
    </label>
  );
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string;
  name: string;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-[0.18em] text-ink/50">
        {label}
      </span>
      <select
        name={name}
        className="mt-2 w-full bg-transparent border-b border-ink/20 focus:border-ink/60 outline-none py-2 font-serif text-lg"
        defaultValue=""
      >
        <option value="" disabled>
          Choose one…
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  );
}
