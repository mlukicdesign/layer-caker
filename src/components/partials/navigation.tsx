import Link from "next/link";
import { sanityFetch } from "@/sanity/lib/live";
import { NAVIGATION_QUERY } from "@/sanity/lib/queries";
import { NAVIGATION_QUERYResult } from "@/sanity/types";

type NavigationProps = NonNullable<NAVIGATION_QUERYResult>;

export async function Navigation({}: NavigationProps) {
  const { data: navigationData } = await sanityFetch({
    query: NAVIGATION_QUERY,
  });

  if (!navigationData?.links || navigationData.links.length === 0) {
    return null;
  }

  const links = navigationData.links;

  return (
    <nav>
      <ul className="flex gap-4">
        {links.map((link) => {
          const children = link.children || [];
          return (
            <li
              key={link.href}
              className={`relative group ${
                link.isFeatured ? "font-bold text-pink-600" : ""
              }`}
            >
              <Link href={link.href ? link.href : "#"}>{link.label}</Link>

              {/* Dropdown for child links */}
              {children.length > 0 && (
                <ul className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded-md shadow-lg min-w-max z-50">
                  {children.map((childLink, index) => (
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
          );
        })}
      </ul>
    </nav>
  );
}

export default Navigation;
