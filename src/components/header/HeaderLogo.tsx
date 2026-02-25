import Link from 'next/link';
import Image from 'next/image';

export default function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 font-bold uppercase tracking-tight">
      <Image src="/logo.png" alt="Logo" width={40} height={40} />
      <span className="leading-4 text-xs md:text-sm">
        Online <br /> Market
      </span>
    </Link>
  );
}
