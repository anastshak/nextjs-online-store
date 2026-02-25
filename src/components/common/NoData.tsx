import { Frown } from 'lucide-react';

export default function NoDataFound() {
  return (
    <div className="flex items-center justify-center h-full text-2xl">
      No products found <Frown className="ml-1 h-7 w-7" />
    </div>
  );
}
