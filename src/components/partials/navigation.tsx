"use client";

import Link from "next/link";
import { NavigationMenu } from "radix-ui";
import { ChevronDown } from "lucide-react";

interface NavigationItem {
  label: string;
  url?: string;
  children?: NavigationItem[];
}

interface NavigationProps {
  items: NavigationItem[];
}

const triggerClass =
  "text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors px-3 py-2 rounded-md outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 data-[state=open]:bg-gray-50";

export default function Navigation({ items }: NavigationProps) {
  return (
    <NavigationMenu.Root className="relative z-[1] flex justify-center w-full">
      <NavigationMenu.List className="flex items-center gap-1 rounded-lg p-1">
        {items.map((item) =>
          item.children && item.children.length > 0 ? (
            <NavItem key={item.label} item={item} />
          ) : (
            <NavigationMenu.Item key={item.label}>
              <NavigationMenu.Link asChild>
                <Link href={item.url || "#"} className={triggerClass}>
                  {item.label}
                </Link>
              </NavigationMenu.Link>
            </NavigationMenu.Item>
          )
        )}
      </NavigationMenu.List>

      <NavigationMenu.Viewport />
    </NavigationMenu.Root>
  );
}

function NavItem({ item }: { item: NavigationItem }) {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Trigger
        className={`flex items-center gap-1 ${triggerClass}`}
      >
        {item.label}
        <ChevronDown
          className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </NavigationMenu.Trigger>

      <NavigationMenu.Content className="absolute top-full left-0 w-48 rounded-md bg-white shadow-lg border border-gray-200 py-2 mt-1 z-50 data-[motion=from-start]:animate-in data-[motion=from-start]:slide-in-from-left-0 data-[motion=to-end]:animate-out data-[motion=to-end]:slide-out-to-left-0">
        <ul className="space-y-1 p-1">
          {item.children?.map((child) => (
            <li key={child.label}>
              <NavigationMenu.Link asChild>
                <Link
                  href={child.url || "#"}
                  className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 rounded-md transition-colors outline-none focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
                >
                  {child.label}
                </Link>
              </NavigationMenu.Link>
            </li>
          ))}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  );
}
