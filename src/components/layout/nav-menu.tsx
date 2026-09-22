import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Header } from "@/payload-types";

export function NavMenu({ navLinks }: { navLinks: Header["navLinks"] }) {
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
            <NavigationMenuLink
              className={navigationMenuTriggerStyle()}
              render={
                <Link
                  href={link.link.href}
                  target={link.link.isExternal ? "_blank" : "_self"}
                >
                  {link.link.label}
                </Link>
              }
            />
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
