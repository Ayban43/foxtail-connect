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
    },
    analysis: {
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

const KpiDisplay = ({ kpiDisplayUrl, footerLogo }) => {
    const [image, setImage] = useState("");
    const canvasRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        let renderTask = null;

        const fetchPdf = async () => {
            try {
                const response = await fetch(kpiDisplayUrl);
                const arrayBuffer = await response.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);

                const loadingTask = pdfjs.getDocument(uint8Array);
                const pdfDoc = await loadingTask.promise;
                const page = await pdfDoc.getPage(1);
                // Calculate the desired scale based on the original PDF size
                const viewport = page.getViewport({ scale: 3 });

                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                const renderContext = {
                    canvasContext: context,
                    viewport: viewport
                };

                canvas.width = viewport.width;
                canvas.height = viewport.height;

                // Render the PDF page onto the new canvas
                renderTask = page.render(renderContext);

                renderTask.promise.then(() => {
                    if (isMounted) {
                        const imgData = canvas.toDataURL("image/png");
                        setImage(imgData);
                    }
                });
            } catch (error) {
                alert(error.message);
            }
        };

        fetchPdf();

        return () => {
            isMounted = false;

            // Cancel the rendering task if it's still in progress
            if (renderTask && renderTask.cancel) {
                renderTask.cancel();
            }

            // Remove the canvas element from the DOM
            if (canvasRef.current && canvasRef.current.parentNode) {
                canvasRef.current.parentNode.removeChild(canvasRef.current);
            }
        };
    }, [kpiDisplayUrl]);

    return (
        <Page size="LETTER" style={styles.page}>
            <View style={styles.title}>
                <Text style={{ borderBottom: '1pt solid black' }}>KPI Display</Text>
            </View>
            <View style={styles.pdfFile}>
                <Image src={image} />
            </View>
            <View style={styles.footer}>
                <Image src={footerLogo} style={styles.footerLogoCss} />
            </View>
        </Page>
    );
};

export default KpiDisplay;
