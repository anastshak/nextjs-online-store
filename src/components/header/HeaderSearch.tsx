import { Suspense } from 'react';

import SearchBar from '../SearchBar';

export default function HeaderSearch() {
  return (
    <Suspense fallback={<div className="w-60 h-10 bg-white/20 rounded-3xl animate-pulse" />}>
      <SearchBar />
    </Suspense>
  );
}
