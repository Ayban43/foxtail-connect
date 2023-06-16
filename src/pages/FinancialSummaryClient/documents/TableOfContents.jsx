import React from 'react';
import { Document, Page, Text, StyleSheet, View, Image } from '@react-pdf/renderer';

const TableOfContents = ({ footerLogo }) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: '30px',
        },
        title: {
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '20px',
            borderBottom: '1pt solid black'
        },
        section: {
            marginTop: '5px',
            marginBottom: '10px',
        },
        paragraph: {
            fontSize: '12px',
            marginBottom: '5px',
            textAlign: 'justify',
        },
        toc: {
            fontSize: '14px',
            marginBottom: '5px',
        },
        footer: {
            position: 'absolute',
            bottom: '10px',
            left: '20px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '50px'
        },
        footerLogoCss: {
            width: 50,
            height: 'auto',
        },

    });

    return (

        <Page size="LETTER" style={styles.page}>
            <Text style={styles.title}>Table Of Contents</Text>

            <View style={styles.section}>
                <Text style={styles.paragraph}>
                    We, at Foxtail Financial LLC, want to extend our heartfelt congratulations to you on your commitment to achieving
                    financial health and success. Your dedication and perseverance have led to significant strides in your business’s
                    journey, and we are proud to be a part of your team as you continue to grow.
                </Text>
                <Text style={styles.paragraph}>
                    As you delve into this financial report, we encourage you to keep an open mind, ask questions, and consider the
                    insights and recommendations provided herein. Together, we can work towards achieving your objectives and securing a
                    brighter future.
                </Text>
                <Text style={styles.paragraph}>Warm regards,</Text>
                <Text style={styles.paragraph}>Zack Goldglantz</Text>
                <Text style={styles.toc}>CEO, Foxtail Financial LLC</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.toc}>
                    <Text style={{ fontWeight: 'bold' }}>p. 3</Text> Profit & Loss Statement
                </Text>
                <Text style={styles.toc}>
                    <Text style={{ fontWeight: 'bold' }}>p. 4</Text> Balance Sheet
                </Text>
                <Text style={styles.toc}>
                    <Text style={{ fontWeight: 'bold' }}>p. 5</Text> Statement of Cash Flows
                </Text>
                <Text style={styles.toc}>
                    <Text style={{ fontWeight: 'bold' }}>p. 6</Text> KPI Display
                </Text>
                <Text style={styles.toc}>
                    <Text style={{ fontWeight: 'bold' }}>p. 7</Text> Forecasted Financials
                </Text>
                <Text style={styles.toc}>
                    <Text style={{ fontWeight: 'bold' }}>p. 8</Text> Executive Summary
                </Text>
                <Text style={styles.toc}>
                    <Text style={{ fontWeight: 'bold' }}>p. 9</Text> Additional Resources
                </Text>
            </View>
            <View style={styles.footer}>
                <Image src={footerLogo} style={styles.footerLogoCss} />
            </View>
        </Page>



    );
};

export default TableOfContents;
