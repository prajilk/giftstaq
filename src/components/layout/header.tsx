import Image from "next/image";
import OfferBanner from "./offer-banner";
import { Button } from "../ui/button";
import { Menu, User } from "lucide-react";
import { NavMenu } from "./nav-menu";
import Link from "next/link";
import { CartSheet } from "../sheets/cart-sheet";
import Search from "./search";

const Header = () => {
  return (
    <>
      <OfferBanner />
      <header className="z-70 sticky top-0 left-0 right-0 bg-white lg:bg-white/5 lg:backdrop-blur-[36px]">
        <div className="container container-padding-x flex justify-between items-center gap-10 w-full py-5">
          <div className="flex items-center gap-4 lg:gap-7">
            <Menu className="lg:hidden" />
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="logo"
                width={125}
                height={100}
                loading="eager"
              />
            </Link>
            <NavMenu />
          </div>

          <div className="flex items-center gap-2">
            <Search />
            <CartSheet />
            <Link href="https://shopify.com/78380269733/account">
              <Button
                size="icon"
                variant="secondary"
                className="bg-white cursor-pointer shadow lg:shadow-none"
              >
                <User />
              </Button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
