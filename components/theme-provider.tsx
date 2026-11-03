"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({ palette: { primary: { main: "#1f4fa3" }, text: { primary: "#1f1b16", secondary: "#5e554a" } }, typography: { fontFamily: "var(--font-sans), ui-sans-serif, system-ui, -apple-system, \"Segoe UI\", Roboto, sans-serif", button: { textTransform: "none", fontWeight: 500 } }, shape: { borderRadius: 8 }, components: { MuiOutlinedInput: { styleOverrides: { root: { background: "#fdfbf7" } } } } });
export default function SiteTheme({ children }: { children: React.ReactNode }) { return <ThemeProvider theme={theme}>{children}</ThemeProvider>; }
