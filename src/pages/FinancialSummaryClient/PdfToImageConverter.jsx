import React, { useEffect, useRef, useState } from "react";
import { getDocument } from "pdfjs-dist";
import { pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfToImageConverter = ({ profitLossUrl }) => {
    const [pdf, setPdf] = useState(null);
    const [images, setImages] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pdfRendering, setPdfRendering] = useState(false);
    const [pageRendering, setPageRendering] = useState(false);
    const canvasRef = useRef([]);

    useEffect(() => {
        const loadPdf = async () => {
            try {
                setPdfRendering(true);
                const pdfDocument = await pdfjs.getDocument(profitLossUrl).promise;
                setPdf(pdfDocument);
                setPdfRendering(false);
                setCurrentPage(1);
            } catch (error) {
                console.error(error);
                // Handle error
            }
        };

        loadPdf();
    }, [profitLossUrl]);

    function changePage(pageNumber) {
        if (pageNumber >= 1 && pageNumber <= (pdf && pdf.numPages)) {
            setCurrentPage(pageNumber);
        }
    }

    async function renderPage() {
        if (!pdf || images[currentPage - 1]) return; // Check if the page has already been rendered

        setPageRendering(true);
        const page = await pdf.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1 });
        const canvas = canvasRef.current[currentPage - 1];
        const canvasElement = canvas.current;
        const context = canvasElement.getContext("2d");
        canvasElement.height = viewport.height;
        canvasElement.width = viewport.width;
        const renderContext = {
            canvasContext: context,
            viewport: viewport,
        };
        await page.render(renderContext).promise;
        const imgDataUrl = canvasElement.toDataURL("image/png");
        setImages((prevImages) => {
            const updatedImages = [...prevImages];
            updatedImages[currentPage - 1] = imgDataUrl;
            return updatedImages;
        });
        setPageRendering(false);
    }

    useEffect(() => {
        renderPage();
        // eslint-disable-next-line
    }, [pdf, currentPage]);

    return (
        <div id="image-output">
            {images[currentPage - 1] && (
                <img
                    src={images[currentPage - 1]}
                    alt={`Page ${currentPage}`}
                    style={{ height: "100%", width: "auto" }}
                />
            )}
            {[...Array(pdf?.numPages || 0)].map((_, index) => (
                <canvas
                    key={index}
                    ref={(element) => (canvasRef.current[index] = element)}
                    style={{ display: "none" }}
                ></canvas>
            ))}
        </div>
    );
};

export default PdfToImageConverter;
