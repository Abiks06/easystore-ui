export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="border-y border-line py-5 overflow-hidden select-none" aria-hidden>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span key={i} className="display italic text-4xl md:text-5xl px-6 flex items-center gap-12 whitespace-nowrap">
            {item}
            <span className="text-accent not-italic text-2xl">✺</span>
          </span>
        ))}
      </div>
    </div>
  );
}
