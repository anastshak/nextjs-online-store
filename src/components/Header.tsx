import HeaderLogo from './header/HeaderLogo';
import HeaderSearch from './header/HeaderSearch';
import HeaderActions from './header/HeaderActions';

export default function Header() {
  return (
    <header className="w-full h-[88px] px-4 md:px-12 bg-header text-white flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-4 md:gap-9">
        <HeaderLogo />
        <HeaderSearch />
      </div>

      <HeaderActions />
    </header>
  );
}
