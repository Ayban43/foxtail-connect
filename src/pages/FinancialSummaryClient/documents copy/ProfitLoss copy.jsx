import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    section: {
        marginTop: 2,
        marginBottom: 10,
    },
    footer: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '40px'
    },
    footerLogoCss: {
        width: 40,
        height: 'auto',
    },
});



const ProfitLoss = ({ profitLossUrl, profitLossOnDocumentLoadSuccess, profitLossNumPages, profitLossCurrentPage, profitLossGoToPreviousPage, profitLossGoToNextPage, profitLossAnalysis, openModal, footerLogo }) => {
    console.log("hahaha", profitLossUrl)
    return (

        <Page style={styles.page}>
            <View style={styles.section}>
                <Text style={styles.title}>Profit & Loss Statement</Text>
                <View style={styles.section}>
                </View>
                <View style={styles.section}>
                    <Text>Swift Analysis</Text>
                    <Text>{profitLossAnalysis}</Text>
                </View>
            </View>
            <View style={styles.footer}>
                <Image src={footerLogo} style={styles.footerLogo} />
            </View>
        </Page>

    );
};

export default ProfitLoss;
