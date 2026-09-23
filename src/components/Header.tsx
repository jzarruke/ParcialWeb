import Image from "next/image";
import Link from "next/link";
import Logo from "../../public/pawsome-advice-logo.png";

export default function Header({ lang }: { lang: string }) {
  return (
    <header className="bg-[#FF6B35] p-4 flex items-center justify-center">
      <Link href={`/${lang}/home`}>
        <Image className="bg-white rounded-md" src={Logo} alt="Pawsome Advice" width={200} height={100} priority />
      </Link>
    </header>
  );
}
