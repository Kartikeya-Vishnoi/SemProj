import React from 'react';
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';


function PdfViewer() {
  return (
    <div className="App">
     <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js">
    <div id="pdfviewer">
        <Viewer fileUrl={"http://localhost:8080/pitches/3861bfd7-4453-41bf-97d6-b27e95373713.pdf"} /> 
    </div>
    </Worker>
    </div>
  );
}

export default PdfViewer;