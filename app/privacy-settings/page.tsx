import Directory from "@/components/directory";
import { privacySettings } from "@/lib/settings";
import { pageMetadata } from "@/lib/seo";
export const metadata = pageMetadata("iPhone Privacy Settings Library", "Look up photo and app privacy settings, their limits, steps and verification checks.", "/privacy-settings");
export default function SettingsLibrary() { return <main id="content" className="wrap article wide"><span className="eyebrow">The settings library</span><h1>Know what a setting changes.</h1><p className="lead">Quick answers, steps and limits for photo access, cloud sharing, app visibility and location.</p><p>Paths can vary by software version. Each entry links to provider instructions and a practical check.</p><Directory items={privacySettings.map(s => ({ title: s.title, description: s.answer, group: s.group, href: `/privacy-settings/${s.slug}` }))} /></main>; }
