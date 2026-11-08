import type { Comparison } from "../types";

export const comparisons: Comparison[] = [
  {
    a: "keepsafe",
    b: "private-photo-vault",
    winner: "b",
    summary:
      "Private Photo Vault is the better privacy pick: it works without an account, and its developer says the optional Cloud Vault is encrypted with a password it never stores. Keepsafe is smoother if you want one vault synced between an iPhone and an Android phone, but it requires an account and doesn't say whether its cloud is zero-knowledge.",
    chooseA: "you want easy syncing across iPhone and Android and don't mind signing up with an email.",
    chooseB: "you want encrypted cloud backup with a password only you know, and no account for the basic app.",
    differences: [
      { label: "Account needed", a: "Yes, a verified email", b: "No (only for Cloud Vault)" },
      { label: "Cloud backup", a: "Private Cloud, included with limits", b: "Cloud Vault, Premium only" },
      { label: "Cloud encryption", a: "Not documented as zero-knowledge", b: "Encrypted with your own password, per the developer" },
      { label: "Decoy PIN", a: "Premium", b: "Premium" },
      { label: "App disguise", a: "Android only (Secret Door)", b: "Not documented" },
    ],
  },
  {
    a: "keepsafe",
    b: "lockmypix",
    winner: "b",
    summary:
      "LockMyPix is the better choice for privacy because it's specific about its encryption (AES) and keeps files on your device, while Keepsafe only says \"military-grade\". Keepsafe wins on backup and syncing, since LockMyPix doesn't clearly document a cloud option.",
    chooseA: "you want your vault backed up and synced between phones without setting anything up yourself.",
    chooseB: "you want documented on-device encryption and are happy to manage your own backups.",
    differences: [
      { label: "Encryption detail", a: "\"Military-grade\", no technical detail", b: "Names its cipher: AES" },
      { label: "Where files live", a: "Phone plus Private Cloud", b: "On the phone" },
      { label: "Account needed", a: "Yes", b: "Not confirmed" },
      { label: "Fake vault and intruder photo", a: "Premium", b: "Premium" },
    ],
  },
  {
    a: "keepsafe",
    b: "vaulty",
    winner: "tie",
    summary:
      "It depends on your phone and what you value. Vaulty is Android-only, free to back up to your own Google Drive, and honest that it hides rather than encrypts. Keepsafe works on iPhone and Android, claims encryption and syncs through its own cloud, but needs an account and puts its decoy and break-in alerts behind Premium.",
    chooseA: "you use an iPhone, or both platforms, and want encryption and syncing handled for you.",
    chooseB: "you're on Android and want free backup to your own Google Drive with a calculator disguise and decoy vault.",
    differences: [
      { label: "Encryption", a: "Claimed (\"military-grade\")", b: "No, files are hidden, by the developer's own account" },
      { label: "Backup", a: "Keepsafe's Private Cloud", b: "Your own Google Drive, free" },
      { label: "Decoy vault and intruder photos", a: "Premium", b: "Included" },
      { label: "Account needed", a: "Yes", b: "No" },
    ],
  },
  {
    a: "gallery-vault",
    b: "vaulty",
    winner: "a",
    summary:
      "GalleryVault is the safer Android vault because it encrypts files and can hide its own icon. Vaulty is more convenient thanks to free Google Drive backup, but it doesn't encrypt your photos. If you pick GalleryVault, set up your own backup, because it has none.",
    chooseA: "you want encrypted files and an app nobody can see in your app drawer.",
    chooseB: "you want automatic, free backup and can live with files being hidden rather than encrypted.",
    differences: [
      { label: "Encryption", a: "Yes", b: "No" },
      { label: "Cloud backup", a: "None, files stay on the phone", b: "Free, to your own Google Drive" },
      { label: "Disguise", a: "Can remove its icon", b: "Calculator disguise" },
      { label: "Decoy and intruder photos", a: "Yes", b: "Yes" },
    ],
  },
  {
    a: "google-photos-locked-folder",
    b: "files-by-google-safe-folder",
    winner: "tie",
    summary:
      "Both are free Google features, and they suit different jobs. Locked Folder is best for photos you take and manage in Google Photos, with optional backup. Safe folder in Files by Google is an encrypted folder for any file type, but it stays on the phone with no backup.",
    chooseA: "you mostly want to hide photos and videos, and want the option of backing them up.",
    chooseB: "you want to hide documents and other files too, and prefer they never leave the phone.",
    differences: [
      { label: "What it holds", a: "Photos and videos", b: "Any file type" },
      { label: "Unlock", a: "Your phone's screen lock", b: "Separate PIN or pattern" },
      { label: "Backup", a: "Optional cloud backup", b: "None" },
      { label: "Platforms", a: "Android, plus iOS and web", b: "Android" },
    ],
  },
  {
    a: "cryptomator",
    b: "veracrypt",
    winner: "tie",
    summary:
      "Use Cryptomator for files that sync to a cloud service, and VeraCrypt for drives, USB sticks and large local containers. Both are free, open source and audited. Cryptomator encrypts each file separately so cloud sync stays efficient; VeraCrypt encrypts one big container or a whole disk and offers hidden volumes.",
    chooseA: "your files live in Dropbox, Google Drive, OneDrive or iCloud, or you need access on your phone.",
    chooseB: "you want to encrypt a whole drive or USB stick, or need a hidden volume for plausible deniability.",
    differences: [
      { label: "Best for", a: "Cloud folders", b: "Drives and containers" },
      { label: "How it encrypts", a: "File by file", b: "One container or whole disk" },
      { label: "Mobile apps", a: "iOS and Android (paid for full access)", b: "None (desktop only)" },
      { label: "Hidden volumes", a: "No", b: "Yes" },
      { label: "Learning curve", a: "Easy", b: "Moderate" },
    ],
  },
  {
    a: "cryptomator",
    b: "proton-drive",
    winner: "tie",
    summary:
      "Cryptomator adds encryption to the cloud you already use; Proton Drive replaces it with one that's encrypted by default. If you're happy with Google Drive or Dropbox and just want them unable to read your files, pick Cryptomator. If you want a fresh start with automatic photo backup and no extra layers, pick Proton Drive.",
    chooseA: "you want to keep your existing cloud storage and add encryption on top for free on desktop.",
    chooseB: "you want a single, end-to-end encrypted cloud with photo backup and sharing built in.",
    differences: [
      { label: "Storage", a: "Uses your existing cloud", b: "Proton's own servers" },
      { label: "Account needed", a: "No", b: "Yes" },
      { label: "Photo backup", a: "No", b: "Yes" },
      { label: "Open source", a: "Yes", b: "Apps are open source" },
      { label: "Linux", a: "Desktop app", b: "Web app only" },
    ],
  },
  {
    a: "proton-drive",
    b: "tresorit",
    winner: "a",
    summary:
      "For personal use, Proton Drive is the better choice: it has a free plan, photo backup and the same end-to-end encryption at every tier. Tresorit is aimed at businesses that share confidential documents with clients and need tighter sharing controls, and it has no ongoing free plan.",
    chooseA: "you want private personal cloud storage, starting free.",
    chooseB: "you run a business that shares sensitive files with clients and will pay for stronger sharing controls.",
    differences: [
      { label: "Free plan", a: "Yes", b: "No, trial only" },
      { label: "Aimed at", a: "Individuals and families", b: "Professionals and businesses" },
      { label: "Linux", a: "Web app only", b: "Desktop app" },
      { label: "Headquarters", a: "Switzerland", b: "Switzerland" },
    ],
  },
  {
    a: "standard-notes",
    b: "notesnook",
    winner: "tie",
    summary:
      "Standard Notes is the pick for a long-term, minimal, heavily audited encrypted archive. Notesnook is friendlier if you're coming from Evernote or OneNote, with a richer editor and a second password-protected vault, on a generous free plan. Both are open source and end-to-end encrypted.",
    chooseA: "you value a proven security track record and published audits above editor features.",
    chooseB: "you want a richer, more familiar editor and notebooks without paying.",
    differences: [
      { label: "Security audits", a: "Published (Trail of Bits, Cure53)", b: "None published that we found" },
      { label: "Editor on free plan", a: "Plain and basic", b: "Rich text" },
      { label: "Extra vault", a: "No", b: "Password-protected vault" },
      { label: "Owner", a: "Proton (since 2024)", b: "Independent" },
    ],
  },
  {
    a: "bitwarden",
    b: "proton-pass",
    winner: "tie",
    summary:
      "Both are open source, end-to-end encrypted password managers with strong free plans. Bitwarden is the more established choice with more sharing and self-hosting options. Proton Pass adds hide-my-email aliases and fits naturally if you already use Proton Mail or Proton Drive.",
    chooseA: "you want the most proven free password manager, or plan to share a vault with family or a team.",
    chooseB: "you want email aliases to keep your real address private, or already use other Proton apps.",
    differences: [
      { label: "Free plan", a: "Unlimited passwords and devices", b: "Unlimited logins and devices" },
      { label: "Email aliases", a: "Through integrations", b: "Built in" },
      { label: "Self-hosting", a: "Yes", b: "No" },
      { label: "Ecosystem", a: "Standalone", b: "Proton Mail, Drive, VPN" },
    ],
  },
  {
    a: "samsung-secure-folder",
    b: "android-private-space",
    winner: "tie",
    summary:
      "Both create a separate, encrypted space for private apps and files, and which one you get mostly depends on your phone. Samsung phones generally use Secure Folder, which is more mature and can hold files as well as apps. Private Space is Google's version for Android 15 and later, stops apps completely when locked, and can be hidden from the app drawer.",
    chooseA: "you have a Samsung Galaxy phone that supports it and want a familiar, well-supported private area.",
    chooseB: "you have a non-Samsung phone on Android 15 or later and want private apps that fully stop when locked.",
    differences: [
      { label: "Available on", a: "Supported Samsung Galaxy phones and tablets", b: "Android 15 and later, where the manufacturer enables it" },
      { label: "Backups", a: "No new backups; restore of old ones only", b: "Not included in device backups" },
      { label: "Forgotten lock", a: "Recoverable only if Reset with Samsung account is on", b: "No recovery if you used a separate lock" },
      { label: "Hide the space itself", a: "Yes, hide or rename the icon", b: "Yes, hide it from the app drawer" },
    ],
  },
  {
    a: "applock-domobile",
    b: "lockit",
    winner: "a",
    summary:
      "AppLock is the safer pick of the two free Android lockers: it's long established and can hide its own icon and block uninstalls. LOCKit has more extras, including intruder selfies and a fake cover screen, but its own Data safety section says data isn't encrypted in transit, and older versions carried many ad trackers.",
    chooseA: "you want a plain, established app locker with uninstall protection.",
    chooseB: "you specifically want intruder selfies and a fake cover screen and accept heavier ads and tracking.",
    differences: [
      { label: "Type of lock", a: "Overlay (no encryption)", b: "Overlay (no encryption)" },
      { label: "Hide its own icon", a: "Yes", b: "Not confirmed" },
      { label: "Intruder selfie", a: "Not confirmed", b: "Yes" },
      { label: "Ads", a: "Yes", b: "Yes, plus trackers reported" },
    ],
  },
  {
    a: "niagara-launcher",
    b: "smart-launcher",
    winner: "b",
    summary:
      "For hiding apps, Smart Launcher 6 is the better launcher because it can protect hidden apps with a PIN or fingerprint and keeps them out of search. Niagara hides apps only from its list, with no lock, so it's better for decluttering than for privacy.",
    chooseA: "you want a minimalist, ad-free home screen and just want fewer apps in view.",
    chooseB: "you want hidden apps kept out of search and protected with a PIN or fingerprint.",
    differences: [
      { label: "Lock on hidden apps", a: "No", b: "PIN or fingerprint" },
      { label: "Hidden from search", a: "No", b: "Yes" },
      { label: "Style", a: "Minimal vertical list", b: "Customizable, categorized drawer" },
    ],
  },
];
