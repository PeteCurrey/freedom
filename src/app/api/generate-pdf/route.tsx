import { renderToStream } from "@react-pdf/renderer";
import { BlueprintPDF } from "@/components/blueprint/BlueprintPDF";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { planData } = await req.json();

    // In a real implementation:
    // 1. Fetch full plan data from Supabase
    // 2. Map tiers to specific schematic SVG components
    
    const stream = await renderToStream(<BlueprintPDF data={planData} />);
    
    // Convert stream to Buffer
    const chunks: any[] = [];
    for await (const chunk of stream) {
      chunks.push(chunk);
    }
    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="DIYM-Blueprint-${planData.buildId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate blueprint" }, { status: 500 });
  }
}
