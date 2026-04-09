import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  try {
    const body = await req.json().catch(() => ({}));
    const slug: string | undefined = body?._id ? undefined : body?.slug?.current;

    // Always revalidate the insights listing page
    revalidatePath("/insights");

    // Also revalidate the specific article if slug is known
    if (slug) {
      revalidatePath(`/insights/${slug}`);
    }

    return NextResponse.json({ revalidated: true, slug: slug ?? "all" });
  } catch {
    return NextResponse.json({ message: "Error revalidating" }, { status: 500 });
  }
}
