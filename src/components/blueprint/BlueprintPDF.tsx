"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#0A0A0A',
    color: '#FFFFFF',
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FF6B00',
    paddingBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: { fontSize: 18, fontWeight: 'bold', color: '#FF6B00' },
  title: { fontSize: 24, marginBottom: 10, textTransform: 'uppercase' },
  sectionTitle: { fontSize: 14, marginTop: 20, marginBottom: 10, color: '#FF6B00', textTransform: 'uppercase', letterSpacing: 2 },
  text: { fontSize: 10, marginBottom: 5, color: '#CCCCCC', lineHeight: 1.5 },
  table: { display: 'flex', flexDirection: 'column', marginTop: 10 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#333333', paddingVertical: 5 },
  tableCol: { flex: 1, fontSize: 8 },
  footer: { position: 'absolute', bottom: 30, left: 40, right: 40, fontSize: 8, textAlign: 'center', color: '#666666', borderTopWidth: 1, borderTopColor: '#333333', paddingTop: 10 }
});

export const BlueprintPDF = ({ data }: { data: any }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 40, color: '#FF6B00', marginBottom: 20 }}>DIY MOTORHOMES</Text>
        <Text style={styles.title}>BUILD BLUEPRINT PACK</Text>
        <Text style={[styles.text, { fontSize: 14 }]}>FOR: {data.vehicleName} {data.configId}</Text>
        <Text style={[styles.text, { marginTop: 40 }]}>Build ID: {data.buildId}</Text>
        <Text style={styles.text}>TIER: {data.tier.toUpperCase()}</Text>
      </View>
      <View style={styles.footer}><Text>© 2026 DIY MOTORHOMES | ENGINEERED FOR LIFE</Text></View>
    </Page>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}><Text style={styles.logo}>DIYM</Text><Text style={{ fontSize: 10 }}>PROJECT OVERVIEW // SECTION 01</Text></View>
      <Text style={styles.sectionTitle}>Vehicle Specifications</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}><Text style={styles.tableCol}>SPECIFICATION</Text><Text style={styles.tableCol}>VALUE</Text></View>
        <View style={styles.tableRow}><Text style={styles.tableCol}>Foundation</Text><Text style={styles.tableCol}>{data.vehicleName}</Text></View>
        <View style={styles.tableRow}><Text style={styles.tableCol}>Configuration</Text><Text style={styles.tableCol}>{data.configId}</Text></View>
        <View style={styles.tableRow}><Text style={styles.tableCol}>Est. Build Weight</Text><Text style={styles.tableCol}>{data.totalWeight} kg</Text></View>
      </View>
      <View style={styles.footer}><Text>PAGE 2 | {data.buildId}</Text></View>
    </Page>
  </Document>
);
