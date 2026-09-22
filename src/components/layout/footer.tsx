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
import type { Footer as Props } from "@/payload-types";
import { isImage } from "payload/shared";
import SubscribeForm from "../forms/subscribe-form";

const Footer = ({
  logo,
  heading,
  socialLinks,
  navLinks,
  contact,
  policies,
}: Props) => {
  if (
    !heading ||
    !socialLinks ||
    !navLinks ||
    !contact ||
    !policies ||
    typeof logo === "string"
  )
    return null;
  return (
    <footer className="p-3">
      <div className="bg-black rounded-md pt-10 text-white">
        <div className="lg:grid lg:grid-cols-3 gap-5 container container-padding-x">
          <div className="space-y-6">
            {logo.mimeType && isImage(logo.mimeType) && logo.url && (
              <Image src={logo.url} alt={logo.alt} width={180} height={130} />
            )}
            <div className="space-y-4">
              <h4 className="text-2xl font-anton uppercase max-w-xs">
                {heading}
              </h4>
              {/* <div className="flex items-center gap-1">
                <Input
                  placeholder="Enter your email"
                  className="border-none bg-[#1D1D1D] text-[#A4A7AE] max-w-60"
                />
                <Button>Subscribe</Button>
              </div> */}
              <SubscribeForm />
            </div>
          </div>

          <div className="lg:grid grid-cols-2 gap-5 hidden">
            {navLinks[0] && (
              <div>
                <span className="uppercase text-xl font-anton mb-4 block">
                  {navLinks[0].title}
                </span>
                <ul className="text-[#A4A7AE] text-sm space-y-1.5">
                  {navLinks[0].links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.link.href}
                        className="hover:text-white"
                        target={link.link.isExternal ? "_blank" : "_self"}
                      >
                        {link.link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {navLinks[1] && (
              <div>
                <span className="uppercase text-xl font-anton mb-4 block">
                  {navLinks[1].title}
                </span>
                <ul className="text-[#A4A7AE] text-sm space-y-1.5">
                  {navLinks[1].links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.link.href}
                        className="hover:text-white"
                        target={link.link.isExternal ? "_blank" : "_self"}
                      >
                        {link.link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="hidden lg:grid grid-cols-2 gap-5">
            {navLinks[2] && (
              <div>
                <span className="uppercase text-xl font-anton mb-4 block">
                  {navLinks[2].title}
                </span>
                <ul className="text-[#A4A7AE] text-sm space-y-1.5">
                  {navLinks[2].links.map((link) => (
                    <li key={link.id}>
                      <Link
                        href={link.link.href}
                        className="hover:text-white"
                        target={link.link.isExternal ? "_blank" : "_self"}
                      >
                        {link.link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {contact.length > 0 && (
              <div>
                <span className="uppercase text-xl font-anton mb-4 block">
                  Contact
                </span>
                <ul className="text-[#A4A7AE] text-sm space-y-4">
                  {contact.map((c) => (
                    <li className="space-y-1" key={c.id}>
                      <span className="text-xs block">{c.label}</span>
                      <Link
                        href={c.link.href}
                        className="hover:text-white"
                        target={c.link.isExternal ? "_blank" : "_self"}
                      >
                        {c.link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="lg:hidden mt-5">
            <Accordion className="border-none">
              {navLinks[0] && (
                <AccordionItem value="quick-links" className="bg-transparent">
                  <AccordionTrigger
                    className="font-anton uppercase text-xl"
                    iconStyles="bg-[#1D1D1D] text-white"
                  >
                    {navLinks[0].title}
                  </AccordionTrigger>
                  <AccordionContent className="h-fit!">
                    <ul className="space-y-3 text-base text-[#A4A7AE]">
                      {navLinks[0].links.map((link) => (
                        <li key={link.id}>
                          <Link
                            href={link.link.href}
                            className="no-underline!"
                            target={link.link.isExternal ? "_blank" : "_self"}
                          >
                            {link.link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
              <hr />
              {navLinks[1] && (
                <AccordionItem value="categories" className="bg-transparent">
                  <AccordionTrigger
                    className="font-anton uppercase text-xl"
                    iconStyles="bg-[#1D1D1D] text-white"
                  >
                    {navLinks[1].title}
                  </AccordionTrigger>
                  <AccordionContent className="h-fit!">
                    <ul className="space-y-3 text-base text-[#A4A7AE]">
                      {navLinks[1].links.map((link) => (
                        <li key={link.id}>
                          <Link
                            href={link.link.href}
                            className="no-underline!"
                            target={link.link.isExternal ? "_blank" : "_self"}
                          >
                            {link.link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
              <hr />
              {navLinks[2] && (
                <AccordionItem value="solutions" className="bg-transparent">
                  <AccordionTrigger
                    className="font-anton uppercase text-xl"
                    iconStyles="bg-[#1D1D1D] text-white"
                  >
                    {navLinks[2].title}
                  </AccordionTrigger>
                  <AccordionContent className="h-fit!">
                    <ul className="space-y-3 text-base text-[#A4A7AE]">
                      {navLinks[2].links.map((link) => (
                        <li key={link.id}>
                          <Link
                            href={link.link.href}
                            className="no-underline!"
                            target={link.link.isExternal ? "_blank" : "_self"}
                          >
                            {link.link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
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
                    {contact.map((c) => (
                      <li className="space-y-1" key={c.id}>
                        <span className="text-xs block">{c.label}</span>
                        <Link
                          href={c.link.href}
                          className="hover:text-white no-underline!"
                          target={c.link.isExternal ? "_blank" : "_self"}
                        >
                          {c.link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 lg:items-center justify-between col-span-3 pb-5 pt-10 lg:pt-20">
            <div className="flex items-center gap-3">
              {/* <Link
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
              </Link> */}
              {socialLinks.map((s) => (
                <Link
                  href={s.iconLink.href}
                  target={s.iconLink.isExternal ? "_blank" : "_self"}
                  className="bg-[#1D1D1D] rounded-full size-11 flex items-center justify-center"
                  key={s.id}
                >
                  {typeof s.iconLink.icon !== "string" &&
                  s.iconLink.icon.mimeType &&
                  isImage(s.iconLink.icon.mimeType) &&
                  s.iconLink.icon.url ? (
                    <Image
                      src={s.iconLink.icon.url}
                      alt={s.iconLink.icon.alt}
                      width={30}
                      height={30}
                    />
                  ) : (
                    s.iconLink.label
                  )}
                </Link>
              ))}
            </div>

            <p className="text-xs">
              &copy; {new Date().getFullYear()} Giftstaq. All rights reserved.
            </p>

            <div className="flex items-center gap-3 text-xs">
              {policies.map((p) => (
                <Link
                  href={p.link.href}
                  key={p.id}
                  className="bg-[#1D1D1D] rounded-full px-3 py-2"
                  target={p.link.isExternal ? "_blank" : "_self"}
                >
                  Privacy Policy
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
