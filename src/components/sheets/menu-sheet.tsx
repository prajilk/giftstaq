"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import type { Header } from "@/payload-types";

export function MenuSheet({ navLinks }: { navLinks: Header["navItems"] }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleExpanded = (id: string) => {
    setExpanded((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  const closeMenu = () => setOpen(false);

  if (!navLinks) return null;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            size="icon"
            variant="secondary"
            className="lg:hidden"
            aria-label="Open menu"
          />
        }
      >
        <Menu />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="z-80 flex w-[90vw] flex-col gap-0 p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b px-6 py-5 text-left">
          <SheetTitle className="text-lg font-semibold">Menu</SheetTitle>
        </SheetHeader>

        <nav className="flex-1 overflow-y-auto px-6 py-4">
          <ul className="space-y-1">
            {navLinks.map((link) => {
              const isExpandable = link.blockType !== "link";

              const isExpanded = expanded.includes(link.id!);

              return (
                <li key={link.id} className="border-b border-gray-100">
                  {isExpandable ? (
                    <>
                      <div className="flex items-center justify-between gap-3 py-3">
                        <Link
                          href={link.href}
                          className="flex-1 text-base font-medium"
                          onClick={closeMenu}
                        >
                          {link.label}
                        </Link>

                        <button
                          type="button"
                          aria-label={`Toggle ${link.label} submenu`}
                          aria-expanded={isExpanded}
                          onClick={() => toggleExpanded(link.id!)}
                          className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100"
                        >
                          <ChevronDown
                            className={`size-4 transition-transform duration-200 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      </div>

                      {isExpanded && (
                        <div className="space-y-5 pb-5 pl-3">
                          {link.groups?.map((group, index) => (
                            <div
                              key={`${group.collectionName}-${index}`}
                              className="space-y-2"
                            >
                              <Link
                                href={group.href}
                                className="block text-sm font-semibold"
                                onClick={closeMenu}
                              >
                                {group.collectionName}
                              </Link>

                              {group.products && group.products.length > 0 && (
                                <ul className="space-y-2 border-l border-gray-200 pl-3">
                                  {group.products.map((product) => (
                                    <li key={product.product}>
                                      <Link
                                        href={product.href}
                                        className="block py-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                                        onClick={closeMenu}
                                      >
                                        {product.product}
                                      </Link>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      target={link.isExternal ? "_blank" : "_self"}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                      className="flex items-center py-4 text-base font-medium transition-colors hover:text-muted-foreground"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
