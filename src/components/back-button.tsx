"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
	const router = useRouter();

	return (
		<button
			onClick={() => router.back()}
			className="btn-elegant animate-fade-in rounded-elegant opacity-0"
		>
			<ChevronLeft size={16} strokeWidth={1.5} />
			<span>Back</span>
		</button>
	);
}
