import { notFound } from "next/navigation";
import { getPayload } from "payload";
import config from "@payload-config";
import Image from "next/image";
import { isImage } from "payload/shared";
import Link from "next/link";

const GiftsPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "temporary-pages",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  const page = result.docs[0];
  if (!page) notFound();

  return (
    <main className="container container-padding-x pb-10 lg:pb-12">
      <h1 className="text-3xl mb-7 pt-5 font-anton">{page.title}</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {page.images?.map(
          (image) =>
            image &&
            typeof image !== "string" &&
            image.mimeType &&
            isImage(image.mimeType) &&
            image.url && (
              <Link
                href={`https://wa.me/${page.whatsappNumber}`}
                target="_blank"
              >
                <Image
                  src={image.url}
                  alt={image.alt}
                  className="rounded-md w-full aspect-video object-cover"
                  width={200}
                  height={150}
                />
              </Link>
            ),
        )}
      </div>
    </main>
  );
};

export default GiftsPage;
