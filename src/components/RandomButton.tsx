"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { fetchDogImage } from "@/lib/dogs";
import { fetchAdvice } from "@/lib/advice";

export default function RandomButton({
  breeds,
  lang,
  label,
}: {
  breeds: string[];
  lang: string;
  label: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleRandom() {
    setLoading(true);

    const breed = breeds[Math.floor(Math.random() * breeds.length)];
    const [image, advice] = await Promise.all([
      fetchDogImage(breed),
      fetchAdvice(),
    ]);

    const searchParams = new URLSearchParams({
      image,
      advice: advice.advice,
      adviceId: String(advice.id),
    });

    router.push(`/${lang}/detail/${breed}?${searchParams.toString()}`);
  }

  return (
    <button
      onClick={handleRandom}
      disabled={loading}
      className="rounded-full bg-[#FF6B35] px-4 py-2 text-white disabled:opacity-50"
    >
      {loading ? "..." : label}
    </button>
  );
}
