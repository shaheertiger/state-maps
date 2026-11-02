"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({ palette: { primary: { main: "#4f46e5" }, text: { primary: "#0f172a" } }, typography: { fontFamily: "\"Inter\", ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif", button: { textTransform: "none", fontWeight: 650 } }, shape: { borderRadius: 14 }, components: { MuiOutlinedInput: { styleOverrides: { root: { background: "#fff" } } } } });
export default function SiteTheme({ children }: { children: React.ReactNode }) { return <ThemeProvider theme={theme}>{children}</ThemeProvider>; }
