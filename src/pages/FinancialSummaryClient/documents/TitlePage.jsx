import React from 'react';
import { PDFViewer, Document, Page, View, StyleSheet, Image, Text } from '@react-pdf/renderer';
import Frequency from '../../../components/Forms/Frequency';

const TitlePage = ({ companyLogo, businessName, periodCovered, frequency, footerLogo }) => {
    const styles = StyleSheet.create({
        page: {
            flexDirection: 'column',
            backgroundColor: '#fff',
            padding: '20px',
        },
        section: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        logoContainer: {
            backgroundColor: '#f2f2f2',
            borderRadius: '50%',
            width: '200px',
            height: '200px',
            justifyContent: 'center',
            alignItems: 'center',
        },
        logoImage: {
            width: '80%',
            height: 'auto',
        },
        title: {
            fontSize: '24px',
            fontWeight: 'bold',
            marginTop: '20px',
            marginBottom: '10px',
            textAlign: 'center',
        },
        subtitle: {
            fontSize: '18px',
            marginBottom: '20px',
            textAlign: 'center',
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
            <View style={styles.section}>
                <View style={styles.logoContainer}>
                    <Image src={companyLogo} style={styles.logoImage} />
                </View>
            </View>
            <View style={styles.section}>
                <Text style={styles.title}>{businessName} {frequency} Financial Report</Text>
                <Text style={styles.subtitle}>{periodCovered}</Text>
            </View>
            <View style={styles.footer}>
                <Image src={footerLogo} style={styles.footerLogoCss} />
            </View>
        </Page>

    );
};

export default TitlePage;
