import { NextResponse } from "next/server";
import { siteConfig } from "@/lib/site";

export async function GET() {
  try {
    const res = await fetch(siteConfig.stableManifestUrl, {
      next: { revalidate: 300 },
    });
    if (!res.ok) {
      return NextResponse.json({ version: null });
    }
    const manifest = await res.json();
    return NextResponse.json({ version: manifest.version ?? null });
  } catch {
    return NextResponse.json({ version: null });
  }
}
