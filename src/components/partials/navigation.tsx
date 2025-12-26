import Link from "next/link";

type NavigationLink = {
  title?: string;
  label: string;
  href: string;
};

type NavigationProps = {
  navigation: {
    links?: NavigationLink[] | null;
  } | null;
};

const Navigation = ({ navigation }: NavigationProps) => {
  return (
    <nav>
      <ul>
        {navigation?.links?.map((link, index) => {
          if (!link) return null;
          return (
            <li key={index}>
              <Link href={link.href}>{link.label}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navigation;
