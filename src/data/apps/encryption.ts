import type { App } from "../types";

export const encryptionApps: App[] = [
  // ---------------------------------------------------------------------------
  // File & cloud encryption
  // ---------------------------------------------------------------------------
  {
    slug: "cryptomator",
    name: "Cryptomator",
    developer: "Skymatic GmbH",
    categories: ["file-encryption"],
    platforms: ["Windows", "macOS", "Linux", "iOS", "Android"],
    website: "https://cryptomator.org/",
    openSource: true,
    pricing: {
      model: "Freemium",
      free: "Desktop apps for Windows, macOS and Linux are free with every encryption feature. Mobile apps are free in read-only mode.",
      paid: "One-time in-app purchase per mobile platform unlocks write access on iOS or Android. An optional desktop supporter certificate only adds dark mode. Cryptomator Hub for teams has a free self-hosted tier and paid plans.",
    },
    bestFor: "Encrypting files in any cloud",
    standout: "Client-side encryption on top of your existing cloud",
    oneLiner:
      "Cryptomator is a free, open-source app that encrypts files on your device before they sync to Dropbox, Google Drive, OneDrive, iCloud or any other cloud folder.",
    whatItIs:
      "Cryptomator creates encrypted vaults inside a folder you already sync, so your cloud provider only ever stores scrambled files. It does not offer its own storage. The desktop apps are free and the code is public on GitHub.",
    howItWorks: [
      "You create a vault and pick a password. Cryptomator places the vault inside a cloud-synced folder, such as your Dropbox or OneDrive directory, and mounts it as a virtual drive while it is unlocked.",
      "You drag files into that drive and work with them normally. Cryptomator encrypts each file and its name on your device, and your cloud client then uploads the encrypted copies.",
      "On a phone, the iOS and Android apps open the same vault through the cloud provider. Reading is free; adding or editing files needs a one-time purchase on each mobile platform.",
      "Cryptomator also gives you a recovery key when you create a vault. It is the only way back in if you forget the password, so store it somewhere safe and offline.",
    ],
    whoFor:
      "People who already pay for Dropbox, Google Drive, OneDrive or iCloud and want the provider unable to read their files. It also suits anyone who wants open, audited encryption without switching storage services.",
    pickIf: "You want to keep your current cloud storage but encrypt everything in it yourself, with open-source code and no account.",
    skipIf: "You need a single all-in-one service with storage, sharing links and team collaboration built in.",
    strengths: [
      "Desktop apps are completely free",
      "Encrypts file contents and file names",
      "Works with almost any cloud service or local folder",
      "Open source, with a public Cure53 audit of its crypto libraries (2017)",
      "No account or sign-up required",
      "Recovery key option for forgotten passwords",
    ],
    tradeoffs: [
      "File sizes, timestamps and file counts stay visible to the cloud provider",
      "Mobile write access costs extra, bought separately per platform",
      "No built-in storage or sharing links",
      "Lose both the password and recovery key and the vault cannot be opened",
    ],
    privacyNotes:
      "Encryption happens on your device and the keys never leave it, so the cloud provider and Cryptomator's developers cannot read vault contents. Its own security documentation says file contents, file and folder names, and directory structure are protected, while timestamps, file sizes and the number of files are not. No account is needed. If you forget your password and lose the recovery key, the files are unrecoverable.",
    features: {
      encryption: "yes",
      endToEnd: "yes",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "no",
      noAccount: "yes",
      adFree: "yes",
    },
    faq: [
      {
        q: "Is Cryptomator safe?",
        a: "Cryptomator is open source and its core cryptographic libraries were audited by Cure53 in 2017, with the report published on its website. Its safety depends heavily on your password. Its documentation is clear that file sizes, timestamps and file counts remain visible to your cloud provider.",
      },
      {
        q: "Is Cryptomator free?",
        a: "The desktop apps for Windows, macOS and Linux are free with all features. The iOS and Android apps are free to read vaults, and a one-time purchase on each platform unlocks writing.",
      },
      {
        q: "Can Google or Dropbox see my files in a Cryptomator vault?",
        a: "No. They only receive encrypted files with encrypted names. They can still see how many files there are, how big they are and when they changed.",
      },
      {
        q: "What happens if I forget my Cryptomator password?",
        a: "You can only regain access with the recovery key Cryptomator offers when you set up the vault. Without the password or that key, nobody can decrypt the files.",
      },
    ],
  },
  {
    slug: "veracrypt",
    name: "VeraCrypt",
    developer: "IDRIX",
    categories: ["file-encryption"],
    platforms: ["Windows", "macOS", "Linux"],
    website: "https://veracrypt.io/",
    openSource: true,
    pricing: {
      model: "Free",
      free: "Everything: encrypted containers, full-disk and system encryption on Windows, hidden volumes.",
      paid: "None. The project accepts donations.",
    },
    bestFor: "Encrypted drives and containers",
    standout: "Hidden volumes for plausible deniability",
    oneLiner:
      "VeraCrypt is a free, open-source desktop tool that creates encrypted containers, encrypts whole drives and partitions, and can hide a second volume inside the first.",
    whatItIs:
      "VeraCrypt is the successor to TrueCrypt. It encrypts a file container, a USB drive, a partition or, on Windows, the whole system drive, and mounts it as a normal disk once you enter the password. It runs on Windows, macOS and Linux.",
    howItWorks: [
      "You create a volume: either a single container file of a fixed size or an entire drive or partition. You choose an encryption algorithm (AES is the default; Serpent, Twofish and cascades are also offered) and a password, plus optional keyfiles.",
      "To use it, you mount the volume in VeraCrypt. It appears as a drive letter or mounted disk, and everything written to it is encrypted on the fly. Dismount it and the data is unreadable.",
      "A hidden volume can live inside the free space of a normal volume. One password opens the outer decoy volume and a different password opens the hidden one, which is meant for situations where you might be forced to reveal a password.",
      "On macOS, VeraCrypt needs macFUSE or FUSE-T to mount volumes. There is no official mobile app.",
    ],
    whoFor:
      "Desktop users who want strong local encryption for drives, USB sticks or a container file, and are comfortable with a technical interface. Journalists and people with higher-risk threat models often look at it for hidden volumes.",
    pickIf: "You want free, open-source, offline encryption for drives or containers on Windows, macOS or Linux.",
    skipIf: "You need a phone app, automatic cloud sync of individual files, or a simple point-and-click interface.",
    strengths: [
      "Free and open source",
      "Encrypts containers, USB drives, partitions and Windows system drives",
      "Hidden volumes and hidden operating systems for plausible deniability",
      "Independent audits by Quarkslab (2016) and Fraunhofer SIT for Germany's BSI (2020)",
      "Fully offline, no account",
    ],
    tradeoffs: [
      "Interface is dated and technical",
      "No official iOS or Android app",
      "Container files sync poorly to cloud storage because the whole file changes",
      "No password recovery; a forgotten password means lost data",
      "macOS requires installing macFUSE or FUSE-T",
    ],
    privacyNotes:
      "Everything stays on your own disks and the keys are derived from your password and optional keyfiles. There is no account, server or telemetry to trust. If you forget the password or damage the volume header without a header backup, the data cannot be recovered.",
    features: {
      encryption: "yes",
      endToEnd: "no",
      biometric: "no",
      decoy: "yes",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "no",
      noAccount: "yes",
      adFree: "yes",
    },
    faq: [
      {
        q: "Is VeraCrypt still safe in 2026?",
        a: "VeraCrypt is still actively maintained, with new releases in 2026. It was audited by Quarkslab in 2016 and by Fraunhofer SIT for Germany's BSI in 2020, and the issues from the first audit were fixed. As with any tool, keep it updated and use a long password.",
      },
      {
        q: "Is VeraCrypt better than BitLocker?",
        a: "VeraCrypt is open source, cross-platform and supports hidden volumes. BitLocker is built into Windows and is easier to manage. VeraCrypt suits people who want code they can inspect and volumes they can open on macOS or Linux too.",
      },
      {
        q: "Can I use VeraCrypt on my phone?",
        a: "There is no official VeraCrypt app for iOS or Android. Some third-party apps can open VeraCrypt volumes, but they are not made by the VeraCrypt project.",
      },
      {
        q: "What is a VeraCrypt hidden volume?",
        a: "It is a second encrypted volume stored inside the free space of an ordinary one. Each has its own password, and without the second password there is no way to prove the hidden volume exists.",
      },
    ],
  },
  {
    slug: "proton-drive",
    name: "Proton Drive",
    developer: "Proton AG",
    categories: ["file-encryption"],
    platforms: ["Windows", "macOS", "iOS", "Android", "Web"],
    website: "https://proton.me/drive",
    openSource: true,
    pricing: {
      model: "Freemium",
      free: "Free plan with limited storage and the same end-to-end encryption as paid plans.",
      paid: "Paid Drive and bundle plans (such as Proton Unlimited) add more storage and features.",
    },
    bestFor: "Private Google Drive replacement",
    standout: "End-to-end encrypted cloud storage with photo backup",
    oneLiner:
      "Proton Drive is end-to-end encrypted cloud storage from the Swiss company behind Proton Mail, with apps for Windows, macOS, iOS, Android and the web.",
    whatItIs:
      "Proton Drive stores files and photos in Proton's cloud, encrypted on your device before upload. File contents and names are encrypted with keys Proton cannot access. It is part of the wider Proton account that also covers Mail, Pass and VPN.",
    howItWorks: [
      "You sign up for a Proton account, then use the web app, desktop sync clients for Windows and macOS, or the mobile apps. The phone apps can back up your camera roll automatically.",
      "Files are split into blocks and encrypted on your device. Keys are generated locally and only reach Proton's servers in encrypted form.",
      "You can share files with a link, optionally protected by a password that Proton does not know. Sharing with other Proton users keeps files end-to-end encrypted.",
      "Linux has no desktop app as of late 2026. Proton offers a command-line tool for Linux, macOS and Windows, and Linux users can also use the web app.",
    ],
    whoFor:
      "People who want to leave Google Drive, Dropbox or OneDrive for a service that cannot read their files, without managing encryption themselves. It fits especially well if you already use Proton Mail or Proton Pass.",
    pickIf: "You want encrypted cloud storage and photo backup that just works, from a company whose apps are open source.",
    skipIf: "You need a native Linux desktop sync client, or you want to keep using your current cloud provider.",
    strengths: [
      "End-to-end encryption on free and paid plans alike",
      "File and folder names are encrypted",
      "Automatic photo backup from iOS and Android",
      "Open-source apps",
      "Password-protected share links",
      "Bundles with Proton Mail, Pass and VPN",
    ],
    tradeoffs: [
      "No native Linux desktop app yet",
      "Free storage is small compared with paid plans",
      "Requires a Proton account",
      "Losing your password without a recovery method can lock you out of encrypted files",
    ],
    privacyNotes:
      "Proton says files and file names are end-to-end encrypted and that keys are created on your device and sent to its servers only in encrypted form. Proton's published security model is less specific about other metadata, such as file sizes and timestamps, so assume Proton can see some of it. A Proton account is required. If you reset your password without a recovery phrase or recovery file, you can lose access to existing encrypted data.",
    features: {
      encryption: "yes",
      endToEnd: "yes",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "yes",
      noAccount: "no",
      adFree: "yes",
    },
    faq: [
      {
        q: "Can Proton see my files?",
        a: "Proton says no. Files and file names are encrypted on your device with keys Proton never sees in readable form. Proton can still see account information and some technical metadata needed to run the service.",
      },
      {
        q: "Is Proton Drive free?",
        a: "Yes, there is a free plan with limited storage and full end-to-end encryption. Paid plans add more storage.",
      },
      {
        q: "Does Proton Drive work on Linux?",
        a: "Not with a desktop app as of late 2026. Proton has said a Linux client is in development. For now, Linux users can use the web app or Proton's command-line tool.",
      },
      {
        q: "Is Proton Drive better than Google Drive for privacy?",
        a: "For privacy, yes: Google can access files stored in Google Drive, while Proton Drive encrypts them end to end. Google Drive offers more storage for the money and deeper app integrations.",
      },
    ],
  },
  {
    slug: "tresorit",
    name: "Tresorit",
    developer: "Tresorit",
    categories: ["file-encryption"],
    platforms: ["Windows", "macOS", "Linux", "iOS", "Android", "Web"],
    website: "https://tresorit.com/",
    openSource: false,
    pricing: {
      model: "Subscription",
      free: "No ongoing free plan is advertised on its personal pricing page. A free trial is offered, and it asks for payment details.",
      paid: "Personal plans scale by storage, file size limits, version history and number of devices. Business plans add admin controls and compliance features.",
    },
    bestFor: "Encrypted file sharing for business",
    standout: "Zero-knowledge storage with strong sharing controls",
    oneLiner:
      "Tresorit is a paid, end-to-end encrypted cloud storage and file-sharing service from Switzerland, aimed at professionals and businesses that handle confidential documents.",
    whatItIs:
      "Tresorit is a zero-knowledge cloud storage service: files are encrypted on your device before upload, and the company does not hold the keys. It is built around secure sharing, with permission controls and link settings. Tresorit is based in Switzerland and is part of the Swiss Post group.",
    howItWorks: [
      "You create an account and install the desktop or mobile app. Files go into encrypted folders called tresors, which sync across your devices.",
      "Sharing is the core feature. You can invite people to a tresor with set permissions, or send encrypted links with options such as passwords and expiry dates.",
      "Higher plans add longer version history, larger file size limits and, on business tiers, admin policies and access logs.",
      "The mobile apps support an app passcode with fingerprint or Touch ID unlock.",
    ],
    whoFor:
      "Lawyers, accountants, healthcare teams and other professionals who share sensitive files with clients and need encryption plus admin control. It is less of a fit for casual personal storage on a budget.",
    pickIf: "You want polished, zero-knowledge file sharing with permission controls and a Linux client.",
    skipIf: "You need a free plan, open-source code, or the cheapest price per terabyte.",
    strengths: [
      "End-to-end encrypted by default",
      "Apps for Windows, macOS, Linux, iOS, Android and the web",
      "Detailed sharing permissions and secure links",
      "Business admin and compliance features",
      "Swiss-based, part of the Swiss Post group",
    ],
    tradeoffs: [
      "Expensive compared with mainstream cloud storage",
      "No permanent free plan advertised",
      "Closed-source clients",
      "Zero-knowledge design limits password recovery",
    ],
    privacyNotes:
      "Files are encrypted on your device and Tresorit says it cannot access your keys or file contents. You need an account, and Tresorit necessarily sees account details and usage metadata. Because of the zero-knowledge design, a forgotten password can mean losing access to your files unless a recovery option was set up in advance.",
    features: {
      encryption: "yes",
      endToEnd: "yes",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "yes",
      noAccount: "no",
      adFree: "yes",
    },
    faq: [
      {
        q: "Is Tresorit really zero-knowledge?",
        a: "Tresorit says files are encrypted on your device before upload and that it does not hold the keys. The client code is not open source, so you rely on the company's documentation rather than public code review.",
      },
      {
        q: "Does Tresorit have a free plan?",
        a: "Its personal pricing page does not advertise an ongoing free plan. It offers a free trial of paid plans, and the trial requires payment details.",
      },
      {
        q: "Tresorit vs Proton Drive: which is more private?",
        a: "Both encrypt files end to end. Proton Drive has open-source apps and a free plan. Tresorit has a Linux desktop client and stronger business sharing and admin tools.",
      },
    ],
  },
  {
    slug: "files-by-google-safe-folder",
    name: "Files by Google Safe folder",
    storeName: "Files by Google",
    developer: "Google",
    categories: ["file-encryption", "photo-vault"],
    platforms: ["Android"],
    builtIn: true,
    pricing: {
      model: "Built-in",
      free: "Free inside the Files by Google app. No limit beyond your phone's storage.",
      paid: "None.",
    },
    bestFor: "Quick private folder on Android",
    standout: "PIN-locked folder in an app many phones already have",
    oneLiner:
      "Safe folder is a PIN- or pattern-locked, encrypted folder inside the free Files by Google app on Android, for hiding photos, videos and documents on the device.",
    whatItIs:
      "Safe folder is a feature of Files by Google, Google's file manager for Android 8.0 and later. Files you move into it are hidden from the rest of the phone and protected by a PIN or pattern. It is local only: nothing is backed up to the cloud.",
    howItWorks: [
      "Open Files by Google, find Safe folder in the Collections area, and set a PIN or pattern.",
      "Select files anywhere in the app and choose Move to Safe folder. They disappear from your gallery, search results and other apps.",
      "Inside the folder, you can open files but you cannot share them or back them up to Google Drive. Screenshots of the Safe folder are blocked.",
      "Moving a file out returns it to its original location. Google warns not to close the folder mid-transfer, or the file stays inside.",
    ],
    whoFor:
      "Android users who want a simple, free place to tuck away a few private files without installing a third-party vault. It suits people who share a phone or hand it to others now and then.",
    pickIf: "You want a free, no-sign-up private folder on Android from a well-known developer, with no ads.",
    skipIf: "You need cloud backup, cross-device access, an iPhone version, or recovery if you forget the PIN.",
    strengths: [
      "Free and ad-free",
      "From Google, often preinstalled on Android phones",
      "Uses Android encrypted storage",
      "Hidden from gallery, search and other apps",
      "Blocks screenshots inside the folder",
    ],
    tradeoffs: [
      "Android only",
      "No cloud backup and no official way to move it to a new phone",
      "Forgotten PIN or pattern means the files are gone",
      "Resetting the folder deletes everything in it",
    ],
    privacyNotes:
      "Files stay on the device and Google says they are stored using Android storage with encryption. Google's help page notes that someone with unauthorized access to the device's internal storage may still be able to reach them, and that files can occasionally become corrupt. There is no backup or migration path, so copy anything irreplaceable elsewhere first. If you forget the PIN or pattern, the only option is a reset, which permanently deletes the contents.",
    features: {
      encryption: "yes",
      endToEnd: "no",
      biometric: "unknown",
      decoy: "no",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "no",
      noAccount: "yes",
      adFree: "yes",
    },
    faq: [
      {
        q: "Is Files by Google Safe folder encrypted?",
        a: "Google says Safe folder keeps files secure using Android storage with encryption, and they are locked behind a PIN or pattern. It also notes that someone with unauthorized access to the phone's internal storage may still be able to reach them.",
      },
      {
        q: "What happens if I forget my Safe folder PIN?",
        a: "Google says you can't access the files. The only option is to reset the Safe folder, which permanently deletes everything in it.",
      },
      {
        q: "Does Safe folder back up to Google Drive?",
        a: "No. Backup to Google Drive and sharing are disabled inside the Safe folder. Files exist only on that phone.",
      },
      {
        q: "Can I move my Safe folder to a new phone?",
        a: "There is no built-in transfer. Google advises against copying encrypted Safe folder files to a new phone. Move files out of the folder, transfer them, then lock them again on the new device.",
      },
    ],
  },
  {
    slug: "folder-lock",
    name: "Folder Lock",
    developer: "NewSoftwares.net",
    categories: ["file-encryption"],
    platforms: ["Windows", "iOS", "Android"],
    website: "https://www.newsoftwares.net/folderlock/",
    openSource: false,
    pricing: {
      model: "Freemium",
      free: "Free version on Windows with a small locker size and limited device sync. Mobile apps are free to download.",
      paid: "Folder Lock Pro removes the locker size limit and adds more synced devices and extra tools. Mobile apps sell upgrades through in-app purchases.",
    },
    bestFor: "All-in-one Windows file locker",
    standout: "Encrypted lockers that sync through Dropbox, Drive or OneDrive",
    oneLiner:
      "Folder Lock is a long-running Windows encryption tool from NewSoftwares.net that creates AES-256 lockers, hides folders, shreds files and has companion mobile apps.",
    whatItIs:
      "Folder Lock bundles several privacy tools: encrypted lockers, a folder-hiding feature, portable encrypted lockers for USB drives, a file shredder and encrypted wallets and notes. Version 10 for Windows can also sync encrypted lockers through Dropbox, Google Drive or OneDrive.",
    howItWorks: [
      "On Windows, you create a locker and add files. The developer says lockers use AES-256 virtual drive encryption that grows as you add data, so you don't set a fixed size.",
      "If you only want to hide files rather than encrypt them, the Lock Folders feature uses a kernel-level driver to block access and hide them in Explorer.",
      "Cloud lockers keep an encrypted copy in Dropbox, Google Drive or OneDrive and sync it to your other devices, including the iPhone and Android apps.",
      "The mobile apps focus on locking photos, videos, documents, notes and cards. The iOS listing also mentions features called Panic Switch and Hack Security.",
    ],
    whoFor:
      "Windows users who want one paid program for encryption, hiding, shredding and secure notes, and don't need open-source code. It suits people who prefer a guided interface over tools like VeraCrypt.",
    pickIf: "You want a Windows app that bundles encrypted lockers, folder hiding, shredding and cloud-synced vaults in one place.",
    skipIf: "You need open-source, independently audited encryption, or a free tool without storage limits.",
    strengths: [
      "Many privacy tools in one Windows app",
      "AES-256 encrypted lockers, per the developer",
      "Encrypted lockers can sync via Dropbox, Google Drive or OneDrive",
      "Portable lockers for USB drives",
      "Companion apps for iPhone and Android",
    ],
    tradeoffs: [
      "Closed source with no public independent audit that we could find",
      "Free version has a small locker size limit",
      "Folder hiding without encryption is weaker than an encrypted locker",
      "Some App Store reviews report problems after major updates",
    ],
    privacyNotes:
      "Folder Lock says it encrypts lockers with AES-256 and uses RSA keys for user profiles and sharing. Because the software is closed source, those claims can't be checked against public code, and we couldn't confirm exactly how keys are handled when lockers sync through the cloud. The Lock Folders option hides and blocks files but is not encryption. Keep separate backups, since a lost password or damaged locker can mean lost files.",
    features: {
      encryption: "yes",
      endToEnd: "unknown",
      biometric: "unknown",
      decoy: "unknown",
      intruderAlert: "unknown",
      disguise: "unknown",
      cloudBackup: "yes",
      noAccount: "unknown",
      adFree: "unknown",
    },
    faq: [
      {
        q: "Is Folder Lock safe?",
        a: "Folder Lock says it uses AES-256 encryption for lockers. It is closed source and we found no published independent audit, so you are trusting the developer's description. Use the encrypted lockers rather than the hide-only Lock Folders option for sensitive files.",
      },
      {
        q: "Is Folder Lock free?",
        a: "There is a free version for Windows with a small locker size and limited sync. Folder Lock Pro removes the size limit and adds more devices and features.",
      },
      {
        q: "What's the difference between locking and encrypting in Folder Lock?",
        a: "Encrypting puts files in an AES-256 locker. Locking uses a driver to hide files and block access on that PC, without encrypting them.",
      },
    ],
  },
  {
    slug: "7-zip",
    name: "7-Zip",
    developer: "Igor Pavlov",
    categories: ["file-encryption"],
    platforms: ["Windows", "Linux", "macOS"],
    website: "https://www.7-zip.org/",
    openSource: true,
    pricing: {
      model: "Free",
      free: "Everything, including AES-256 encrypted 7z and ZIP archives.",
      paid: "None.",
    },
    bestFor: "Password-protected archives",
    standout: "AES-256 archives with encrypted file names",
    oneLiner:
      "7-Zip is a free, open-source file archiver for Windows that can create AES-256 encrypted 7z and ZIP archives, with official command-line versions for Linux and macOS.",
    whatItIs:
      "7-Zip is a compression tool that can also password-protect archives with AES-256. It is a practical way to encrypt a batch of files before emailing them, uploading them or storing them on a USB drive. The graphical app is Windows only; Linux and macOS get an official console version.",
    howItWorks: [
      "On Windows, right-click files, choose 7-Zip, then Add to archive. Pick the 7z format, enter a password, and leave the encryption method as AES-256.",
      "For 7z archives, tick Encrypt file names. Without it, anyone can list the files inside even if they can't open them. ZIP archives never hide file names.",
      "If you use ZIP, choose AES-256 instead of the older ZipCrypto method, which is weak. Note that some built-in unzip tools can't open AES-encrypted ZIPs.",
      "The person opening the archive needs the password and a tool that supports the format, such as 7-Zip or another compatible archiver.",
    ],
    whoFor:
      "Anyone who needs to send or store a set of files with a password, without installing a vault app on the other end. It fits IT staff, students and anyone already using 7-Zip for compression.",
    pickIf: "You want a free, open-source way to encrypt files into a single archive you can send or store anywhere.",
    skipIf: "You need a vault you open every day, a phone app, or a graphical app on macOS or Linux.",
    strengths: [
      "Free and open source",
      "AES-256 encryption for 7z and ZIP",
      "Can encrypt file names in 7z archives",
      "Archives can be stored or sent anywhere",
      "Official console builds for Linux and macOS",
    ],
    tradeoffs: [
      "Graphical app is Windows only",
      "File names stay visible unless you use 7z with Encrypt file names",
      "Not a vault: you re-create the archive to change contents",
      "No password recovery",
      "Security fixes arrive in new versions, so keep it updated",
    ],
    privacyNotes:
      "Everything happens locally and there is no account or cloud. Security rests on the password: a short one can be guessed offline by anyone who has the archive. Choose the 7z format, AES-256 and Encrypt file names for the best protection. A forgotten password cannot be recovered.",
    features: {
      encryption: "yes",
      endToEnd: "no",
      biometric: "no",
      decoy: "no",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "no",
      noAccount: "yes",
      adFree: "yes",
    },
    faq: [
      {
        q: "Is 7-Zip encryption secure?",
        a: "7-Zip uses AES-256, which is strong when paired with a long, unique password. Use the 7z format and turn on Encrypt file names, because otherwise file names inside the archive are visible.",
      },
      {
        q: "How do I password-protect a folder with 7-Zip?",
        a: "Right-click the folder, choose 7-Zip, then Add to archive. Select 7z, type a password, keep AES-256, tick Encrypt file names and click OK.",
      },
      {
        q: "Is there 7-Zip for Mac?",
        a: "The official site offers a command-line version for macOS and Linux, but no graphical app. Mac users who want a graphical tool need a third-party app that supports 7z.",
      },
      {
        q: "Should I use ZIP or 7z for encryption?",
        a: "7z is better because it can encrypt file names. If you must use ZIP for compatibility, choose AES-256 rather than ZipCrypto.",
      },
    ],
  },
  {
    slug: "icloud-advanced-data-protection",
    name: "iCloud Advanced Data Protection",
    developer: "Apple",
    categories: ["file-encryption"],
    platforms: ["iOS", "macOS", "Web"],
    builtIn: true,
    website: "https://support.apple.com/en-us/102651",
    pricing: {
      model: "Built-in",
      free: "Free to turn on for any Apple Account with two-factor authentication. Works with the free iCloud tier.",
      paid: "No extra cost. iCloud+ subscriptions add storage.",
    },
    bestFor: "End-to-end encrypting your iCloud",
    standout: "Extends end-to-end encryption to Photos, Drive and Backups",
    oneLiner:
      "Advanced Data Protection is an optional iCloud setting that end-to-end encrypts iCloud Backup, iCloud Drive, Photos, Notes and more, so Apple no longer holds the keys.",
    whatItIs:
      "By default, Apple holds the keys to much of your iCloud data. Advanced Data Protection (ADP) moves those keys to your trusted devices for most categories, including iCloud Backup, iCloud Drive, Photos, Notes, Reminders and Voice Memos. It is off by default and must be turned on.",
    howItWorks: [
      "Your Apple Account needs two-factor authentication, and all your Apple devices must run iOS 16.2, iPadOS 16.2, macOS 13.1 or later. Apple then asks you to set up a recovery contact or a recovery key.",
      "Turn it on in Settings, under your name, iCloud, Advanced Data Protection. Nothing else changes in daily use: Photos, Files and backups work as before.",
      "Web access at iCloud.com is turned off by default. You can re-enable it, which temporarily gives your browser and Apple the keys needed to show your data.",
      "Apple stopped offering ADP to new users in the United Kingdom in February 2025, so it may not be available in every region.",
    ],
    whoFor:
      "iPhone and Mac users who rely on iCloud for photos, files and backups and want Apple unable to read that data. It suits people who can reliably keep a recovery key or trusted recovery contact.",
    pickIf: "You already use iCloud and want end-to-end encryption for backups, photos and files without switching services.",
    skipIf: "You need Mail, Contacts and Calendar encrypted end to end, or you want Apple to be able to help you recover a lost account.",
    strengths: [
      "Free and built into Apple devices",
      "End-to-end encrypts iCloud Backup, Drive, Photos and Notes",
      "No change to daily use once enabled",
      "Shared content stays end-to-end encrypted when all participants use ADP",
      "Recovery key and recovery contact options",
    ],
    tradeoffs: [
      "Apple cannot help you recover data if you lose access",
      "iCloud Mail, Contacts and Calendars are not end-to-end encrypted",
      "Some metadata, like iCloud Drive file names and sizes, stays under standard protection",
      "Not available to new users in the UK",
      "Every device on the account must be updated",
    ],
    privacyNotes:
      "With ADP on, Apple says it no longer holds the keys for 25 data categories, including iCloud Backup, Drive and Photos. Apple's own documentation lists metadata that keeps standard protection, such as iCloud Drive file names, types, sizes and timestamps, plus backup dates and sizes. iCloud Mail, Contacts and Calendars are never end-to-end encrypted. If you lose your devices, passcodes, recovery contact and recovery key, Apple cannot restore your data.",
    features: {
      encryption: "yes",
      endToEnd: "yes",
      biometric: "no",
      decoy: "no",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "yes",
      noAccount: "no",
      adFree: "yes",
    },
    faq: [
      {
        q: "Should I turn on Advanced Data Protection?",
        a: "Turn it on if you want Apple unable to read your iCloud backups, photos and files, and you can keep a recovery key or recovery contact safe. If you're worried about losing access, the tradeoff is that Apple can no longer help you recover data.",
      },
      {
        q: "What does Advanced Data Protection not encrypt?",
        a: "iCloud Mail, Contacts and Calendars stay outside end-to-end encryption. Some metadata, such as iCloud Drive file names, sizes and timestamps, also keeps standard protection with Apple holding the keys.",
      },
      {
        q: "Why can't I turn on Advanced Data Protection in the UK?",
        a: "Apple stopped offering ADP to new UK users in February 2025, following a UK government demand for access to encrypted data. iMessage and FaceTime remain end-to-end encrypted there.",
      },
      {
        q: "Can I still use iCloud.com with Advanced Data Protection?",
        a: "Yes, but web access is off by default. You can turn it on in settings, which gives your browser temporary access to the keys needed to show your data.",
      },
    ],
  },

  // ---------------------------------------------------------------------------
  // Private notes & password vaults
  // ---------------------------------------------------------------------------
  {
    slug: "standard-notes",
    name: "Standard Notes",
    developer: "Standard Notes (Proton)",
    categories: ["private-notes"],
    platforms: ["Windows", "macOS", "Linux", "iOS", "Android", "Web"],
    website: "https://standardnotes.com/",
    openSource: true,
    pricing: {
      model: "Freemium",
      free: "Free account with end-to-end encrypted notes synced across unlimited devices.",
      paid: "Paid plans add more editors and note types, encrypted file storage and other extras.",
    },
    bestFor: "Long-term encrypted note archive",
    standout: "Audited end-to-end encryption on every platform",
    oneLiner:
      "Standard Notes is an open-source, end-to-end encrypted notes app with apps for every major platform, owned by Proton since 2024.",
    whatItIs:
      "Standard Notes is a notes app built around encryption and longevity. Notes are encrypted on your device before syncing, and the code and encryption specification are public. Proton acquired the company in 2024.",
    howItWorks: [
      "You create an account and your password becomes the basis of your encryption keys. Notes sync across Windows, macOS, Linux, iOS, Android and the web.",
      "You can add an app passcode, with biometric unlock on mobile, and mark individual notes as protected so they need authentication to open.",
      "The free plan covers basic notes. Paid plans unlock richer editors, more note types and encrypted file storage.",
      "Standard Notes publishes its encryption specification, and its code has been reviewed by Trail of Bits (2020) and tested by Cure53.",
    ],
    whoFor:
      "People who want a simple, durable place for journals, private records or sensitive notes, and value audited encryption over a big feature set. It suits privacy-minded users who like open-source tools.",
    pickIf: "You want an audited, open-source encrypted notes app that runs on every platform, including Linux and the web.",
    skipIf: "You want a rich, free editor with formatting and attachments, or a note app that doesn't require an account to sync.",
    strengths: [
      "End-to-end encrypted sync on the free plan",
      "Open source with a published encryption spec",
      "Audits by Trail of Bits and Cure53",
      "Apps for Windows, macOS, Linux, iOS, Android and web",
      "App passcode, biometrics and per-note protection",
    ],
    tradeoffs: [
      "Free plan is basic; richer editors are paid",
      "Lose your password and your notes cannot be decrypted",
      "Fewer formatting and organization features than mainstream note apps",
    ],
    privacyNotes:
      "Notes are encrypted on your device with keys derived from your password, so Standard Notes says it cannot read them. Syncing requires an account. Because the company never has your password, it cannot reset access to encrypted notes; if you forget it, those notes are lost. Keep an encrypted backup export as a safety net.",
    features: {
      encryption: "yes",
      endToEnd: "yes",
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
        q: "Is Standard Notes safe?",
        a: "Standard Notes is open source, publishes its encryption specification, and has had a Trail of Bits review in 2020 and Cure53 testing. Notes are end-to-end encrypted, so the server stores only encrypted data.",
      },
      {
        q: "Is Standard Notes owned by Proton?",
        a: "Yes. Proton, the company behind Proton Mail, acquired Standard Notes in 2024. The app continues as its own product.",
      },
      {
        q: "Can I recover my Standard Notes account if I forget my password?",
        a: "No. Your password is used to encrypt your notes and the company never has it. Without it, encrypted notes can't be recovered, so keep a backup.",
      },
      {
        q: "Standard Notes vs Notesnook: which is better?",
        a: "Both are open source and end-to-end encrypted. Standard Notes has a longer public audit record. Notesnook adds a separate password-protected vault and a notebook-style editor.",
      },
    ],
  },
  {
    slug: "notesnook",
    name: "Notesnook",
    developer: "Streetwriters",
    categories: ["private-notes"],
    platforms: ["Windows", "macOS", "Linux", "iOS", "Android", "Web"],
    website: "https://notesnook.com/",
    openSource: true,
    pricing: {
      model: "Freemium",
      free: "Unlimited notes on all devices with end-to-end encrypted sync, with no trial period.",
      paid: "Paid plans add more storage for attachments and extra features.",
    },
    bestFor: "Encrypted Evernote alternative",
    standout: "Password-protected vault inside an encrypted notes app",
    oneLiner:
      "Notesnook is an open-source, end-to-end encrypted notes app with a rich editor, notebooks and a separate password-protected vault for the most sensitive notes.",
    whatItIs:
      "Notesnook aims to be a private replacement for Evernote-style note apps. Notes are encrypted on your device before syncing, and all the apps and the sync server are open source under GPLv3.",
    howItWorks: [
      "You sign up to sync, and notes are encrypted on your device before they leave it. The apps cover Windows, macOS, Linux, iOS, Android and the web.",
      "Notes can be organized into notebooks and tags, with a rich text editor and a web clipper.",
      "The vault adds a second password for your most sensitive notes, so unlocking the app alone doesn't open them.",
      "On phones, you can also lock the whole app with a fingerprint, PIN or password.",
    ],
    whoFor:
      "People leaving Evernote, OneNote or Google Keep who want encryption without giving up a familiar editor. The vault suits anyone who mixes everyday notes with a few highly sensitive ones.",
    pickIf: "You want a full-featured note app with end-to-end encryption, open-source code and a second lock for private notes.",
    skipIf: "You need a published independent security audit before trusting a notes app.",
    strengths: [
      "Rich editor and notebooks on the free plan",
      "End-to-end encrypted sync",
      "All apps and the sync server are open source",
      "Separate vault password for sensitive notes",
      "App lock with fingerprint or PIN on mobile",
    ],
    tradeoffs: [
      "We couldn't confirm a published independent audit",
      "Account required to sync",
      "Younger project than Standard Notes or Joplin",
      "Forgotten passwords can mean lost notes",
    ],
    privacyNotes:
      "Notesnook says notes are encrypted on your device before syncing, so its servers store only encrypted data. An account is required for sync. As with other zero-knowledge services, the company cannot simply reset access to your encrypted notes, so check the recovery options in the app and keep an export. The vault password is separate from your account password and should be stored safely too.",
    features: {
      encryption: "yes",
      endToEnd: "yes",
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
        q: "Is Notesnook really end-to-end encrypted?",
        a: "Notesnook says notes are encrypted on your device before syncing. Its client apps and sync server are open source, so the encryption code can be inspected.",
      },
      {
        q: "Is Notesnook free?",
        a: "Yes. The free plan includes unlimited notes on all devices with no trial period. Paid plans add storage and extra features.",
      },
      {
        q: "What is the Notesnook vault?",
        a: "It is a protected area for notes that needs its own password. Even if someone opens the app, vault notes stay locked.",
      },
    ],
  },
  {
    slug: "apple-notes-locked-notes",
    name: "Apple Notes locked notes",
    developer: "Apple",
    categories: ["private-notes"],
    platforms: ["iOS", "macOS"],
    builtIn: true,
    website: "https://support.apple.com/en-us/102537",
    pricing: {
      model: "Built-in",
      free: "Free in the Notes app on iPhone, iPad and Mac.",
      paid: "None.",
    },
    bestFor: "Quick private notes on iPhone",
    standout: "End-to-end encrypted notes with Face ID, already installed",
    oneLiner:
      "Apple Notes can lock individual notes with your device passcode or a separate password, and locked notes in iCloud are end-to-end encrypted.",
    whatItIs:
      "Locking is a built-in feature of Apple Notes on iPhone, iPad and Mac. A locked note needs your device passcode, a separate Notes password, or Face ID or Touch ID to open. For iCloud accounts, Apple says locked notes are end-to-end encrypted and Apple cannot access them.",
    howItWorks: [
      "Open a note, tap the More button and choose Lock. The first time, you pick between your device passcode or a separate Notes password. The device passcode option needs iCloud Keychain.",
      "Turn on Face ID or Touch ID so you can open locked notes without typing a password each time.",
      "Locked notes stay locked on all your devices signed in to the same iCloud account. After you unlock them, Notes locks them again after a few minutes, or when you close Notes or lock your device.",
      "The title of a locked note stays visible in the notes list. Use a neutral first line if the topic itself is sensitive.",
    ],
    whoFor:
      "iPhone and Mac users who want to protect a handful of notes, such as account numbers, journal entries or medical details, without installing anything. It is a reasonable first step before moving to a dedicated encrypted app.",
    pickIf: "You want free, end-to-end encrypted notes on Apple devices with Face ID, without another app or account.",
    skipIf: "You need Windows or Android access, locked attachments like PDFs and video, or hidden note titles.",
    strengths: [
      "Free and already on every iPhone, iPad and Mac",
      "End-to-end encrypted for iCloud notes",
      "Face ID and Touch ID unlock",
      "Syncs across Apple devices",
    ],
    tradeoffs: [
      "Note titles remain visible when locked",
      "Notes with PDFs, audio, video, tags or iWork files can't be locked",
      "Shared notes and IMAP-synced notes can't be locked",
      "A forgotten separate Notes password means the notes are gone",
      "Apple devices only",
    ],
    privacyNotes:
      "Apple says locked notes in iCloud use end-to-end encryption and that Apple has no access to them. The note title stays visible. If you use a separate Notes password and forget it, Apple says there is no way to open those locked notes; resetting the password only applies to notes you lock afterward. Notes locked with the device passcode follow your device passcode instead.",
    features: {
      encryption: "yes",
      endToEnd: "yes",
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
        q: "Are locked notes in Apple Notes encrypted?",
        a: "Yes. Apple says locked notes use end-to-end encryption for iCloud accounts and that Apple can't access them. The note's title stays visible, though.",
      },
      {
        q: "What happens if I forget my Apple Notes password?",
        a: "If you used a separate Notes password, Apple says there is no way to access those locked notes. Resetting the password only lets you lock new notes. Notes locked with your device passcode stay accessible.",
      },
      {
        q: "Why can't I lock a note on my iPhone?",
        a: "Notes with PDFs, audio, video, tags or Keynote, Pages or Numbers files can't be locked. Shared notes, notes in Gmail or other IMAP accounts, and Managed Apple Accounts can't be locked either.",
      },
      {
        q: "Is Apple Notes lock safe enough for passwords?",
        a: "It is encrypted, but a password manager such as Bitwarden or Proton Pass is a better fit for passwords. It offers autofill, breach alerts and works outside Apple devices.",
      },
    ],
  },
  {
    slug: "bitwarden",
    name: "Bitwarden",
    developer: "Bitwarden Inc.",
    categories: ["private-notes"],
    platforms: ["Windows", "macOS", "Linux", "iOS", "Android", "Web"],
    website: "https://bitwarden.com/",
    openSource: true,
    pricing: {
      model: "Freemium",
      free: "Unlimited passwords and secure notes on unlimited devices, plus cards, identities and basic sharing with one other user.",
      paid: "Premium adds encrypted file attachments, a built-in authenticator, vault health reports and emergency access. Families covers up to six users.",
    },
    bestFor: "Free password manager with notes",
    standout: "Open-source vault with generous free plan",
    oneLiner:
      "Bitwarden is an open-source, end-to-end encrypted password manager whose free plan includes unlimited passwords and secure notes across all your devices.",
    whatItIs:
      "Bitwarden stores passwords, secure notes, cards and identities in an encrypted vault synced across devices. Its code is public and it publishes third-party security audit reports. You can use Bitwarden's cloud or host the server yourself.",
    howItWorks: [
      "You create an account with a master password. Your vault is encrypted on your device with keys derived from it before anything syncs.",
      "Secure notes sit alongside logins in the same vault, searchable and organized by folders. Premium adds encrypted file attachments.",
      "Apps cover Windows, macOS, Linux, iOS, Android, the web vault and major browsers, with biometric unlock where the platform supports it.",
      "Bitwarden Send lets you share a note, or a file on paid plans, through an encrypted link that can expire.",
    ],
    whoFor:
      "Anyone who wants one encrypted place for passwords and private notes, at no cost, on every device. It also suits technical users who want the option to self-host.",
    pickIf: "You want an audited, open-source vault for passwords and secure notes that's free on unlimited devices.",
    skipIf: "You need a full note-taking app with rich formatting and notebooks rather than a password vault.",
    strengths: [
      "Free plan with unlimited passwords, notes and devices",
      "Open source with published third-party audits",
      "Apps for every major platform and browser",
      "Self-hosting option",
      "Biometric unlock and encrypted Send links",
    ],
    tradeoffs: [
      "Notes are plain text, not a full writing app",
      "File attachments are a Premium feature",
      "Forgotten master password usually means losing the vault",
      "Interface is functional rather than polished",
    ],
    privacyNotes:
      "Bitwarden encrypts your vault on your device using keys derived from your master password, which it never receives. An account is required. Bitwarden cannot recover a lost master password. Premium's emergency access, set up in advance, lets a trusted contact request access, and organizations can enable admin recovery.",
    features: {
      encryption: "yes",
      endToEnd: "yes",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "yes",
      noAccount: "no",
      adFree: "yes",
    },
    faq: [
      {
        q: "Is Bitwarden safe to use?",
        a: "Bitwarden is open source, encrypts vaults on your device and publishes third-party security audit reports. Its safety depends on a strong master password and two-step login.",
      },
      {
        q: "Can Bitwarden see my passwords and notes?",
        a: "No. Your vault is encrypted on your device with keys derived from your master password, which Bitwarden never receives.",
      },
      {
        q: "Can I store private notes in Bitwarden for free?",
        a: "Yes. Secure notes are included in the free plan with no limit on number or devices. Encrypted file attachments need Premium.",
      },
      {
        q: "What happens if I forget my Bitwarden master password?",
        a: "Bitwarden can't reset it or decrypt your vault. Unless you set up emergency access or an organization recovery option beforehand, you'd have to delete the account and start over.",
      },
    ],
  },
  {
    slug: "proton-pass",
    name: "Proton Pass",
    developer: "Proton AG",
    categories: ["private-notes"],
    platforms: ["Windows", "macOS", "Linux", "iOS", "Android", "Web"],
    website: "https://proton.me/pass",
    openSource: true,
    pricing: {
      model: "Freemium",
      free: "Free plan with unlimited logins, notes and devices, plus a limited number of hide-my-email aliases.",
      paid: "Pass Plus and Proton bundles add unlimited aliases and extra features.",
    },
    bestFor: "Password vault with email aliases",
    standout: "Built-in hide-my-email aliases",
    oneLiner:
      "Proton Pass is an open-source, end-to-end encrypted password manager from Proton that stores logins and notes and can create email aliases to hide your real address.",
    whatItIs:
      "Proton Pass is a password manager that also stores secure notes, cards and other items in end-to-end encrypted vaults. Its signature extra is hide-my-email aliases, which forward mail to your inbox without exposing your address. The code is open source and was audited by Cure53 in 2023.",
    howItWorks: [
      "You sign in with a Proton account. Items are encrypted on your device before syncing.",
      "Notes, logins and cards live in vaults you can organize and share. Apps cover Windows, macOS, Linux, iOS, Android, the web and major browsers.",
      "When signing up for a site, Pass can generate an alias email address. Messages to it forward to your real inbox, and you can turn off an alias any time.",
      "You can lock the app with a PIN or biometrics on supported devices.",
    ],
    whoFor:
      "People who want a free, privacy-focused password vault and like the idea of hiding their real email from websites. It is a natural fit for existing Proton Mail or Proton Drive users.",
    pickIf: "You want an open-source vault for passwords and notes with built-in email aliases, from a Swiss privacy company.",
    skipIf: "You don't want a Proton account, or you need a long-form notes app rather than a password vault.",
    strengths: [
      "Unlimited logins and notes on the free plan",
      "Built-in hide-my-email aliases",
      "Open source, audited by Cure53 in 2023",
      "Apps for every major platform including Linux",
      "Ties into the wider Proton account",
    ],
    tradeoffs: [
      "Requires a Proton account",
      "Free plan limits the number of aliases",
      "Notes are simple, not a writing app",
      "Account recovery is limited by the zero-knowledge design",
    ],
    privacyNotes:
      "Proton says Pass encrypts vault items on your device, so Proton cannot read them. Cure53 audited the apps, browser extensions and API in 2023, and Proton reported fixing the findings except one Android issue it attributes to an OS limitation. An account is required. Set up a recovery method in your Proton account, because a password reset without one can cost you access to encrypted data.",
    features: {
      encryption: "yes",
      endToEnd: "yes",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "yes",
      noAccount: "no",
      adFree: "yes",
    },
    faq: [
      {
        q: "Is Proton Pass safe?",
        a: "Proton Pass is open source and was audited by Cure53 in 2023, covering the mobile apps, browser extensions and API. Vault items are end-to-end encrypted.",
      },
      {
        q: "Is Proton Pass free?",
        a: "Yes. The free plan includes unlimited logins and notes on unlimited devices, with a limited number of email aliases. Paid plans remove the alias limit.",
      },
      {
        q: "Proton Pass vs Bitwarden: which should I use?",
        a: "Both are open source and end-to-end encrypted with strong free plans. Proton Pass adds built-in email aliases. Bitwarden can be self-hosted and has a longer track record.",
      },
    ],
  },
  {
    slug: "joplin",
    name: "Joplin",
    developer: "Laurent Cozic",
    categories: ["private-notes"],
    platforms: ["Windows", "macOS", "Linux", "iOS", "Android"],
    website: "https://joplinapp.org/",
    openSource: true,
    pricing: {
      model: "Free",
      free: "All apps are free, including end-to-end encryption and sync through Dropbox, OneDrive, Nextcloud, WebDAV or S3.",
      paid: "Joplin Cloud is an optional paid sync service.",
    },
    bestFor: "Open-source notes with your own sync",
    standout: "Optional E2EE over Dropbox, OneDrive or Nextcloud",
    oneLiner:
      "Joplin is a free, open-source Markdown notes app that can sync through Dropbox, OneDrive, Nextcloud and others, with optional end-to-end encryption you turn on yourself.",
    whatItIs:
      "Joplin is a note-taking and to-do app that stores notes in Markdown and syncs them through a service you choose. End-to-end encryption is optional: once enabled, notes, notebooks, tags and attachments are encrypted before they reach the sync target.",
    howItWorks: [
      "Install Joplin on desktop and mobile. It works fully offline with no account. To sync, pick a target such as Dropbox, OneDrive, Nextcloud, WebDAV, S3 or the paid Joplin Cloud.",
      "Turn on encryption in the settings and set a master password on one device, then enter it on each other device. From then on, data is encrypted before upload.",
      "Joplin's encryption protects what goes to the sync target. Notes stored on each device are not encrypted by Joplin, so rely on your device's own encryption and lock screen.",
      "The mobile apps have an optional biometric lock. The desktop app has no built-in app lock.",
    ],
    whoFor:
      "People who want an open-source notes app and prefer to sync through storage they already control, like Nextcloud or Dropbox. It suits users comfortable with Markdown and a few setup steps.",
    pickIf: "You want free, open-source notes that work offline and sync with end-to-end encryption through a cloud you choose.",
    skipIf: "You want encryption on the device itself, not just in sync, or a built-in app lock on desktop.",
    strengths: [
      "Free and open source",
      "Works offline with no account",
      "Sync through Dropbox, OneDrive, Nextcloud, WebDAV, S3 or Joplin Cloud",
      "Optional E2EE covers notes, notebooks, tags and attachments",
      "Biometric lock on mobile",
    ],
    tradeoffs: [
      "Encryption is optional, so you have to check it is enabled",
      "Local notes are not encrypted by Joplin itself",
      "No app lock on desktop",
      "Lost master password cannot be recovered",
    ],
    privacyNotes:
      "With encryption enabled, Joplin encrypts notes, notebooks, tags and attachments before sending them to your sync target, so the storage provider can't read them. Notes on each device are stored unencrypted by Joplin, so device encryption and a screen lock matter. No account is needed for local use. Joplin's documentation warns the master password cannot be recovered.",
    features: {
      encryption: "partial",
      endToEnd: "yes",
      biometric: "partial",
      decoy: "no",
      intruderAlert: "no",
      disguise: "no",
      cloudBackup: "partial",
      noAccount: "yes",
      adFree: "yes",
    },
    faq: [
      {
        q: "Is Joplin end-to-end encrypted?",
        a: "It can be. End-to-end encryption is a setting you enable. Once it is on, notes, notebooks, tags and attachments are encrypted before they go to your sync target.",
      },
      {
        q: "Does Joplin encrypt notes on my computer?",
        a: "Joplin's encryption protects synced data. Notes stored locally are not encrypted by Joplin, so use full-disk encryption such as BitLocker, FileVault or LUKS.",
      },
      {
        q: "Can I lock Joplin with a password or fingerprint?",
        a: "The iOS and Android apps have an optional biometric lock. The desktop app has no built-in app lock.",
      },
      {
        q: "What happens if I forget my Joplin master password?",
        a: "Joplin says it cannot be recovered. Without it, your encrypted synced data can't be decrypted, so store it in a password manager.",
      },
    ],
  },
];
