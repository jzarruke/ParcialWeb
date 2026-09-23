import { fetchDogBreeds, fetchDogImage } from "@/lib/dogs";
import { getDictionary, type Locale } from "@/app/[lang]/dictionaries";
import RandomButton from "@/components/RandomButton";
import BreedCard from "@/components/BreedCard";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return {
    title: dict.metadataList.title,
    description: dict.metadataList.description,
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  const allBreeds = await fetchDogBreeds();
  const breeds = allBreeds.slice(0, 15);

  const dogs = await Promise.all(
    breeds.map(async (breed) => ({
      breed,
      image: await fetchDogImage(breed),
    }))
  );

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div className="flex w-full max-w-5xl items-center justify-between px-4 mb-4">
        <h1 className="text-4xl font-bold">{dict.home.title}</h1>
        <RandomButton breeds={allBreeds} lang={lang} label={dict.home.random} />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {dogs.map(({ breed, image }) => (
          <BreedCard key={breed} breed={breed} image={image} lang={lang} />
        ))}
      </div>
    </div>
  );
}
