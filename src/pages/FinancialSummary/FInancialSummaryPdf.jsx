import React from 'react'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const FInancialSummaryPdf = ({ financialSummary }) => {

    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: '20px',
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
        },
        table: {
            display: 'table',
            width: '100%',
            borderStyle: 'solid',
            borderWidth: 1,
            marginBottom: '20px',
        },
        tableRowHeader: {
            flexDirection: 'row',
            backgroundColor: '#f2f2f2',
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            padding: '5px',
        },
        tableCellHeader: {
            fontSize: '12px',
            fontWeight: 'bold',
            borderRightColor: '#dbdbdb',
            borderRightWidth: 1,
            padding: '8px',
            textAlign: 'center',
            flex: 1,
        },
        tableRow: {
            flexDirection: 'row',
            borderBottomColor: '#000',
            borderBottomWidth: 1,
            padding: '5px',
        },
        tableCell: {
            fontSize: '12px',
            borderRightColor: '#dbdbdb',
            borderRightWidth: 1,
            padding: '8px',
            textAlign: 'center',
            flex: 1,
        },
        logoCell: {
            width: '60px',
            padding: '5px',
            textAlign: 'center',
        },
        logoImage: {
            width: '40px',
            height: '40px',
            objectFit: 'cover',
            borderRadius: '50%',
        },
        lastCell: {
            borderRightWidth: 0,
        },
    });

    return (
        <Document>
            <Page style={styles.page}>
                <Text style={styles.title}>Financial Summary</Text>
                <View style={styles.table}>
                    <View style={styles.tableRowHeader}>
                        <Text style={[styles.tableCellHeader, { flex: '0 0 5%' }]}>No.</Text>
                        <Text style={[styles.tableCellHeader, { flex: '0 0 30%' }]}>Business Name</Text>
                        <Text style={[styles.tableCellHeader, { flex: '0 0 20%' }]}>Period Covered</Text>
                        <Text style={[styles.tableCellHeader, { flex: '0 0 25%' }]}>Email</Text>
                        <Text style={[styles.tableCellHeader, { flex: '0 0 20%', borderRightWidth: 0 }]}>Created At</Text>
                    </View>
                    {financialSummary.map((info, ind) => (
                        <View key={ind} style={styles.tableRow}>
                            <Text style={[styles.tableCell, { flex: '0 0 5%' }]}>{ind + 1}</Text>
                            <Text style={[styles.tableCell, { flex: '0 0 30%' }]}>
                                {info.client ? info.client.business_name : ''}
                            </Text>
                            <Text style={[styles.tableCell, { flex: '0 0 20%' }]}>{info.period_covered}</Text>
                            <Text style={[styles.tableCell, { flex: '0 0 25%' }]}>{info.email}</Text>
                            <Text style={[styles.tableCell, styles.lastCell, { flex: '0 0 20%' }]}>
                                {new Date(info.created_at).toLocaleDateString('en-US')}{' '}
                                {new Date(info.created_at).toLocaleTimeString('en-US')}
                            </Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );






}

export default FInancialSummaryPdf