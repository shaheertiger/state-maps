import type { App } from "../types";

export const appLockers: App[] = [
  // 1. AppLock (DoMobile)
  {
    slug: "applock-domobile",
    name: "AppLock",
    storeName: "AppLock",
    developer: "PIPS Tech",
    categories: ["app-lock"],
    platforms: ["Android"],
    pricing: {
      model: "Freemium",
      free: "App locking, photo and video hiding, random PIN keyboard, with ads",
      paid: "Optional in-app purchases. The listing doesn't spell out exactly what they unlock.",
    },
    bestFor: "Locking any Android app quickly",
    standout: "Can hide its own icon and block uninstalls",
    oneLiner:
      "AppLock is a long-running free Android app locker that puts a PIN or pattern screen in front of chosen apps and can hide photos and videos from your gallery.",
    whatItIs:
      "AppLock is one of the oldest app lockers on Google Play, long known as DoMobile's AppLock. The listing now names PIPS Tech as the developer. It puts a PIN or pattern screen in front of any app you pick, including Settings and incoming calls, and has a vault that hides pictures and videos from the Gallery.",
    howItWorks: [
      "You install it, set a PIN or pattern, and tick the apps you want locked. When one of those apps opens, AppLock shows its own unlock screen on top. The app itself is not changed or encrypted.",
      "Two options make the lock harder to watch over your shoulder: a random keyboard that shuffles the digits and an invisible pattern that doesn't draw a line as you swipe.",
      "To stop someone from simply uninstalling it, you turn on Advanced Protection, which makes AppLock a device administrator. The developer also asks for Accessibility access so it can detect app launches instantly, especially after a restart.",
      "You can hide the AppLock icon. The developer lists several ways back in: a share option in the Gallery, a home screen widget, a dial pad code, or opening a special web link.",
    ],
    whoFor:
      "AppLock fits people who share or lend an Android phone and want a quick barrier in front of chat apps, the Gallery or Settings. It also suits parents who want to stop kids from changing settings or buying things in games.",
    pickIf: "You want a simple, free lock screen in front of specific Android apps and don't mind ads.",
    skipIf:
      "You need real encryption, or a lock that a tech-savvy person can't get around through safe mode or a factory reset.",
    strengths: [
      "Locks almost any app, plus Settings and incoming calls",
      "Random keyboard and invisible pattern reduce shoulder surfing",
      "Advanced Protection blocks uninstalling without the password",
      "Icon can be hidden, with several documented ways back in",
      "Password reset by security question or security email",
    ],
    tradeoffs: [
      "Free version shows ads",
      "Overlay lock only: the locked apps' data is not encrypted",
      "Needs Accessibility and device administrator access for full protection",
      "Like other Android lockers, it doesn't run in safe mode",
    ],
    privacyNotes:
      "AppLock works on your phone and doesn't require an account; password recovery uses a security question or email. The Google Play data safety section says the app may collect personal info and app activity, encrypts data in transit, and lets you request deletion. The lock itself is a screen overlay, so it adds no encryption to the apps it protects. Move files out of the vault before you uninstall the app.",
    features: {
      encryption: "unknown",
      endToEnd: "no",
      biometric: "unknown",
      decoy: "unknown",
      intruderAlert: "unknown",
      disguise: "yes",
      cloudBackup: "unknown",
      noAccount: "yes",
      adFree: "no",
    },
    faq: [
      {
        q: "Is AppLock by DoMobile safe?",
        a: "It's a widely used app on Google Play, but it asks for powerful permissions: Accessibility to see which app is open and device administrator to block uninstalls. The developer says Accessibility is only used to detect app launches. Treat it as a privacy screen, not as encryption.",
      },
      {
        q: "How do I open AppLock if I hid the icon?",
        a: "The developer lists four ways: share a picture from the Gallery and choose Open AppLock, add the Open AppLock widget, dial *#*#12345#*#* on the dial pad, or open domobile.com/applock in a browser.",
      },
      {
        q: "What if I forget my AppLock password?",
        a: "Tap the icon at the top right of the lock screen and choose Forgot password. You can reset it with your security answer or a code sent to your security email, so set those up early.",
      },
      {
        q: "Can someone uninstall AppLock to get into my apps?",
        a: "Yes, unless Advanced Protection is on. That setting makes AppLock a device administrator so it can't be uninstalled or stopped without the password. It still can't stop a factory reset or safe mode.",
      },
    ],
  },

  // 2. Norton App Lock (discontinued)
  {
    slug: "norton-app-lock",
    discontinued: "June 2024",
    name: "Norton App Lock",
    developer: "Norton (Gen Digital)",
    categories: ["app-lock"],
    platforms: ["Android"],
    pricing: {
      model: "Free",
      free: "Was free with no premium tier. No longer available to download.",
      paid: "None. Norton says there is no paid version and no replacement app.",
    },
    bestFor: "People who still have it installed",
    standout: "Discontinued: support ended June 11, 2024",
    oneLiner:
      "Norton App Lock was a free Android app locker from Norton. It was retired in June 2024, removed from Google Play, and no longer gets updates.",
    whatItIs:
      "Norton App Lock was a free Android app that added a passcode or pattern lock to apps that don't have one. Norton announced its end of life and stopped support on June 11, 2024. It is no longer listed on Google Play, and Norton says there is no replacement.",
    howItWorks: [
      "At launch it worked like most Android lockers. You turned on its Accessibility service, activated it as a device administrator, set a 4-digit passcode (pattern lock came in a later update) and linked an email address for passcode resets.",
      "You then chose apps from a Recommended list or the full app list. Locked apps showed Norton's unlock screen before opening.",
      "Since June 11, 2024, Norton no longer updates or supports it. Norton says an installed copy may keep working, but if you uninstall it you can't reinstall it.",
    ],
    whoFor:
      "This page is mainly for people who still have Norton App Lock on their phone or are searching for it. If you want a new app locker, choose a maintained option such as Android Private Space, your phone maker's built-in App lock, or an actively updated app.",
    pickIf: "You already have it installed and only need a basic lock until you move to something maintained.",
    skipIf:
      "You need an app you can install today, security updates, or support for new Android versions.",
    strengths: [
      "Was free, with no premium tier",
      "Simple setup with recommended apps to lock",
      "Passcode reset through a linked email address",
      "Backed by a large security company while it was active",
    ],
    tradeoffs: [
      "Discontinued: no updates, fixes or support since June 2024",
      "Not available on Google Play, and can't be reinstalled once removed",
      "Overlay lock only, with no encryption",
      "Older apps can break on new Android versions without warning",
    ],
    privacyNotes:
      "Norton App Lock was an overlay lock: it hid apps behind a passcode screen but didn't encrypt anything. It relied on Accessibility and device administrator permissions. Because it no longer receives updates, any flaws found later won't be fixed, so moving to a maintained tool is the safer choice.",
    features: {
      encryption: "no",
      endToEnd: "no",
      biometric: "unknown",
      decoy: "unknown",
      intruderAlert: "unknown",
      disguise: "unknown",
      cloudBackup: "no",
      noAccount: "unknown",
      adFree: "unknown",
    },
    faq: [
      {
        q: "Is Norton App Lock still available?",
        a: "No. Norton discontinued it and ended support on June 11, 2024. It was removed from the Google Play Store after that date.",
      },
      {
        q: "Does Norton App Lock still work?",
        a: "Norton says an installed copy may continue to work, but you won't get support or updates. If you uninstall it, you can't reinstall it.",
      },
      {
        q: "What can I use instead of Norton App Lock?",
        a: "Norton says there is no replacement. On Android 15 or later, Private Space is a built-in option. Samsung phones have Secure Folder, Xiaomi phones have App lock, and Google Play has maintained third-party lockers.",
      },
    ],
  },

  // 3. iOS Lock and Hide Apps
  {
    slug: "ios-lock-and-hide-apps",
    name: "iPhone Lock and Hide Apps",
    developer: "Apple",
    categories: ["app-lock", "hide-apps"],
    platforms: ["iOS"],
    builtIn: true,
    website: "https://support.apple.com/guide/iphone/lock-or-hide-an-app-iph00f208d05/ios",
    pricing: {
      model: "Built-in",
      free: "Included in iOS 18 and later at no cost",
      paid: "None",
    },
    bestFor: "Locking and hiding iPhone apps",
    standout: "Hidden folder locked with Face ID",
    oneLiner:
      "Since iOS 18, you can lock any iPhone app with Face ID, Touch ID or your passcode, and hide App Store apps in a locked Hidden folder in App Library.",
    whatItIs:
      "Apple's built-in app lock arrived in iOS 18. Touch and hold an app, choose Require Face ID (or Touch ID or Passcode), and the app asks you to authenticate every time it opens. For apps you downloaded from the App Store, you can also choose Hide and Require Face ID, which moves the app into a locked Hidden folder.",
    howItWorks: [
      "To lock an app: touch and hold its icon on the Home Screen, tap Require Face ID (or Touch ID or Passcode), then tap Require Face ID again. The app relocks every time you quit it.",
      "To hide an app: in the same menu, tap Hide and Require Face ID, authenticate, then tap Hide App. The app leaves the Home Screen and search results and moves to the Hidden folder at the bottom of App Library. Opening that folder requires authentication. You can also see a list in Settings > Apps > Hidden Apps.",
      "Content from a locked app stays out of notification previews, search, Siri suggestions, CarPlay and call history. Apple notes that only apps you downloaded from the App Store can be hidden. Preinstalled apps can be locked but not hidden, and neither can your default browser or (in the EU) your default app marketplace.",
      "Lock and hide settings apply only to that iPhone. They don't sync through iCloud to your iPad or another device.",
    ],
    whoFor:
      "This is the right starting point for almost every iPhone owner on iOS 18 or later. It covers the classic case of handing your phone to a friend or child without exposing Messages, Photos or a dating app.",
    pickIf: "You want a free, Apple-supported lock that uses Face ID and doesn't need a third-party app.",
    skipIf:
      "You need protection from someone who knows your iPhone passcode, since the passcode opens every locked app and the Hidden folder.",
    strengths: [
      "Free, built in, nothing to install",
      "Works with Face ID, Touch ID or the device passcode",
      "Hides App Store apps from the Home Screen, App Library and search",
      "Keeps locked app content out of notifications and Siri suggestions",
      "No ads, no account, no extra permissions",
    ],
    tradeoffs: [
      "Anyone who knows your passcode can open locked and hidden apps",
      "Preinstalled Apple apps can be locked but not hidden",
      "The Hidden folder is visible in App Library, even though its contents are locked",
      "Doesn't hide the app from your App Store purchase history",
      "Requires iOS 18 or later",
    ],
    privacyNotes:
      "This feature uses the same Face ID, Touch ID and passcode that unlock your iPhone. It doesn't add encryption of its own; your iPhone's standard data protection already encrypts storage when the phone is locked. The locked or hidden status stays on the device and doesn't sync with iCloud. Children under 13 in a Family Sharing group can't lock or hide apps, and parents of teens 13 to 17 can still see that an app was downloaded and how long it's used.",
    features: {
      encryption: "no",
      endToEnd: "no",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "no",
      disguise: "yes",
      cloudBackup: "no",
      noAccount: "yes",
      adFree: "yes",
    },
    faq: [
      {
        q: "Can someone see hidden apps on iPhone?",
        a: "Not without authenticating. Hidden apps disappear from the Home Screen, App Library and search, and the Hidden folder at the bottom of App Library asks for Face ID, Touch ID or your passcode. Anyone who knows your passcode can still open it.",
      },
      {
        q: "Why can't I hide some apps on my iPhone?",
        a: "Apple only lets you hide apps you downloaded from the App Store. Apps that came with the iPhone can be locked but not hidden. Your default web browser and, in the EU, your default app marketplace can't be hidden either.",
      },
      {
        q: "How do I find hidden apps on my iPhone?",
        a: "Swipe left past your last Home Screen page to App Library, tap the Hidden folder at the bottom and authenticate. You can also go to Settings > Apps > Hidden Apps to see the list.",
      },
      {
        q: "Does locking an app on iPhone also lock it on my iPad?",
        a: "No. Locked and hidden status applies only to the device where you set it and doesn't sync through iCloud.",
      },
    ],
  },

  // 4. Android Private Space
  {
    slug: "android-private-space",
    name: "Android Private Space",
    developer: "Google",
    categories: ["hide-apps", "app-lock", "photo-vault"],
    platforms: ["Android"],
    builtIn: true,
    website: "https://support.google.com/android/answer/15341885",
    pricing: {
      model: "Built-in",
      free: "Included in Android 15 and later on supported phones",
      paid: "None",
    },
    bestFor: "Truly separating private Android apps",
    standout: "Locked apps are fully stopped, not just covered",
    oneLiner:
      "Private Space is Android 15's built-in hidden profile: apps inside it run separately, stop completely when it's locked, and can be hidden from the app drawer.",
    whatItIs:
      "Private Space is a separate, lockable area for apps that Google added in Android 15. Apps installed there are separate copies with their own data, and they can use a different Google account. When the space is locked, its apps stop running and can be hidden from the All Apps list entirely.",
    howItWorks: [
      "Go to Settings > Security & privacy > Private space, confirm your screen lock, tap Set up, and choose whether to sign in with a Google account (optional). Then pick a lock: reuse your screen lock or set a separate PIN, pattern or password.",
      "The space shows up at the bottom of All Apps. Install apps into it from its own Play Store, or move files into its private Downloads folder. You can't move an existing app and its data from your main profile; you install a fresh copy instead.",
      "Choose when it locks: every time the phone locks, 5 minutes after the screen times out, or only after a restart. You can also turn on the option to hide it when locked, so the container disappears from All Apps until you unlock it.",
      "While locked, private apps can't show notifications, run in the background or use sensors. When unlocked, their notifications appear with a private space icon.",
    ],
    whoFor:
      "Private Space suits Android 15+ owners who want a sensitive set of apps, such as a second messaging account, banking or dating apps, kept fully apart from the main phone. It is the strongest free option on Pixel and other phones that support it.",
    pickIf: "You want hidden apps that actually stop running when locked, with an optional separate Google account.",
    skipIf:
      "You need your private apps' data backed up, or you rely on widgets, Quick Share or voice commands inside those apps.",
    strengths: [
      "Real separation: separate app copies, data and optional account",
      "Apps stop completely when the space is locked",
      "Can be hidden from All Apps while locked",
      "Separate lock from your screen lock, with auto-lock options",
      "Free, built in, no ads",
    ],
    tradeoffs: [
      "Android 15 or later only, and some manufacturers disable it",
      "Private app data isn't included in device backups",
      "Forget a separate private space lock and the data is gone; there's no recovery",
      "No widgets, shortcuts, Quick Share receiving, Find Hub or voice commands inside it",
      "Private space apps bypass the device VPN",
    ],
    privacyNotes:
      "Private Space runs as a separate Android profile, so its apps and files are stored apart from your main profile and its apps shut down when it's locked. Signing in to a Google account is optional, and Google recommends a dedicated account. On-device private data isn't backed up and isn't restored from device backups, though apps that sync to their own cloud can be restored by signing back in. Google notes the space can't be hidden from people with computer access (including adb), from device logs, or from apps that detect it.",
    features: {
      encryption: "yes",
      endToEnd: "no",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "no",
      disguise: "yes",
      cloudBackup: "no",
      noAccount: "yes",
      adFree: "yes",
    },
    faq: [
      {
        q: "Which phones have Private Space?",
        a: "Phones running Android 15 or later, when the manufacturer hasn't disabled it. It works only for the main user, not guest or secondary users, and not on managed devices or devices with a supervised account. Some launchers don't support it.",
      },
      {
        q: "What happens if I forget my Private Space PIN?",
        a: "There's no way to recover it. You can delete the space from Settings > System > Reset options > Delete private space using your device PIN, which removes its apps and data permanently.",
      },
      {
        q: "Is Private Space backed up?",
        a: "No. Data stored in Private Space isn't included in device backups. Only data that individual apps sync to their own servers can come back when you sign in again.",
      },
      {
        q: "Can someone tell I have a Private Space?",
        a: "If you turn on the hide option, the space disappears from All Apps when locked. Search may show a Private space entry on any phone, set up or not, so that alone doesn't reveal it. Someone with computer access or certain apps could still detect it.",
      },
    ],
  },

  // 5. Samsung Secure Folder
  {
    slug: "samsung-secure-folder",
    name: "Samsung Secure Folder",
    developer: "Samsung",
    categories: ["hide-apps", "app-lock", "photo-vault"],
    platforms: ["Android"],
    builtIn: true,
    website: "https://www.samsung.com/us/support/answer/ANS10001401/",
    pricing: {
      model: "Built-in",
      free: "Included on supported Samsung Galaxy phones and tablets",
      paid: "None",
    },
    bestFor: "Galaxy owners hiding apps and files",
    standout: "Separate Knox-protected space for apps and files",
    oneLiner:
      "Secure Folder is Samsung's built-in private space on Galaxy phones and tablets: a separate, locked area for app copies, photos and files that can be hidden or renamed.",
    whatItIs:
      "Secure Folder is a private, locked area built into supported Samsung Galaxy phones and tablets, protected by Samsung's Knox security platform. You can add copies of apps, move photos and files into it, and give it its own PIN, password, pattern or fingerprint. It can be hidden from the Apps screen or disguised with a different name and icon.",
    howItWorks: [
      "Open Settings > Security and privacy > More security settings > Secure Folder (menu names vary by model and One UI version). Tap Continue, sign in to your Samsung account if asked, and set a PIN, password or pattern. Samsung recommends turning on Reset with Samsung account so you can recover access if you forget the code.",
      "Tap the plus sign to add apps; each one is a separate copy with its own data and logins. To move a photo or file in, touch and hold it in Gallery or My Files, then tap More > Move to Secure Folder.",
      "To hide it, tap the Secure Folder tile in Quick Settings or turn off Add Secure Folder to Apps screen. You can also change its name, color and icon from inside the folder.",
      "Settings let you choose when it auto-locks and whether its apps can show notifications while it's locked.",
    ],
    whoFor:
      "Secure Folder fits Samsung Galaxy owners who want a second, locked set of apps and a private place for photos and documents. It's also useful for running two accounts of the same app.",
    pickIf: "You own a supported Galaxy phone or tablet and want app hiding and a file vault in one free place.",
    skipIf:
      "You need cloud backup of the folder's contents, or access from a computer or the web.",
    strengths: [
      "Separate app copies, so you can run two accounts of one app",
      "Holds photos, videos and documents as well as apps",
      "Can be hidden or renamed with a custom icon",
      "PIN, password, pattern or fingerprint unlock on supported devices",
      "Optional notifications from locked apps",
    ],
    tradeoffs: [
      "Samsung only, and not every Galaxy model supports it",
      "Samsung no longer supports new Secure Folder backups; you can only restore old ones",
      "Without Reset with Samsung account, a forgotten passcode means losing access",
      "Files stored in a cloud account can't be moved in",
      "Only accessible on the phone or tablet itself",
    ],
    privacyNotes:
      "Secure Folder runs as a separate, Knox-protected space with its own lock, and its contents stay on the device. It can't be opened from the web or a computer. Samsung has dropped new backups for Secure Folder, so photos and files kept only there can be lost if the phone breaks or you uninstall Secure Folder, which deletes everything inside. Depending on your One UI version, setup may ask you to sign in to a Samsung account, which is also what powers the passcode reset option.",
    features: {
      encryption: "yes",
      endToEnd: "no",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "no",
      disguise: "yes",
      cloudBackup: "no",
      noAccount: "unknown",
      adFree: "yes",
    },
    faq: [
      {
        q: "Is Secure Folder safe?",
        a: "It's one of the stronger options on Android because it's a separate, locked space built on Samsung Knox rather than a screen overlay. The main risks are a weak or shared passcode and losing data, since new backups are no longer supported.",
      },
      {
        q: "What happens if I forget my Secure Folder password?",
        a: "If you turned on Reset with Samsung account, you can reset it through your Samsung account. If you didn't, Samsung says you won't be able to get back into the folder.",
      },
      {
        q: "Which Samsung phones have Secure Folder?",
        a: "Most Galaxy phones and tablets have it; it has come preloaded since the Galaxy S8. If your device doesn't support it, the option won't appear under Security and privacy.",
      },
      {
        q: "How do I hide Secure Folder?",
        a: "Swipe down with two fingers and tap the Secure Folder tile in Quick Settings, or turn off Add Secure Folder to Apps screen in its settings. Tap the tile again to bring it back.",
      },
    ],
  },

  // 6. Niagara Launcher
  {
    slug: "niagara-launcher",
    name: "Niagara Launcher",
    storeName: "Niagara Launcher ‧ Home Screen",
    developer: "Mellowdrop Studio",
    categories: ["hide-apps"],
    platforms: ["Android"],
    website: "https://niagaralauncher.com",
    pricing: {
      model: "Freemium",
      free: "Full launcher with app hiding, no ads",
      paid: "Optional Niagara Pro (subscription or lifetime purchase) for themes, icon packs, widget stacks and more",
    },
    bestFor: "Decluttering the app list",
    standout: "Ad-free minimalist launcher with app hiding",
    oneLiner:
      "Niagara Launcher is a minimalist Android home screen that can hide apps from its app list, but hidden apps still appear in its search and there's no password lock.",
    whatItIs:
      "Niagara is a popular minimalist launcher, the app that replaces your Android home screen and app drawer. One of its free features is hiding apps from the app list. It's built for a tidy home screen, not for security.",
    howItWorks: [
      "After you set Niagara as your default home app, you can hide an app from the app list. To manage hidden apps later, go to Home settings > Hidden apps, touch and hold an app and choose to show it again.",
      "Hidden apps are only hidden inside Niagara's list. Niagara's help center says it has no option to remove hidden apps from its search results, so typing the name still finds them.",
      "For real hiding, Niagara's own help pages suggest renaming the app and changing its icon, or using Android 15's Private Space.",
    ],
    whoFor:
      "Niagara suits people who want a cleaner, calmer home screen and want to tuck away apps they rarely use. It's a decent first layer against a casual glance, not against someone who looks.",
    pickIf: "You want a clean, ad-free launcher and only need apps out of sight in the app list.",
    skipIf:
      "You need a password on hidden apps, or need them gone from search and system settings.",
    strengths: [
      "Hiding apps is free",
      "No ads, even in the free version",
      "Clean, one-handed design",
      "Works alongside Android 15 Private Space",
    ],
    tradeoffs: [
      "No PIN or fingerprint lock on hidden apps",
      "Hidden apps still show up in Niagara's search",
      "Apps reappear if you switch launchers or open Settings > Apps",
      "Not a security tool",
    ],
    privacyNotes:
      "Niagara changes only what its own home screen shows, so hidden apps are still installed, still send notifications and are visible in Android Settings and the Play Store. It doesn't encrypt or lock anything. Its optional Accessibility service is used only for the double-tap-to-lock-screen gesture, and the developer says it collects no data through it.",
    features: {
      encryption: "no",
      endToEnd: "no",
      biometric: "no",
      decoy: "no",
      intruderAlert: "no",
      disguise: "partial",
      cloudBackup: "unknown",
      noAccount: "yes",
      adFree: "yes",
    },
    faq: [
      {
        q: "Can Niagara Launcher lock apps with a password?",
        a: "No. Niagara can hide apps from its app list, but it has no PIN, pattern or fingerprint lock. Use Android Private Space or a dedicated app locker for that.",
      },
      {
        q: "Do hidden apps show up in Niagara search?",
        a: "Yes. Niagara's help center says there is no option to remove hidden apps from its search results. It suggests renaming the app or using Private Space instead.",
      },
      {
        q: "How do I unhide apps in Niagara Launcher?",
        a: "Go to Home settings > Hidden apps, touch and hold the app and choose to show it again.",
      },
    ],
  },

  // 7. Smart Launcher 6
  {
    slug: "smart-launcher",
    name: "Smart Launcher 6",
    storeName: "Smart Launcher 6 ‧ Home Screen",
    developer: "Smart Launcher Team",
    categories: ["hide-apps", "app-lock"],
    platforms: ["Android"],
    website: "https://www.smartlauncher.net",
    pricing: {
      model: "Freemium",
      free: "Full launcher with hidden apps, no ads on the Google Play listing",
      paid: "Optional premium upgrade for extra customization",
    },
    bestFor: "Hiding apps behind a PIN",
    standout: "Hidden apps section protected by PIN or fingerprint",
    oneLiner:
      "Smart Launcher 6 is an Android launcher that can hide apps from its drawer and search and lock the hidden section with a PIN or fingerprint.",
    whatItIs:
      "Smart Launcher 6 is a long-running Android home screen replacement that sorts apps into categories automatically. It includes a hidden apps section you can protect with a PIN or fingerprint, so it works as a light app hider and locker at once.",
    howItWorks: [
      "Open the app drawer, touch and hold an app and select Hide. The first time, Smart Launcher prompts you to set a PIN for the hidden section.",
      "To open hidden apps, open the drawer, tap the menu button and select Hidden Apps, then unlock with your PIN or fingerprint. You can change the PIN later under Security and Privacy in Smart Launcher's preferences.",
      "Hidden apps are also left out of Smart Launcher's search results, which closes the gap that many launchers leave open.",
    ],
    whoFor:
      "Smart Launcher fits people who want a new home screen anyway and want a few apps out of sight and behind a PIN. It's handy on phones that don't have a built-in app hider.",
    pickIf: "You want hidden apps removed from both the drawer and search, behind a PIN, without a separate locker app.",
    skipIf:
      "You need the apps themselves locked when opened from notifications or Settings, or real separation like Private Space.",
    strengths: [
      "Hidden section locked with PIN or fingerprint",
      "Hidden apps don't appear in launcher search",
      "No ads listed on Google Play",
      "Automatic app categories keep the drawer tidy",
    ],
    tradeoffs: [
      "Protection only works inside Smart Launcher",
      "Hidden apps are still visible in Settings > Apps and the Play Store",
      "Switching to another launcher shows them again",
      "Not clear from public info which features need premium",
    ],
    privacyNotes:
      "Smart Launcher hides apps only from its own home screen, drawer and search; the apps remain installed and can still send notifications. The PIN protects the hidden section, not the apps' data, and nothing is encrypted. Its optional Accessibility permission is used for gestures like turning off the screen, and the developer says it collects no data through it.",
    features: {
      encryption: "no",
      endToEnd: "no",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "no",
      disguise: "yes",
      cloudBackup: "unknown",
      noAccount: "yes",
      adFree: "yes",
    },
    faq: [
      {
        q: "How do I see hidden apps in Smart Launcher?",
        a: "Open the app drawer, tap the menu button and select Hidden Apps. If you set a PIN, you'll need to enter it or use your fingerprint.",
      },
      {
        q: "Do hidden apps show in Smart Launcher search?",
        a: "No. According to the developer, hidden apps are left out of search results.",
      },
      {
        q: "Do hidden apps stay hidden if I change launchers?",
        a: "No. Hiding is a Smart Launcher setting. If you switch to another launcher or open Settings > Apps, the apps are visible again.",
      },
    ],
  },

  // 8. iOS Screen Time workaround
  {
    slug: "ios-screen-time",
    name: "iPhone Screen Time (App Lock Workaround)",
    developer: "Apple",
    categories: ["app-lock"],
    platforms: ["iOS"],
    builtIn: true,
    pricing: {
      model: "Built-in",
      free: "Included in iOS",
      paid: "None",
    },
    bestFor: "Older iPhones without app lock",
    standout: "Passcode-gated time limits on chosen apps",
    oneLiner:
      "Screen Time can act as a rough app lock by setting a tiny time limit and a Screen Time passcode, but it was built for usage limits and is easy for the owner to bypass.",
    whatItIs:
      "Screen Time is Apple's tool for tracking and limiting device use. Before iOS 18 added a real app lock, people used it as a workaround: give an app a one-minute daily limit, set a Screen Time passcode, and the app is blocked until someone enters the code. It still works for kids' devices and self-control, but it's a clumsy privacy tool.",
    howItWorks: [
      "On iOS 26 and earlier, the usual method is Settings > Screen Time > App Limits > Add Limit, choose the apps, set the limit to 1 minute, and turn on Block at End of Limit. Set a Screen Time passcode that's different from your iPhone passcode, or anyone who knows one knows both.",
      "When the limit runs out, the app shows a time limit screen. Getting more time requires the Screen Time passcode, although the screen also offers a short one-minute extension.",
      "iOS 27 reorganized Screen Time into Schedules and Time Allowances built around app categories, so the menu names differ. The idea is the same: limit time and protect the settings with a Screen Time passcode.",
    ],
    whoFor:
      "This fits parents managing a child's iPhone and people who want friction against their own habits. For privacy on iOS 18 or later, Apple's Require Face ID lock is the better tool.",
    pickIf: "You're on an iPhone that can't run iOS 18, or you want time limits rather than privacy.",
    skipIf:
      "You need a real lock that hides content and asks for Face ID every time an app opens.",
    strengths: [
      "Free and built into every recent iPhone",
      "Separate Screen Time passcode from the device passcode",
      "Can be managed remotely for a child through Family Sharing",
      "Also limits whole categories like games or social media",
    ],
    tradeoffs: [
      "A workaround, not an app lock: the app opens normally until the limit runs out",
      "The limit screen allows a short extension without the passcode",
      "The device owner, or anyone with the Screen Time passcode, can turn it off",
      "Menu layout changed in iOS 27",
    ],
    privacyNotes:
      "Screen Time doesn't hide or encrypt anything; it only limits time in apps. With Share Across Devices on, limits and usage data sync across your Apple devices signed in to the same Apple Account. If you forget your Screen Time passcode, Apple offers a reset using your Apple Account. For privacy on iOS 18 or later, use Require Face ID instead.",
    features: {
      encryption: "no",
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
        q: "Can you lock an app with Screen Time?",
        a: "Sort of. Set a one-minute limit with Block at End of Limit and a Screen Time passcode, and the app is blocked after that minute until someone enters the code. It's a workaround, not a true lock.",
      },
      {
        q: "Can Screen Time limits be bypassed?",
        a: "Yes, easily by the device owner. Anyone with the Screen Time passcode can extend or remove the limit, the limit screen offers a short extension, and the owner can turn Screen Time off.",
      },
      {
        q: "Is Screen Time better than Require Face ID for locking apps?",
        a: "No, not for privacy. Require Face ID, added in iOS 18, locks an app from the first second and keeps its content out of notifications and search. Screen Time is better for limiting time, especially on a child's device.",
      },
    ],
  },

  // 9. LOCKit
  {
    slug: "lockit",
    name: "LOCKit",
    storeName: "LOCKit: App Lock, Photos Vault",
    developer: "SuperTools Corporation",
    categories: ["app-lock"],
    platforms: ["Android"],
    pricing: {
      model: "Free",
      free: "App lock, photo and video vault, intruder selfie, fingerprint unlock, with ads",
      paid: "No in-app purchases listed on Google Play",
    },
    bestFor: "Free locker with intruder selfies",
    standout: "Intruder selfie plus fake cover lock screen",
    oneLiner:
      "LOCKit is a free, ad-supported Android app locker with a photo and video vault, fingerprint unlock, intruder selfies and a fake cover screen.",
    whatItIs:
      "LOCKit is a free Android app locker from SuperTools Corporation. Besides locking apps with a PIN, pattern or fingerprint, it bundles a photo and video vault, an intruder selfie, a notification lock that hides message previews, and a fake cover that disguises the lock screen.",
    howItWorks: [
      "You install it, grant the permissions it walks you through (it uses Android's Accessibility service), set a PIN or pattern and choose apps to lock. Fingerprint unlock works on Android 6.0 or later with a fingerprint sensor.",
      "When someone fails to unlock a protected app, Intruder Selfie can take a photo with the front camera. Fake Cover shows a disguised screen in place of the normal unlock prompt.",
      "You can also lock system settings and app install or uninstall, lock the Play Store, lock incoming calls, and turn on protection against LOCKit itself being uninstalled.",
    ],
    whoFor:
      "LOCKit suits people who want lots of locker features without paying and accept ads in return. It's aimed at the 'friend borrows my phone' scenario rather than serious threats.",
    pickIf: "You want intruder selfies, fingerprint unlock and a vault for free on Android.",
    skipIf:
      "You want an ad-free app with few trackers, or need encryption you can verify.",
    strengths: [
      "Free, with no paid tier required for core features",
      "Intruder selfie on failed unlock attempts",
      "Fingerprint unlock plus PIN or pattern",
      "Notification lock hides message previews",
      "Can lock app installs, uninstalls and system settings",
    ],
    tradeoffs: [
      "Ad-supported",
      "Google Play data safety says data isn't encrypted in transit and can't be deleted",
      "Exodus Privacy found many advertising and analytics trackers in an older version",
      "Overlay lock: protected apps aren't encrypted, and safe mode skips it",
      "Several unrelated apps use similar names, so check the developer",
    ],
    privacyNotes:
      "LOCKit's Google Play data safety section says it may collect personal info and photos and videos, that data isn't encrypted in transit, and that data can't be deleted. An Exodus Privacy scan of an older version found 13 trackers, including Google Firebase Analytics and the Pangle ad network. The app lock is a screen overlay and doesn't encrypt the apps it protects. Move vault files back out before uninstalling.",
    features: {
      encryption: "unknown",
      endToEnd: "no",
      biometric: "yes",
      decoy: "unknown",
      intruderAlert: "yes",
      disguise: "unknown",
      cloudBackup: "unknown",
      noAccount: "unknown",
      adFree: "no",
    },
    faq: [
      {
        q: "Is LOCKit safe to use?",
        a: "It works as a basic privacy screen, but weigh the trade-offs. It's ad-supported, its Play Store data safety section says data isn't encrypted in transit and can't be deleted, and an older version contained many trackers.",
      },
      {
        q: "Who makes LOCKit?",
        a: "Google Play lists SuperTools Corporation as the developer, with the package name com.ushareit.lockit. Several unrelated apps with similar names exist, so check the developer before installing.",
      },
      {
        q: "Does LOCKit take a photo of intruders?",
        a: "Yes. Intruder Selfie takes a front-camera photo when someone tries and fails to unlock a protected app.",
      },
    ],
  },

  // 10. Xiaomi App lock
  {
    slug: "xiaomi-app-lock",
    name: "Xiaomi App Lock",
    developer: "Xiaomi",
    categories: ["app-lock", "hide-apps"],
    platforms: ["Android"],
    builtIn: true,
    pricing: {
      model: "Built-in",
      free: "Included in HyperOS and MIUI on Xiaomi, Redmi and POCO phones",
      paid: "None",
    },
    bestFor: "Xiaomi, Redmi and POCO owners",
    standout: "Built-in lock plus hidden apps, no install",
    oneLiner:
      "Xiaomi's App lock is built into HyperOS and MIUI: it locks chosen apps with a PIN, pattern, password or fingerprint and can hide apps from the home screen.",
    whatItIs:
      "App lock is a system feature on Xiaomi, Redmi and POCO phones running HyperOS or MIUI. It asks for a password or biometrics before chosen apps open and can hide app icons. Because it's part of the system, you don't need a third-party locker or its permissions.",
    howItWorks: [
      "On most recent models, open Settings > Apps > App lock (some versions also place it in the Security app). Set a pattern, PIN or password the first time, then turn on the apps you want locked. Fingerprint unlock can be used where the phone supports it.",
      "Hidden apps are managed from the same area. On the Xiaomi system launcher, you typically reveal them by spreading two fingers apart on the home screen, then entering your App lock password.",
      "You can also hide notification content for locked apps so message previews don't show on screen.",
      "Menu names and paths vary between MIUI and HyperOS versions and by region, so look for App lock with the Settings search if the path differs.",
    ],
    whoFor:
      "App lock fits anyone with a Xiaomi, Redmi or POCO phone who wants a few apps locked or hidden without installing anything. It covers the common 'someone borrows my phone' case well.",
    pickIf: "You have a Xiaomi, Redmi or POCO phone and want a free, ad-free lock that's part of the system.",
    skipIf:
      "You need separate app copies and storage, or encryption beyond the phone's normal protection.",
    strengths: [
      "Built in, free and ad-free",
      "Locks apps and hides them in one place",
      "Fingerprint unlock on supported phones",
      "Can hide notification previews for locked apps",
      "No third-party Accessibility permissions",
    ],
    tradeoffs: [
      "Only on Xiaomi, Redmi and POCO phones",
      "Menu paths change between MIUI and HyperOS versions",
      "Locks the app's screen, but doesn't separate or encrypt its data",
      "The pinch gesture to reveal hidden apps depends on the Xiaomi launcher",
    ],
    privacyNotes:
      "App lock runs on the phone and needs no app download. It adds a lock in front of apps but doesn't create a separate encrypted space; the phone's normal storage encryption is what protects data. Setup may suggest linking a Xiaomi account to help recover a forgotten App lock password, so set that up if you want a way back in.",
    features: {
      encryption: "no",
      endToEnd: "no",
      biometric: "yes",
      decoy: "no",
      intruderAlert: "unknown",
      disguise: "yes",
      cloudBackup: "no",
      noAccount: "yes",
      adFree: "yes",
    },
    faq: [
      {
        q: "How do I find hidden apps on a Xiaomi phone?",
        a: "On the Xiaomi system launcher, spread two fingers apart on the home screen to open the hidden apps folder, then enter your App lock password. You can also manage hidden apps from App lock in Settings.",
      },
      {
        q: "Can I lock apps on Xiaomi without downloading an app?",
        a: "Yes. App lock is built into HyperOS and MIUI. On most models it's in Settings > Apps > App lock; use the Settings search if your menu differs.",
      },
      {
        q: "Do Redmi and POCO phones have App lock?",
        a: "Redmi and POCO phones run Xiaomi's HyperOS or MIUI, so App lock is normally built in. The menu layout can vary by model and software version.",
      },
    ],
  },

  // 11. Bitdefender Mobile Security App Lock
  {
    slug: "bitdefender-app-lock",
    name: "Bitdefender App Lock",
    storeName: "Bitdefender Mobile Security",
    developer: "Bitdefender",
    categories: ["app-lock"],
    platforms: ["Android"],
    website: "https://www.bitdefender.com",
    pricing: {
      model: "Subscription",
      free: "14-day free trial of Bitdefender Mobile Security, which includes App Lock",
      paid: "Bitdefender Mobile Security subscription; App Lock is one feature of the security suite",
    },
    bestFor: "App lock inside an antivirus suite",
    standout: "Snap Photo captures people who try to unlock",
    oneLiner:
      "Bitdefender Mobile Security includes an App Lock that protects chosen Android apps with a PIN or biometrics and can photograph anyone who tries to get in.",
    whatItIs:
      "Bitdefender Mobile Security is a paid Android security app from a major antivirus company. Alongside malware scanning, web and scam protection and anti-theft, it includes App Lock, which puts a PIN or fingerprint check in front of apps you choose.",
    howItWorks: [
      "After installing and signing in, you turn on App Lock and pick the apps to protect. The same security PIN is used for App Lock and Anti-Theft, and you can change it in Settings under Security PIN CODE.",
      "Snap Photo uses the front camera to photograph someone who tries to open a protected app without the right PIN. Snapped photos can be viewed in your Bitdefender Central account.",
      "Smart Unlock lets you mark Wi-Fi networks, such as your home network, as trusted so App Lock doesn't ask for the PIN there.",
      "Bitdefender's FAQ says there's no single switch to turn App Lock off, but you can remove protection from individual apps after entering your PIN or fingerprint.",
    ],
    whoFor:
      "This fits people who want antivirus, scam protection and anti-theft anyway and would rather have one app than a separate locker. It's not worth paying for only to lock apps.",
    pickIf: "You want an ad-free app lock with intruder photos as part of a full mobile security suite.",
    skipIf:
      "You only need app locking, since free built-in options like Private Space or your phone's own App lock cover that.",
    strengths: [
      "No ads, from a well-known security company",
      "Fingerprint and PIN unlock",
      "Snap Photo of failed unlock attempts",
      "Smart Unlock on trusted Wi-Fi networks",
      "Comes with malware, scam and anti-theft protection",
    ],
    tradeoffs: [
      "Paid subscription after the 14-day trial",
      "Requires a Bitdefender account",
      "Overlay lock: protected apps aren't encrypted",
      "Needs broad permissions such as Accessibility and device admin for the full suite",
      "App Lock is for Android only",
    ],
    privacyNotes:
      "App Lock is part of Bitdefender Mobile Security, which works with a Bitdefender Central account. Snap Photo images can be viewed in Bitdefender Central, and you can turn off their display there. The app uses Accessibility, Device Admin and other permissions for its security features. Like other Android app lockers, App Lock covers apps with a lock screen and doesn't encrypt their data.",
    features: {
      encryption: "no",
      endToEnd: "no",
      biometric: "yes",
      decoy: "unknown",
      intruderAlert: "yes",
      disguise: "no",
      cloudBackup: "no",
      noAccount: "no",
      adFree: "yes",
    },
    faq: [
      {
        q: "Is Bitdefender App Lock free?",
        a: "Not long term. App Lock is part of Bitdefender Mobile Security, which offers a 14-day free trial and then needs a subscription. Bitdefender's separate free antivirus app is a different product.",
      },
      {
        q: "Does Bitdefender App Lock take photos of intruders?",
        a: "Yes. Snap Photo uses the front camera when someone tries to open a protected app without the PIN, and the photos can be viewed in Bitdefender Central.",
      },
      {
        q: "How do I turn off Bitdefender App Lock?",
        a: "Bitdefender says there's no switch to turn the feature off entirely, but you can remove protection from each app after confirming your PIN or fingerprint.",
      },
    ],
  },
];
