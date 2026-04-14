import { renderToStream } from "@react-pdf/renderer";
import { BlueprintPDF } from "@/components/blueprint/BlueprintPDF";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { planData } = await req.json();

    // In a real implementation:
    // 1. Fetch full plan data from Supabase
    // 2. Fetch BOM based on selected tiers

    // Mock BOM for demonstration based on the selected tier.
    let bom: { sku: string; name: string; brand: string; qty: number; price: number }[] = [];
    if (planData.tier && planData.tier !== 'starter') {
        bom = [
            { sku: "PMP122305010", name: "MultiPlus-II 12/3000/120-32", brand: "Victron Energy", qty: 1, price: 125000 },
            { sku: "SCC110030210", name: "SmartSolar MPPT 100/30", brand: "Victron Energy", qty: 1, price: 19500 },
            { sku: "ORI121236140", name: "Orion-Tr Smart 12/12-30A DC-DC charger", brand: "Victron Energy", qty: 1, price: 21000 },
            { sku: "BAT512132410", name: "LiFePO4 Battery 12,8V/330Ah Smart", brand: "Victron Energy", qty: 1, price: 185000 },
            { sku: "33512-01", name: "Combi D4 E", brand: "Truma", qty: 1, price: 235000 }
        ];
    }
    
    const pdfData = { ...planData, bom };
    const stream = await renderToStream(<BlueprintPDF data={pdfData} />);
    
    // Convert stream to Buffer
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const chunks: any[] = [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    for await (const chunk of stream as any) {
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
