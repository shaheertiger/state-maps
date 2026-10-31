import { ImageResponse } from "next/og";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";
export default function Icon() { return new ImageResponse(<div style={{ background: "#3451c4", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 68, fontWeight: 700, color: "white" }}>PP</div>, size); }
