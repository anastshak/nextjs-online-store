interface ProductInfoStringProps {
  title: string;
  info: string;
}

export default function ProductInfoString({ title, info }: ProductInfoStringProps) {
  return (
    <p>
      <span className="capitalize">{title}:</span>{' '}
      <span className="font-semibold">{info ? info : 'unknown'}</span>
    </p>
  );
}
