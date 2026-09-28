import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { site } from "../data/site";

export const runtime = "nodejs";
export const alt = "Revved Performance";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), "public/images/revved-logo-transparent.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          background: "#09090B",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "80px",
          color: "#F4F2F0",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: "radial-gradient(circle at center, rgba(105, 60, 86, 0.4) 0%, transparent 60%)",
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logoSrc} width={378} height={179} alt="" style={{ marginBottom: "32px" }} />
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              fontFamily: "sans-serif",
              letterSpacing: "-0.05em",
              marginBottom: "24px",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            {site.name}
          </div>
          <div
            style={{
              fontSize: "36px",
              color: "#B07A95",
              fontFamily: "sans-serif",
              marginBottom: "24px",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              textAlign: "center",
            }}
          >
            Mobile ECU Remapping &amp; Diagnostics
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#A7A7AA",
              fontFamily: "sans-serif",
              textAlign: "center",
              marginTop: "48px",
            }}
          >
            {site.serviceAreaSummary}
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
