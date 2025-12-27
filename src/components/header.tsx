import Link from "next/link";
import Navigation from "./partials/navigation";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/live";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import { SiteSettings } from "@/sanity/types";

const { data: siteSettings } = await sanityFetch({
  query: SITE_SETTINGS_QUERY,
});

export async function Header() {
  // const navigation = useNavigation();

  return (
    <div className="from-pink-50 to-white bg-gradient-to-b p-6">
      <header className="bg-white/80 shadow-md flex items-center justify-between p-6 rounded-lg container mx-auto shadow-pink-50">
        <Link
          className="text-pink-700 md:text-xl font-bold tracking-tight"
          href="/"
        >
          <Image
            src={
              siteSettings?.siteIdentity?.logo?.logoDark
                ? urlFor(siteSettings.siteIdentity.logo.logoDark).url()
                : ""
            }
            alt="Logo"
            width={200}
            height={50}
          />
        </Link>
        <Navigation />
      </header>
    </div>
  );
}
