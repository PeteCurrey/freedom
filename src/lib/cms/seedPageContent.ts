import { createClient } from '@supabase/supabase-js';

export interface SeedField {
  sectionKey: string;
  fieldKey: string;
  fieldType: 'text' | 'textarea' | 'richtext' | 'image' | 'url' | 'boolean';
  value: string;
}

/**
 * Seeds initial page content into the page_content table.
 * Uses upsert so re-running never overwrites existing edited values.
 * Call this once per page on first CMS load if no rows exist.
 */
export async function seedPageContent(
  pageKey: string,
  fields: SeedField[]
): Promise<void> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const rows = fields.map(f => ({
    page_key: pageKey,
    section_key: f.sectionKey,
    field_key: f.fieldKey,
    field_type: f.fieldType,
    value: f.value,
    updated_at: new Date().toISOString(),
    updated_by: 'system:seed',
  }));

  await supabase
    .from('page_content')
    .upsert(rows, { onConflict: 'page_key,section_key,field_key', ignoreDuplicates: true });
}

// ---------------------------------------------------------------
// Default seed data for every managed page
// ignoreDuplicates: true means existing edits are never overwritten
// ---------------------------------------------------------------

export const PAGE_SEEDS: Record<string, SeedField[]> = {
  home: [
    { sectionKey: 'hero', fieldKey: 'heading', fieldType: 'text', value: 'Engineering Freedom.' },
    { sectionKey: 'hero', fieldKey: 'subheading', fieldType: 'textarea', value: 'The UK\'s most technical campervan conversion platform. From chassis selection to wiring diagrams — built for builders who don\'t cut corners.' },
    { sectionKey: 'hero', fieldKey: 'cta_label', fieldType: 'text', value: 'Launch Build Planner' },
    { sectionKey: 'hero', fieldKey: 'cta_href', fieldType: 'url', value: '/planner' },
    { sectionKey: 'hero', fieldKey: 'image_url', fieldType: 'image', value: '/images/bespoke-sprinter.png' },
    { sectionKey: 'intro', fieldKey: 'heading', fieldType: 'text', value: "THIS ISN'T VANLIFE" },
    { sectionKey: 'intro', fieldKey: 'body', fieldType: 'textarea', value: "Forget the Instagram filter. We're here for the builds that run induction hobs off lithium, heat through Alpine winters, and carry you 100,000 miles without breaking a sweat." },
    { sectionKey: 'showcase', fieldKey: 'heading', fieldType: 'text', value: 'BUILT BY THE COMMUNITY' },
    { sectionKey: 'showcase', fieldKey: 'subheading', fieldType: 'text', value: 'Real builds. Real builders. No filters.' },
    { sectionKey: 'gear', fieldKey: 'heading', fieldType: 'text', value: 'GEAR THAT GOES THE DISTANCE' },
    { sectionKey: 'gear', fieldKey: 'subheading', fieldType: 'text', value: 'Professional-grade components, tested in the field.' },
    { sectionKey: 'planner_cta', fieldKey: 'heading', fieldType: 'text', value: 'PLAN YOUR BUILD' },
    { sectionKey: 'planner_cta', fieldKey: 'body', fieldType: 'textarea', value: 'Select your base vehicle. Configure your systems. Get a complete parts list and budget estimate in real-time.' },
    { sectionKey: 'planner_cta', fieldKey: 'cta_label', fieldType: 'text', value: 'Launch Build Planner →' },
    { sectionKey: 'planner_cta', fieldKey: 'cta_href', fieldType: 'url', value: '/planner' },
  ],
  planner: [
    { sectionKey: 'hero', fieldKey: 'heading', fieldType: 'text', value: 'BUILD PLANNER' },
    { sectionKey: 'hero', fieldKey: 'subheading', fieldType: 'textarea', value: 'Configure your entire van conversion system by system. Get a full bill of materials, payload analysis, and cost estimate.' },
    { sectionKey: 'intro', fieldKey: 'body', fieldType: 'textarea', value: 'Select your base vehicle and work through each installation stage to build a complete, costed specification.' },
  ],
  'van-design-studio': [
    { sectionKey: 'hero', fieldKey: 'heading', fieldType: 'text', value: 'VAN DESIGN STUDIO' },
    { sectionKey: 'hero', fieldKey: 'subheading', fieldType: 'textarea', value: 'Design your van layout in 2D. Drag and drop components, plan your floor plan, and export your build.' },
    { sectionKey: 'intro', fieldKey: 'body', fieldType: 'textarea', value: 'A precision 2D canvas for planning your campervan interior before you pick up a single tool.' },
  ],
  'systems/electrical-solar': [
    { sectionKey: 'hero', fieldKey: 'heading', fieldType: 'text', value: 'ELECTRICAL & SOLAR' },
    { sectionKey: 'hero', fieldKey: 'subheading', fieldType: 'textarea', value: 'Victron-powered off-grid power systems including Lithium monitoring and solar arrays.' },
    { sectionKey: 'hero', fieldKey: 'image_url', fieldType: 'image', value: '/images/tech-electrical.png' },
    { sectionKey: 'cta', fieldKey: 'heading', fieldType: 'text', value: 'Ready to Start Your Installation?' },
    { sectionKey: 'cta', fieldKey: 'cta_label', fieldType: 'text', value: 'Visit the Online Store' },
    { sectionKey: 'cta', fieldKey: 'cta_href', fieldType: 'url', value: '/store/electrical-core' },
  ],
  'systems/heating': [
    { sectionKey: 'hero', fieldKey: 'heading', fieldType: 'text', value: 'HEATING & HOT WATER' },
    { sectionKey: 'hero', fieldKey: 'subheading', fieldType: 'textarea', value: 'Truma, Webasto and Eberspächer air and water heating solutions for all climates.' },
    { sectionKey: 'hero', fieldKey: 'image_url', fieldType: 'image', value: '/images/heating-system-technical.png' },
    { sectionKey: 'cta', fieldKey: 'heading', fieldType: 'text', value: 'Ready to Start Your Installation?' },
    { sectionKey: 'cta', fieldKey: 'cta_label', fieldType: 'text', value: 'Shop Heating Systems' },
    { sectionKey: 'cta', fieldKey: 'cta_href', fieldType: 'url', value: '/store/heating-climate' },
  ],
  'systems/water': [
    { sectionKey: 'hero', fieldKey: 'heading', fieldType: 'text', value: 'WATER & PLUMBING' },
    { sectionKey: 'hero', fieldKey: 'subheading', fieldType: 'textarea', value: 'Fresh and waste water management, pressurized systems and luxury wet-room design.' },
    { sectionKey: 'hero', fieldKey: 'image_url', fieldType: 'image', value: '/images/tech-water.png' },
    { sectionKey: 'cta', fieldKey: 'heading', fieldType: 'text', value: 'Ready to Start Your Installation?' },
    { sectionKey: 'cta', fieldKey: 'cta_label', fieldType: 'text', value: 'Shop Water Systems' },
    { sectionKey: 'cta', fieldKey: 'cta_href', fieldType: 'url', value: '/store/water-plumbing' },
  ],
  'systems/insulation': [
    { sectionKey: 'hero', fieldKey: 'heading', fieldType: 'text', value: 'INSULATION & VENTILATION' },
    { sectionKey: 'hero', fieldKey: 'subheading', fieldType: 'textarea', value: 'Advanced insulation materials, sound deadening and MaxxAir ventilation systems.' },
    { sectionKey: 'hero', fieldKey: 'image_url', fieldType: 'image', value: '/images/insulation-technical.png' },
    { sectionKey: 'cta', fieldKey: 'heading', fieldType: 'text', value: 'Ready to Start Your Installation?' },
    { sectionKey: 'cta', fieldKey: 'cta_label', fieldType: 'text', value: 'Shop Insulation' },
    { sectionKey: 'cta', fieldKey: 'cta_href', fieldType: 'url', value: '/store/insulation-interior' },
  ],
  store: [
    { sectionKey: 'hero', fieldKey: 'heading', fieldType: 'text', value: 'THE HARDWARE REGISTRY' },
    { sectionKey: 'hero', fieldKey: 'subheading', fieldType: 'textarea', value: 'Professional-grade components for serious campervan conversions. Tested, verified, and ready for your build.' },
    { sectionKey: 'hero', fieldKey: 'image_url', fieldType: 'image', value: '/images/systems-showcase.png' },
    { sectionKey: 'intro', fieldKey: 'heading', fieldType: 'text', value: 'ENGINEERED COMPONENTS' },
    { sectionKey: 'intro', fieldKey: 'body', fieldType: 'textarea', value: 'Every product in our registry has been evaluated for payload impact, installation complexity, and system compatibility.' },
    { sectionKey: 'featured', fieldKey: 'heading', fieldType: 'text', value: 'FEATURED SYSTEMS' },
  ],
  blog: [
    { sectionKey: 'hero', fieldKey: 'heading', fieldType: 'text', value: 'THE BUILD JOURNAL' },
    { sectionKey: 'hero', fieldKey: 'subheading', fieldType: 'textarea', value: 'Technical guides, build reports, and engineering deep-dives from the Amplios team.' },
    { sectionKey: 'hero', fieldKey: 'image_url', fieldType: 'image', value: '/images/hero-background.png' },
    { sectionKey: 'intro', fieldKey: 'body', fieldType: 'textarea', value: 'Every article is written by builders, for builders. No fluff. Just specifications.' },
  ],
  about: [
    { sectionKey: 'hero', fieldKey: 'heading', fieldType: 'text', value: 'ABOUT AMPLIOS' },
    { sectionKey: 'hero', fieldKey: 'subheading', fieldType: 'textarea', value: 'Built by engineers who live in vans. Designed for those who refuse to compromise.' },
    { sectionKey: 'hero', fieldKey: 'image_url', fieldType: 'image', value: '/images/community-showcase.png' },
    { sectionKey: 'intro', fieldKey: 'heading', fieldType: 'text', value: 'WHO WE ARE' },
    { sectionKey: 'intro', fieldKey: 'body', fieldType: 'textarea', value: 'Amplios is a technical platform built by people who have spent years converting vans, learning from mistakes, and engineering better solutions.' },
    { sectionKey: 'mission', fieldKey: 'heading', fieldType: 'text', value: 'OUR MISSION' },
    { sectionKey: 'mission', fieldKey: 'body', fieldType: 'textarea', value: 'To make professional-grade van conversion knowledge and hardware accessible to every builder, regardless of experience level.' },
  ],
};
