import React, { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { Page, View, StyleSheet, Image, Text, Link } from '@react-pdf/renderer';

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { BiBorderBottom } from "react-icons/bi";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 10,
        justifyContent: "space-between",
    },
    pdfFile: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 5,
        height: "600px",
        width: "500px",
    },
    title: {
        fontSize: '12px',
        paddingHorizontal: '20px',
        paddingTop: '10px',
        marginBottom: '10px'
    },
    analysis: {
        flex: 1,
        fontSize: '12px',
        padding: '10px',
    },
    analysisBody: {
        fontSize: '9px',
        padding: '10px',
        fontWeight: 'medium'
    },
    analysisContainer: {
        flex: 1,
    },
    disclaimer: {
        marginTop: 'auto', // Pushes the view to the bottom
    },
    disclaimerContainer: {
        flex: 1,
        marginBottom: '40px',
        padding: '10px'
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

const AdditionalResources = ({ footerLogo }) => {

    return (
        <Page size="LETTER" style={styles.page}>
            <View style={styles.title}>
                <Text style={{ borderBottom: '1pt solid black' }}>Additional Resources</Text>
            </View>
            <View style={styles.analysisContainer}>
                <View style={styles.analysis}>
                    <Text style={{ marginLeft: '10px', textDecoration: 'underline' }}>Live Report Review</Text>
                    <Text style={styles.analysisBody}>Click <Link style={styles.link} src="https://foxtailfinancial.com">here</Link> to schedule a live, 30-minute review of this report</Text>

                    <Text style={{ marginLeft: '10px', textDecoration: 'underline' }}>Video Library</Text>
                    <Text style={styles.analysisBody}>Click <Link style={styles.link} src="https://foxtailfinancial.com">here</Link> to visit our video library, which includes 3-minute explanations on the financial statements
                        and KPI’s produced in this report.</Text>


                    <Text style={{ marginLeft: '10px', textDecoration: 'underline' }}>Financial Blog</Text>
                    <Text style={styles.analysisBody}>Click <Link style={styles.link} src="https://foxtailfinancial.com/blog">here</Link> to visit our blog, updated regularly with notes on business, growth, and finance.</Text>


                    <Text style={{ marginLeft: '10px', textDecoration: 'underline' }}>Referral Program</Text>
                    <Text style={styles.analysisBody}>Click <Link style={styles.link} src="https://foxtailfinancial.com/blog">here</Link> to refer a business that could use our services. If your referral joins the Foxtail team and
                        remains a client for two months, you get $500!</Text>
                </View>
                <View style={styles.disclaimerContainer}>
                    <View style={styles.disclaimer}>
                        <Text style={{ marginLeft: '10px', textDecoration: 'underline', fontSize: '12px' }}>Disclaimer</Text>
                        <Text style={styles.analysisBody}>This report is prepared solely for the confidential use of “Company Name”. In the preparation of this report, Foxtail
                            Financial LLC has relied upon the unaudited financial and non-financial information provided to them. This report consists
                            of the beliefs of Foxtail Financial LLC representatives only and should not be relied upon as financial, tax, investment, or
                            legal advice. Foxtail Financial LLC can not be held liable for opinions and data contained in this report. The analysis and
                            report must not be made available, copied, or recited to any other party without our express written permission. Foxtail
                            Financial LLC neither owes nor accepts any duty to any other party and shall not be liable for any loss, damage, or
                            expense of whatsoever nature which is caused by any reliance on the report or the analysis contained herein.</Text>
                    </View>
                </View>

            </View>

            <View style={styles.footer}>
                <Image src={footerLogo} style={styles.footerLogoCss} />
            </View>
        </Page>
    );
};

export default AdditionalResources;
