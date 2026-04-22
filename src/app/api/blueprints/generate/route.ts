import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import React from 'react';
import { renderToStream } from '@react-pdf/renderer';
import { BlueprintPDF } from '@/components/planner/BlueprintPDF';
import { vehicleData as allVehicleData } from '@/lib/data/vehicles';

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const buildId = searchParams.get('buildId');

    if (!buildId) {
      return NextResponse.json({ error: "Missing Build ID" }, { status: 400 });
    }

    // 1. Fetch Build Data
    const { data: build, error: buildError } = await supabaseAdmin
      .from('build_plans')
      .select('*')
      .eq('id', buildId)
      .single();

    if (buildError || !build) {
      return NextResponse.json({ error: "Build not found" }, { status: 404 });
    }

    // 2. Fetch Active Template
    const { data: template, error: templateError } = await supabaseAdmin
      .from('blueprint_templates')
      .select('*')
      .eq('is_active', true)
      .single();

    // Fallback template if none active
    const activeTemplate = template?.layout_config || {
      settings: { primaryColor: "#ff6b00", secondaryColor: "#111111", fontFamily: "Helvetica" },
      blocks: [
        { id: "header", type: "header", y: 0, content: "Master Engineering Manifest" },
        { id: "schematic", type: "schematic", y: 120, height: 300 },
        { id: "specs", type: "technical_specs", y: 450 },
        { id: "bom", type: "bill_of_materials", y: 600 },
        { id: "footer", type: "footer", y: 800 }
      ]
    };

    // 3. Resolve Vehicle Data
    // Note: We're using the slug from the build record to find the technical specs
    const vehicleId = build.vehicle_id; 
    // In our simplified setup, vehicle_id might be a UUID. We need to find the correct entry.
    // For now we'll match by name or fallback to a default if not found.
    const vehicle = Object.values(allVehicleData).find(v => v.name.toLowerCase().includes(build.name.toLowerCase().split(' ')[0].toLowerCase())) || allVehicleData['mercedes-sprinter'];

    // 4. Render PDF to stream
    const stream = await renderToStream(
      React.createElement(BlueprintPDF, {
        template: activeTemplate,
        buildData: build,
        vehicleData: vehicle
      })
    );

    // 5. Return PDF as response
    return new Response(stream as any, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="freedom_blueprint_${buildId.slice(0,8)}.pdf"`,
      },
    });

  } catch (error: any) {
    console.error('PDF Generation Error:', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
