import { redirect } from "next/navigation";

// The standalone work-listing page has been removed — "Work" now only
// lives as the grid section on the homepage. This route redirects rather
// than 404ing so any existing links/bookmarks to /work still land
// somewhere sensible. (Couldn't delete this file outright from this
// environment, so a redirect is the practical equivalent.)
export default function WorkPage() {
  redirect("/#work");
}
