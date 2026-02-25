interface TitleProps {
  text: string;
}

export default function Title({ text }: TitleProps) {
  return <h1 className="mb-6 text-2xl font-semibold capitalize">{text}</h1>;
}
