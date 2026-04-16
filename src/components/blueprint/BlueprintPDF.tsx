"use client";

import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

interface BlueprintPDFProps {
  data: {
    vehicleName: string;
    configId: string;
    buildId: string;
    tier: string;
    totalWeight: number;
    bom?: {
      sku: string;
      name: string;
      brand: string;
      qty: number;
      price: number;
    }[];
  };
}

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

export const BlueprintPDF = ({ data }: BlueprintPDFProps) => {
  const { vehicleName, configId, buildId, tier, totalWeight } = data;
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 40, color: '#FF6B00', marginBottom: 20 }}>AMPLIOS</Text>
          <Text style={styles.title}>BUILD BLUEPRINT PACK</Text>
          <Text style={[styles.text, { fontSize: 14 }]}>FOR: {vehicleName} {configId}</Text>
          <Text style={[styles.text, { marginTop: 40 }]}>Build ID: {buildId}</Text>
          <Text style={styles.text}>TIER: {tier.toUpperCase()}</Text>
        </View>
        <View style={styles.footer}><Text>© 2026 AMPLIOS | ENGINEERED FOR LIFE</Text></View>
      </Page>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}><Text style={styles.logo}>AMPLIOS</Text><Text style={{ fontSize: 10 }}>PROJECT OVERVIEW // SECTION 01</Text></View>
        <Text style={styles.sectionTitle}>Vehicle Specifications</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}><Text style={styles.tableCol}>SPECIFICATION</Text><Text style={styles.tableCol}>VALUE</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCol}>Foundation</Text><Text style={styles.tableCol}>{vehicleName}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCol}>Configuration</Text><Text style={styles.tableCol}>{configId}</Text></View>
          <View style={styles.tableRow}><Text style={styles.tableCol}>Est. Build Weight</Text><Text style={styles.tableCol}>{totalWeight} kg</Text></View>
        </View>
        <View style={styles.footer}><Text>PAGE 2 | {buildId}</Text></View>
      </Page>
      
      <Page size="A4" style={styles.page}>
        <View style={styles.header}><Text style={styles.logo}>AMPLIOS</Text><Text style={{ fontSize: 10 }}>BILL OF MATERIALS // SECTION 02</Text></View>
        <Text style={styles.sectionTitle}>Technical Components</Text>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <Text style={[styles.tableCol, { flex: 0.5 }]}>QTY</Text>
            <Text style={[styles.tableCol, { flex: 1 }]}>BRAND</Text>
            <Text style={[styles.tableCol, { flex: 2 }]}>PRODUCT</Text>
            <Text style={[styles.tableCol, { flex: 1 }]}>SKU</Text>
            <Text style={[styles.tableCol, { flex: 0.8, textAlign: 'right' }]}>EST. PRICE</Text>
          </View>
          {data.bom && data.bom.length > 0 ? (
            data.bom.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCol, { flex: 0.5 }]}>{item.qty}x</Text>
                <Text style={[styles.tableCol, { flex: 1 }]}>{item.brand}</Text>
                <Text style={[styles.tableCol, { flex: 2, color: '#FFFFFF' }]}>{item.name}</Text>
                <Text style={[styles.tableCol, { flex: 1 }]}>{item.sku}</Text>
                <Text style={[styles.tableCol, { flex: 0.8, textAlign: 'right' }]}>£{(item.price / 100).toFixed(2)}</Text>
              </View>
            ))
          ) : (
            <View style={styles.tableRow}>
              <Text style={styles.tableCol}>No components specified for this tier.</Text>
            </View>
          )}
        </View>
        <View style={styles.footer}><Text>PAGE 3 | {buildId}</Text></View>
      </Page>
    </Document>
  );
};
