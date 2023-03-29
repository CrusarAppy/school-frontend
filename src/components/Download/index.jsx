import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import PDFViewer from "../PDFViewer/PDFViewer";

const pdfList = [
  { title: "School Leaving Certificate", date: "Feb 23, 2020", id: "1", path: "/pdf/rules_and_regulations.pdf" },
  { title: "School Not Leaving Certificate", date: "Feb 23, 0202", id: "2", path: "/pdf/rules_and_regulations.pdf" },
];

function SingleDownload() {
  const { id } = useParams();
  const [item, setItem] = useState();

  useEffect(() => {
    const temp = pdfList.filter((item) => item.id === id);
    if (temp.length > 0) {
      setItem(temp[0]);
    }
  });
  return (
    <div>
      {item && (
        <section className="ptb-120">
          <div className="container">
            <div className="single-download-title">{item.title}</div>
            <PDFViewer src={item.path} />
          </div>
        </section>
      )}
    </div>
  );
}

export default SingleDownload;
