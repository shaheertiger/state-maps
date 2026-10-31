import { reviewedDate, type Section } from "./content";

export const infoPages: Record<string, { title: string; description: string; sections: Section[] }> = {
  "/about": { title: "About Private Photo Guide", description: "How this independent guide researches iPhone photo privacy.", sections: [
    { heading: "Our scope", body: "Private Photo Guide explains iPhone photo access, sharing and recovery. It is an independent educational website and is not affiliated with Apple or the apps discussed here." },
    { heading: "How we research", body: "Guides link to Apple support and provider documentation. Product comparisons identify vendor claims and do not imply hands-on testing or an independent security audit. We publish review dates and welcome specific corrections through the contact page." },
    { heading: "What a guide can establish", body: "Interface names and service features change. Check the source for your installed release and verify workflows with a harmless sample. We do not promise rankings, recovery success or that any storage choice eliminates every privacy risk." },
  ] },
  "/contact": { title: "Contact and Corrections", description: "Report a factual error or broken page to the website's GitHub repository.", sections: [
    { heading: "Report a problem", body: "Use the public issue tracker linked below to report a broken page or suggest a correction. Include the guide URL, the statement you believe is wrong, the relevant device or software version and a public supporting source." },
    { heading: "Keep private material out of reports", body: "GitHub issues are public and require a GitHub account. Do not attach private photos, account credentials, recovery keys or sensitive personal details. This site does not provide private account recovery or receive photo uploads." },
  ] },
  "/privacy": { title: "Privacy and Local Data", description: "What this website stores and how the privacy review tool works.", sections: [
    { heading: "Photos and accounts", body: "This website has no photo upload feature and does not require a website account. The privacy review tool uses choices in your browser to build guidance. It does not inspect your device settings or photo library." },
    { heading: "Saving and sharing a review", body: "The review stays in memory unless you choose Save on this device. That option stores your choices and completed steps in this browser's local storage. Clear saved review removes that record. A share link encodes your selected general settings in the URL; anyone with the link can read those choices. Do not put personal details into a link." },
    { heading: "Hosting and external services", body: "Your hosting provider can process normal request information such as an IP address and browser headers. Outbound Apple, app-provider and GitHub links take you to services governed by their own policies. The public correction tracker is not a private support channel." },
    { heading: "Optional measurement", body: "If the operator configures Google Tag Manager, the site offers an optional measurement choice before loading it. Declining leaves it unloaded. Consent is stored in this browser. Changing the choice to declined reloads the page to stop site-loaded tags; third-party cookies already set may need clearing in your browser. Global Privacy Control and Do Not Track are respected by this loader." },
  ] },
  "/terms": { title: "Using This Guide", description: "Scope, attribution and responsible use of this educational website.", sections: [
    { heading: "Educational information", body: "Use these guides to understand the available controls and plan checks on your own devices. They are not a guarantee of security, data recovery or compatibility with every software release. Keep a verified copy before changing storage or deleting files." },
    { heading: "External products", body: "Product names identify the services being discussed. Their providers control their software, availability and terms. Descriptions here do not imply endorsement or affiliation." },
    { heading: "Corrections", body: "Use the public contact route for factual corrections. Do not submit private pictures or credentials. The site does not offer account recovery or accept payment." },
  ] },
};
export const contactUrl = "https://github.com/shaheertiger/state-maps/issues/new";
export const staticUpdated = reviewedDate;
