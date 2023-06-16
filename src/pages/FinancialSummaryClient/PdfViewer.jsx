import React, { useEffect, useRef, useState } from "react";
import { pdfjs } from "react-pdf";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = ({ pdfUrl }) => {
    const [image, setImage] = useState("");
    const canvasRef = useRef(null);

    useEffect(() => {
        let isMounted = true;
        let renderTask = null;

        const fetchPdf = async () => {
            try {
                const response = await fetch(pdfUrl);
                const arrayBuffer = await response.arrayBuffer();
                const uint8Array = new Uint8Array(arrayBuffer);

                const loadingTask = pdfjs.getDocument(uint8Array);
                const pdfDoc = await loadingTask.promise;
                const page = await pdfDoc.getPage(1);
                const dpi = 1000; // Desired DPI
                const viewport = page.getViewport({ scale: 1 });
                const scale = dpi / 72 / viewport.scale;

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
    }, [pdfUrl]);

    return (
        <div>
            <div ref={canvasRef} style={{ display: "none" }} />
            {image && <img src={image} style={{ height: "100%" }} alt="PDF Preview" />}
        </div>
    );
};

export default PdfViewer;
