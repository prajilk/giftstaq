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

export function NavMenu({ navLinks }: { navLinks: Header["navItems"] }) {
  if (!navLinks) return null;
  return (
    <NavigationMenu>
      <NavigationMenuList className="bg-white rounded-full hidden lg:flex">
        {/* <NavigationMenuItem>
          <NavigationMenuTrigger>With Icon</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[200px]">
              <li>
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleAlertIcon />
                      Backlog
                    </Link>
                  }
                />
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleDashedIcon />
                      To Do
                    </Link>
                  }
                />
                <NavigationMenuLink
                  render={
                    <Link href="#" className="flex-row items-center gap-2">
                      <CircleCheckIcon />
                      Done
                    </Link>
                  }
                />
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem> */}
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
                  <ul className="flex justify-evenly w-fit gap-2 max-w-full p-3">
                    {link.groups?.map((component, i) => (
                      <li
                        key={`${component.collectionName} ${i}`}
                        className="flex-1 min-w-0"
                      >
                        <Link href={component.href} className="font-semibold">
                          {component.collectionName}
                        </Link>
                        <ul className="mt-3 space-y-2 text-sm opacity-90">
                          {component.products?.map((p, i) => (
                            <li key={p.product}>
                              <Link href={p.href} className="hover:underline">
                                {p.product}
                              </Link>
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
        {/* <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/about-us">About us</Link>}
          />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/solutions">Solutions</Link>}
          />
        </NavigationMenuItem> */}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
