import { NextResponse } from "next/server";
import { syncProductToGMC } from "@/lib/integrations/gmc";

export async function POST(req: Request) {
  try {
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 });
    }

    const result = await syncProductToGMC(productId);

    if (result?.success) {
      return NextResponse.json({ success: true, action: result.action });
    } else {
      return NextResponse.json({ error: result?.error || "Sync failed" }, { status: 500 });
    }
  } catch (err: any) {
    console.error("GMC Sync API Error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
