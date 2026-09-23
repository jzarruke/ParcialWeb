import { getDictionary, type Locale } from "@/app/[lang]/dictionaries";

export default async function Footer({ lang }: { lang: string }) {
  const dict = await getDictionary(lang as Locale);

  return (
    <footer className="bg-[#2E4053] text-white text-xs sm:text-sm p-4 flex flex-row items-center justify-between gap-2 fixed bottom-0 w-full">
      <p>{dict.footer.rights}</p>
      <p>{dict.footer.credits}</p>
    </footer>
  );
}
