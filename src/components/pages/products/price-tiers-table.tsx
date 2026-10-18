import type { PriceTier } from "@/lib/shopify/transform";

export function PriceTiersTable({
  tiers,
  currencyCode,
}: {
  tiers: PriceTier[];
  currencyCode: string;
}) {
  if (tiers.length < 2) return null; // a single tier is just the normal price

  return (
    <div className="overflow-hidden rounded-xl border border-[#717680] text-sm">
      <div className="grid grid-cols-2 bg-[#EFEAE2] px-4 py-2 font-medium uppercase text-[#717680]">
        <span>Quantity</span>
        <span>Price per piece</span>
      </div>
      {tiers.map((tier) => (
        <div
          key={tier.min}
          className="grid grid-cols-2 border-t border-[#717680] px-4 py-2"
        >
          <span>{tier.max ? `${tier.min} – ${tier.max}` : `${tier.min}+`}</span>
          <span>
            {currencyCode} {tier.price}
          </span>
        </div>
      ))}
    </div>
  );
}
