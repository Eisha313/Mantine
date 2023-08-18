import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    alignItems: "center",
    padding: "1cm",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

const PDFDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Content here */}
      <View style={styles.section}>
        <Text>PDF Content</Text>
      </View>
    </Page>
  </Document>
);

export default PDFDocument;p