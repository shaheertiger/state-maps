import type { App } from "../types";

// Photo & video vault apps.
// Facts checked against App Store / Google Play listings and official help pages, November 2026.
// Where a listing or help page did not confirm a feature, the flag is "unknown" and the prose does not claim it.

export const photoVaults: App[] = [
  // 1. Keepsafe
  {
    slug: "keepsafe",
    name: "Keepsafe",
    storeName: "Secret Photo Vault: Keepsafe (iOS) / Private Photo Vault - Keepsafe (Android)",
    developer: "KeepSafe Software, Inc.",
    categories: ["photo-vault", "hide-apps"],
    platforms: ["iOS", "Android"],
    website: "https://www.getkeepsafe.com",
    pricing: {
      model: "Freemium",
      free: "PIN, pattern or fingerprint lock, albums, limited Private Cloud backup, ads",
      paid: "Optional Keepsafe Premium subscription (monthly or yearly) adds a larger Private Cloud, Album Lock, decoy vault, break-in alerts, Space Saver, Trash Recovery and removes ads",
    },
    bestFor: "Cloud-synced vault on two platforms",
    standout: "Private Cloud sync between iPhone and Android",
    oneLiner:
      "Keepsafe is a cross-platform photo vault that locks pictures behind a PIN or fingerprint and syncs them to its own Private Cloud, with extra protections in Premium.",
    whatItIs:
      "Keepsafe is one of the longest-running photo vault apps on iPhone and Android. You move photos and videos out of your gallery into a locked space, and the app can back them up to Keepsafe's Private Cloud so they follow your account to a new phone.",
    howItWorks: [
      "On first launch you set a PIN and verify an email address. That email is how Keepsafe identifies your account and sends sign-in codes, so it matters more than it looks: if you lose access to every verified email, Keepsafe says the account and its contents can't be recovered.",
      "To hide something, you pick photos or videos from your gallery and import them. Keepsafe then offers to delete the originals from the public gallery. After that, the copy inside Keepsafe may be the only one you have, which is why the Private Cloud backup is worth turning on.",
      "Daily use is a gallery behind a lock screen. Free users get albums, a built-in camera, slideshow viewing and Safe Send, which shares a photo that disappears 20 seconds after it is received. On Android, the app can lock itself when the phone is placed face down and stays out of the recent apps list.",
      "Premium adds a separate PIN per album, a decoy vault opened by a second PIN, break-in alerts that photograph anyone who enters a wrong PIN, Space Saver (compressed copies on the phone, originals in the cloud) and Trash Recovery. On Android, a feature called Secret Door can disguise the app; Keepsafe says it isn't available on iOS because of App Store rules.",
    ],
    whoFor:
      "Keepsafe fits people who want their hidden photos backed up and who might switch between iPhone and Android. It suits casual privacy needs, like keeping ID scans or personal photos away from someone scrolling your gallery.",
    pickIf:
      "You want a familiar, cloud-backed vault that keeps working when you replace or lose your phone.",
    skipIf:
      "You need published, zero-knowledge encryption details, or you don't want to tie your vault to an email account.",
    strengths: [
      "Available on both iPhone and Android with sync between them",
      "Private Cloud backup reduces the risk of losing photos with your phone",
      "Decoy vault and break-in alerts in Premium",
      "Trash Recovery for items deleted by mistake (Premium)",
      "Safe Send for time-limited photo sharing",
    ],
    tradeoffs: [
      "Free version shows ads",
      "Decoy vault, break-in alerts and Album Lock are Premium-only",
      "Requires a verified email; losing it can mean losing the vault",
      "Encryption is described only as \"military-grade\", with no public technical detail",
      "App disguise (Secret Door) is Android-only",
    ],
    privacyNotes:
      "Keepsafe says files are protected with \"military-grade encryption\", but it does not publish details such as the cipher or whether Private Cloud is zero-knowledge, so treat cloud copies as readable by the provider unless it says otherwise. An account tied to a verified email is required. The App Store privacy label lists usage data used for tracking and advertising data for third-party ads. Items synced to Private Cloud can be restored by signing back in; anything that never synced lives only on the phone.",
    features: {
      encryption: "yes",
      endToEnd: "unknown",
      biometric: "yes",
      decoy: "partial",
      intruderAlert: "partial",
      disguise: "partial",
      cloudBackup: "yes",
      noAccount: "no",
      adFree: "no",
    },
    faq: [
      {
        q: "Is Keepsafe safe?",
        a: "Keepsafe is a legitimate app from an established developer, and it locks photos behind a PIN or fingerprint with optional cloud backup. It says it uses military-grade encryption but doesn't publish technical details, and the free version shows ads. It is fine for keeping photos away from people who borrow your phone. For highly sensitive files, look for an app that documents zero-knowledge encryption.",
      },
      {
        q: "What happens to my photos if I delete Keepsafe?",
        a: "Photos that were synced to Private Cloud come back when you reinstall and sign in with your verified email. Photos that were only stored on the phone should be treated as lost once the app and its data are removed. Before uninstalling, check that sync is finished or export the photos back to your gallery.",
      },
      {
        q: "Can I recover my Keepsafe account without my email?",
        a: "Keepsafe signs you in by sending a code to a verified email address. Its help center says that if you permanently lose access to the only verified email on the account, the account and its contents can't be recovered. Adding a backup email in the app is the simplest protection.",
      },
      {
        q: "Does Keepsafe have a fake PIN?",
        a: "Yes, as a Premium feature called Decoy Vault. You set a second PIN, and entering it opens a separate gallery that you can fill with harmless photos.",
      },
    ],
  },

  // 2. Private Photo Vault
  {
    slug: "private-photo-vault",
    name: "Private Photo Vault",
    storeName: "Private Photo Vault - Pic Safe",
    developer: "Legendary Software Labs LLC",
    categories: ["photo-vault"],
    platforms: ["iOS", "Android"],
    website: "https://privatephotovault.com",
    pricing: {
      model: "Freemium",
      free: "Locked vault on the phone with PIN, pattern or password, albums, face-down lock, ads, no Cloud Vault",
      paid: "Optional Premium subscription adds encrypted Cloud Vault backup, Space Saver, album locks, fake PIN, break-in alerts and removes ads; the iOS listing also shows a one-time upgrade purchase",
    },
    bestFor: "Encrypted cloud backup with your own password",
    standout: "Cloud Vault encrypted with a password the company never stores",
    oneLiner:
      "Private Photo Vault is a long-running iPhone and Android vault that stores photos on the phone and offers a Premium Cloud Vault encrypted with a password only you hold.",
    whatItIs:
      "Private Photo Vault, listed as Pic Safe, is a photo and video locker that has been on the App Store for many years and is also on Google Play. It keeps imported media in a locked, password-protected space and adds an optional encrypted cloud backup for paying users.",
    howItWorks: [
      "The basic app works offline and without an account. You set a passcode, PIN or dot pattern, import photos from your library, and then delete the originals from your gallery if you want them gone from public view.",
      "Inside, you get albums that can each have their own password, a slideshow viewer, a photo editor, a private browser that can save images straight into the vault, and Wi-Fi transfer for moving files from a computer. A face-down lock closes the app when you flip the phone over.",
      "Premium unlocks Cloud Vault. According to the developer's FAQ, files are encrypted on your device before upload, using a Cloud Vault password that is never sent to its servers. The flip side is that the company cannot recover that password for you. On Android, the listing describes Cloud Vault storage of up to 50 GB.",
      "Break-in reports take a photo of anyone who enters a wrong code and can log GPS location, which is why the app asks for location permission only if you turn that feature on. A decoy password opens a separate set of harmless photos.",
    ],
    whoFor:
      "This app suits people who want a traditional photo locker with many extras, and who care about having a backup that the provider can't read. It's a reasonable pick for users willing to keep track of one more password.",
    pickIf:
      "You want encrypted cloud backup where the encryption password stays with you, not the company.",
    skipIf:
      "You want an ad-free free tier or a vault that can disguise its own icon.",
    strengths: [
      "Works without an account in the basic version",
      "Developer says files are AES-encrypted on the phone and in Cloud Vault",
      "Cloud Vault password is never sent to the company's servers, per its FAQ",
      "Break-in reports with photo and GPS location",
      "Private browser and Wi-Fi transfer built in",
    ],
    tradeoffs: [
      "Cloud backup is Premium-only",
      "Forgetting the Cloud Vault password means the cloud copy can't be recovered",
      "Free version shows ads, and store privacy labels list advertising data",
      "Some App Store reviews report sync problems and slow support",
    ],
    privacyNotes:
      "The developer states that files are AES-encrypted on the device and that Cloud Vault encrypts files before upload with a password it never stores. That is a stronger claim than most vaults make, though we found no independent audit confirming it. The basic app needs no account, but Cloud Vault does. Both store listings disclose data collection for advertising and analytics, including device identifiers. If you delete the app without a Cloud Vault backup, assume the photos inside are gone.",
    features: {
      encryption: "yes",
      endToEnd: "yes",
      biometric: "partial",
      decoy: "partial",
      intruderAlert: "partial",
      disguise: "unknown",
      cloudBackup: "partial",
      noAccount: "yes",
      adFree: "no",
    },
    faq: [
      {
        q: "Is Private Photo Vault safe?",
        a: "It is a long-established app, and the developer says it uses AES encryption on the phone and in its Cloud Vault, with a cloud password it never stores. Those are good signs, but they are the developer's own claims. The free version also includes ads and the store listings disclose data collection for advertising.",
      },
      {
        q: "What happens if I forget my Private Photo Vault Cloud Vault password?",
        a: "The developer says it cannot recover the Cloud Vault password, because it never receives it. Without that password, the files in Cloud Vault can't be restored. Your app lock passcode is a separate thing.",
      },
      {
        q: "Does Private Photo Vault need an account?",
        a: "No for the basic app. You can lock photos on your phone offline. An account is needed only for the Premium Cloud Vault backup and sync.",
      },
      {
        q: "Is Private Photo Vault available on Android?",
        a: "Yes. Legendary Software Labs publishes it on Google Play as Private Photo Vault - Pic Safe, alongside the iPhone and iPad version. Features vary somewhat by platform and plan.",
      },
    ],
  },

  // 3. Vaulty
  {
    slug: "vaulty",
    name: "Vaulty",
    storeName: "Vaulty : Photo Vault & Hide",
    developer: "Squid Tooth LLC",
    categories: ["photo-vault", "hide-apps"],
    platforms: ["Android"],
    website: "https://vaultyapp.com",
    pricing: {
      model: "Freemium",
      free: "PIN-protected vaults, multiple vaults, free automatic backup to your Google Drive, ads",
      paid: "In-app purchases are offered; the listing does not spell out exactly what they unlock",
    },
    bestFor: "Free Android vault with Drive backup",
    standout: "Free automatic backup to your own Google Drive",
    oneLiner:
      "Vaulty is an Android vault that hides photos and videos behind a PIN, can pose as a calculator, and backs up to your own Google Drive for free.",
    whatItIs:
      "Vaulty is a long-running Android app from Squid Tooth LLC that moves photos, videos and other files out of your gallery and into PIN-protected vaults. It offers free automatic backup to the user's own Google Drive. An unrelated iPhone app also uses the Vaulty name; it is made by a different developer.",
    howItWorks: [
      "You can hide files two ways. Inside Vaulty, tap the lock icon, choose an album and select thumbnails. Or, from any gallery app, share a photo or video to Vaulty, and it removes the item from the gallery and puts it in the vault.",
      "You can keep several vaults with different PINs and show different people different ones, which works as a decoy. Vaulty has its own video player, and it can hand an unusual video format to another app for playback.",
      "Vaulty can disguise itself as a working calculator (unlocked with a PIN) or a stock lookup app (unlocked with a text password). A break-in alert takes a photo when someone enters the wrong password, and biometric unlock works on supported phones.",
      "Hidden files sit in a folder on the phone, usually Documents/Vaulty/data, renamed with a .vdata extension. Vaulty's own help center says this isn't encryption and is easy to undo for someone who knows how.",
    ],
    whoFor:
      "Vaulty fits Android users who mainly want to keep photos out of the gallery when they hand their phone to a friend or family member. It's less suited to anyone protecting files against a determined person with access to the phone's storage.",
    pickIf:
      "You want a free, disguisable Android vault with backup to a Google Drive account you control.",
    skipIf:
      "You need files that are actually encrypted on the phone, or you use an iPhone.",
    strengths: [
      "Free automatic backup to your own Google Drive, not Vaulty's servers",
      "Disguise as a calculator or stock lookup app",
      "Multiple vaults with separate PINs work as decoys",
      "Break-in photo when a wrong password is entered",
      "Share-to-Vaulty from any gallery app",
    ],
    tradeoffs: [
      "Hidden files are not encrypted, by the developer's own account",
      "Anyone who opens the Vaulty folder with a file manager or computer can find the files",
      "Free version shows ads",
      "Android only; the iPhone app called Vaulty is a different product",
    ],
    privacyNotes:
      "Vaulty's help center is unusually direct: it says hiding is not encryption and that hidden files stay on the phone and are never sent to Vaulty's servers. Optional backup goes to the appdata area of your own Google Drive, so anyone who can sign in to that Google account could reach the folder; the developer recommends turning on 2-Step Verification. The help center puts responsibility on you to back up or transfer files when switching phones, so turn on Drive backup before uninstalling or resetting.",
    features: {
      encryption: "no",
      endToEnd: "no",
      biometric: "yes",
      decoy: "yes",
      intruderAlert: "yes",
      disguise: "yes",
      cloudBackup: "yes",
      noAccount: "yes",
      adFree: "no",
    },
    faq: [
      {
        q: "Is Vaulty safe?",
        a: "Vaulty is safe to use in the sense that it's a long-standing, legitimate app that keeps files on your phone and backs up to your own Google Drive. But its help center says the hiding is not encryption. It keeps photos out of casual view; it won't stop someone who knows how to browse the phone's storage.",
      },
      {
        q: "Does Vaulty encrypt photos?",
        a: "No. Vaulty renames hidden files and stores them in a folder on the phone. The developer says plainly that this isn't encryption.",
      },
      {
        q: "How do I get my Vaulty photos back on a new phone?",
        a: "Turn on Vaulty's Google Drive backup on the old phone and let it finish. On the new phone, install Vaulty and sign in with the same Google account to sync the files back. If backup was never turned on, the files exist only on the old device.",
      },
      {
        q: "Is Vaulty on iPhone?",
        a: "The Vaulty from Squid Tooth LLC is an Android app. There is an iPhone app named Vaulty: Hidden Photos Vault, but it comes from a different developer and works differently.",
      },
    ],
  },

  // 4. LockMyPix
  {
    slug: "lockmypix",
    name: "LockMyPix",
    storeName: "LockMyPix Safe Photo Vault (Android) / LockMyPix Secret Photo Vault (iOS)",
    developer: "LockMyPix Inc. (listed as fourchars on Google Play)",
    categories: ["photo-vault", "hide-apps"],
    platforms: ["iOS", "Android"],
    website: "https://www.lockmypix.com",
    pricing: {
      model: "Freemium",
      free: "AES-encrypted vault with PIN, pattern or password, albums and sub-albums, ads",
      paid: "Optional Premium subscription (several lengths, including yearly) adds fake vault, intruder selfie, app disguise, SD card storage on Android, themes and removes ads",
    },
    bestFor: "Real file encryption on the phone",
    standout: "Names its cipher: AES in CTR mode",
    oneLiner:
      "LockMyPix is an iPhone and Android photo vault that encrypts files with AES rather than just hiding them, with a fake vault and app disguise in Premium.",
    whatItIs:
      "LockMyPix is a photo, video and document vault built around encryption. Unlike vaults that only move or rename files, it says it encrypts everything you add with AES, and it is one of the few vault apps that names the specific mode it uses (CTR).",
    howItWorks: [
      "You choose a PIN, password or pattern, then add photos, videos or other files. LockMyPix encrypts them inside the vault, so the files can't be opened from a file manager or computer without the app and your code.",
      "You can organize files in albums and sub-albums, sort them several ways and pick custom album covers. On Android, Premium can store the vault on an SD card to free up internal space. The iOS app includes a private browser and a shake-to-lock gesture.",
      "Premium adds a Fake Vault that opens with a separate code, an intruder selfie when someone fails to unlock the app, and face unlock on supported Android phones. On Android, Premium can also disguise the app as something else, such as a calculator or radio.",
      "On iPhone, the listing also mentions disguising the app, but at least one App Store review says this didn't work and the developer pointed to Apple's restrictions. Treat disguise as an Android feature.",
    ],
    whoFor:
      "LockMyPix suits people who care whether their files are actually encrypted, not just tucked away. It's a good fit for anyone storing ID scans or documents alongside photos.",
    pickIf:
      "You want on-device AES encryption and a decoy vault on either iPhone or Android.",
    skipIf:
      "You want free cloud sync between devices, or an app with no ads or tracking in the free version.",
    strengths: [
      "Files are encrypted with AES, not just hidden",
      "Names its encryption mode (AES-CTR), which few vaults do",
      "Fake Vault with a separate code (Premium)",
      "Face, fingerprint, PIN, pattern or password unlock",
      "SD card support on Android",
    ],
    tradeoffs: [
      "Fake Vault, intruder selfie and disguise are Premium features",
      "Free version shows ads, and the App Store label lists identifiers used for tracking",
      "App disguise is reliable only on Android",
      "Cloud backup options aren't clearly documented in the listings",
    ],
    privacyNotes:
      "LockMyPix says files are AES-encrypted and that data stays on your device. We found no independent code audit of that encryption. The App Store privacy label lists device identifiers used for tracking and third-party advertising, plus analytics on purchases and usage. Because files are encrypted and stored locally, deleting the app or losing the phone without a separate backup can mean losing them, and a forgotten code may lock you out for good.",
    features: {
      encryption: "yes",
      endToEnd: "unknown",
      biometric: "yes",
      decoy: "partial",
      intruderAlert: "partial",
      disguise: "partial",
      cloudBackup: "unknown",
      noAccount: "unknown",
      adFree: "no",
    },
    faq: [
      {
        q: "Is LockMyPix safe?",
        a: "LockMyPix is one of the more security-focused vaults because it encrypts files with AES instead of just hiding them, and it names the mode it uses. The free version does include ads and the App Store label lists identifiers used for tracking. As with any vault, keep a separate backup of anything you can't afford to lose.",
      },
      {
        q: "Does LockMyPix really encrypt photos?",
        a: "The developer says it uses AES encryption in CTR mode for files in the vault, and describes this as the main difference from apps that only hide files. We found no independent audit confirming the implementation.",
      },
      {
        q: "Can LockMyPix hide its icon?",
        a: "On Android, yes: Premium can disguise LockMyPix as another app, such as a calculator or radio. On iPhone, the listing mentions it, but a user review reports that it didn't work and the developer cited Apple's restrictions.",
      },
      {
        q: "What is the LockMyPix fake vault?",
        a: "It's a Premium feature that opens a second, decoy vault when you enter a different code. You can fill it with ordinary photos so that anyone pressuring you to open the app sees only those.",
      },
    ],
  },

  // 5. Hide It Pro
  {
    slug: "hide-it-pro",
    name: "Hide It Pro",
    storeName: "Hide Photos, Video and App Loc (Android) / Hide Photos Video -Hide it Pro (iOS)",
    developer: "Goaffpro (Android); Anuj Tenani (iOS)",
    categories: ["photo-vault", "hide-apps"],
    platforms: ["Android", "iOS"],
    website: "https://hideitpro.com",
    pricing: {
      model: "Freemium",
      free: "Unlimited hidden photos and videos, Audio Manager disguise, cloud backup, ads on Android",
      paid: "In-app purchases; the iOS listing shows paid cloud storage and a password reset purchase",
    },
    bestFor: "Disguising the vault as a utility",
    standout: "Hides behind a working Audio Manager app",
    oneLiner:
      "Hide It Pro is a vault that disguises itself as a working Audio Manager on Android, hiding photos, videos and more behind a secret long-press and PIN.",
    whatItIs:
      "Hide It Pro is a veteran Android vault best known for its disguise: the icon in your app drawer is labeled Audio Manager and really adjusts volume. Long-press the title and the hidden vault opens. Beyond photos and videos, it bundles app locking, private messaging and a private browser. An iOS version exists with a smaller feature set.",
    howItWorks: [
      "After installing on Android, the app shows up as Audio Manager. Anyone who opens it sees volume sliders. You long-press the Audio Manager title to reach the lock screen, then enter your PIN, password or pattern, or use your fingerprint. Other disguises, such as a calculator, are available, and you can hide the icon from the app drawer.",
      "Inside, you sort photos and videos into hidden folders, view them in a gallery with slideshows, and play videos in the built-in player or in apps like VLC. The app also stays out of the recent apps list.",
      "Hide It Pro offers an escape PIN or password for moments when someone makes you open the app. It also includes a separate encryption tool for your most important files; ordinary hiding and this encryption tool are not the same thing.",
      "On iPhone, Apple doesn't allow the same disguise. The iOS app instead offers a disguise screen that makes the app look like it crashed, plus cloud storage and password reset as paid add-ons.",
    ],
    whoFor:
      "Hide It Pro suits Android users whose main worry is someone noticing a vault app at all. The working Audio Manager cover is more convincing than a generic calculator to a casual glance.",
    pickIf:
      "You want the vault to look like a normal utility app, not a privacy app.",
    skipIf:
      "You need every hidden file encrypted by default, or clear documentation about how cloud backup is protected.",
    strengths: [
      "Convincing Audio Manager disguise that actually works as one",
      "Option to hide the icon from the app drawer",
      "Escape PIN for when you're forced to open the app",
      "Free cloud backup on Android",
      "Extras: app lock, private browser, secret messaging",
    ],
    tradeoffs: [
      "Hiding and encryption are separate; only files run through the encryption tool are encrypted",
      "Ads on Android",
      "The iOS version is more limited and lacks the Audio Manager disguise",
      "Cloud backup security is not documented in detail",
    ],
    privacyNotes:
      "Hide It Pro's listing describes hidden files and a separate built-in encryption tool, so don't assume ordinary hidden photos are encrypted. Its Google Play data safety section, which the developer fills in, says no data is collected and that data isn't encrypted in transit; that pairing is worth keeping in mind if you use cloud backup. If you uninstall the app or reset the phone, files that weren't backed up should be treated as lost.",
    features: {
      encryption: "partial",
      endToEnd: "unknown",
      biometric: "yes",
      decoy: "yes",
      intruderAlert: "unknown",
      disguise: "yes",
      cloudBackup: "yes",
      noAccount: "unknown",
      adFree: "no",
    },
    faq: [
      {
        q: "How do I open Hide It Pro if it looks like Audio Manager?",
        a: "Open the Audio Manager app, then press and hold the Audio Manager title at the top. That brings up the Hide It Pro lock screen, where you enter your PIN, password or pattern.",
      },
      {
        q: "Is Hide It Pro safe?",
        a: "Hide It Pro is a long-running app with a strong disguise, which is good protection against casual snooping. It does show ads on Android, and ordinary hidden files aren't described as encrypted; there's a separate encryption tool for important files. For sensitive documents, use that tool or a vault that encrypts everything by default.",
      },
      {
        q: "What happens to my files if I uninstall Hide It Pro?",
        a: "The app offers cloud backup, and backed-up files are the ones you can expect to get back after reinstalling. Anything that exists only in the app on your phone should be treated as gone once the app is removed, so unhide or back up files first.",
      },
      {
        q: "Is Hide It Pro available on iPhone?",
        a: "Yes, but it's a different experience. The iOS app can't pose as an Audio Manager; it uses a fake crash screen instead and offers cloud storage and password reset as paid extras.",
      },
    ],
  },

  // 6. GalleryVault
  {
    slug: "gallery-vault",
    name: "GalleryVault",
    storeName: "Gallery Vault-Hide Photo Video",
    developer: "ThinkYeah (GalleryVault Developer Team)",
    categories: ["photo-vault", "hide-apps"],
    platforms: ["Android"],
    website: "https://www.thinkyeah.com",
    pricing: {
      model: "Freemium",
      free: "Encrypted vault with no storage limit, icon hiding, SD card support, ads",
      paid: "Optional premium upgrade; the exact split between free and premium features isn't clearly published",
    },
    bestFor: "Encrypted vault with a hidden icon",
    standout: "Encrypts files and can remove its own icon",
    oneLiner:
      "GalleryVault is an Android vault that encrypts hidden photos, videos and files on the device and can hide its own icon so nobody knows it's installed.",
    whatItIs:
      "GalleryVault, from developer ThinkYeah, is an Android app that hides and encrypts photos, videos and other files. Its main draw is that it can hide its app icon entirely, combined with on-device encryption and SD card support.",
    howItWorks: [
      "You set a passcode or pattern, then import photos, videos or other files. GalleryVault encrypts them while they're in the vault and decrypts them when you export them back out.",
      "You can hide the GalleryVault icon. To open it afterward, the developer offers two routes: visit a ThinkYeah web address in your phone's browser, or tap Manage Space on GalleryVault's page in Android's app settings.",
      "Other tools include a fake passcode that shows decoy content, break-in alerts that photograph someone who enters the wrong password, fingerprint unlock, shake to close, a private browser, and a downloader for images and videos from websites and social apps.",
      "Files stay on the phone only. You can move encrypted files to an SD card to save internal space. If you forget your passcode, the reset process relies on an email GalleryVault sends you.",
    ],
    whoFor:
      "GalleryVault fits Android users who want the vault itself to be invisible and who are comfortable managing their own backups. It's a reasonable pick for phones with SD card slots.",
    pickIf:
      "You want encrypted, on-device storage and an app icon that can disappear completely.",
    skipIf:
      "You want cloud backup, or you'd struggle to remember how to open an app with no icon.",
    strengths: [
      "Files are encrypted inside the vault",
      "Can hide its icon completely",
      "Fake passcode with decoy content",
      "Break-in alerts with intruder photos",
      "SD card support and no stated storage limit",
    ],
    tradeoffs: [
      "No cloud backup; files live only on the device",
      "Ads in the free version",
      "Opening a hidden-icon app takes a trick some people forget",
      "Free versus premium features aren't clearly listed",
    ],
    privacyNotes:
      "GalleryVault says hidden files are encrypted and stored only on your device, never online. That keeps them off third-party servers, but it also means a lost, broken or factory-reset phone takes the files with it. The developer tells users to back up hidden files before moving to a new device or resetting. It uses the Device Administrator permission so SD card users don't lose data by uninstalling.",
    features: {
      encryption: "yes",
      endToEnd: "no",
      biometric: "yes",
      decoy: "yes",
      intruderAlert: "yes",
      disguise: "yes",
      cloudBackup: "no",
      noAccount: "unknown",
      adFree: "no",
    },
    faq: [
      {
        q: "How do I open GalleryVault when the icon is hidden?",
        a: "The developer lists two ways: open your phone's browser and visit open.thinkyeah.com/gv, or go to Settings, then Apps, then GalleryVault and tap Manage Space. Either brings up the lock screen.",
      },
      {
        q: "Does GalleryVault back up to the cloud?",
        a: "No. GalleryVault's FAQ says hidden files are stored only on your device. Back them up yourself before switching phones or doing a factory reset.",
      },
      {
        q: "I forgot my GalleryVault passcode. What now?",
        a: "Search your email for a message from ThinkYeah and follow its reset steps. If you can't find it, fail the unlock twice on the lock screen, tap Forgot, and choose Resend Auth Email.",
      },
      {
        q: "Is GalleryVault safe?",
        a: "GalleryVault encrypts hidden files and keeps them off the internet, which is better than vaults that only hide files. The free version shows ads, and the encryption hasn't been independently audited as far as we could find. The bigger practical risk is data loss, since there's no cloud backup.",
      },
    ],
  },

  // 7. Google Photos Locked Folder
  {
    slug: "google-photos-locked-folder",
    name: "Google Photos Locked Folder",
    developer: "Google",
    categories: ["photo-vault"],
    platforms: ["Android", "iOS", "Web"],
    builtIn: true,
    website: "https://photos.google.com",
    pricing: {
      model: "Built-in",
      free: "Free in Google Photos; on-device by default with optional backup",
      paid: "No separate cost; backed-up items count toward your Google account storage",
    },
    bestFor: "Android users already on Google Photos",
    standout: "Unlocks with your phone's own screen lock",
    oneLiner:
      "Locked Folder is a free Google Photos feature that keeps chosen photos out of your grid, albums and search, unlocked with your device screen lock, with optional cloud backup.",
    whatItIs:
      "Locked Folder is a protected space inside Google Photos. Items you move there disappear from your photo grid, albums, Memories and search, and open only after you pass your device's screen lock. Backup to Google's cloud is optional.",
    howItWorks: [
      "On Android, open Google Photos and find Locked Folder under Collections, then tap Set up. You need Android 6 or later and a screen lock, because the folder uses your phone's PIN, pattern, password or biometrics. You can't set a separate password.",
      "To add items, select photos and choose Move to Locked Folder. On Pixel 4 and later, you can send a photo there straight from the camera by long-pressing the last photo preview.",
      "Backup is off unless you turn it on, either during setup or in Photos settings under Backup. Backed-up items can be opened on your other signed-in devices, including iPhone and the web, and they count toward your storage quota.",
      "Locked items can't be shared, edited, added to albums or moved to Trash until you move them back out. They also won't appear on smart displays or through Chromecast.",
    ],
    whoFor:
      "Locked Folder is the easy default for Android users who already use Google Photos and just want a few pictures out of the main grid. It needs no extra app and no extra password to remember.",
    pickIf:
      "You want a free, no-install way to keep some photos out of your main Google Photos view.",
    skipIf:
      "You need a decoy PIN, a different password from your phone's lock screen, or end-to-end encrypted backup.",
    strengths: [
      "Free and built into Google Photos",
      "No ads and no third-party company involved",
      "Optional cloud backup for access across devices",
      "Uses your existing screen lock and biometrics",
      "Pixel phones can save photos straight into it",
    ],
    tradeoffs: [
      "Anyone who knows your phone's screen lock can open it",
      "Backups are not end-to-end encrypted",
      "No decoy, intruder alerts or disguise",
      "Items that aren't backed up are lost if you uninstall Photos or clear its data",
    ],
    privacyNotes:
      "Google says Locked Folder uses its standard encryption practices. Google Photos backups are not end-to-end encrypted, so Google, not just you, can access the keys to backed-up items. A Google Account is needed for backup and access on other devices. Google's help page warns that items you don't back up exist only on that device and are deleted if you uninstall Google Photos, clear its app data, factory reset or lose the phone.",
    features: {
      encryption: "no",
      endToEnd: "no",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "yes",
      noAccount: "unknown",
      adFree: "yes",
    },
    faq: [
      {
        q: "Is Google Photos Locked Folder backed up?",
        a: "Only if you turn it on. Go to Photos settings, then Backup, then Back up Locked Folder. You can also back up individual items. Without backup, locked items exist only on that phone.",
      },
      {
        q: "What happens to Locked Folder if I uninstall Google Photos?",
        a: "Items that weren't backed up are deleted. Google's help page says the same applies if you clear the app's data, factory reset the phone, or lose or damage it.",
      },
      {
        q: "Can I use a different password for Locked Folder?",
        a: "No. Locked Folder always uses your device screen lock. Anyone who knows your phone's PIN or pattern can open it.",
      },
      {
        q: "Is Locked Folder available on iPhone?",
        a: "Yes. Google added Locked Folder to Google Photos on iOS and the web, and backed-up items can be opened there. Items that aren't backed up stay on the device where you locked them.",
      },
    ],
  },

  // 8. Apple Photos Hidden album
  {
    slug: "apple-photos-hidden-album",
    name: "Apple Photos Hidden Album",
    developer: "Apple",
    categories: ["photo-vault"],
    platforms: ["iOS", "macOS"],
    builtIn: true,
    pricing: {
      model: "Built-in",
      free: "Free in the Photos app on iPhone, iPad and Mac",
      paid: "No separate cost; syncing uses your iCloud storage if iCloud Photos is on",
    },
    bestFor: "iPhone users wanting zero extra apps",
    standout: "Locked with Face ID since iOS 16",
    oneLiner:
      "The Hidden album is a built-in Photos feature that pulls chosen photos out of your library and locks them behind Face ID or Touch ID on iOS 16 and later.",
    whatItIs:
      "Every iPhone, iPad and Mac has a Hidden album in the Photos app. Hiding a photo removes it from your library, other albums and the Photos widget, and since iOS 16 the album itself is locked and needs authentication to open.",
    howItWorks: [
      "To hide a photo or video on iPhone, touch and hold it, tap Hide and confirm. On a Mac, Control-click and choose Hide Photo, or press Command-L.",
      "Hidden items move to the Hidden album, found under Utilities in Photos. On iOS 16, iPadOS 16.1, macOS Ventura and later, the album is locked by default and opens with Face ID or Touch ID. On a Mac, Touch ID or your login password works.",
      "You can also stop the Hidden album from appearing at all. On iPhone, go to Settings, then Apps, then Photos and turn off Show Hidden Album. On a Mac it's hidden by default.",
      "If you use iCloud Photos, hiding a photo on one device hides it on all of them.",
    ],
    whoFor:
      "The Hidden album fits most iPhone owners who just want a handful of photos out of their camera roll. It's the safest first step before installing any third-party vault.",
    pickIf:
      "You want something free, ad-free and made by Apple, with no new account or app.",
    skipIf:
      "You need a separate password from your phone passcode, a decoy, or a vault for non-photo files.",
    strengths: [
      "Free, built in, no ads and no third-party data sharing",
      "Locked with Face ID or Touch ID by default on iOS 16 and later",
      "Album can be hidden from view entirely",
      "Syncs with iCloud Photos across Apple devices",
    ],
    tradeoffs: [
      "Anyone who knows your passcode can open it",
      "No decoy, intruder photos or app disguise",
      "Photos only; no documents or notes",
      "Not a separate encrypted container",
    ],
    privacyNotes:
      "Hidden photos are stored like the rest of your library. iPhones encrypt their storage by default, but the Hidden album isn't a separate encrypted vault. If iCloud Photos is on, hidden items sync to iCloud, where standard protection applies; turning on Advanced Data Protection makes iCloud Photos end-to-end encrypted. No account is needed if you keep photos only on the device.",
    features: {
      encryption: "no",
      endToEnd: "partial",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "yes",
      noAccount: "yes",
      adFree: "yes",
    },
    faq: [
      {
        q: "How do I lock the Hidden album on iPhone?",
        a: "On iOS 16 and later, it's locked by default and opens with Face ID or Touch ID. If it isn't asking, check Settings, then Apps, then Photos, and make sure Use Face ID (or Touch ID) is turned on.",
      },
      {
        q: "Can someone see my Hidden album?",
        a: "Only after unlocking it with your Face ID, Touch ID or passcode on iOS 16 and later. Anyone who knows your passcode could get in. You can also turn off Show Hidden Album so the album isn't listed at all.",
      },
      {
        q: "Does the Hidden album sync to iCloud?",
        a: "Yes, if iCloud Photos is on. A photo you hide on one device is hidden on your other Apple devices too. For end-to-end encryption in iCloud, turn on Advanced Data Protection.",
      },
      {
        q: "Is the iPhone Hidden album safe enough, or do I need a vault app?",
        a: "For most people, the Hidden album is enough: it's free, locked with biometrics, and has no ads. A third-party vault makes sense if you need a different password from your phone passcode, a decoy vault, or a place for documents.",
      },
    ],
  },

  // 9. Calculator#
  {
    slug: "calculator-vault",
    name: "Calculator#",
    storeName: "Calculator# Hide Photos Videos",
    developer: "NewSoftwares.net",
    categories: ["photo-vault", "hide-apps"],
    platforms: ["iOS"],
    pricing: {
      model: "Freemium",
      free: "Calculator-disguised vault with ads and feature limits",
      paid: "Optional yearly subscription removes ads and unlocks the full version; a one-time premium features pack is also listed",
    },
    bestFor: "A vault that looks like a calculator",
    standout: "Working calculator front that hides a full vault",
    oneLiner:
      "Calculator# is an iPhone vault that looks and works like a calculator, hiding photos, videos, notes, contacts and passwords behind a code you type into it.",
    whatItIs:
      "Calculator# is an iOS app from NewSoftwares.net that disguises itself as a calculator. Behind the calculator screen is a vault for photos, videos, documents, audio, notes, contacts, to-dos and passwords.",
    howItWorks: [
      "The app opens to a working calculator. Typing your code unlocks the hidden area. You can also choose a PIN, password, pattern or Touch ID / Face ID instead of the calculator lock.",
      "Inside, you can import photos and videos, capture new ones with the built-in camera, download files through a built-in browser, or move files over Wi-Fi from a computer. There's also a password manager, wallet and secure voice notes.",
      "A Hack Monitor logs failed unlock attempts so you can see if someone tried to get in. A Panic Switch jumps to another app quickly, and a Disguise Mode can show a fake error message.",
      "Backup and sync options include iCloud, Dropbox, Google Drive and OneDrive. When you move photos in, the app can delete the originals from your Photos library, which makes your backup the only safety net.",
    ],
    whoFor:
      "Calculator# fits iPhone users who want their vault to look ordinary at a glance and who also want a place for notes, contacts and passwords. It's for hiding, not for strong documented encryption.",
    pickIf:
      "You want an all-in-one iPhone vault that passes as a calculator.",
    skipIf:
      "You need documented encryption, an Android version, or an app with a clean record on data integrity.",
    strengths: [
      "Convincing calculator disguise",
      "Holds photos, videos, documents, notes, contacts and passwords",
      "Backup to iCloud, Dropbox, Google Drive or OneDrive",
      "Hack Monitor logs failed unlock attempts",
      "Panic Switch and fake error screen",
    ],
    tradeoffs: [
      "The listing makes no specific encryption claims",
      "Free version has ads and limits",
      "Some user reviews report lost or corrupted files",
      "No decoy vault mentioned in the listing",
    ],
    privacyNotes:
      "The App Store listing describes a protected, disguised vault but doesn't say how files are encrypted, so assume they are hidden rather than strongly encrypted. Password recovery uses a registered email. The privacy label lists contact info used for tracking. Because the app can delete originals from your Photos library, use one of the cloud backup options; reviews mention lost or corrupted files, and deleting the app without a backup is likely to take the vault with it.",
    features: {
      encryption: "unknown",
      endToEnd: "unknown",
      biometric: "yes",
      decoy: "unknown",
      intruderAlert: "yes",
      disguise: "yes",
      cloudBackup: "yes",
      noAccount: "unknown",
      adFree: "no",
    },
    faq: [
      {
        q: "How does the Calculator# hidden vault work?",
        a: "The app looks like a normal calculator and does real math. Typing your secret code into it opens the vault. You can switch to a PIN, password, pattern or Face ID if you prefer.",
      },
      {
        q: "Is Calculator# safe?",
        a: "It hides files well from someone glancing at your phone, but the App Store listing doesn't describe its encryption, and some reviews report lost or corrupted files. Turn on a cloud backup and don't keep the only copy of important photos in it.",
      },
      {
        q: "Can Calculator# back up my hidden photos?",
        a: "Yes. The listing mentions backup and sync with iCloud, Dropbox, Google Drive and OneDrive. Set one up before deleting originals from your Photos library.",
      },
      {
        q: "Does Calculator# show who tried to open it?",
        a: "Its Hack Monitor logs failed password attempts and shows them to you. The listing doesn't say it takes intruder photos.",
      },
    ],
  },

  // 10. Best Secret Folder
  {
    slug: "best-secret-folder",
    name: "Best Secret Folder",
    developer: "RV AppStudios LLC",
    categories: ["photo-vault"],
    platforms: ["iOS"],
    pricing: {
      model: "Freemium",
      free: "Password-protected folders for photos and videos, private notes, ads",
      paid: "Optional yearly VIP subscription adds unlimited storage, break-in alerts and password recovery; small one-time purchases remove ads or upgrade to Pro",
    },
    bestFor: "Catching snoops on iPhone",
    standout: "Fake screen plus photo and location of intruders",
    oneLiner:
      "Best Secret Folder is an iPhone vault focused on catching snoopers, with a fake screen for intruders and break-in alerts that record a photo, time and location.",
    whatItIs:
      "Best Secret Folder is a long-running iOS app from RV AppStudios for hiding photos and videos in password-protected folders. Its emphasis is on intruders: it can show fake content to someone who forces it open and log who tried to get in.",
    howItWorks: [
      "You set a password, pattern, Face ID or Touch ID, then import photos and videos into folders. There's no folder limit, and there's room for private notes too.",
      "The intruder stopper shows fake content when activated, so someone forcing you to open the app sees something harmless. The listing describes the app icon as hard to notice.",
      "Break-in attempts are flagged on the app icon. With Premium, the app captures a photo of the intruder and can email it with date, time and location. There's also an alarm feature and a security log.",
      "Premium is a yearly VIP subscription that adds unlimited storage, break-in alerts and password recovery.",
    ],
    whoFor:
      "Best Secret Folder fits iPhone users who suspect someone close to them is going through their phone and want evidence. It's less about encryption and more about deterrence.",
    pickIf:
      "You want to know who tried to open your vault, with a photo and location.",
    skipIf:
      "You need clear encryption details, cloud backup, or minimal data collection.",
    strengths: [
      "Fake content screen for forced openings",
      "Break-in alerts with photo, time and location (Premium)",
      "Face ID, Touch ID, password or pattern",
      "Unlimited folders and private notes",
    ],
    tradeoffs: [
      "Listing says files are password protected but doesn't mention encryption",
      "No cloud backup mentioned",
      "Ads in the free version",
      "Privacy label lists a lot of data linked to you",
      "Password recovery is a Premium feature",
    ],
    privacyNotes:
      "Best Secret Folder describes its files as password protected without mentioning encryption, so treat it as hiding rather than encrypting. Its App Store privacy label lists identifiers used for tracking and many data types linked to you, including coarse location, contact info and user content such as photos. The listing doesn't mention cloud backup, so assume files live only on your iPhone and keep another copy of anything important before deleting the app or changing phones.",
    features: {
      encryption: "unknown",
      endToEnd: "unknown",
      biometric: "yes",
      decoy: "yes",
      intruderAlert: "partial",
      disguise: "unknown",
      cloudBackup: "unknown",
      noAccount: "unknown",
      adFree: "no",
    },
    faq: [
      {
        q: "Is Best Secret Folder safe?",
        a: "It's an established app with strong intruder features, but the listing doesn't describe any encryption, and its privacy label shows a wide range of data linked to you, including location. It's good for catching snoopers, less so for protecting highly sensitive files.",
      },
      {
        q: "How do Best Secret Folder break-in alerts work?",
        a: "When someone enters the wrong password, the app flags the attempt on its icon. With the Premium subscription, it also takes a photo of the person and can email it to you with the date, time and location.",
      },
      {
        q: "Can I recover my Best Secret Folder password?",
        a: "Password recovery is listed as a Premium feature. Without it, there's no recovery option described in the listing, so write your password down somewhere safe.",
      },
      {
        q: "Is Best Secret Folder on Android?",
        a: "Best Secret Folder from RV AppStudios is an iPhone and iPad app. We didn't find an Android version from the same developer.",
      },
    ],
  },

  // 11. Secret Photo Album - SA
  {
    slug: "secret-photo-album",
    name: "Secret Photo Album",
    storeName: "Secret Photo Album - SA",
    developer: "BPMobile",
    categories: ["photo-vault"],
    platforms: ["iOS"],
    pricing: {
      model: "Freemium",
      free: "PIN, Touch ID or Face ID vault on the phone, with no account needed",
      paid: "Optional Premium subscription with free trial adds unlimited cloud storage and sync across devices, among other extras",
    },
    bestFor: "iPhone vault with decoy PIN",
    standout: "Decoy PIN plus intruder photos in one app",
    oneLiner:
      "Secret Photo Album is a BPMobile iPhone vault that locks photos with a PIN or Face ID, offers a decoy PIN and intruder photos, and adds cloud sync in Premium.",
    whatItIs:
      "Secret Photo Album - SA is an iOS photo and video vault from BPMobile. It stores files in what the developer calls encrypted, PIN-protected storage, with a decoy PIN, break-in reports and optional cloud backup.",
    howItWorks: [
      "You set a PIN and can add Touch ID or Face ID. Then you import photos and videos, or take new ones with the built-in camera. The app locks after three wrong PIN attempts, and a cover screen hides the app's contents in the multitasking view.",
      "A fake PIN opens a set of decoy photos and videos instead of your real ones. Selected albums can have their own separate PIN.",
      "Break-in alerts produce security reports with photos of the person who tried to get in. The app also includes a private browser with an ad blocker, a media player, slideshows, themes and a way to recover removed files.",
      "Cloud storage and sync are Premium features. To use them, you register an email in Settings. Without Premium, files stay on the iPhone.",
    ],
    whoFor:
      "Secret Photo Album fits iPhone users who want a decoy PIN and intruder reports in a polished app, and who are fine with a subscription for backup.",
    pickIf:
      "You want a decoy PIN and intruder photos on iPhone, with cloud sync available if you pay.",
    skipIf:
      "You want free cloud backup, an Android version, or an app with minimal tracking.",
    strengths: [
      "Decoy PIN that shows fake photos",
      "Break-in reports with intruder photos",
      "Separate PINs for individual albums",
      "Works without an account; email needed only for cloud sync",
      "Private browser with ad blocker",
    ],
    tradeoffs: [
      "Cloud backup requires Premium",
      "Encryption details aren't published beyond \"encrypted storage\"",
      "Privacy label lists several data types used for tracking, including location",
      "Some reviews report lost photos after a subscription lapsed or the app malfunctioned",
    ],
    privacyNotes:
      "BPMobile says files are kept in encrypted, PIN-protected storage, but doesn't give technical details or say whether cloud sync is end-to-end encrypted. The app works without an account; cloud sync needs a registered email. The App Store privacy label lists purchases, location, identifiers, usage data and diagnostics as used for tracking. Without Premium backup, your files exist only on the phone, so deleting the app or losing the device can mean losing them.",
    features: {
      encryption: "yes",
      endToEnd: "unknown",
      biometric: "yes",
      decoy: "yes",
      intruderAlert: "yes",
      disguise: "unknown",
      cloudBackup: "partial",
      noAccount: "yes",
      adFree: "unknown",
    },
    faq: [
      {
        q: "Is Secret Photo Album safe?",
        a: "It offers solid everyday protection: PIN or Face ID, a decoy PIN and intruder photos, and the developer says storage is encrypted. On the other hand, it publishes no encryption details and its privacy label lists several data types used for tracking. Keep a backup of anything you can't replace.",
      },
      {
        q: "Does Secret Photo Album have a fake PIN?",
        a: "Yes. You can set a fake PIN that opens decoy photos and videos instead of your real vault.",
      },
      {
        q: "Does Secret Photo Album back up to the cloud?",
        a: "Only with Premium. Cloud storage and sync across devices are part of the subscription, and you register an email in Settings to use them. Without Premium, files stay on your iPhone.",
      },
      {
        q: "What happens to my photos if my Secret Photo Album subscription ends?",
        a: "The listing doesn't spell this out, and some reviews describe losing access to photos after a subscription lapsed. Before canceling, export anything important back to your Photos library or another backup.",
      },
    ],
  },
];
