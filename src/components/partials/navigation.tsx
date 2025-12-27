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
          <li
            key={link.href}
            className={`relative group ${
              link.isFeatured ? "font-bold text-pink-600" : ""
            }`}
          >
            <Link href={link.href ? link.href : "#"}>{link.label}</Link>

            {/* Dropdown for child links */}
            {link.children && link.children.length > 0 && (
              <ul className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg min-w-max z-50">
                {link.children.map((childLink, index) => (
                  <li key={index} className="hover:bg-gray-100">
                    <Link
                      href={childLink.href ? childLink.href : "#"}
                      className="block px-4 py-2"
                    >
                      {childLink.label}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;
