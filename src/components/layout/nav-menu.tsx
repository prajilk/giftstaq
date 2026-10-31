"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Header } from "@/payload-types";
import { type CSSProperties, useState } from "react";
import NavGroup from "./nav-group";

export function NavMenu({ navLinks }: { navLinks: Header["navItems"] }) {
  const [value, setValue] = useState<string | null>(null);

  if (!navLinks) return null;

  const closeMenu = () => setValue(null);

  if (!navLinks) return null;
  return (
    <NavigationMenu value={value} onValueChange={setValue}>
      <NavigationMenuList className="bg-white rounded-full hidden lg:flex">
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.id}>
            {link.blockType === "link" ? (
              <NavigationMenuLink
                className={navigationMenuTriggerStyle()}
                render={
                  <Link
                    href={link.href}
                    target={link.isExternal ? "_blank" : "_self"}
                  >
                    {link.label}
                  </Link>
                }
              />
            ) : (
              <>
                <NavigationMenuTrigger>
                  <Link href={link.href}>{link.label}</Link>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-wrap w-fit gap-2 max-w-full p-3 max-h-[calc(100vh-100px)] overflow-y-scroll scrollbar-thin">
                    {link.groups?.map((group, i) => (
                      <NavGroup
                        key={group.id ?? `${group.collectionName}-${i}`}
                        group={group}
                        closeMenu={closeMenu}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              </>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
