import Link from "next/link";

import { Logo } from "@/components/logo";
import { NotFoundTracker } from "@/components/not-found-tracker";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-16">
      <NotFoundTracker />
      <div className="max-w-2xl mx-auto text-center">
        <Logo className="w-24 h-24 mx-auto mb-8 opacity-50" />

        <p className="text-sm uppercase tracking-widest text-gray-400 mb-2">
          404
        </p>
        <h1 className="text-4xl font-bold text-gray-900 mb-3">
          Page not found
        </h1>
        <p className="text-base text-gray-500 mb-8 max-w-md mx-auto">
          We don&apos;t have a page at this URL.
        </p>

        <nav className="flex items-center justify-center gap-6 text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-900 transition-colors">
            Home
          </Link>
          <Link href="/blog" className="hover:text-gray-900 transition-colors">
            Blog
          </Link>
          <Link
            href="/nightly"
            className="hover:text-gray-900 transition-colors"
          >
            Nightly
          </Link>
        </nav>
      </div>
    </main>
  );
}
