import { Header } from "@/payload-types";
import { useState } from "react";
import { NavigationMenuLink } from "../ui/navigation-menu";
import Link from "next/link";

type NavGroupType = NonNullable<
  Extract<
    NonNullable<Header["navItems"]>[number],
    { blockType: "submenu" }
  >["groups"]
>[number];

function NavGroup({
  group,
  closeMenu,
}: {
  group: NavGroupType;
  closeMenu: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  const products = group.products ?? [];
  const hasMore = products.length > 5;
  const visibleProducts = expanded ? products : products.slice(0, 5);

  return (
    <li className="w-40">
      <NavigationMenuLink
        render={
          <Link
            href={group.href}
            onClick={closeMenu}
            className="font-semibold p-0! m-0 hover:bg-transparent"
          />
        }
      >
        {group.collectionName}
      </NavigationMenuLink>

      <ul className="mt-3 space-y-2 text-sm opacity-90">
        {visibleProducts.map((p) => (
          <li key={p.id ?? p.product}>
            <NavigationMenuLink
              render={
                <Link
                  href={p.href}
                  onClick={closeMenu}
                  className="hover:underline p-0! m-0 hover:bg-transparent"
                />
              }
            >
              {p.product}
            </NavigationMenuLink>
          </li>
        ))}

        {hasMore && (
          <li>
            <button
              type="button"
              onClick={() => setExpanded((prev) => !prev)}
              aria-expanded={expanded}
              className="font-medium underline underline-offset-4 cursor-pointer"
            >
              {expanded ? "View less" : "View all"}
            </button>
          </li>
        )}
      </ul>
    </li>
  );
}

export default NavGroup;
