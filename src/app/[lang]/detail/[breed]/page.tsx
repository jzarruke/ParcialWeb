import { fetchDogImage } from "@/lib/dogs";
import { fetchAdvice } from "@/lib/advice";
import { getDictionary, type Locale } from "@/app/[lang]/dictionaries";
import DetailView from "@/components/DetailView";

type Props = {
  params: Promise<{ lang: string; breed: string }>;
  searchParams: Promise<{ image?: string; advice?: string; adviceId?: string }>;
};

function toBreedName(breed: string) {
  return breed.charAt(0).toUpperCase() + breed.slice(1);
}

export async function generateMetadata({ params }: Props) {
  const { lang, breed } = await params;
  const dict = await getDictionary(lang as Locale);
  const breedName = toBreedName(breed);

  return {
    title: dict.metadataDetail.title.replace("{breed}", breedName),
    description: dict.metadataDetail.description,
  };
}

export default async function DetailPage({ params, searchParams }: Props) {
  const { lang, breed } = await params;
  const sp = await searchParams;
  const dict = await getDictionary(lang as Locale);

  let image: string;
  let advice: string;
  let adviceId: number;

  if (sp.image && sp.advice && sp.adviceId) {
    image = sp.image;
    advice = sp.advice;
    adviceId = Number(sp.adviceId);
  } else {
    const [fetchedImage, fetchedAdvice] = await Promise.all([
      fetchDogImage(breed),
      fetchAdvice(),
    ]);
    image = fetchedImage;
    advice = fetchedAdvice.advice;
    adviceId = fetchedAdvice.id;
  }

  return (
    <DetailView
      breed={breed}
      lang={lang}
      initialImage={image}
      initialAdvice={advice}
      initialAdviceId={adviceId}
      randomLabel={dict.detail.random}
      backLabel={dict.detail.back}
    />
  );
}
