// components/Navigation.tsx
"use client";

import Link from "next/link";
import { useState } from "react";

interface NavigationItem {
  label: string;
  url?: string;
  children?: NavigationItem[];
}

interface NavigationProps {
  items: NavigationItem[];
}

export default function Navigation({ items }: NavigationProps) {
  return (
    <nav className="flex items-center gap-8">
      {items.map((item, index) =>
        item.children && item.children.length > 0 ? (
          <DropdownLink key={index} item={item} />
        ) : (
          <Link
            key={index}
            href={item.url || "#"}
            className="hover:text-gray-600 transition-colors"
          >
            {item.label}
          </Link>
        )
      )}
    </nav>
  );
}

function DropdownLink({ item }: { item: NavigationItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button
        className="flex items-center gap-1 hover:text-gray-600 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        {item.label}
        <svg
          className={`w-4 h-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 z-50">
          {item.children?.map((child, index) => (
            <Link
              key={index}
              href={child.url || "#"}
              className="block px-4 py-2 hover:bg-gray-100 transition-colors"
            >
              {child.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
