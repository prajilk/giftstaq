import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

const Footer = () => {
  return (
    <footer className="p-3">
      <div className="bg-black rounded-md pt-10 text-white">
        <div className="lg:grid lg:grid-cols-3 gap-5 container container-padding-x">
          <div className="space-y-6">
            <Image
              src="/local/logo-white.svg"
              alt="Logo"
              width={180}
              height={130}
            />
            <div className="space-y-4">
              <h4 className="text-2xl font-anton uppercase max-w-xs">
                Discover new products and exclusive offers first
              </h4>
              <div className="flex items-center gap-1">
                <Input
                  placeholder="Enter your email"
                  className="border-none bg-[#1D1D1D] text-[#A4A7AE] max-w-60"
                />
                <Button>Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="lg:grid grid-cols-2 gap-5 hidden">
            <div>
              <span className="uppercase text-xl font-anton mb-4 block">
                Quick Links
              </span>
              <ul className="text-[#A4A7AE] text-sm space-y-1.5">
                <li>
                  <Link href="#" className="hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    About us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <span className="uppercase text-xl font-anton mb-4 block">
                Categories
              </span>
              <ul className="text-[#A4A7AE] text-sm space-y-1.5">
                <li>
                  <Link href="#" className="hover:text-white">
                    Tech Accessories
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Drinkware
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-5">
            <div>
              <span className="uppercase text-xl font-anton mb-4 block">
                Solutions
              </span>
              <ul className="text-[#A4A7AE] text-sm space-y-1.5">
                <li>
                  <Link href="#" className="hover:text-white">
                    Employee Onboarding
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Client Appreciation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <span className="uppercase text-xl font-anton mb-4 block">
                Contact
              </span>
              <ul className="text-[#A4A7AE] text-sm space-y-4">
                <li className="space-y-1">
                  <span className="text-xs block">Address</span>
                  <Link href="#" className="hover:text-white">
                    123 Business Avenue, City, State, Country
                  </Link>
                </li>
                <li className="space-y-1">
                  <span className="text-xs block">Email</span>
                  <Link href="#" className="hover:text-white">
                    hello@giftstaq.com
                  </Link>
                </li>
                <li className="space-y-1">
                  <span className="text-xs block">Phone</span>
                  <Link href="#" className="hover:text-white">
                    +91 98765 43210
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="lg:hidden mt-5">
            <Accordion className="border-none">
              <AccordionItem value="quick-links" className="bg-transparent">
                <AccordionTrigger
                  className="font-anton uppercase text-xl"
                  iconStyles="bg-[#1D1D1D] text-white"
                >
                  Quick Links
                </AccordionTrigger>
                <AccordionContent className="h-fit!">
                  <ul className="space-y-3 text-base text-[#A4A7AE]">
                    {[
                      { href: "/", id: 1, label: "Home" },
                      { href: "/about-us", id: 2, label: "About Us" },
                      { href: "#", id: 3, label: "Products" },
                      { href: "/contact-us", id: 4, label: "Contact Us" },
                    ].map((link) => (
                      <li key={link.id}>
                        <Link href={link.href} className="no-underline!">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <hr />
              <AccordionItem value="categories" className="bg-transparent">
                <AccordionTrigger
                  className="font-anton uppercase text-xl"
                  iconStyles="bg-[#1D1D1D] text-white"
                >
                  Categories
                </AccordionTrigger>
                <AccordionContent className="h-fit!">
                  <ul className="space-y-3 text-base text-[#A4A7AE]">
                    {[
                      { href: "#", id: 1, label: "Tech Accessories" },
                      { href: "#", id: 2, label: "Drinkware" },
                    ].map((link) => (
                      <li key={link.id}>
                        <Link href={link.href} className="no-underline!">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <hr />
              <AccordionItem value="solutions" className="bg-transparent">
                <AccordionTrigger
                  className="font-anton uppercase text-xl"
                  iconStyles="bg-[#1D1D1D] text-white"
                >
                  Solutions
                </AccordionTrigger>
                <AccordionContent className="h-fit!">
                  <ul className="space-y-3 text-base text-[#A4A7AE]">
                    {[
                      { href: "#", id: 1, label: "Employee Onboarding" },
                      { href: "#", id: 2, label: "Client Appreciation" },
                    ].map((link) => (
                      <li key={link.id}>
                        <Link href={link.href} className="no-underline!">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <hr />
              <AccordionItem value="contact" className="bg-transparent">
                <AccordionTrigger
                  className="font-anton uppercase text-xl"
                  iconStyles="bg-[#1D1D1D] text-white"
                >
                  Contact
                </AccordionTrigger>
                <AccordionContent className="h-fit!">
                  <ul className="text-sm space-y-4 text-[#A4A7AE]">
                    <li className="space-y-1">
                      <span className="text-xs block">Address</span>
                      <Link href="#" className="hover:text-white no-underline!">
                        123 Business Avenue, City, State, Country
                      </Link>
                    </li>
                    <li className="space-y-1">
                      <span className="text-xs block">Email</span>
                      <Link href="#" className="hover:text-white no-underline!">
                        hello@giftstaq.com
                      </Link>
                    </li>
                    <li className="space-y-1">
                      <span className="text-xs block">Phone</span>
                      <Link href="#" className="hover:text-white no-underline!">
                        +91 98765 43210
                      </Link>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 lg:items-center justify-between col-span-3 pb-5 pt-10 lg:pt-20">
            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="bg-[#1D1D1D] rounded-full size-11 flex items-center justify-center"
              >
                <Image
                  src="/local/youtube.svg"
                  alt="youtube"
                  width={30}
                  height={30}
                />
              </Link>
              <Link
                href="#"
                className="bg-[#1D1D1D] rounded-full size-11 flex items-center justify-center"
              >
                <Image
                  src="/local/x2.svg"
                  alt="youtube"
                  width={30}
                  height={30}
                />
              </Link>
              <Link
                href="#"
                className="bg-[#1D1D1D] rounded-full size-11 flex items-center justify-center"
              >
                <Image
                  src="/local/facebook.svg"
                  alt="youtube"
                  width={30}
                  height={30}
                />
              </Link>
              <Link
                href="#"
                className="bg-[#1D1D1D] rounded-full size-11 flex items-center justify-center"
              >
                <Image
                  src="/local/instagram.svg"
                  alt="youtube"
                  width={30}
                  height={30}
                />
              </Link>
            </div>

            <p className="text-xs">
              &copy; {new Date().getFullYear()} Giftstaq. All rights reserved.
            </p>

            <div className="flex items-center gap-3 text-xs">
              <Link href="#" className="bg-[#1D1D1D] rounded-full px-3 py-2">
                Privacy Policy
              </Link>
              <Link href="#" className="bg-[#1D1D1D] rounded-full px-3 py-2">
                Terms & Conditions
              </Link>
              <Link href="#" className="bg-[#1D1D1D] rounded-full px-3 py-2">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
