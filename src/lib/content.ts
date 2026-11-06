/**
 * Generated copy for app pages. Every sentence is derived from the app's App Store record and
 * privacy label, or is general guidance that applies to its category or topic. Nothing here
 * claims hands-on testing, security audits or behaviour the developer did not disclose.
 */
import { CARDS, dataType, HIGH, SENSITIVITY } from "./labels";
import {
  type App, allTypes, linkedTypes, highTypes, level, reported, tracks, getTopic, getCategory, list, lower, cap1,
  monthsSince, fmtMonth, topicStats, url, hasTrackPage, hasLockPage, poss,
} from "./data";

/** Deterministic variety: the same app always gets the same phrasing, neighbours differ. */
const pick = <T,>(a: App, xs: T[], salt = 0): T => xs[(a.id + salt * 7919) % xs.length];
const n = (k: number, one: string, many = one + "s") => `${k} ${k === 1 ? one : many}`;

export function verdict(a: App): { tone: "yes" | "no" | "caution" | "info"; label: string; detail: string } {
  const d = a.display;
  switch (level(a)) {
    case 4: return { tone: "no", label: "Tracks you", detail: `${poss(d)} developer reports using ${lower(a.track).join(", ")} to track you across other companies' apps and websites.` };
    case 3: return { tone: "caution", label: "Linked to you, no tracking", detail: `${d} collects ${n(linkedTypes(a).length, "data type")} tied to your identity but declares no tracking.` };
    case 2: return { tone: "info", label: "Not linked to you", detail: `${d} collects some data but says none of it is linked to your identity, and none is used for tracking.` };
    case 1: return { tone: "yes", label: "Data not collected", detail: `${poss(d)} developer states that the app does not collect any data from this app.` };
    default: return { tone: "caution", label: "No details provided", detail: `${poss(d)} developer has not yet provided privacy details on the App Store.` };
  }
}

export function appTitle(a: App) {
  const d = a.display, k = allTypes(a).length;
  switch (level(a)) {
    case 4: return `Is ${d} Safe? It Tracks You (${n(k, "Data Type")} on Its Label)`;
    case 3: return `Is ${d} Safe? ${n(linkedTypes(a).length, "Data Type")} Linked to You, No Tracking`;
    case 2: return `Is ${d} Safe? No Tracking, Data Not Linked to You`;
    case 1: return `Is ${d} Safe? Privacy Label Says No Data Collected`;
    default: return `Is ${d} Safe? No Privacy Details Provided — What to Check`;
  }
}

const clip = (s: string, max = 155) => (s.length <= max ? s : s.slice(0, max - 1).replace(/[\s,;:]+\S*$/, "") + "…");

export function appDescription(a: App) {
  const d = a.display, L = level(a);
  if (L === 0) return clip(`${d} has no App Store privacy details yet. What that means, which iPhone permissions to check, and how ${d} compares with similar apps.`);
  if (L === 1) return clip(`${poss(d)} App Store privacy label says it collects no data. What that covers, what it doesn't, and the iPhone settings worth checking anyway.`);
  const top = highTypes(a).length ? lower(highTypes(a)).slice(0, 2) : lower(allTypes(a)).slice(0, 2);
  return clip(`${d} ${L === 4 ? "tracks you and " : ""}collects ${n(allTypes(a).length, "data type")}, including ${list(top)}. What each means, how it compares and which iPhone settings limit it.`);
}

export function quickAnswer(a: App) {
  const d = a.display, L = level(a), t = getTopic(a.topic), s = topicStats(a.topic);
  if (L === 0) return `There is no privacy label to judge yet. ${poss(d)} developer has not provided privacy details on the App Store, so nothing is disclosed about collection, linking or tracking. Treat permissions carefully and check the privacy policy before you add anything personal.`;
  if (L === 1) return `On the label, yes. ${poss(d)} developer reports that it collects no data, which puts it among the ${s.clean}% of ${t.name.toLowerCase()} we checked with a "Data Not Collected" label. That is a self-declared statement, not an audit, and it does not cover data processed only on your device.`;
  const hi = highTypes(a);
  const head = L === 4 ? `It depends on how you feel about tracking: ${d} declares data used to track you.` : L === 3 ? `Mostly a question of trust: ${d} collects data linked to you but declares no tracking.` : `On the label it is low-risk: ${d} collects some data but says none of it is linked to you or used for tracking.`;
  const mid = hi.length ? ` The sensitive items are ${list(lower(hi))}.` : ` None of it falls in Apple's most sensitive categories (health, financial, location, contacts or your own content).`;
  return `${head}${mid} In total the label lists ${n(allTypes(a).length, "data type")}; ${s.track}% of ${t.name.toLowerCase()} we checked declare tracking.`;
}

/** Up to three short facts for the badge row. */
export function badges(a: App) {
  const out: { label: string; tone: "red" | "green" | "blue" | "amber" | "teal" }[] = [];
  const L = level(a);
  if (L === 4) out.push({ label: "Tracks you", tone: "red" });
  if (L === 1) out.push({ label: "Collects no data", tone: "green" });
  if (L === 0) out.push({ label: "No label details", tone: "amber" });
  if (L === 2) out.push({ label: "Nothing linked to you", tone: "blue" });
  if (highTypes(a).includes("Location")) out.push({ label: "Collects location", tone: "amber" });
  else if (highTypes(a).includes("Financial Info")) out.push({ label: "Collects financial info", tone: "amber" });
  else if (highTypes(a).includes("Health & Fitness")) out.push({ label: "Collects health data", tone: "amber" });
  const m = monthsSince(a.updatedAt);
  if (m !== null && m <= 3) out.push({ label: "Recently updated", tone: "teal" });
  else if (m !== null && m >= 24) out.push({ label: "Not updated in 2+ years", tone: "amber" });
  return out.slice(0, 3);
}

/* ---------- topic and category knowledge (hand-written, applies to every app in the group) ---------- */
export const TOPIC_NOTES: Record<string, { focus: string; check: string; ask: string }> = {
  "photo-vault": { focus: "A photo vault holds the pictures you least want seen, so the questions that matter are where the files live, whether they are encrypted, and what happens if you forget the PIN or change phones.", check: "Import a harmless test photo, then confirm the original in Photos is deleted or kept as you expect, and try the app's backup and restore before trusting it with anything important.", ask: "Can I get my photos back on a new iPhone without the old one?" },
  "private-photos": { focus: "Private-photo apps promise to keep pictures out of your main library. The label shows what leaves the phone; it cannot show whether the hiding is a real lock or just a separate folder.", check: "Check whether the app needs full Photos access or works with selected photos, and whether hidden items still appear in iCloud Photos.", ask: "Are my pictures stored only on this phone, or uploaded?" },
  "password-manager": { focus: "A password manager holds the keys to every other account. Data collection on the label should be limited to what syncing and billing need, and your vault should be end-to-end encrypted.", check: "Look for zero-knowledge or end-to-end encryption in the developer's documentation, and set up account recovery before you migrate passwords.", ask: "Can the developer read my vault, or only I can?" },
  authenticator: { focus: "Authenticator apps generate the second factor for your logins. The biggest practical risk is not data collection but losing your codes when you lose your phone.", check: "Turn on encrypted backup or export your accounts, and save the recovery codes each service gave you.", ask: "If this iPhone is lost, how do I restore my codes?" },
  "secure-messenger": { focus: "Messengers see who you talk to as well as what you say. Even with end-to-end encrypted content, contact lists and metadata can be collected and linked to you.", check: "Check whether contact upload is optional, whether backups are encrypted too, and whether disappearing messages exist.", ask: "Is the message content end-to-end encrypted by default, including backups?" },
  "encrypted-notes": { focus: "Notes apps quietly collect some of your most personal writing. 'Encrypted' can mean encrypted in transit, at rest on the server, or end-to-end — only the last keeps the developer out.", check: "Find which kind of encryption the developer documents, and whether a lost password means lost notes.", ask: "Who holds the encryption key for my notes?" },
  "document-scanner": { focus: "Scanners handle IDs, contracts, receipts and medical letters. Many offer cloud OCR, which means your document images leave the phone.", check: "Prefer on-device text recognition where offered, and check whether scans sync to the developer's cloud by default.", ask: "Are my scans processed on the phone or uploaded for OCR?" },
  "cloud-storage": { focus: "Cloud storage apps exist to move your files off the phone, so collecting user content is expected. What differs is encryption, sharing defaults and what the provider can read.", check: "Review automatic camera upload, shared-link expiry and whether client-side encryption is available.", ask: "Can the provider scan or read the files I upload?" },
  "private-browser": { focus: "A private browser should collect less than the sites it visits. Browsing History or Identifiers on its label are worth a second look.", check: "Check the default search engine, whether history syncs to an account, and whether tracker blocking is on by default.", ask: "Does the browser keep my history on its servers?" },
  "photo-manager": { focus: "Photo managers usually ask for full library access. That gives them every picture, along with its location and date metadata.", check: "Grant Limited Access first and widen it only if the feature you want genuinely needs the whole library.", ask: "Does it upload photos for AI features, or analyse them on the phone?" },
  "video-storage": { focus: "Video storage apps upload large personal files, often including faces and voices of other people.", check: "Check upload settings over cellular, who can access shared videos and how to delete a video from the server, not just the app.", ask: "When I delete a video, is it deleted from the server too?" },
  "journal-diary": { focus: "Journals collect your private thoughts, moods and often your location and photos. A lock screen inside the app is not the same as encryption of the synced entries.", check: "Check whether entries sync to the developer's server and whether that sync is end-to-end encrypted; export your journal regularly.", ask: "Can anyone at the company read my entries?" },
  "pdf-editor": { focus: "PDF editors open contracts, tax forms and IDs. Online conversion features can send whole documents to a server.", check: "Check which features work offline and whether files are deleted from the server after conversion.", ask: "Does editing or converting a PDF upload it?" },
  "file-manager": { focus: "File managers connect to cloud drives, servers and your Files app. The app can see whatever you open in it.", check: "Review connected accounts, and remove ones you no longer use from both the app and the cloud provider's security page.", ask: "Which of my connected accounts can this app reach?" },
  "family-organizer": { focus: "Family organizers collect data about several people at once — schedules, children's names, locations and shopping lists.", check: "Check which family members can see what, and whether location sharing is optional.", ask: "Does it share my family's data with advertisers?" },
  "budget-planner": { focus: "Budget planners often connect to bank accounts through an aggregator, which can see your transactions.", check: "Check whether bank linking is optional and which aggregator is used; manual entry keeps more data off the server.", ask: "Who else sees my transactions besides the app?" },
  banking: { focus: "Banking apps must collect identity and financial data to work; that is expected. Tracking declarations and third-party advertising SDKs are what to compare.", check: "Turn on the app's own biometric login and transaction alerts, and download banking apps only from the bank's own developer account.", ask: "Is this app published by my bank's verified developer account?" },
  "secure-email": { focus: "Email apps see every message and contact. Third-party mail clients may route mail through their own servers to offer features like push or AI summaries.", check: "Check whether the client connects to your provider directly or stores your mail on its servers.", ask: "Does my email pass through the app maker's servers?" },
  "contacts-backup": { focus: "Contacts backup apps upload your whole address book — other people's names, numbers and addresses, not just yours.", check: "Check where the backup is stored, whether it is encrypted, and how to delete it from the server.", ask: "How do I delete my contacts from their server later?" },
  "calendar-planner": { focus: "Calendars reveal where you will be and who you meet. Planner apps may also read your other calendars and reminders.", check: "Check the Calendars permission level (full access or add-only) in Settings › Privacy & Security › Calendars.", ask: "Does it need to read my calendars, or only add events?" },
  "health-tracker": { focus: "Health trackers collect symptoms, vitals and habits. In the US, most consumer health apps are not covered by HIPAA, so the privacy policy is your main protection.", check: "Grant HealthKit categories one by one in the Health app, and avoid connecting categories the app does not need.", ask: "Is my health data shared with partners or used for ads?" },
  "medical-records": { focus: "Medical-record apps hold diagnoses, prescriptions and insurance details. Patient portals from your provider are bound by health-privacy rules in a way most standalone apps are not.", check: "Confirm the app is published by your hospital, insurer or a well-known records service, and turn on its login lock.", ask: "Is this app run by my healthcare provider, or a third party?" },
  "voice-recorder": { focus: "Recorders capture other people's voices as well as yours, and transcription features often upload audio.", check: "Check whether transcription happens on device, and review Microphone access in Settings › Privacy & Security › Microphone.", ask: "Are my recordings uploaded to transcribe them?" },
  "photo-backup": { focus: "Photo backup apps upload your library by design, including location metadata embedded in each picture.", check: "Check whether backups keep original location data and whether shared albums are public links.", ask: "Is my photo library encrypted on their servers?" },
  "security-camera": { focus: "Security camera apps stream video from inside and around your home. Cloud recording, sharing with household members and law-enforcement request policies all matter.", check: "Turn on two-factor authentication for the camera account and review who has shared access.", ask: "Who can view my camera footage, and is it end-to-end encrypted?" },
  "privacy-protection": { focus: "Privacy tools — VPNs, blockers and scanners — can see a lot of your traffic. A privacy app that collects identifiers or usage data deserves a careful read.", check: "Check whether the app logs traffic or DNS queries and who operates its servers.", ask: "Does the privacy app itself log what I do?" },
  "digital-wallet": { focus: "Wallet apps hold payment details, passes or crypto keys. Financial data on the label is expected; tracking alongside it is the thing to compare.", check: "Back up recovery phrases offline for crypto wallets, and use Apple Pay where a card wallet is optional.", ask: "If I lose my phone, how do I lock or recover the wallet?" },
  "expense-tracker": { focus: "Expense trackers record what you spend and where. Receipt scanning can upload images containing card digits and addresses.", check: "Check whether receipts are stored on the server and whether bank linking is optional.", ask: "Are receipt photos stored on their servers?" },
};

export const CATEGORY_NOTES: Record<string, string> = {
  productivity: "Productivity apps tend to collect the work you do in them — documents, notes and files — so User Content is common. The question is whether it syncs to the developer's servers and how it is protected there.",
  utilities: "Utilities range from calculators to VPNs, so their labels vary more than any other category. A simple tool that collects identifiers and usage data for tracking is a sign of advertising SDKs.",
  finance: "Finance apps need identity and financial data to function. Expect Contact Info and Financial Info; compare apps on tracking and third-party advertising instead.",
  "photo-video": "Photo and video apps usually request access to your photo library. iOS lets you share only selected photos, which keeps the rest of the library — and its location metadata — away from the app.",
  business: "Business apps often handle other people's data — clients, colleagues and customers — so what they collect can affect more than you.",
  lifestyle: "Lifestyle apps cover family, home and personal organisation, and often combine location, contacts and photos in one place.",
  "health-fitness": "Health and fitness apps can read Apple Health data only for categories you approve, one by one. What they collect themselves is shown on the label.",
  medical: "Medical apps may hold the most sensitive data on your phone. Whether US health-privacy law applies depends on who runs the app, not on the App Store category.",
  "social-networking": "Social apps are built around identity and contacts, so data linked to you is nearly universal. Tracking and contact upload are the settings worth checking.",
};

/* ---------- section copy ---------- */

/** "What each data type means for this app" — one entry per type, most sensitive first. */
export function typeRows(a: App) {
  return allTypes(a).map((t) => {
    const dt = dataType(t);
    const cards = (["track", "linked", "notLinked"] as const).filter((k) => a[k].includes(t));
    return { name: t, slug: dt.slug, plain: dt.plain, why: dt.why, setting: dt.setting, cards, high: HIGH.has(t) };
  });
}

/** iPhone permissions and settings worth reviewing, derived from the label (most relevant first). */
export function settingsFor(a: App) {
  const types = allTypes(a);
  const out: [string, string][] = [];
  if (tracks(a) || types.includes("Identifiers")) out.push(["Tracking", "Settings › Privacy & Security › Tracking. If “Allow Apps to Request to Track” is off, apps cannot ask, and they are told to treat you as having declined. You can also turn it off for this app alone."]);
  if (types.includes("Location")) out.push(["Location", "Settings › Privacy & Security › Location Services › " + a.display + ". Choose While Using or Never, and switch off Precise Location if a city-level answer is enough."]);
  if (types.includes("User Content") || ["photo-video"].includes(a.category) || /photo|video|scanner|vault/.test(a.topic)) out.push(["Photos", "Settings › Privacy & Security › Photos. Limited Access lets you pick exactly which pictures the app can see; Add Photos Only lets it save without reading your library."]);
  if (types.includes("Contacts") || a.topic === "secure-messenger" || a.category === "social-networking") out.push(["Contacts", "Settings › Privacy & Security › Contacts. Limited Access shares only the people you select instead of your whole address book."]);
  if (types.includes("Health & Fitness") || ["health-fitness", "medical"].includes(a.category)) out.push(["Health", "Health app › your profile picture › Apps › " + a.display + ". Turn categories on one at a time; the app cannot tell which ones you declined."]);
  if (a.topic === "voice-recorder" || a.topic === "secure-messenger" || a.topic === "security-camera") out.push(["Microphone & camera", "Settings › Privacy & Security › Microphone and Camera. The orange and green dots in the status bar show when either is in use."]);
  if (types.includes("Contact Info")) out.push(["Sign-in", "When creating an account, Sign in with Apple can give the app a relay address from Hide My Email instead of your real one."]);
  out.push(["Lock the app", "On iOS 18 and later, touch and hold the icon and choose Require Face ID. Anyone who picks up your unlocked phone then needs your face, fingerprint or passcode to open it."]);
  out.push(["Notifications", "Settings › Notifications › " + a.display + " › Show Previews: When Unlocked keeps message and account details off the Lock Screen."]);
  return out.slice(0, 6);
}

export function aboutRows(a: App): [string, string][] {
  return [
    ["Developer", a.developer],
    ["App Store category", getCategory(a.category).name + (a.genres.length > 1 ? ` (also ${a.genres.filter((g) => g !== getCategory(a.category).name).join(", ")})` : "")],
    ["Latest version", a.version ? `${a.version}, released ${fmtMonth(a.updatedAt)}` : "Not listed"],
    ["First released", fmtMonth(a.releasedAt)],
    ["Requires", a.minimumIos ? `iOS ${a.minimumIos} or later` : "Not listed"],
    ["Size", a.sizeMb ? `${a.sizeMb} MB` : "Not listed"],
    ["Age rating", a.ageRating ?? "Not listed"],
    ["Languages", a.languages.length ? `${a.languages.length} (${a.languages.slice(0, 8).join(", ")}${a.languages.length > 8 ? "…" : ""})` : "Not listed"],
    ["Bundle ID", a.bundleId],
  ];
}

export function freshness(a: App) {
  const m = monthsSince(a.updatedAt);
  if (m === null) return "The App Store record does not list a release date for the current version.";
  if (m <= 2) return `The current version shipped in ${fmtMonth(a.updatedAt)}, so the app is actively maintained and its label is likely current. Labels are updated by developers when practices change.`;
  if (m <= 12) return `The current version shipped in ${fmtMonth(a.updatedAt)}. That is recent enough that the label should reflect current practices, but check the App Store page again before relying on it.`;
  if (m <= 24) return `The current version shipped in ${fmtMonth(a.updatedAt)}, over a year before our snapshot. Older apps can lag behind iOS privacy features such as limited photo and contact access.`;
  return `The current version shipped in ${fmtMonth(a.updatedAt)}, ${Math.floor(m / 12)} years before our snapshot. Apps that are not updated may not support newer iOS privacy controls, and an abandoned app will not get security fixes.`;
}

/** Long-form paragraphs for the "What this means" section. */
export function interpretation(a: App): string[] {
  const d = a.display, L = level(a), t = getTopic(a.topic), s = topicStats(a.topic), tn = TOPIC_NOTES[a.topic];
  const out: string[] = [];
  if (L === 0) {
    out.push(`${poss(d)} App Store page shows “No Details Provided”. Apple requires a privacy label when a developer submits an update, so this usually means the app has not been updated since labels became mandatory in December 2020, or the developer has not completed the form. It does not mean the app collects nothing, and it does not mean it collects everything: it means there is no statement to hold the developer to.`);
    out.push(`Until a label appears, your iPhone's permission prompts are the most reliable signal. Every time ${d} asks for photos, location, contacts, the microphone or tracking, you can say no and see whether the feature you need still works.`);
  } else if (L === 1) {
    out.push(`“Data Not Collected” is the cleanest result a label can show. It means the developer states that no data leaves your iPhone in a way the developer or its partners can access for longer than needed to handle a request. Data processed only on your device does not count as collected, so ${d} can still read files or photos you open in it.`);
    out.push(`The statement is the developer's own. Apple reviews apps but does not audit every label, and analytics or crash-reporting libraries added later can make a label out of date. If ${d} asks you to create an account, upload files or allow tracking, that would not match a no-collection label — and is worth noticing.`);
  } else {
    const hi = highTypes(a);
    out.push(`${poss(d)} label has ${[a.track.length && `${n(a.track.length, "type")} under “${CARDS.track.title}”`, a.linked.length && `${n(a.linked.length, "type")} under “${CARDS.linked.title}”`, a.notLinked.length && `${n(a.notLinked.length, "type")} under “${CARDS.notLinked.title}”`].filter(Boolean).join(", ")}. A data type can appear in more than one section when it is used for different purposes — for example, identifiers used for both analytics and advertising.`);
    if (L === 4) out.push(`Tracking is the declaration that most separates apps. It means ${lower(a.track).join(", ")} from ${d} can be combined with data from other companies to target or measure ads, or shared with data brokers. On iOS 14.5 and later, the app must ask your permission before tracking you through the advertising identifier; answering “Ask App Not to Track” blocks that identifier and tells the developer you have declined.`);
    else if (L === 3) out.push(`${d} declares no tracking, which means the developer says it does not combine your data with other companies' data for advertising or sell it to data brokers. The data linked to you — ${list(lower(linkedTypes(a)))} — is still tied to your identity, typically through an account, and is covered by the developer's privacy policy and retention rules.`);
    else out.push(`Every type on ${poss(d)} label is in the “not linked” section, so the developer says the data is stripped of anything that identifies you before it is used. That is typical of anonymous analytics and crash reporting. Not linked is still collected: the data leaves your phone.`);
    out.push(hi.length
      ? `The items that deserve the most attention are ${list(lower(hi))}. ${dataType(hi[0]).why}`
      : `None of the data types fall into the categories most people consider sensitive: health, financial information, precise location, contacts, browsing history or the content you create.`);
  }
  out.push(`${tn.focus} ${tn.check}`);
  if (reported(a) && s.n >= 5) {
    const k = allTypes(a).length;
    const cmp = k > s.avgTypes + 1 ? "more than" : k < s.avgTypes - 1 ? "fewer than" : "about the same as";
    out.push(`Among the ${s.n} ${t.name.toLowerCase()} in our snapshot with a label, ${s.track}% declare tracking, ${s.linked}% collect data linked to you and ${s.clean}% say they collect nothing. ${d} lists ${n(k, "data type")}, ${cmp} the average of ${s.avgTypes} for this group.`);
  }
  out.push(CATEGORY_NOTES[a.category]);
  return out;
}

export function limitsOfLabel(a: App): string[] {
  return [
    `A label is self-reported. Apple publishes the developer's answers and can reject apps that misrepresent them, but it does not independently verify what ${a.display} sends.`,
    "It does not say where data is stored, how long it is kept, whether it is encrypted, or which companies receive it. The privacy policy covers those points.",
    "Optional data counts: if a feature lets you add something (a profile photo, a phone number), the type is listed even if you never use the feature.",
    "Data handled only on your iPhone is not 'collected', so a no-collection label is compatible with an app that reads your files locally.",
    "Third-party sign-in, payment processors and SDKs are supposed to be included, but a label can lag behind a new version.",
  ];
}

/* ---------- interactive widgets ---------- */
export type Opt = { label: string; tone: "fresh" | "edge" | "toss"; head: string; text: string };

/** "The app asked me for…" — compares a permission prompt with what the label declares. */
export function permissionChecker(a: App): Opt[] {
  const types = allTypes(a);
  const has = (t: string) => types.includes(t);
  const L = level(a), d = a.display;
  const verdictFor = (t: string, perm: string, why: string): Opt => {
    if (L === 0) return { label: perm, tone: "edge", head: "No label to compare", text: `${d} has no privacy details, so you cannot check this prompt against a statement. Allow it only if the feature you want obviously needs ${perm.toLowerCase()}.` };
    if (has(t)) return { label: perm, tone: "fresh", head: "Matches the label", text: `${d} lists ${t} on its label${a.track.includes(t) ? ", including for tracking" : a.linked.includes(t) || a.track.includes(t) ? ", linked to you" : ""}. ${why}` };
    return { label: perm, tone: "edge", head: "Not on the label", text: `${t} is not on ${poss(d)} label. That can be fine: data used only on your iPhone does not have to be declared. If the data would need to leave the phone for the feature to work, ask why it is missing.` };
  };
  return [
    verdictFor("Location", "Location", "Choose While Using and turn off Precise Location if the feature works without it."),
    verdictFor("User Content", "Photos", "Choose Limited Access and pick only the photos you want to share."),
    verdictFor("Contacts", "Contacts", "Limited Access shares selected contacts instead of your whole address book."),
    tracks(a)
      ? { label: "Tracking", tone: "toss", head: "Expected — and you can decline", text: `${d} declares data used to track you, so expect the “Allow to track?” prompt. Tap Ask App Not to Track; the app must keep working without it.` }
      : L === 0
        ? { label: "Tracking", tone: "edge", head: "No label to compare", text: "Without a label you cannot tell how tracking data would be used. Declining costs you nothing: apps must work without tracking permission." }
        : { label: "Tracking", tone: "edge", head: "Not declared on the label", text: `${d} declares no tracking, so a tracking prompt would contradict its label. Decline it, and consider reporting the mismatch to Apple.` },
    verdictFor("Health & Fitness", "Health data", "Approve Health categories one at a time in the Health app."),
  ];
}

export type Quiz = { q: string; answer: boolean; why: string };
export function quizFor(a: App): Quiz[] {
  const d = a.display, L = level(a);
  const q: Quiz[] = [];
  if (L === 0) q.push({ q: `“No Details Provided” means ${d} collects no data.`, answer: false, why: "It means the developer has not filled in the label. Collection is unknown, not zero." });
  else q.push({ q: `${poss(d)} privacy label says it uses data to track you.`, answer: L === 4, why: L === 4 ? `True: it lists ${list(lower(a.track))} under Data Used to Track You.` : `False: there is no Data Used to Track You section on ${poss(d)} label.` });
  q.push({ q: "Apple tests every app to confirm its privacy label is accurate.", answer: false, why: "Labels are self-reported by developers. Apple can reject or remove apps that misrepresent practices, but it does not audit each label." });
  if (L >= 2) {
    const t = allTypes(a)[0];
    q.push({ q: `${d} collects ${t}.`, answer: true, why: `True: ${t} appears on its label${a.notLinked.includes(t) && !a.linked.includes(t) && !a.track.includes(t) ? ", in the Not Linked to You section" : ""}.` });
  } else {
    q.push({ q: `An app with a “Data Not Collected” label cannot read any of your photos.`, answer: false, why: "It can read photos you give it access to. Processing on your device is not collection; only data sent off the phone counts." });
  }
  q.push({ q: "Data “Not Linked to You” is never sent off your iPhone.", answer: false, why: "It is collected and sent; the developer says it is de-identified rather than tied to your account or device." });
  q.push({ q: "Tapping “Ask App Not to Track” can stop an app from working.", answer: false, why: "Apple's rules require apps to work the same whether or not you allow tracking." });
  return q;
}

/** Tick-box audit for the reader's own phone. */
export function auditFor(a: App): { title: string; text: string }[] {
  const types = allTypes(a);
  const out = [
    { title: "Checked the label myself", text: `Open ${a.display} on the App Store and scroll to App Privacy — labels change with updates.` },
    { title: "Reviewed permissions", text: `Settings › Apps › ${a.display}: switch off anything the features you use don't need.` },
  ];
  if (tracks(a) || types.includes("Identifiers")) out.push({ title: "Declined tracking", text: "Settings › Privacy & Security › Tracking, or Ask App Not to Track at the prompt." });
  if (types.includes("Location")) out.push({ title: "Limited location", text: "While Using, with Precise Location off unless needed." });
  if (types.includes("User Content") || /photo|vault|video/.test(a.topic)) out.push({ title: "Limited photo access", text: "Selected photos only, not the whole library." });
  out.push({ title: "Locked the app", text: "Touch and hold the icon › Require Face ID (iOS 18+)." });
  out.push({ title: "Know how to leave", text: "Find the in-app account deletion option before you add personal data." });
  return out.slice(0, 6);
}

/* ---------- FAQ ---------- */
export function faqFor(a: App): [string, string][] {
  const d = a.display, L = level(a), t = getTopic(a.topic);
  const f: [string, string][] = [];
  f.push([`Is ${d} safe to use?`, L === 0
    ? `${poss(d)} developer has not provided App Store privacy details, so there is no disclosure to judge. That is not evidence of wrongdoing, but limit permissions and avoid storing sensitive data until a label appears.`
    : `Based on its App Store privacy label, ${verdict(a).detail.charAt(0).toLowerCase() + verdict(a).detail.slice(1)} Whether that is acceptable depends on what you will store in it. The label is developer-reported, not an independent security test.`]);
  if (reported(a)) f.push([`Does ${d} track you?`, tracks(a) ? `Yes. Its label lists ${list(lower(a.track))} under Data Used to Track You. You can decline at the iOS tracking prompt.` : `No. ${poss(d)} label has no Data Used to Track You section.`]);
  if (reported(a)) f.push([`What data does ${d} collect?`, L === 1 ? "None, according to the developer's label." : `${cap1(list(lower(allTypes(a))))}. ${linkedTypes(a).length ? `Of these, ${list(lower(linkedTypes(a)))} ${linkedTypes(a).length === 1 ? "is" : "are"} linked to your identity.` : "None of it is linked to your identity."}`]);
  f.push([`Who makes ${d}?`, `${a.developer}, according to the App Store. ${a.releasedAt ? `It was first released in ${fmtMonth(a.releasedAt)}` : "Its first release date is not listed"}${a.version ? ` and the current version is ${a.version}` : ""}.`]);
  f.push([`Can I lock ${d} with Face ID?`, `On iOS 18 or later, touch and hold ${poss(d)} icon and choose Require Face ID (or Touch ID / Passcode). This is an iPhone feature and works for most downloaded apps, whether or not the app has its own lock.${hasLockPage(a) ? "" : " If you don't see the option, update iOS."}`]);
  f.push([`How does ${d} compare with other ${t.name.toLowerCase()}?`, (() => { const s = topicStats(a.topic); return `Across ${s.n} ${t.name.toLowerCase()} with labels in our snapshot, ${s.track}% declare tracking and ${s.clean}% say they collect no data. ${reported(a) ? `${d} lists ${n(allTypes(a).length, "data type")} against an average of ${s.avgTypes}.` : `${d} has no label to compare.`}`; })()]);
  f.push([TOPIC_NOTES[a.topic].ask, `The privacy label cannot answer that. Look for it in ${poss(d)} privacy policy or support pages, linked from the App Store listing. ${TOPIC_NOTES[a.topic].check}`]);
  f.push([`How do I delete my data from ${d}?`, "Apps that let you create an account must also let you start account deletion from inside the app (an App Store rule since June 2022). Deleting the app from your iPhone alone does not delete data already sent to the developer."]);
  return f;
}

/* ---------- variant pages ---------- */
export function trackTitle(a: App) {
  const d = a.display;
  if (tracks(a)) return `Does ${d} Track You? Yes — ${list(a.track.slice(0, 2))}${a.track.length > 2 ? " & More" : ""}`;
  if (level(a) === 1) return `Does ${d} Track You? No — It Says It Collects No Data`;
  return `Does ${d} Track You? No Tracking Declared (${level(a) === 3 ? "Some Data Linked" : "Data Not Linked"})`;
}
export function trackDescription(a: App) {
  const d = a.display;
  return clip(tracks(a)
    ? `Yes: ${poss(d)} privacy label lists ${list(lower(a.track))} as data used to track you. What that means and how to stop it on iPhone in two taps.`
    : `No: ${poss(d)} App Store privacy label declares no tracking. ${level(a) === 1 ? "It says it collects no data at all." : `It still collects ${n(allTypes(a).length, "data type")}; here is what they are.`}`);
}
export function trackAnswer(a: App) {
  const d = a.display;
  if (tracks(a)) return `Yes. ${poss(d)} developer declares ${list(lower(a.track))} as data used to track you — data that can be combined with other companies' data for targeted ads or ad measurement, or shared with data brokers. On iPhone you can refuse: tap Ask App Not to Track, or switch off tracking requests for every app in Settings.`;
  if (level(a) === 1) return `No. ${poss(d)} label says the app does not collect any data, so there is nothing to track you with. It never needs to show the “Allow to track?” prompt.`;
  return `No. ${poss(d)} label has no “Data Used to Track You” section, so the developer states it does not link your data with other companies' data for advertising or sell it to data brokers. It does collect ${list(lower(allTypes(a)))}${linkedTypes(a).length ? `, of which ${list(lower(linkedTypes(a)))} ${linkedTypes(a).length === 1 ? "is" : "are"} linked to you` : ", none of it linked to you"}.`;
}
export function trackFaq(a: App): [string, string][] {
  const d = a.display;
  return [
    [`How do I stop ${d} from tracking me?`, "Settings › Privacy & Security › Tracking. Switch off Allow Apps to Request to Track to refuse every app at once, or switch off the toggle next to this app. When you decline, the app cannot access your device's advertising identifier."],
    [`Will ${d} still work if I decline tracking?`, "Yes. Apple's App Store rules do not allow apps to withhold features or block you because you declined tracking."],
    ["What is the difference between tracking and data linked to me?", `Linked data is tied to your identity by ${poss(d)} developer itself. Tracking goes further: your data is combined with data from other companies' apps and websites for advertising, or passed to data brokers.`],
    ["Does declining tracking stop all data collection?", "No. It stops tracking as Apple defines it. The app can still collect the other data on its label for its own analytics, features and accounts."],
    ["Can apps track me without asking?", "They are not allowed to. Fingerprinting your device or using other identifiers to get around the prompt breaks App Store rules. If a label declares no tracking but the app asks for permission to track, that is a mismatch worth reporting."],
  ];
}

export function lockTitle(a: App) { return `How to Lock ${a.display} on iPhone With Face ID (iOS 18 Steps)`; }
export function lockDescription(a: App) {
  return clip(`Lock ${a.display} behind Face ID, Touch ID or your passcode in four taps on iOS 18 — or hide it in App Library. Why it matters: it holds ${highTypes(a).length ? list(lower(highTypes(a)).slice(0, 2)) : "personal data"}.`);
}
export function lockSteps(a: App) {
  return [
    `Find ${a.display} on your Home Screen or in App Library.`,
    "Touch and hold the icon until the quick-actions menu opens.",
    "Tap Require Face ID (or Require Touch ID / Require Passcode, depending on your iPhone).",
    `Tap Require Face ID again to confirm. ${a.display} now asks for authentication every time it opens.`,
  ];
}
export function hideSteps(a: App) {
  return [
    `Touch and hold ${poss(a.display)} icon and tap Require Face ID.`,
    "Choose Hide and Require Face ID instead of Require Face ID.",
    "Confirm. The icon leaves your Home Screen and moves to the Hidden folder at the bottom of App Library.",
    "To open it later, swipe to App Library, tap Hidden and authenticate.",
  ];
}
export function lockFaq(a: App): [string, string][] {
  const d = a.display;
  return [
    [`Does ${d} have its own passcode?`, `Some apps offer an in-app PIN or biometric lock in their settings. The App Store privacy label does not say whether ${d} does; the iOS 18 lock works regardless.`],
    [`What happens to ${poss(d)} notifications when it is locked?`, "Locked and hidden apps do not show message previews or content in notifications, and their content does not appear in Spotlight search or Siri suggestions."],
    ["Can someone who knows my passcode open a locked app?", "Yes. If Face ID fails, the lock falls back to your device passcode. Keep the passcode private if the lock matters to you."],
    [`Is a locked ${d} encrypted?`, "The lock controls who can open the app on this iPhone. It does not change how the app stores or syncs data. Encryption depends on the developer and on your device passcode."],
    ["Why can't I see the Require Face ID option?", "You need iOS 18 or later. Some Apple apps such as Settings, Calculator, Maps and Camera cannot be locked or hidden."],
    [`Does hiding ${d} remove it from my purchase history?`, "No. Hidden apps still appear in App Store purchases and in Settings › Apps, and Screen Time reports still include them."],
  ];
}

/* ---------- hub / list helpers ---------- */
export const levelTone = (L: number) => (L === 4 ? "no" : L === 1 ? "yes" : L === 2 ? "info" : "caution");
export const sensitivityRank = (name: string) => SENSITIVITY.indexOf(name);
export { url, hasTrackPage, hasLockPage };
