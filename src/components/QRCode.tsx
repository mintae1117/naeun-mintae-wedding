import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import "./QRCode.css";

function WeddingQRCode() {
  const websiteUrl = "https://naeun-mintae-wedding.pages.dev/";
  const qrRef = useRef<HTMLDivElement>(null);

  // SVG 다운로드
  const downloadSVG = () => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const svgBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const svgUrl = URL.createObjectURL(svgBlob);

    const link = document.createElement("a");
    link.href = svgUrl;
    link.download = "mt-naeun-wedding-qr.svg";
    link.click();
    URL.revokeObjectURL(svgUrl);
  };

  // PNG 다운로드 (고해상도)
  const downloadPNG = (scale = 4) => {
    const svg = qrRef.current?.querySelector("svg");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;
      ctx.scale(scale, scale);
      ctx.drawImage(img, 0, 0);

      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "mt-naeun-wedding-qr.png";
        link.click();
        URL.revokeObjectURL(url);
      }, "image/png");
    };

    img.src =
      "data:image/svg+xml;base64," +
      btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="qr-container">
      <h3 className="qr-title">청첩장 QR코드</h3>

      <div ref={qrRef} className="qr-code-wrapper">
        <QRCodeSVG
          value={websiteUrl}
          size={256}
          level="H"
          includeMargin={true}
        />
      </div>

      <p className="qr-description">
        QR코드를 스캔하여
        <br />
        모바일 청첩장을 확인하세요
      </p>

      <div className="qr-buttons">
        <button onClick={downloadSVG} className="qr-button qr-button-svg">
          SVG 다운로드
        </button>
        <button
          onClick={() => downloadPNG(4)}
          className="qr-button qr-button-png"
        >
          PNG 다운로드
        </button>
      </div>
    </div>
  );
}

export default WeddingQRCode;
