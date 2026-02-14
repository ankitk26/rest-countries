import Link from "next/link";

export default function NotFound() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
			<span className="text-label mb-4">Error</span>
			<h1 className="text-display mb-6 font-display text-6xl md:text-8xl">
				404
			</h1>
			<p className="mb-8 max-w-md text-lg font-light text-muted">
				The page you're looking for doesn't exist or has been moved.
			</p>
			<Link href="/" className="btn-elegant rounded-elegant">
				Return home
			</Link>
		</div>
	);
}
