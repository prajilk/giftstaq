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
import { useState } from "react";

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
                  <ul className="flex justify-evenly w-fit gap-2 max-w-full p-3 overflow-x-scroll scrollbar-thin">
                    {link.groups?.map((component, i) => (
                      <li
                        key={`${component.collectionName} ${i}`}
                        className="flex-1 min-w-40"
                      >
                        <NavigationMenuLink
                          render={
                            <Link
                              href={component.href}
                              onClick={closeMenu}
                              className="font-semibold p-0! m-0 hover:bg-transparent"
                            />
                          }
                        >
                          {component.collectionName}
                        </NavigationMenuLink>
                        {/* <Link href={component.href} className="font-semibold">
                          {component.collectionName}
                        </Link> */}
                        <ul className="mt-3 space-y-2 text-sm opacity-90">
                          {component.products?.map((p) => (
                            <li key={p.product}>
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
                              {/* <Link href={p.href} className="hover:underline">
                              </Link> */}
                            </li>
                          ))}
                        </ul>
                      </li>
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
