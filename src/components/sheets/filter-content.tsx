"use client";

import { Button } from "../ui/button";
import { Field, FieldGroup } from "../ui/field";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Slider } from "../ui/slider";
import {
  ALLOWED_SUSTAINABILITY,
  PRICE_MAX,
  PRICE_MIN,
  ProductFilters,
} from "@/lib/shopify/filters";
import { useState } from "react";

type FilterContentProps = {
  filters: ProductFilters;
  onChange: (filters: ProductFilters) => void;
};

const FilterContent = ({ filters, onChange }: FilterContentProps) => {
  const [draftPrice, setDraftPrice] = useState<[number, number]>([
    filters.price?.min ?? PRICE_MIN,
    filters.price?.max ?? PRICE_MAX,
  ]);

  const toggleSustainability = (option: string) =>
    onChange({
      ...filters,
      sustainability: filters.sustainability.includes(option)
        ? filters.sustainability.filter((v) => v !== option)
        : [...filters.sustainability, option],
    });

  const commitPrice = ([min, max]: [number, number]) =>
    onChange({
      ...filters,
      price: min === PRICE_MIN && max === PRICE_MAX ? null : { min, max }, // full range = no filter
    });

  return (
    <div>
      <div className="flex flex-col pb-3">
        <div className="bg-primary rounded-2xl p-6">
          <Image src="/logo-silver.webp" alt="Logo" width={60} height={60} />

          <h5 className="text-2xl text-white font-anton uppercase mt-3 mb-6">
            Need it fast? ask about rush production and shipping.
          </h5>
          <Button className="bg-white text-black hover:text-white hover:bg-black w-full">
            Ask an expert
          </Button>
        </div>

        <div className="flex items-center justify-between mt-6">
          <span className="text-lg font-semibold uppercase">Filters</span>
          {/* <div>
            <Button
              variant="ghost"
              className="text-primary hover:text-primary px-3 h-fit py-2 text-xs"
              // onClick={resetFilters}
            >
              Reset <RotateCcw size={16} />
            </Button>
            <Button
              className="px-3 h-fit py-2 text-xs"
              // onClick={applyFilters}
            >
              Apply <Check size={16} />
            </Button>
          </div> */}
        </div>
      </div>

      <hr />

      <div className="h-screen overflow-y-scroll scrollbar-thin">
        <Accordion defaultValue={["price"]}>
          <AccordionItem value="price" className="bg-transparent my-0">
            <AccordionTrigger
              className="font-medium uppercase ps-0 pb-2 hover:no-underline"
              iconStyles="bg-transparent shadow-none text-[#A4A7AE] [&>svg]:size-5"
            >
              Price
            </AccordionTrigger>
            <AccordionContent panelStyle="ps-1">
              <div className="max-w-sm px-1 pt-2">
                <Slider
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={10}
                  value={draftPrice}
                  onValueChange={(v) => setDraftPrice(v as [number, number])}
                  onValueCommitted={(v) => commitPrice(v as [number, number])}
                />
                <div className="mt-3 flex justify-between text-sm text-[#414651]">
                  <span>AED {draftPrice[0]}</span>
                  <span>AED {draftPrice[1]}</span>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />

        <Accordion defaultValue={["shipping"]}>
          <AccordionItem value="shipping" className="bg-transparent my-0">
            <AccordionTrigger
              className="font-medium uppercase ps-0 pb-2 hover:no-underline"
              iconStyles="bg-transparent shadow-none text-[#A4A7AE] [&>svg]:size-5"
            >
              Sustainability
            </AccordionTrigger>
            <AccordionContent panelStyle="ps-1">
              <FieldGroup className="max-w-sm gap-2">
                {ALLOWED_SUSTAINABILITY.map((data) => (
                  <Field orientation="horizontal" key={data}>
                    <Checkbox
                      id={data}
                      checked={filters.sustainability.includes(data)}
                      onCheckedChange={() => toggleSustainability(data)}
                      className="border-[#A4A7AE] rounded-full"
                    />
                    <Label
                      htmlFor={data}
                      className="text-base font-normal text-[#414651]"
                    >
                      {data}
                    </Label>
                  </Field>
                ))}
              </FieldGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr />

        {/* <Accordion defaultValue={["test2"]}>
          <AccordionItem value="test2" className="bg-transparent my-0">
            <AccordionTrigger
              className="font-medium uppercase ps-0 pb-2 hover:no-underline"
              iconStyles="bg-transparent shadow-none text-[#A4A7AE] [&>svg]:size-5"
            >
              Attributes
            </AccordionTrigger>
            <AccordionContent panelStyle="ps-1">
              <FieldGroup className="max-w-sm gap-2">
                {["Eco-friendly", "Sustainable", "Ships From Stadium"].map(
                  (data) => (
                    <Field orientation="horizontal" key={data}>
                      <Checkbox
                        id={data}
                        //   checked={draftFilters.craneTypes.includes(crane_type.slug)}
                        //   onCheckedChange={() =>
                        //     toggleFilter("craneTypes", crane_type.slug)
                        //   }
                        className="border-[#A4A7AE] rounded-full"
                      />
                      <Label
                        htmlFor={data}
                        className="text-base font-normal text-[#414651]"
                      >
                        {data}
                      </Label>
                    </Field>
                  ),
                )}
              </FieldGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr /> */}

        {/* <Accordion defaultValue={["test3"]}>
          <AccordionItem value="test3" className="bg-transparent my-0">
            <AccordionTrigger
              className="font-medium uppercase ps-0 pb-2 hover:no-underline"
              iconStyles="bg-transparent shadow-none text-[#A4A7AE] [&>svg]:size-5"
            >
              Brands
            </AccordionTrigger>
            <AccordionContent panelStyle="ps-1">
              <Field className="mb-2 pt-1">
                <InputGroup className="rounded-md bg-[#F5F5F5]">
                  <InputGroupInput id="input-group-url" placeholder="Search" />
                  <InputGroupAddon align="inline-start">
                    <Search />
                  </InputGroupAddon>
                </InputGroup>
              </Field>
              <FieldGroup className="max-w-sm gap-2">
                {["Auden Bamboo (86)", "47 (23)", "A4 (45)", "Adidas (16)"].map(
                  (data) => (
                    <Field orientation="horizontal" key={data}>
                      <Checkbox
                        id={data}
                        //   checked={draftFilters.craneTypes.includes(crane_type.slug)}
                        //   onCheckedChange={() =>
                        //     toggleFilter("craneTypes", crane_type.slug)
                        //   }
                        className="border-[#A4A7AE] rounded-full"
                      />
                      <Label
                        htmlFor={data}
                        className="text-base font-normal text-[#414651]"
                      >
                        {data}
                      </Label>
                    </Field>
                  ),
                )}
              </FieldGroup>

              <Button variant="link" size="sm" className="px-0 mt-3 text-black">
                View All <ArrowRight />
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr /> */}

        {/* <Accordion defaultValue={["test4"]}>
          <AccordionItem value="test4" className="bg-transparent my-0">
            <AccordionTrigger
              className="font-medium uppercase ps-0 pb-2 hover:no-underline"
              iconStyles="bg-transparent shadow-none text-[#A4A7AE] [&>svg]:size-5"
            >
              Sizes
            </AccordionTrigger>
            <AccordionContent panelStyle="ps-1">
              <FieldGroup className="max-w-sm gap-2">
                {["Size 1", "Size 2", "Size 3"].map((data) => (
                  <Field orientation="horizontal" key={data}>
                    <Checkbox
                      id={data}
                      //   checked={draftFilters.craneTypes.includes(crane_type.slug)}
                      //   onCheckedChange={() =>
                      //     toggleFilter("craneTypes", crane_type.slug)
                      //   }
                      className="border-[#A4A7AE] rounded-full"
                    />
                    <Label
                      htmlFor={data}
                      className="text-base font-normal text-[#414651]"
                    >
                      {data}
                    </Label>
                  </Field>
                ))}
              </FieldGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <hr /> */}

        {/* <Accordion defaultValue={["test5"]}>
          <AccordionItem value="test5" className="bg-transparent my-0">
            <AccordionTrigger
              className="font-medium uppercase ps-0 pb-2 hover:no-underline"
              iconStyles="bg-transparent shadow-none text-[#A4A7AE] [&>svg]:size-5"
            >
              Colors
            </AccordionTrigger>
            <AccordionContent panelStyle="ps-1">
              <FieldGroup className="max-w-sm gap-2">
                {["Color 1", "Color 2", "Color 3"].map((data) => (
                  <Field orientation="horizontal" key={data}>
                    <Checkbox
                      id={data}
                      //   checked={draftFilters.craneTypes.includes(crane_type.slug)}
                      //   onCheckedChange={() =>
                      //     toggleFilter("craneTypes", crane_type.slug)
                      //   }
                      className="border-[#A4A7AE] rounded-full"
                    />
                    <Label
                      htmlFor={data}
                      className="text-base font-normal text-[#414651]"
                    >
                      {data}
                    </Label>
                  </Field>
                ))}
              </FieldGroup>
            </AccordionContent>
          </AccordionItem>
        </Accordion> */}
      </div>
    </div>
  );
};

export default FilterContent;
