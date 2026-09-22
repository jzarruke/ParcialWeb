import Image from "next/image";
import Logo from "./public/pawsome-advice-logo.png";

export default async function Header() {
  return (
    <header className="bg-FF6B35 text-white p-4 flex items-center justify-center">
      <Image src={Logo} alt="Pawsome Advice Logo" width={200} height={100} />
    </header>
  );
}
