import React, { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";
import { Page, View, StyleSheet, Image, Text } from '@react-pdf/renderer';

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import { BiBorderBottom } from "react-icons/bi";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#fff',
        padding: 10,
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

const ExecutiveSummary = ({ footerLogo, executiveAnalysis, keepAnEyeOn, strategicOpportunities }) => {

    return (
        <Page size="LETTER" style={styles.page}>
            <View style={styles.title}>
                <Text style={{ borderBottom: '1pt solid black' }}>Executive Summary</Text>
            </View>
            <View style={styles.analysis}>
                <Text style={{ marginLeft: '10px', textDecoration: 'underline' }}>Analysis</Text>
                <Text style={styles.analysisBody}>{executiveAnalysis}</Text>
            </View>
            <View style={styles.analysis}>
                <Text style={{ marginLeft: '10px', textDecoration: 'underline' }}>Keep an Eye On</Text>
                <Text style={styles.analysisBody}>{keepAnEyeOn}</Text>
            </View>
            <View style={styles.analysis}>
                <Text style={{ marginLeft: '10px', textDecoration: 'underline' }}>Strategic Opportunities</Text>
                <Text style={styles.analysisBody}>{strategicOpportunities}</Text>
            </View>
            <View style={styles.footer}>
                <Image src={footerLogo} style={styles.footerLogoCss} />
            </View>
        </Page>
    );
};

export default ExecutiveSummary;
