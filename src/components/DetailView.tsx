"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchDogImage } from "@/lib/dogs";
import { fetchAdvice } from "@/lib/advice";
import { BgColorCategory } from "@/lib/colors";

type Props = {
  breed: string;
  lang: string;
  initialImage: string;
  initialAdvice: string;
  initialAdviceId: number;
  randomLabel: string;
  backLabel: string;
};

export default function DetailView({
  breed,
  lang,
  initialImage,
  initialAdvice,
  initialAdviceId,
  randomLabel,
  backLabel,
}: Props) {
  const [image, setImage] = useState(initialImage);
  const [advice, setAdvice] = useState(initialAdvice);
  const [adviceId, setAdviceId] = useState(initialAdviceId);
  const [loading, setLoading] = useState(false);

  const bgColor = BgColorCategory[adviceId % 5] ?? "bg-white";

  async function handleRandom() {
    setLoading(true);
    const [newImage, newAdvice] = await Promise.all([
      fetchDogImage(breed),
      fetchAdvice(),
    ]);
    setImage(newImage);
    setAdvice(newAdvice.advice);
    setAdviceId(newAdvice.id);
    setLoading(false);
  }

  return (
    <div className="flex flex-col items-center justify-center py-2 px-4">
      <Link href={`/${lang}/home`} className="self-start mb-4 text-sm underline">
        {backLabel}
      </Link>

      <div className={`${bgColor} rounded-2xl p-6 flex flex-col items-center gap-4 max-w-md w-full`}>
        <h1 className="text-2xl font-bold capitalize">{breed}</h1>
        <Image
          src={image}
          alt={breed}
          width={300}
          height={300}
          className="rounded-xl object-cover"
        />
        <p className="text-center italic">&ldquo;{advice}&rdquo;</p>
        <button
          onClick={handleRandom}
          disabled={loading}
          className="rounded-full bg-[#FF6B35] px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "..." : randomLabel}
        </button>
      </div>
    </div>
  );
}
