import { NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY || 'sk-ant-dummy-key',
});

export async function POST(req: Request) {
  try {
    const { messages, context } = await req.json();

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({ 
        role: 'assistant', 
        content: "I'm currently in offline mode. Please add an ANTHROPIC_API_KEY to the environment variables to activate my engineering brain." 
      });
    }

    const systemPrompt = `
      You are the DIY Motorhomes AI Build Advisor—a specialist engineering consultant for van conversions.
      Your goal is to help users design high-performance, compliant, and safe off-grid vehicles.
      
      TECHNICAL CONTEXT:
      - Current Vehicle: ${context.vehicle || 'Unknown'}
      - Layout: ${context.layout || 'Unknown'}
      - Systems selected: ${JSON.stringify(context.systems || {})}
      
      ENGINEERING RULES:
      1. Priority #1 is SAFETY (Gas safety, electrical fusing, weight limits).
      2. If a user asks about transverse beds in a Sprinter or Transit, remind them the internal width is ~178-180cm—flares are required unless they are short.
      3. Recommend Victron for Electrical, Truma/Webasto for Heating, and Dometic/MaxxAir for Climate.
      4. Always mention Payload (GVWR). A medium wheelbase van only has ~1300kg to play with.
      5. Keep responses concise, professional, and slightly "engineering-focused"—use terms like "thermal bridging", "voltage drop", and "structural rib".

      Avoid generic advice. Use the technical data provided.
    `;

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1000,
      system: systemPrompt,
      messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
    });

    return NextResponse.json({ 
      role: 'assistant', 
      content: response.content[0].type === 'text' ? response.content[0].text : "I encountered a technical glitch. Please try again." 
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Failed to connect to the advisor.' }, { status: 500 });
  }
}
