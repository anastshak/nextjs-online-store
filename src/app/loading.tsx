import { Spinner } from '@/components/ui/spinner';

export default function Loading() {
  return (
    <div className="flex flex-col gap-2 h-full items-center justify-center">
      <Spinner className="size-10 text-loader" />
    </div>
  );
}
