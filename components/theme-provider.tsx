"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({ palette: { primary: { main: "#3451c4" } }, typography: { fontFamily: "system-ui, -apple-system, sans-serif" }, shape: { borderRadius: 10 } });
export default function SiteTheme({ children }: { children: React.ReactNode }) { return <ThemeProvider theme={theme}>{children}</ThemeProvider>; }
