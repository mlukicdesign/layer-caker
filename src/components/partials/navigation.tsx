import { NAVIGATION_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";

export async function Navigation() {
  const { data: navigation } = await sanityFetch({
    query: NAVIGATION_QUERY,
  });

  if (!navigation?.links || navigation.links.length === 0) {
    return null;
  }

  return (
    <nav>
      <ul className="flex gap-4">
        {navigation.links.map((link) => (
          <li key={link.title}>
            <Link href={link.href ? link.href : "#"}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
