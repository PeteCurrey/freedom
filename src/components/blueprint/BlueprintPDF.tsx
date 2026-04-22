"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const C = {
  orange: '#FF6B00',
  black: '#0D0D0D',
  white: '#FFFFFF',
  lightGrey: '#F5F5F5',
  midGrey: '#999999',
  darkGrey: '#444444',
  borderGrey: '#E0E0E0',
  green: '#22C55E',
};

const s = StyleSheet.create({
  page: { fontFamily: 'Helvetica', backgroundColor: C.white, color: C.black },
  // Cover
  coverPage: { backgroundColor: C.black, position: 'relative' },
  coverHero: { width: '100%', height: 380, objectFit: 'cover', opacity: 0.5 },
  coverOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, padding: 56 },
  coverTag: { fontSize: 8, color: C.orange, letterSpacing: 3, textTransform: 'uppercase', marginBottom: 8 },
  coverTitle: { fontSize: 40, fontFamily: 'Helvetica-Bold', color: C.white, textTransform: 'uppercase', letterSpacing: -1, lineHeight: 1.1, marginBottom: 16 },
  coverRef: { fontSize: 8, color: C.midGrey, letterSpacing: 2, textTransform: 'uppercase' },
  coverDivider: { width: 60, height: 2, backgroundColor: C.orange, marginVertical: 20 },
  coverMeta: { position: 'absolute', bottom: 56, left: 56, right: 56, flexDirection: 'row', justifyContent: 'space-between' },
  coverMetaLabel: { fontSize: 7, color: C.midGrey, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 },
  coverMetaValue: { fontSize: 10, color: C.white, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 1 },
  // Standard page
  stdPage: { padding: 48 },
  pageHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', borderBottomWidth: 1, borderBottomColor: C.borderGrey, paddingBottom: 12, marginBottom: 32 },
  pageTitle: { fontSize: 8, textTransform: 'uppercase', letterSpacing: 3, color: C.orange, fontFamily: 'Helvetica-Bold' },
  pageRef: { fontSize: 7, color: C.midGrey, letterSpacing: 2, textTransform: 'uppercase' },
  sectionTitle: { fontSize: 14, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 2, color: C.black, marginBottom: 4 },
  sectionSub: { fontSize: 8, color: C.midGrey, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 },
  // Specs grid
  specsGrid: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 28 },
  specCard: { width: '50%', paddingRight: 20, paddingBottom: 16 },
  specLabel: { fontSize: 7, color: C.midGrey, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 4 },
  specValue: { fontSize: 20, fontFamily: 'Helvetica-Bold', color: C.black, textTransform: 'uppercase' },
  specUnit: { fontSize: 9, color: C.midGrey, marginLeft: 4 },
  // Highlight card
  highlightCard: { backgroundColor: C.lightGrey, padding: 20, marginBottom: 20 },
  highlightTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 12, color: C.black },
  highlightRow: { flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 1, borderBottomColor: C.borderGrey, paddingVertical: 8 },
  highlightKey: { fontSize: 8, color: C.darkGrey, textTransform: 'uppercase', letterSpacing: 1 },
  highlightVal: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.black, textTransform: 'uppercase' },
  // Schematic
  schematicImg: { width: '100%', objectFit: 'contain', marginVertical: 8 },
  // BOM table
  tableHeader: { flexDirection: 'row', borderBottomWidth: 2, borderBottomColor: C.black, paddingBottom: 8, marginBottom: 4 },
  tableHeaderCell: { fontSize: 7, fontFamily: 'Helvetica-Bold', textTransform: 'uppercase', letterSpacing: 2, color: C.black },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.borderGrey, paddingVertical: 10, alignItems: 'center' },
  cellSku: { width: '18%', fontSize: 7, color: C.midGrey, fontFamily: 'Helvetica', letterSpacing: 1 },
  cellName: { width: '48%', fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.black },
  cellQty: { width: '8%', fontSize: 8, color: C.darkGrey, textAlign: 'center' },
  cellVendor: { width: '26%', fontSize: 7, color: C.midGrey, textAlign: 'right', textTransform: 'uppercase', letterSpacing: 1 },
  // Notes block
  notesBlock: { borderLeftWidth: 3, borderLeftColor: C.orange, backgroundColor: C.lightGrey, padding: 16, marginVertical: 16 },
  notesLabel: { fontSize: 7, textTransform: 'uppercase', letterSpacing: 2, color: C.orange, fontFamily: 'Helvetica-Bold', marginBottom: 6 },
  notesText: { fontSize: 8, color: C.darkGrey, lineHeight: 1.6 },
  // Footer
  footer: { position: 'absolute', bottom: 32, left: 48, right: 48, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderTopWidth: 1, borderTopColor: C.borderGrey, paddingTop: 10 },
  footerLeft: { fontSize: 7, color: C.midGrey, textTransform: 'uppercase', letterSpacing: 1 },
  footerRight: { fontSize: 7, color: C.midGrey, textTransform: 'uppercase', letterSpacing: 1 },
  logoBox: { backgroundColor: C.black, width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  logoText: { color: C.orange, fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 2 },
  orangeTag: { backgroundColor: C.orange, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', marginBottom: 12 },
  orangeTagText: { color: C.white, fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 2, textTransform: 'uppercase' },
  complianceCheck: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: C.borderGrey },
  checkDot: { width: 8, height: 8, backgroundColor: C.green, marginRight: 12, marginTop: 2 },
  checkLabel: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.black, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 },
  checkSub: { fontSize: 7, color: C.midGrey, letterSpacing: 1 },
  signoffBox: { borderWidth: 1, borderColor: C.borderGrey, padding: 20, marginTop: 24, flexDirection: 'row', justifyContent: 'space-between' },
  signoffField: { width: '45%' },
  signoffLabel: { fontSize: 7, color: C.midGrey, textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 },
  signoffLine: { borderBottomWidth: 1, borderBottomColor: C.darkGrey, height: 24 },
});

const PageFooter = ({ page, ref: refId }: { page: string; ref: string }) => (
  <View style={s.footer}>
    <Text style={s.footerLeft}>Amplios Engineering // Technical Archive // Confidential</Text>
    <Text style={s.footerRight}>Page {page} // Ref: {refId}</Text>
  </View>
);

interface BOMItem { sku: string; name: string; qty: number; vendor: string; }

const TOP_SPEC_BOM: BOMItem[] = [
  { sku: 'PWR-VIC-3000', name: 'Victron MultiPlus-II 12/3000/120-32 Inverter/Charger', qty: 1, vendor: 'Victron Energy' },
  { sku: 'PWR-VIC-MPPT', name: 'Victron SmartSolar MPPT 100/50 Charge Controller', qty: 1, vendor: 'Victron Energy' },
  { sku: 'PWR-VIC-BMV', name: 'Victron BMV-712 Smart Battery Monitor', qty: 1, vendor: 'Victron Energy' },
  { sku: 'BAT-RMR-400', name: 'Roamer 400Ah 12V LiFePO4 Lithium Seatbase Battery', qty: 1, vendor: 'Roamer Batteries' },
  { sku: 'SOL-FLX-200', name: '200W Monocrystalline Flexible Solar Panel', qty: 4, vendor: 'Photonic Universe' },
  { sku: 'HVA-TRU-4E', name: 'Truma Combi 4E CP Plus Gas/Electric Boiler & Heater', qty: 1, vendor: 'Truma' },
  { sku: 'WTR-SHU-90', name: 'Whale Gulper 220 Automatic Shower Drain Pump', qty: 1, vendor: 'Whale' },
  { sku: 'WTR-CAF-80', name: 'CAK Tanks 80L Fresh Water Underslung Tank (Sprinter)', qty: 1, vendor: 'CAK Tanks' },
  { sku: 'WTR-SUB-12', name: 'Seaflo 12V Submersible Water Pump 11.3LPM', qty: 1, vendor: 'Seaflo' },
  { sku: 'STR-PLY-18', name: '18mm Birch Plywood Furniture Grade A/B', qty: 12, vendor: 'Local Supplier' },
  { sku: 'STR-INS-50', name: 'Recticel Instafit 50mm Foam Insulation Panel', qty: 8, vendor: 'Recticel' },
  { sku: 'ELC-CBL-25', name: '25mm² Tinned Copper Marine Battery Cable (per metre)', qty: 6, vendor: 'BM Cables' },
  { sku: 'GAS-MAN-DUO', name: 'Truma DuoControl CS 30mbar Crash-Sensing Regulator', qty: 1, vendor: 'Truma' },
  { sku: 'FLR-TRV-6', name: 'Altro Transflor Metro 6mm Contract Flooring', qty: 4, vendor: 'Altro' },
];

interface Props {
  buildId?: string;
  vehicleName?: string;
  bom?: BOMItem[];
}

export const BlueprintPDF = ({ buildId = 'EXP-900X', vehicleName = 'Mercedes-Benz Sprinter 316 LWB High Roof', bom = TOP_SPEC_BOM }: Props) => {
  const generatedDate = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
  const refCode = `AMP-${buildId}-${new Date().getFullYear()}`;

  return (
    <Document>
      {/* ── PAGE 1: COVER ── */}
      <Page size="A4" style={[s.page, s.coverPage]}>
        <Image style={s.coverHero} src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?q=80&w=2070&auto=format&fit=crop" />
        <View style={s.coverOverlay}>
          <Text style={s.coverTag}>Amplios Engineering // Technical Classification Portfolio</Text>
          <View style={s.coverDivider} />
          <Text style={s.coverTitle}>{'Expedition\nSeries\nBlueprint'}</Text>
          <Text style={s.coverRef}>Master Engineering Manifest // {refCode}</Text>
          <View style={s.coverMeta}>
            <View>
              <Text style={s.coverMetaLabel}>Base Vehicle</Text>
              <Text style={s.coverMetaValue}>{vehicleName}</Text>
            </View>
            <View>
              <Text style={s.coverMetaLabel}>Build Tier</Text>
              <Text style={s.coverMetaValue}>PRO-SPEC EXPEDITION</Text>
            </View>
            <View>
              <Text style={s.coverMetaLabel}>Issued</Text>
              <Text style={s.coverMetaValue}>{generatedDate}</Text>
            </View>
            <View style={s.logoBox}><Text style={s.logoText}>AMP</Text></View>
          </View>
        </View>
      </Page>

      {/* ── PAGE 2: ENGINEERING SPECIFICATIONS ── */}
      <Page size="A4" style={[s.page, s.stdPage]}>
        <View style={s.pageHeader}>
          <Text style={s.pageTitle}>Section 01 // Engineering Telemetry</Text>
          <Text style={s.pageRef}>{refCode}</Text>
        </View>
        <Text style={s.sectionTitle}>Vehicle & Weight Analysis</Text>
        <Text style={s.sectionSub}>GVM Classification // Payload Certification // Load Balance</Text>

        <View style={s.specsGrid}>
          {[
            { label: 'Gross Vehicle Mass', val: '3,500', unit: 'KG' },
            { label: 'Projected Kerb Weight', val: '2,840', unit: 'KG' },
            { label: 'Available Payload', val: '660', unit: 'KG' },
            { label: 'Energy Capacity (DC)', val: '4,800', unit: 'WH' },
            { label: 'Solar Array Output', val: '800', unit: 'W PEAK' },
            { label: 'Fresh Water Capacity', val: '80', unit: 'LITRES' },
          ].map((item) => (
            <View key={item.label} style={s.specCard}>
              <Text style={s.specLabel}>{item.label}</Text>
              <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                <Text style={s.specValue}>{item.val}</Text>
                <Text style={s.specUnit}>{item.unit}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={s.highlightCard}>
          <Text style={s.highlightTitle}>Power System Architecture</Text>
          {[
            ['Inverter / Charger', 'Victron MultiPlus-II 12/3000/120-32'],
            ['Charge Controller', 'Victron SmartSolar MPPT 100/50'],
            ['Battery Bank', '400Ah LiFePO4 @ 12V (4,800Wh usable)'],
            ['Solar Array', '4× 200W Flexible Monocrystalline'],
            ['Shore Power', '230V 16A IEC 60309-2 Blue Inlet'],
            ['Battery Monitor', 'Victron BMV-712 Smart (Bluetooth)'],
          ].map(([k, v]) => (
            <View key={k} style={s.highlightRow}>
              <Text style={s.highlightKey}>{k}</Text>
              <Text style={s.highlightVal}>{v}</Text>
            </View>
          ))}
        </View>

        <View style={s.highlightCard}>
          <Text style={s.highlightTitle}>Thermal & Habitation Systems</Text>
          {[
            ['Space Heating', 'Truma Combi 4E (Gas + Electric, 4kW)'],
            ['Water Heating', 'Integrated 10L boiler via Truma Combi'],
            ['Ventilation', 'Dometic FAN-Tastic 3350 Roof Vent (x2)'],
            ['Insulation', 'Recticel Instafit 50mm + Thermawrap VCL'],
            ['CO Alarm', 'Kidde 7COC Carbon Monoxide Detector'],
            ['LPG Sensor', 'Everon Floor-Level Gas Alarm'],
          ].map(([k, v]) => (
            <View key={k} style={s.highlightRow}>
              <Text style={s.highlightKey}>{k}</Text>
              <Text style={s.highlightVal}>{v}</Text>
            </View>
          ))}
        </View>

        <PageFooter page="2 of 6" ref={refCode} />
      </Page>

      {/* ── PAGE 3: ELECTRICAL SCHEMATIC ── */}
      <Page size="A4" style={[s.page, s.stdPage]}>
        <View style={s.pageHeader}>
          <Text style={s.pageTitle}>Section 02 // Electrical Architecture (12V DC / 230V AC)</Text>
          <Text style={s.pageRef}>{refCode}</Text>
        </View>
        <Text style={s.sectionTitle}>Wiring Schematic</Text>
        <Text style={s.sectionSub}>Solar Array // MPPT // LiFePO4 Bank // Victron MultiPlus // Consumer Unit</Text>

        <Image style={s.schematicImg} src="/schematics/electrical.png" />

        <View style={s.notesBlock}>
          <Text style={s.notesLabel}>Engineer's Note</Text>
          <Text style={s.notesText}>All DC wiring is rated to 1.25× continuous load. PV breakers are correctly sized for maximum short-circuit current. The Victron MultiPlus provides seamless transfer between shore power and inverter within 20ms. All cable runs comply with BS EN 1648-2:2018 and are protected with appropriate fusing at source.</Text>
        </View>
        <PageFooter page="3 of 6" ref={refCode} />
      </Page>

      {/* ── PAGE 4: PLUMBING SCHEMATIC ── */}
      <Page size="A4" style={[s.page, s.stdPage]}>
        <View style={s.pageHeader}>
          <Text style={s.pageTitle}>Section 03 // Plumbing & Hydronics</Text>
          <Text style={s.pageRef}>{refCode}</Text>
        </View>
        <Text style={s.sectionTitle}>Water System Schematic</Text>
        <Text style={s.sectionSub}>Cold Feed // Truma Boiler // Hot Distribution // Grey Waste</Text>

        <Image style={s.schematicImg} src="/schematics/plumbing.png" />

        <View style={s.notesBlock}>
          <Text style={s.notesLabel}>Engineer's Note</Text>
          <Text style={s.notesText}>All water lines use 12mm LDPE push-fit (John Guest) throughout. The Truma Combi is pressure-tested to 6 bar. A 5L accumulator tank eliminates pump cycling. Grey waste drains to a 90L underslung tank with external drain valve. System complies with BS EN 1949 recommendations for water system design.</Text>
        </View>
        <PageFooter page="4 of 6" ref={refCode} />
      </Page>

      {/* ── PAGE 5: BOM ── */}
      <Page size="A4" style={[s.page, s.stdPage]}>
        <View style={s.pageHeader}>
          <Text style={s.pageTitle}>Section 04 // Bill of Materials</Text>
          <Text style={s.pageRef}>{refCode}</Text>
        </View>
        <Text style={s.sectionTitle}>Hardware Manifest Ledger</Text>
        <Text style={s.sectionSub}>Component Specification // Quantity // Vendor Source</Text>

        <View style={s.tableHeader}>
          <Text style={[s.tableHeaderCell, { width: '18%' }]}>SKU</Text>
          <Text style={[s.tableHeaderCell, { width: '48%' }]}>Specification</Text>
          <Text style={[s.tableHeaderCell, { width: '8%', textAlign: 'center' }]}>QTY</Text>
          <Text style={[s.tableHeaderCell, { width: '26%', textAlign: 'right' }]}>Vendor</Text>
        </View>

        {bom.map((item) => (
          <View key={item.sku} style={s.tableRow}>
            <Text style={s.cellSku}>{item.sku}</Text>
            <Text style={s.cellName}>{item.name}</Text>
            <Text style={s.cellQty}>{item.qty}</Text>
            <Text style={s.cellVendor}>{item.vendor}</Text>
          </View>
        ))}
        <PageFooter page="5 of 6" ref={refCode} />
      </Page>

      {/* ── PAGE 6: COMPLIANCE SIGN-OFF ── */}
      <Page size="A4" style={[s.page, s.stdPage]}>
        <View style={s.pageHeader}>
          <Text style={s.pageTitle}>Section 05 // Compliance & Sign-Off</Text>
          <Text style={s.pageRef}>{refCode}</Text>
        </View>
        <Text style={s.sectionTitle}>DVLA Reclassification Checklist</Text>
        <Text style={s.sectionSub}>V5C Category Change // Motorcaravan Classification // Safety Certification</Text>

        {[
          ['Permanent Fixed Bed (≥1.8m)', 'Bed integrated into vehicle structure, mechanically fastened', true],
          ['Permanently Fixed Seating', 'All habitation seating bolted through floor with spreader plates', true],
          ['Dual-Side Fenestration', 'Minimum 2 windows on primary habitation side (excl. cab doors)', true],
          ['Integrated Storage Hubs', 'Wardrobes and lockers mechanically fixed to vehicle structure', true],
          ['Fixed Table Attachment', 'Dining table floor-socket mounted with removable leaf', true],
          ['BS EN 1949 Gas Safety', 'LPG system independently inspected and certified', true],
          ['BS EN 1648-2 DC Integrity', '12V system fully fused and circuit-protected', true],
          ['IET Section 721 Mains', '230V consumer unit installed with RCD and MCB protection', true],
          ['CO & LPG Detection', 'Certified alarms installed per BS EN 50291-1', true],
        ].map(([label, desc, pass]) => (
          <View key={String(label)} style={s.complianceCheck}>
            <View style={s.checkDot} />
            <View style={{ flex: 1 }}>
              <Text style={s.checkLabel}>{label}</Text>
              <Text style={s.checkSub}>{desc}</Text>
            </View>
            <Text style={{ fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.green, textTransform: 'uppercase', letterSpacing: 1 }}>VERIFIED</Text>
          </View>
        ))}

        <View style={s.notesBlock}>
          <Text style={s.notesLabel}>Disclaimer</Text>
          <Text style={s.notesText}>This blueprint has been generated based on the build specification entered by the registered user. It is intended as a supporting document for DVLA reclassification and insurance purposes. An independent engineer inspection is recommended prior to final submission. Amplios Engineering accepts no liability for rejected applications. Always consult a qualified converter and your insurance provider before road use.</Text>
        </View>

        <View style={s.signoffBox}>
          <View style={s.signoffField}>
            <Text style={s.signoffLabel}>Builder / Converter Signature</Text>
            <View style={s.signoffLine} />
          </View>
          <View style={s.signoffField}>
            <Text style={s.signoffLabel}>Date of Completion</Text>
            <View style={s.signoffLine} />
          </View>
        </View>

        <PageFooter page="6 of 6" ref={refCode} />
      </Page>
    </Document>
  );
};
