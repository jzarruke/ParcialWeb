import Image from "next/image";
import Link from "next/link";
import { BgColorBreed } from "@/lib/colors";

export default function BreedCard({
  breed,
  image,
  lang,
}: {
  breed: string;
  image: string;
  lang: string;
}) {
  const bgColor = BgColorBreed[breed] ?? "bg-white";

  return (
    <Link
      href={`/${lang}/detail/${breed}`}
      className={`${bgColor} rounded-lg p-4 shadow-md flex flex-col items-center gap-2 transition hover:scale-[1.02]`}
    >
      <Image
        src={image}
        alt={breed}
        width={150}
        height={150}
        className="rounded-md object-cover"
      />
      <p className="capitalize font-medium">{breed}</p>
    </Link>
  );
}
