"use client";

import { usePathname } from "next/navigation";

/**
 * Fades page content in on navigation.
 *
 * Deliberately CSS, not framer-motion: the old motion.div animated opacity
 * and y together, which promoted the entire page body to its own compositing
 * layer. A promoted layer's white can render a shade off the page's own white
 * on macOS, and the result was a visible seam directly under the nav. A
 * keyframe animation with no transform leaves nothing behind when it ends —
 * see .page-fade in globals.css.
 */
export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="page-fade">
      {children}
    </div>
  );
}
