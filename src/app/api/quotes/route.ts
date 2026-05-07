import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    
    // In a real application, you would save this to Supabase
    // e.g., await supabase.from('kit_quotes').insert(data);
    
    console.log('Received Quote Request:', data);

    return NextResponse.json({ 
      success: true, 
      message: 'Quote request submitted successfully. Our team will contact you within 48 hours.' 
    });
  } catch (error: any) {
    console.error('Quote Submission Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
