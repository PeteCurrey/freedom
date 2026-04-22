"use client";

import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font,
  Image
} from '@react-pdf/renderer';

// Register a font for better technical feel
Font.register({
  family: 'Inter',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuGkyAZ9hiA.woff2', fontWeight: 700 },
  ],
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: '#ffffff',
    fontFamily: 'Inter',
  },
  header: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B00',
    paddingBottom: 20,
    marginBottom: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    letterSpacing: -1,
  },
  logoAccent: {
    color: '#FF6B00',
  },
  title: {
    fontSize: 10,
    color: '#666666',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  summaryBlock: {
    padding: 20,
    backgroundColor: '#F9F9F9',
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B00',
  },
  statusPass: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
    marginBottom: 5,
  },
  statusFail: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ef4444',
    marginBottom: 5,
  },
  score: {
    fontSize: 12,
    color: '#666666',
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: 'bold',
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: 8,
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  item: {
    flexDirection: 'row',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },
  itemStatus: {
    width: 20,
    fontSize: 10,
  },
  itemContent: {
    flex: 1,
  },
  itemLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  itemDesc: {
    fontSize: 8,
    color: '#666666',
  },
  itemStandard: {
    fontSize: 7,
    color: '#FF6B00',
    marginTop: 4,
    fontStyle: 'italic',
  },
  criticalTag: {
    fontSize: 7,
    color: '#ef4444',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  disclaimer: {
    marginTop: 40,
    padding: 15,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    backgroundColor: '#FAFAFA',
  },
  disclaimerTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    marginBottom: 5,
    textTransform: 'uppercase',
  },
  disclaimerText: {
    fontSize: 7,
    color: '#666666',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  footerText: {
    fontSize: 8,
    color: '#999999',
  }
});

interface ComplianceReportProps {
  projectName: string;
  auditItems: any[];
  checkedIds: Set<string>;
  score: number;
  isCompliant: boolean;
}

export const ComplianceReport = ({ 
  projectName, 
  auditItems, 
  checkedIds, 
  score, 
  isCompliant 
}: ComplianceReportProps) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>
            AMPLIOS<Text style={styles.logoAccent}>.</Text>
          </Text>
        </View>
        <Text style={styles.title}>Technical Compliance Manifest</Text>
      </View>

      {/* Summary */}
      <View style={styles.summaryBlock}>
        <Text style={isCompliant ? styles.statusPass : styles.statusFail}>
          {isCompliant ? 'COMPLIANCE STATUS: VERIFIED' : 'COMPLIANCE STATUS: REJECTED'}
        </Text>
        <Text style={styles.score}>
          Project: {projectName} | Technical Integrity Score: {score}%
        </Text>
        <Text style={{ fontSize: 8, color: '#999999', marginTop: 10 }}>
          Generated on: {new Date().toLocaleDateString('en-GB')}
        </Text>
      </View>

      {/* Audit Sections */}
      {auditItems.map((section) => (
        <View key={section.id} style={styles.section} wrap={false}>
          <Text style={styles.sectionHeader}>{section.title}</Text>
          {section.items.map((item: any) => (
            <View key={item.id} style={styles.item}>
              <Text style={[styles.itemStatus, { color: checkedIds.has(item.id) ? '#10b981' : '#ef4444' }]}>
                {checkedIds.has(item.id) ? '✓' : '×'}
              </Text>
              <View style={styles.itemContent}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.itemLabel}>{item.label}</Text>
                  {item.critical && !checkedIds.has(item.id) && (
                    <Text style={styles.criticalTag}>Critical Hub Failure</Text>
                  )}
                </View>
                <Text style={styles.itemDesc}>{item.description}</Text>
                <Text style={styles.itemStandard}>Ref: {item.standard}</Text>
              </View>
            </View>
          ))}
        </View>
      ))}

      {/* Disclaimer */}
      <View style={styles.disclaimer} wrap={false}>
        <Text style={styles.disclaimerTitle}>Technical Engineering Disclaimer</Text>
        <Text style={styles.disclaimerText}>
          This document is a technical manifest generated by the Amplios Engineering Hub. It provides a verification 
          of compliance against BS EN and DVLA standards for habitation vehicles. This report IS NOT a substitute 
          for a Landlord's Gas Safety Record (required for hire) or an EICR signed by a certified engineer. 
          The builder remains responsible for ensuring all installations are performed by competent persons 
          according to current UK Safety Standard BS EN 1949 and BS EN 1648.
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>Amplios Registry // Node 04 Engineering Hub</Text>
        <Text style={styles.footerText}>Ref: {Math.random().toString(36).substr(2, 9).toUpperCase()}</Text>
      </View>
    </Page>
  </Document>
);
