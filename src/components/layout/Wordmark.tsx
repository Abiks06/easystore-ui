export default function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span className={`display leading-none tracking-[-0.03em] select-none ${className}`}>
      easy<em className="italic">store</em>
      <span className="text-accent">.</span>
    </span>
  );
}
