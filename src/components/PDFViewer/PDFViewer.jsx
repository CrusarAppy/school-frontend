import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import React from "react";

function PDFViewer({ src }) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  return (
    <div>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.js">
        <div style={{ height: "750px" }}>
          <Viewer fileUrl={src} plugins={[defaultLayoutPluginInstance]} />
        </div>
      </Worker>
    </div>
  );
}

export default PDFViewer;
