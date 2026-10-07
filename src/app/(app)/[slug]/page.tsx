import { getPayload } from "payload";
import config from "@payload-config";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { notFound } from "next/navigation";

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "legal-pages",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const page = result.docs[0];
  if (!page) notFound();

  return (
    <article className="container container-padding-x py-10 md:py-12 prose">
      <h1>{page.title}</h1>
      <RichText data={page.content} />
    </article>
  );
}
