import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-x pt-20 pb-10 min-h-[60vh] text-center">
      <p className="eyebrow">Error 404</p>
      <h1 className="display text-[clamp(5rem,18vw,14rem)] mt-4">
        Off the <em className="text-accent">shelf.</em>
      </h1>
      <p className="text-muted mt-4 text-lg">That page has been sold out, moved, or never existed.</p>
      <div className="mt-10 flex justify-center gap-3">
        <Link href="/" className="btn btn-primary h-14 px-8">
          Back home
        </Link>
        <Link href="/shop" className="btn btn-ghost h-14 px-8">
          Browse the shop
        </Link>
      </div>
    </div>
  );
}
