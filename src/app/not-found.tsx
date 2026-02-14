import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <span className="text-label mb-4">Error</span>
      <h1 className="font-display text-6xl md:text-8xl text-display mb-6">
        404
      </h1>
      <p className="text-muted font-light text-lg mb-8 max-w-md">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link href="/" className="btn-elegant rounded-elegant">
        Return home
      </Link>
    </div>
  );
}