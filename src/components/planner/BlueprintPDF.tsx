"use client";

import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Image, 
  Font,
  Svg,
  Path,
  G
} from '@react-pdf/renderer';

// Note: In a real environment, we'd register fonts here. 
// We'll use standard PDF fonts for now to ensure compatibility.

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 20,
  },
  header: {
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 8,
    color: '#666',
    marginTop: 5,
    letterSpacing: 2,
  },
  logo: {
    width: 40,
    height: 40,
    backgroundColor: '#000',
  },
  schematicContainer: {
    height: 300,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  table: {
    width: 'auto',
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 5,
  },
  tableHeader: {
    backgroundColor: '#f6f6f6',
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 9,
    flex: 1,
  },
  tableCellRight: {
    fontSize: 9,
    textAlign: 'right',
    flex: 0.5,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 7,
    color: '#999',
    textTransform: 'uppercase',
  }
});

interface BlueprintPDFProps {
  template: any;
  buildData: any;
  vehicleData: any;
}

export const BlueprintPDF = ({ template, buildData, vehicleData }: BlueprintPDFProps) => {
  const { settings, blocks } = template;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {blocks.map((block: any) => {
          switch (block.type) {
            case 'header':
              return (
                <View key={block.id} style={[styles.header, { borderBottomColor: settings.primaryColor }]}>
                  <View>
                    <Text style={[styles.title, { color: settings.secondaryColor }]}>{block.content || "Technical Blueprint"}</Text>
                    <Text style={styles.subtitle}>REF: {buildData.id?.slice(0, 8) || "DRAFT"} // {vehicleData.name}</Text>
                  </View>
                  <View style={styles.logo} />
                </View>
              );
            
            case 'schematic':
              return (
                <View key={block.id} style={[styles.schematicContainer, { height: block.height || 300 }]}>
                   <Text style={{ fontSize: 10, color: '#aaa' }}>[ DYNAMIC SVG SCHEMATIC VIEWPORT ]</Text>
                   <Text style={{ fontSize: 8, color: '#ccc', marginTop: 10 }}>Composite Overlay: Electrical, Water, Heating</Text>
                </View>
              );

            case 'technical_specs':
              return (
                <View key={block.id} style={styles.section}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase', color: settings.primaryColor }}>Engineering Specifications</Text>
                  <View style={styles.table}>
                     <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>GVM Limit</Text>
                        <Text style={styles.tableCellRight}>{vehicleData.gvm} kg</Text>
                     </View>
                     <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Projected Kerb Weight</Text>
                        <Text style={styles.tableCellRight}>{Math.round(buildData.total_weight_grams / 1000)} kg</Text>
                     </View>
                     <View style={styles.tableRow}>
                        <Text style={styles.tableCell}>Available Payload</Text>
                        <Text style={styles.tableCellRight}>{vehicleData.gvm - Math.round(buildData.total_weight_grams / 1000)} kg</Text>
                     </View>
                  </View>
                </View>
              );

            case 'bill_of_materials':
              return (
                <View key={block.id} style={styles.section}>
                  <Text style={{ fontSize: 10, fontWeight: 'bold', marginBottom: 10, textTransform: 'uppercase', color: settings.primaryColor }}>Bill of Materials (BOM)</Text>
                  <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeader]}>
                      <Text style={styles.tableCell}>Category</Text>
                      <Text style={styles.tableCell}>System Tier</Text>
                    </View>
                    {Object.entries(buildData.system_tiers || {}).map(([key, val]: [string, any]) => (
                      <View key={key} style={styles.tableRow}>
                        <Text style={[styles.tableCell, { textTransform: 'capitalize' }]}>{key}</Text>
                        <Text style={styles.tableCell}>{val}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              );

            case 'footer':
              return (
                <View key={block.id} style={styles.footer}>
                  <Text style={styles.footerText}>{block.content || "© 2026 Amplios Engineering"}</Text>
                  <Text style={styles.footerText}>Page 1 of 1</Text>
                </View>
              );

            default:
              return null;
          }
        })}
      </Page>
    </Document>
  );
};
