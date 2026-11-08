import type { Guide } from "../types";

export const guides: Guide[] = [
  // 1. Hide apps on iPhone
  {
    slug: "how-to-hide-apps-on-iphone",
    category: "hide-apps",
    title: "How to Hide Apps on iPhone (iOS 18 and Later, 2026 Guide)",
    description:
      "Hide apps on iPhone with the built-in Hidden folder in iOS 18 and later, plus quicker ways to clear your Home Screen and the places hidden apps still show up.",
    keyword: "how to hide apps on iphone",
    published: "2026-11-08",
    updated: "2026-11-08",
    answer:
      "On iOS 18 and later, touch and hold the app icon, tap Require Face ID, then tap Hide and Require Face ID, authenticate, and tap Hide App. The app moves to a locked Hidden folder at the bottom of the App Library. You can only hide apps you downloaded, not apps that come with iOS.",
    intro: [
      "Since iOS 18, iPhone has a real way to hide apps. A hidden app disappears from your Home Screen and goes into a Hidden folder that needs Face ID, Touch ID or your passcode to open.",
      "This guide covers the built-in method, two lighter options that just tidy your Home Screen, and the places a hidden app can still be seen. If you want a lock without hiding the app, see our guide on [how to lock apps on iPhone](/guides/how-to-lock-apps-on-iphone/).",
    ],
    sections: [
      {
        heading: "How to hide an app with the Hidden folder (iOS 18 and later)",
        body: [
          "This works on iOS 18, iOS 26 and later. Your iPhone needs a passcode set. Menu labels change depending on what you use to unlock, so you may see Touch ID or Passcode in place of Face ID.",
        ],
        steps: [
          {
            title: "Find the app",
            text: "Go to the Home Screen or the App Library and find the app you want to hide.",
          },
          {
            title: "Open the quick actions menu",
            text: "Touch and hold the app icon until the menu appears.",
          },
          {
            title: "Tap Require Face ID",
            text: "Tap Require Face ID (or Require Touch ID or Require Passcode).",
          },
          {
            title: "Choose Hide and Require Face ID",
            text: "Tap Hide and Require Face ID, then authenticate.",
          },
          {
            title: "Confirm",
            text: "Tap Hide App. The icon leaves the Home Screen and moves to the Hidden folder.",
          },
        ],
      },
      {
        heading: "How to find and unhide a hidden app",
        body: [
          "Hidden apps live in a folder called Hidden at the very bottom of the App Library. The folder is always there, even if you have hidden nothing, so its presence alone does not tell anyone you hid an app.",
        ],
        steps: [
          {
            title: "Open the App Library",
            text: "Swipe left past your last Home Screen page.",
          },
          {
            title: "Open the Hidden folder",
            text: "Scroll to the bottom, tap Hidden, and authenticate with Face ID, Touch ID or your passcode.",
          },
          {
            title: "Unhide the app",
            text: "Touch and hold the app, tap Don't Require Face ID (or the Touch ID or Passcode version), and authenticate. The app goes back to the App Library, and you can drag it to your Home Screen.",
          },
        ],
      },
      {
        heading: "Lighter options: remove an app from the Home Screen",
        body: [
          "If you only want an app off your main screen, and you do not need a lock, these older methods still work. Anyone can find the app in the App Library or Search, so treat them as tidying, not privacy.",
        ],
        bullets: [
          "Remove from Home Screen: touch and hold the app, tap Remove App, then tap Remove from Home Screen. The app stays installed in the App Library.",
          "Hide a whole page: touch and hold an empty spot on the Home Screen, tap the page dots at the bottom, and uncheck the page you want to hide.",
          "Keep it out of Search: in Settings > Apps > [app name], look for the Search or Siri options and turn off showing the app in Search. Labels vary by iOS version.",
        ],
      },
      {
        heading: "What hiding does and doesn't protect against",
        body: [
          "The Hidden folder stops someone who picks up your unlocked phone from casually seeing or opening an app. It is not invisible. Apple says a hidden app is still visible in other parts of iOS. If you want to tighten those other spots too, [VaultForYou](https://vaultforyou.app/) keeps a practical iPhone privacy database that walks through app controls, Siri and Search suggestions setting by setting.",
          "If you need the contents of an app to be private, not just its icon, use an app that encrypts its data. Our lists of the [best apps to hide apps](/best-apps-to-hide-apps/) and the [best photo vault apps](/best-photo-vault-apps/) explain which options actually encrypt.",
        ],
        bullets: [
          "Hidden app names still appear in Settings > Apps > Hidden Apps, Settings > Screen Time, and Settings > Battery > Battery Health & Charging.",
          "The app still appears in your App Store purchase history. You can hide it there separately: in the App Store, tap your profile picture, open your purchased apps, swipe left on the app and tap Hide.",
          "Anyone who knows your iPhone passcode can open the Hidden folder, because the passcode works as a fallback for Face ID.",
          "Hiding is per device. It does not sync to your iPad or other devices through iCloud.",
          "Expect to miss notifications from hidden apps, since iOS keeps their content out of notification previews.",
        ],
      },
      {
        heading: "Limits and troubleshooting",
        body: [
          "If you do not see Hide and Require Face ID, check these points first.",
        ],
        bullets: [
          "Built-in Apple apps can't be hidden. Apple says apps that come installed with iOS 18 or later can't be hidden, only apps you download.",
          "Your iPhone must run iOS 18 or later. Check in Settings > General > About.",
          "A passcode must be set. Go to Settings > Face ID & Passcode (or Touch ID & Passcode).",
          "In a Family Sharing group, children under 13 can't hide apps. Teens aged 13 to 17 can, but a parent can still see the app was downloaded and how long it was used in Screen Time.",
          "Third-party \"hide app\" apps on the App Store can't hide other apps. iOS doesn't allow it. They usually work as vaults for their own photos or notes instead, like the ones in our [calculator vault apps](/best-calculator-vault-apps/) list.",
        ],
      },
    ],
    faq: [
      {
        q: "Can you hide apps on iPhone without deleting them?",
        a: "Yes. On iOS 18 and later, use Hide and Require Face ID to move the app to the locked Hidden folder. On any version, Remove from Home Screen keeps the app installed but leaves it in the App Library.",
      },
      {
        q: "Where do hidden apps go on iPhone?",
        a: "They go to the Hidden folder at the bottom of the App Library. You need Face ID, Touch ID or your passcode to open it.",
      },
      {
        q: "Why can't I hide some apps on my iPhone?",
        a: "Apple only lets you hide apps you downloaded. Apps that come installed with iOS 18 or later, such as Settings or Camera, can't be hidden.",
      },
      {
        q: "Can someone see my hidden apps?",
        a: "Someone with your passcode can open the Hidden folder. Hidden app names also show in Settings > Apps > Hidden Apps, Screen Time, battery settings and App Store purchase history.",
      },
      {
        q: "Do hidden apps still send notifications?",
        a: "iOS keeps a hidden app's content out of notification previews, so you should expect to miss its alerts. Check the app after unhiding it if you rely on its messages.",
      },
    ],
    apps: ["ios-lock-and-hide-apps", "ios-screen-time", "calculator-vault"],
    related: ["how-to-lock-apps-on-iphone", "best-apps-to-hide-apps", "how-to-hide-photos-on-iphone"],
  },

  // 2. Lock apps on iPhone
  {
    slug: "how-to-lock-apps-on-iphone",
    category: "app-lock",
    title: "How to Lock Apps on iPhone with Face ID (2026 Guide)",
    description:
      "Lock any downloaded app on iPhone with Face ID, Touch ID or your passcode in iOS 18 and later, plus Screen Time and Guided Access options and their weak spots.",
    keyword: "how to lock apps on iphone",
    published: "2026-11-08",
    updated: "2026-11-08",
    answer:
      "On iOS 18 and later, touch and hold the app icon, tap Require Face ID (or Touch ID or Passcode), tap it again, and authenticate. The app now asks for Face ID, Touch ID or your passcode every time it opens. Some Apple apps, like Settings, Camera and Maps, can't be locked.",
    intro: [
      "iPhones had no real app lock until iOS 18. Now you can make almost any app ask for Face ID before it opens, without installing anything.",
      "This guide covers the built-in lock, older workarounds with Screen Time and Guided Access, and what each one actually stops. If you also want the app off your Home Screen, see [how to hide apps on iPhone](/guides/how-to-hide-apps-on-iphone/).",
    ],
    sections: [
      {
        heading: "How to lock an app with Face ID (iOS 18 and later)",
        body: [
          "This is the best option for most people. It works on iOS 18, iOS 26 and later, and needs a passcode set on your iPhone.",
        ],
        steps: [
          {
            title: "Touch and hold the app icon",
            text: "Find the app on the Home Screen or in the App Library and hold the icon until the quick actions menu opens.",
          },
          {
            title: "Tap Require Face ID",
            text: "Tap Require Face ID. On iPhones with Touch ID, or with no biometrics set up, it says Require Touch ID or Require Passcode.",
          },
          {
            title: "Confirm and authenticate",
            text: "Tap Require Face ID again in the confirmation, then authenticate. The lock is on.",
          },
          {
            title: "Test it",
            text: "Close the app fully and open it again. You should see a Face ID prompt before any content appears.",
          },
        ],
      },
      {
        heading: "How to unlock or remove the lock",
        steps: [
          {
            title: "Open the menu",
            text: "Touch and hold the locked app's icon.",
          },
          {
            title: "Remove the requirement",
            text: "Tap Don't Require Face ID (or the Touch ID or Passcode version) and authenticate.",
          },
        ],
        body: [
          "If the app is in the Hidden folder, open the App Library, scroll to the bottom, unlock Hidden, and do the same steps there.",
        ],
      },
      {
        heading: "Older methods: Screen Time and Guided Access",
        body: [
          "Before iOS 18, people used Screen Time limits as a makeshift lock. It still works, but it is easy to get around and it is built for limiting use, not privacy.",
        ],
        steps: [
          {
            title: "Set a Screen Time passcode",
            text: "Go to Settings > Screen Time and turn on Lock Screen Time Settings (called Use Screen Time Passcode on some versions). Pick a code that differs from your iPhone passcode.",
          },
          {
            title: "Add an app limit",
            text: "Go to Settings > Screen Time > App Limits > Add Limit, choose the app, and set the time to 1 minute.",
          },
          {
            title: "Turn on Block at End of Limit",
            text: "Make sure Block at End of Limit is on, so the Screen Time passcode is needed to keep using the app.",
          },
        ],
      },
      {
        heading: "What an app lock does and doesn't protect against",
        body: [
          "The built-in lock is good for one common situation: you hand your unlocked phone to someone and do not want them opening your messages, photos or banking app.",
          "It does not encrypt anything extra, and it does not stop someone who knows your passcode. For files and photos that need stronger protection, a vault app with real encryption is a better fit. Our [best app lock apps](/best-app-lock-apps/) and [best photo vault apps](/best-photo-vault-apps/) lists separate the ones that encrypt from the ones that only hide.",
        ],
        bullets: [
          "Locked: opening the app needs Face ID, Touch ID or your passcode.",
          "Locked: Apple says content from a locked app won't appear in some places, such as notification previews, Search, Siri suggestions and call history.",
          "Not protected: anyone with your iPhone passcode, since it works as a fallback.",
          "Not protected: the app's existence. It is still visible on your Home Screen unless you also hide it.",
          "Screen Time limits: the blocked screen offers One More Minute without a passcode, and anyone with your Screen Time code can lift the limit. Treat it as a weak lock.",
          "Guided Access (Settings > Accessibility > Guided Access) locks the phone to a single app while you hand it over. It is useful for lending your phone, not for locking one app.",
        ],
      },
      {
        heading: "Limits and troubleshooting",
        body: [
          "Third-party app lockers on the App Store can't lock other iPhone apps. iOS does not give them that access. They protect only their own contents, like the vaults in our [calculator vault apps](/best-calculator-vault-apps/) list.",
        ],
        bullets: [
          "Some Apple apps can't be locked. Apple lists Calculator, Camera, Clock, Contacts, Find My, Maps, Shortcuts and Settings among them.",
          "No Require Face ID option? Update to iOS 18 or later in Settings > General > Software Update, and make sure a passcode is set.",
          "The lock is per device and does not sync to your iPad.",
          "In Family Sharing, children under 13 can't lock apps. Parents can still see a teen's locked apps in Screen Time.",
        ],
      },
    ],
    faq: [
      {
        q: "Can I put a password on an app on iPhone?",
        a: "Yes, on iOS 18 and later. Touch and hold the app, tap Require Face ID, and confirm. If Face ID fails, your iPhone passcode unlocks it.",
      },
      {
        q: "Can I use a different password for a locked app?",
        a: "Not with the built-in lock. It uses Face ID, Touch ID or your iPhone passcode. Screen Time limits use a separate Screen Time passcode, but that method is weaker.",
      },
      {
        q: "Why can't I lock some apps on my iPhone?",
        a: "Apple doesn't allow locking certain built-in apps, including Settings, Camera, Clock, Contacts, Find My, Maps, Shortcuts and Calculator.",
      },
      {
        q: "Do locked apps still send notifications?",
        a: "Apple says content from a locked app won't appear in notification previews. You may still see that the app sent something, depending on your notification settings.",
      },
      {
        q: "How do I lock apps on an older iPhone that can't update to iOS 18?",
        a: "Use Screen Time: set a Screen Time passcode, add a 1-minute App Limit, and turn on Block at End of Limit. It is easy to bypass, so don't rely on it for sensitive data.",
      },
    ],
    apps: ["ios-lock-and-hide-apps", "ios-screen-time", "calculator-vault"],
    related: ["how-to-hide-apps-on-iphone", "best-app-lock-apps", "how-to-hide-photos-on-iphone"],
  },

  // 3. Hide photos on iPhone
  {
    slug: "how-to-hide-photos-on-iphone",
    category: "photo-vault",
    title: "How to Hide Photos on iPhone (iOS 18 and iOS 26 Guide)",
    description:
      "Hide photos on iPhone with the locked Hidden album, hide the album itself, and see when a locked note or a photo vault app is the better choice for privacy.",
    keyword: "how to hide photos on iphone",
    published: "2026-11-08",
    updated: "2026-11-08",
    answer:
      "Open Photos, touch and hold a photo (or select several), and tap Hide. It moves to the Hidden album under Utilities, which needs Face ID, Touch ID or your passcode to open. To remove the album from view, go to Settings > Apps > Photos and turn off Show Hidden Album.",
    intro: [
      "Your iPhone already has a private album. The Hidden album in Photos keeps pictures out of your library, Memories and widgets, and it is locked by default on iOS 16 and later.",
      "This guide shows how to use it, how to make the album itself disappear, and when a different tool makes more sense.",
    ],
    sections: [
      {
        heading: "How to hide photos in the Photos app",
        body: [
          "These steps work on iOS 18, iOS 26 and later. The Photos layout changed in both versions, but the Hide option works the same way.",
        ],
        steps: [
          {
            title: "Open Photos and pick the photo",
            text: "Touch and hold a photo or video. To hide several, tap Select, then tap each item.",
          },
          {
            title: "Tap Hide",
            text: "Tap Hide in the menu. With several items selected, tap the More button (three dots) first, then Hide.",
          },
          {
            title: "Confirm",
            text: "Confirm that you want to hide the items. They disappear from your library and move to the Hidden album.",
          },
        ],
      },
      {
        heading: "How to find, unhide and lock the Hidden album",
        steps: [
          {
            title: "Find the Hidden album",
            text: "In Photos, scroll down to Utilities and tap Hidden. On iOS 26, it is under the Collections tab, in Utilities.",
          },
          {
            title: "Unlock it",
            text: "Tap View Album and authenticate with Face ID, Touch ID or your passcode.",
          },
          {
            title: "Unhide a photo",
            text: "Touch and hold the photo and tap Unhide. It goes back to your main library.",
          },
          {
            title: "Check the lock setting",
            text: "Go to Settings > Apps > Photos (Settings > Photos before iOS 18) and make sure Use Face ID (or Use Touch ID or Use Passcode) is on. This also locks Recently Deleted.",
          },
          {
            title: "Hide the album itself",
            text: "In Settings > Apps > Photos, turn off Show Hidden Album. The album no longer appears in Photos until you turn it back on.",
          },
        ],
        body: [],
      },
      {
        heading: "What the Hidden album does and doesn't protect against",
        body: [
          "The Hidden album is good at keeping photos out of sight when you show someone your camera roll. It is not a separate vault.",
          "If iCloud Photos is on, hidden photos are stored in iCloud like the rest of your library. They are end-to-end encrypted only if you turn on Advanced Data Protection in Settings > [your name] > iCloud. See our [iCloud Advanced Data Protection review](/reviews/icloud-advanced-data-protection/) for the trade-offs. Shared libraries and shared albums are the other common leak; this [guide to iPhone photo privacy and sharing](https://vaultforyou.app/) covers how they interact with hidden photos and what to check before you share.",
        ],
        bullets: [
          "Anyone who knows your iPhone passcode can open the Hidden album. There is no separate password.",
          "With iCloud Photos on, items you hide on one device are hidden on your other Apple devices too.",
          "Hidden photos can still be shared or exported by anyone who unlocks the album.",
          "Photos you send in Messages or other apps stay in those chats. Hiding the original does not remove them.",
        ],
      },
      {
        heading: "Other options: locked notes and vault apps",
        body: [
          "If you want a password that is different from your passcode, Apple Notes is a free option. You can add a photo to a note and lock it with your passcode or a separate notes password. Our [Apple Notes locked notes review](/reviews/apple-notes-locked-notes/) covers how it works.",
          "Third-party vault apps add features such as a separate PIN, decoy vaults and break-in alerts. They also add risk: if the app shuts down or you delete it without exporting, you can lose photos. Read [are photo vault apps safe?](/guides/are-photo-vault-apps-safe/) before you move anything, and compare options in our [best photo vault apps](/best-photo-vault-apps/) list.",
        ],
      },
      {
        heading: "Troubleshooting",
        bullets: [
          "Can't find the Hidden album: Show Hidden Album may be off. Turn it on in Settings > Apps > Photos.",
          "Album opens without Face ID: turn on Use Face ID in Settings > Apps > Photos.",
          "Photo still shows on another device: wait for iCloud Photos to sync, or check that the other device uses the same Apple Account.",
          "Hidden photo still appears in a shared album: hiding does not remove items you already added to Shared Albums. Remove them from the shared album directly.",
        ],
        body: [],
      },
    ],
    faq: [
      {
        q: "Can I lock the Hidden album with a password?",
        a: "The Hidden album uses Face ID, Touch ID or your iPhone passcode. It has no separate password. For a different password, use a locked note or a vault app.",
      },
      {
        q: "Where is the Hidden album on iOS 26?",
        a: "Open Photos, go to the Collections tab, scroll to Utilities, and tap Hidden. If you don't see it, turn on Show Hidden Album in Settings > Apps > Photos.",
      },
      {
        q: "Are hidden photos backed up to iCloud?",
        a: "Yes, if iCloud Photos is on. They are end-to-end encrypted only when Advanced Data Protection is turned on.",
      },
      {
        q: "Can someone see my hidden photos?",
        a: "Anyone who knows your iPhone passcode can open the Hidden album. Use a passcode that others don't know.",
      },
      {
        q: "Does hiding a photo delete it?",
        a: "No. It only moves the photo to the Hidden album. You can unhide it at any time.",
      },
    ],
    apps: [
      "apple-photos-hidden-album",
      "apple-notes-locked-notes",
      "icloud-advanced-data-protection",
      "private-photo-vault",
      "keepsafe",
    ],
    related: ["best-photo-vault-apps", "are-photo-vault-apps-safe", "how-to-hide-apps-on-iphone"],
  },

  // 4. Hide apps on Android
  {
    slug: "how-to-hide-apps-on-android",
    category: "hide-apps",
    title: "How to Hide Apps on Android (Private Space, Samsung, 2026)",
    description:
      "Hide apps on Android with Private Space on Android 15 and later, Samsung's hide apps setting, Secure Folder or a custom launcher. Steps vary by phone brand.",
    keyword: "how to hide apps on android",
    published: "2026-11-08",
    updated: "2026-11-08",
    answer:
      "On Android 15 and later, go to Settings > Security & privacy > Private space, set it up, and install apps inside it. Then turn on Hide private space when it's locked. On Samsung, use Home screen settings > Hide apps on Home and Apps screens, or Secure Folder. Menus differ by phone brand.",
    intro: [
      "Android gives you several ways to hide apps, and the right one depends on your phone. Google's Private Space works on many phones running Android 15 or later. Samsung has its own tools. Custom launchers work almost anywhere.",
      "Menu names vary a lot between brands and versions. If a path below doesn't match your phone, search the Settings app for the feature name.",
    ],
    sections: [
      {
        heading: "Option 1: Private Space (Android 15 and later)",
        body: [
          "Private Space is a separate, lockable area for apps. When it is locked, its apps are hidden from the app list, recent apps, notifications and Settings. It is available on Pixel phones and many other phones on Android 15 or later. Samsung phones generally use Secure Folder for this instead.",
        ],
        steps: [
          {
            title: "Open Private space settings",
            text: "Go to Settings > Security & privacy, and under Privacy, tap Private space. Authenticate with your screen lock.",
          },
          {
            title: "Set it up",
            text: "Tap Set up, then follow the prompts. Google recommends signing in with a separate Google Account so your private browsing, photos and downloads stay out of your main account.",
          },
          {
            title: "Choose a lock",
            text: "Pick a separate PIN, pattern or fingerprint, or use your screen lock. A separate lock is safer.",
          },
          {
            title: "Install apps inside it",
            text: "Unlock the space at the bottom of your app list and tap Install, or touch and hold an app in All Apps and tap Install app in Private space. Then uninstall the original copy if you want it gone from the main space.",
          },
          {
            title: "Hide the space itself",
            text: "Open Private space, tap its Settings icon, and under Hide, turn on Hide private space when it's locked. To get back in, go to Settings > Security & privacy > Private space.",
          },
        ],
      },
      {
        heading: "Option 2: Samsung Galaxy hide apps setting",
        body: [
          "Samsung's One UI Home can remove apps from the Home and Apps screens. It hides icons only. There is no lock, and the app is still listed in Settings > Apps.",
        ],
        steps: [
          {
            title: "Open Home screen settings",
            text: "Touch and hold an empty spot on the Home screen and tap Settings.",
          },
          {
            title: "Pick apps to hide",
            text: "Tap Hide apps on Home and Apps screens (just Hide apps on some versions), select the apps, and tap Done.",
          },
          {
            title: "Unhide later",
            text: "Go back to the same screen, tap the app in the hidden list to remove it, and tap Done.",
          },
        ],
      },
      {
        heading: "Option 3: Samsung Secure Folder",
        body: [
          "Secure Folder is Samsung's locked, encrypted space for apps and files. You add a copy of an app inside it, and that copy has its own data and login. You can then hide the Secure Folder icon too.",
          "Set it up in Settings > Security and privacy > More security settings > Secure Folder. To hide it, open Secure Folder settings and turn off Add Secure Folder to Apps screen, or use the Secure Folder tile in Quick Settings. Our [how to lock apps on Android](/guides/how-to-lock-apps-on-android/) guide walks through setup, and the [Samsung Secure Folder review](/reviews/samsung-secure-folder/) covers backups and limits.",
        ],
      },
      {
        heading: "Option 4: Custom launchers and other phones",
        body: [
          "A launcher replaces your Home screen and app drawer. Many can hide apps from the drawer. This works on most Android phones, including Pixels, whose default launcher has no hide-apps option.",
        ],
        bullets: [
          "[Niagara Launcher](/reviews/niagara-launcher/) and [Smart Launcher](/reviews/smart-launcher/) both offer ways to hide apps. Check which features are in the free version before you rely on them.",
          "Xiaomi, OnePlus, Oppo and other brands often have their own hidden apps option inside their app lock or privacy settings. Search Settings for hide or hidden apps.",
          "Preinstalled apps you never use can often be turned off in Settings > Apps > [app name] > Disable. The app stops working and leaves the app list, but it isn't uninstalled.",
          "For more options, see our list of the [best apps to hide apps](/best-apps-to-hide-apps/).",
        ],
      },
      {
        heading: "What hiding does and doesn't protect against",
        body: [
          "Hiding an icon only stops a casual glance. Private Space and Secure Folder go further because their apps are separate and locked.",
        ],
        bullets: [
          "Launcher and Samsung icon hiding: apps still show in Settings > Apps, the Play Store library and sometimes search. No lock.",
          "Private Space: Google notes that in some cases you can't hide the existence of private space from people who install apps on your phone.",
          "Private Space: data inside it is not backed up and isn't restored from a device backup. If you forget its lock, recovery isn't supported.",
          "Private Space: locked apps can't run in the background or send notifications, so you may miss messages.",
          "Anyone who knows the lock you chose can open the space. Use a lock other people don't know.",
        ],
      },
      {
        heading: "Troubleshooting",
        bullets: [
          "No Private space option: check your version in Settings > About phone > Android version. You need Android 15 or later, and some brands put it under a different menu, such as Settings > Privacy.",
          "Private Space won't set up: it isn't available on managed work phones, in a guest or secondary user, or when the phone already has the maximum number of users or profiles.",
          "Samsung hide option greyed out: update One UI Home, restart the phone, then try again.",
          "Hidden app reappeared after an update: some launcher updates reset hidden lists. Check the setting again.",
        ],
        body: [],
      },
    ],
    faq: [
      {
        q: "How do I find hidden apps on Android?",
        a: "Check Settings > Apps for the full list of installed apps. For Private Space, go to Settings > Security & privacy > Private space. On Samsung, check Home screen settings > Hide apps on Home and Apps screens and the Secure Folder.",
      },
      {
        q: "Is Private Space available on Samsung phones?",
        a: "Samsung phones generally use Secure Folder for the same job. If Private Space isn't in your Settings, use Secure Folder instead.",
      },
      {
        q: "Can I hide apps without a launcher?",
        a: "Yes. Use Private Space on Android 15 and later, or Samsung's built-in hide apps setting and Secure Folder. Many other brands have a hidden apps option in their privacy settings.",
      },
      {
        q: "Does hiding an app stop it from working?",
        a: "Hiding an icon does not. Apps in a locked Private Space are paused and can't send notifications until you unlock it. Disabling an app does stop it.",
      },
      {
        q: "Can I hide apps on a Google Pixel?",
        a: "Yes, with Private Space on Android 15 or later. The default Pixel launcher doesn't hide apps by itself, so a third-party launcher is the other option.",
      },
    ],
    apps: ["android-private-space", "samsung-secure-folder", "niagara-launcher", "smart-launcher"],
    related: ["best-apps-to-hide-apps", "how-to-lock-apps-on-android", "how-to-hide-photos-on-android"],
  },

  // 5. Lock apps on Android
  {
    slug: "how-to-lock-apps-on-android",
    category: "app-lock",
    title: "How to Lock Apps on Android: Built-in and App Options (2026)",
    description:
      "Lock apps on Android with Private Space, Samsung Secure Folder, built-in app locks on Xiaomi and OnePlus, or a third-party locker. Steps vary by phone brand.",
    keyword: "how to lock apps on android",
    published: "2026-11-08",
    updated: "2026-11-08",
    answer:
      "On Android 15 and later, use Private Space: Settings > Security & privacy > Private space, set a separate lock, and install apps inside it. On Samsung, use Secure Folder. Xiaomi and OnePlus have a built-in App lock in Settings. On other phones, a third-party app locker adds a PIN to any app.",
    intro: [
      "Stock Android has no simple per-app lock button. Instead, you have a few built-in options that differ by brand, and third-party lockers that work on almost any phone.",
      "Built-in options are usually more reliable, because they are part of the system. Third-party lockers are more flexible but easier to get around.",
    ],
    sections: [
      {
        heading: "Option 1: Private Space (Android 15 and later)",
        body: [
          "Private Space puts apps in a separate area with its own lock. When it is locked, the apps are paused and hidden. It is the closest thing to a built-in app lock on Pixel and many other phones.",
        ],
        steps: [
          {
            title: "Open Private space",
            text: "Go to Settings > Security & privacy, and under Privacy, tap Private space. Authenticate.",
          },
          {
            title: "Set it up with a separate lock",
            text: "Tap Set up, sign in with a Google Account (a separate one is best), and choose a lock that differs from your screen lock.",
          },
          {
            title: "Install the apps you want locked",
            text: "Open the space at the bottom of your app list and tap Install, or touch and hold an app and tap Install app in Private space. Sign in to the app again inside the space.",
          },
          {
            title: "Choose when it locks",
            text: "Open Private space, tap its Settings icon, then Lock private space automatically. Pick Every time device locks for the most protection.",
          },
        ],
      },
      {
        heading: "Option 2: Samsung Secure Folder",
        body: [
          "Secure Folder is Samsung's encrypted, locked space. You add copies of apps inside it, and those copies keep their own data. Menu names can differ slightly by One UI version.",
        ],
        steps: [
          {
            title: "Open Secure Folder setup",
            text: "Go to Settings > Security and privacy > More security settings > Secure Folder. Sign in to your Samsung account if asked.",
          },
          {
            title: "Pick a lock",
            text: "Choose a PIN, password or pattern, and add a fingerprint if you want. Turn on Reset with Samsung account, or you can't get in if you forget the code.",
          },
          {
            title: "Add apps",
            text: "Open Secure Folder, tap Add apps (the plus sign), choose the app, and tap Add. Sign in to the copy inside Secure Folder.",
          },
          {
            title: "Set auto lock",
            text: "In Secure Folder, tap More options (three dots) > Settings > Auto lock Secure Folder, and pick a short delay or When screen turns off.",
          },
        ],
      },
      {
        heading: "Option 3: Brand app locks (Xiaomi, OnePlus and others)",
        body: [
          "Several Android brands include a true per-app lock. These are reliable because they are part of the system. Exact paths change between software versions, so use the Settings search if these don't match.",
        ],
        bullets: [
          "Xiaomi, Redmi and Poco (HyperOS): Settings > Apps > App lock. Turn it on, set a password, and pick apps. On older MIUI phones, it is in the Security app. See our [Xiaomi App Lock review](/reviews/xiaomi-app-lock/).",
          "OnePlus (OxygenOS): look in Settings > Privacy, or Settings > Security & privacy, for App lock. Older versions called it App Locker under Utilities.",
          "Oppo, Realme, Vivo and Honor phones often have a similar App lock in privacy or security settings.",
          "Pixel phones have no per-app lock outside Private Space.",
        ],
      },
      {
        heading: "Option 4: Third-party app lockers",
        body: [
          "Apps such as [AppLock](/reviews/applock-domobile/), [LOCKit](/reviews/lockit/) and [Bitdefender App Lock](/reviews/bitdefender-app-lock/) add a PIN, pattern or fingerprint screen to any app you choose. They work on almost any Android phone. (Norton App Lock, once a popular free option, [was discontinued in 2024](/reviews/norton-app-lock/).) Compare them in our [best app lock apps](/best-app-lock-apps/) list.",
        ],
        steps: [
          {
            title: "Install a locker from Google Play",
            text: "Pick one with recent updates and a clear Data safety section on its Play Store page.",
          },
          {
            title: "Grant the permissions it asks for",
            text: "Lockers usually need Usage access and Display over other apps to detect when you open a locked app. Some ask for Accessibility access. Only grant these to an app you trust.",
          },
          {
            title: "Set your PIN and choose apps",
            text: "Create a PIN or pattern that differs from your screen lock, then toggle the apps you want to lock.",
          },
          {
            title: "Stop the system from closing it",
            text: "In Settings > Apps > [locker] > Battery, allow unrestricted battery use if the lock sometimes fails to appear.",
          },
        ],
      },
      {
        heading: "What an app lock does and doesn't protect against",
        body: [
          "All of these stop someone who borrows your unlocked phone from opening a specific app. They differ in how hard they are to get around.",
        ],
        bullets: [
          "Private Space and Secure Folder keep app data separate and locked by the system. They are the strongest options here.",
          "Brand app locks are system features and are hard to bypass from the phone itself.",
          "Third-party lockers draw a screen on top of the app. Someone with time and your unlocked phone may be able to uninstall the locker or force-stop it, unless it uses extra protection features.",
          "None of these protect you from someone who knows your lock code.",
          "Private Space data isn't backed up, and Secure Folder backup is no longer supported by Samsung. Keep copies of important files elsewhere.",
        ],
      },
      {
        heading: "Troubleshooting",
        bullets: [
          "No Private space in Settings: you need Android 15 or later, and not all brands include it. Samsung uses Secure Folder.",
          "Forgot your Private Space lock: recovery isn't supported. You have to delete the space, which erases its apps and data.",
          "Forgot your Secure Folder code: you can reset it only if Reset with Samsung account was on.",
          "Third-party lock not appearing: check Usage access, Display over other apps and battery settings for the locker.",
        ],
        body: [],
      },
    ],
    faq: [
      {
        q: "Does Android have a built-in app lock?",
        a: "Stock Android uses Private Space on Android 15 and later. Samsung has Secure Folder, and brands such as Xiaomi and OnePlus have a per-app App lock in Settings.",
      },
      {
        q: "How do I lock apps on Samsung without an app?",
        a: "Use Secure Folder: Settings > Security and privacy > More security settings > Secure Folder. Add the apps you want locked inside it.",
      },
      {
        q: "Are third-party app lockers safe?",
        a: "Reputable ones are fine for keeping people out of your apps, but they need broad permissions. Pick a well-known locker with recent updates and read its Data safety section.",
      },
      {
        q: "Can I lock WhatsApp or other messaging apps?",
        a: "Yes. Any of these methods works. WhatsApp also has its own fingerprint lock in its privacy settings, which you can use without extra apps.",
      },
      {
        q: "Can someone bypass an app lock?",
        a: "System options like Private Space and Secure Folder are hard to bypass without your code. Third-party lockers can sometimes be uninstalled or force-stopped by someone with your unlocked phone.",
      },
    ],
    apps: [
      "android-private-space",
      "samsung-secure-folder",
      "xiaomi-app-lock",
      "applock-domobile",
      "lockit",
      "bitdefender-app-lock",
    ],
    related: ["best-app-lock-apps", "how-to-hide-apps-on-android", "how-to-hide-photos-on-android"],
  },

  // 6. Hide photos on Android
  {
    slug: "how-to-hide-photos-on-android",
    category: "photo-vault",
    title: "How to Hide Photos on Android (Locked Folder and More, 2026)",
    description:
      "Hide photos on Android with Google Photos Locked Folder, the Safe folder in Files by Google, or Samsung Secure Folder, and learn how each one handles backups.",
    keyword: "how to hide photos on android",
    published: "2026-11-08",
    updated: "2026-11-08",
    answer:
      "Open Google Photos, go to Collections > Locked, and set up Locked Folder. Then select photos, tap Add to (or More), and choose Move to Locked Folder. They are protected by your screen lock and removed from your main library. Files by Google's Safe folder and Samsung Secure Folder are alternatives.",
    intro: [
      "Most Android phones come with at least one free way to hide photos. Google Photos has Locked Folder. Files by Google has Safe folder. Samsung phones also have Secure Folder.",
      "They differ most in one area: backups. Some keep photos only on your phone, which means they can be lost. This guide shows each method and what to watch out for.",
    ],
    sections: [
      {
        heading: "Option 1: Google Photos Locked Folder",
        body: [
          "Locked Folder works on any Android phone with Google Photos. It uses your phone's screen lock, so you can't set a separate password. Menu labels have changed over time: older versions put it under Library > Utilities.",
        ],
        steps: [
          {
            title: "Set up Locked Folder",
            text: "Open Google Photos, tap Collections, then Locked. Tap Set up Locked Folder and unlock your phone when asked.",
          },
          {
            title: "Move photos in",
            text: "Select one or more photos, tap Add to (or the More menu), then Move to Locked Folder, and tap Move.",
          },
          {
            title: "Turn on backup if you want it",
            text: "Tap your profile picture > Photos settings > Backup > Back up Locked Folder, unlock, and turn the toggle on. Without this, items stay only on this phone.",
          },
          {
            title: "Move photos out",
            text: "Open Locked Folder, unlock it, select the items, and use the Move option to return them to your library.",
          },
        ],
      },
      {
        heading: "Option 2: Safe folder in Files by Google",
        body: [
          "Safe folder works with any file type, not just photos, and you set its own PIN or pattern. It stays on your phone only.",
        ],
        steps: [
          {
            title: "Create the Safe folder",
            text: "Open Files by Google, scroll to Collections, and tap Safe folder. Choose PIN or Pattern, enter it twice, and tap Got it.",
          },
          {
            title: "Move files in",
            text: "Touch and hold the files, tap More, then Move to Safe folder, and enter your PIN or pattern.",
          },
          {
            title: "Move files out",
            text: "Open and unlock Safe folder, touch and hold a file, and tap Move out of Safe folder. Stay in Safe folder until it finishes, or the move is canceled.",
          },
        ],
      },
      {
        heading: "Option 3: Samsung Secure Folder",
        body: [
          "On Samsung Galaxy phones, Secure Folder has its own Gallery and its own lock. Set it up in Settings > Security and privacy > More security settings > Secure Folder.",
        ],
        steps: [
          {
            title: "Move photos into Secure Folder",
            text: "In the Gallery app, touch and hold the photos, tap More, then Move to Secure Folder.",
          },
          {
            title: "View them",
            text: "Open Secure Folder, unlock it, and open the Gallery app inside it.",
          },
          {
            title: "Move them back out",
            text: "In Secure Folder's Gallery, select the photos, tap More, and choose the option to move them out of Secure Folder. Wording may vary by One UI version.",
          },
        ],
      },
      {
        heading: "What these do and don't protect against",
        body: [
          "All three keep photos out of your main gallery and require a code to view. They differ on backups and on who can open them.",
          "If you want features like a decoy PIN or a disguised icon, look at our [best photo vault apps](/best-photo-vault-apps/) list, but read [are photo vault apps safe?](/guides/are-photo-vault-apps-safe/) first. Many vault apps store photos only on the phone too.",
        ],
        bullets: [
          "Locked Folder: anyone who knows your screen lock can open it. Items not backed up are deleted if you uninstall Google Photos, clear its app data or lose the phone.",
          "Safe folder: Google says if you forget the PIN or pattern, you can't access the files. Safe folder can't back up to Google Drive, and someone with access to the phone's internal storage may be able to reach the files.",
          "Secure Folder: Samsung no longer supports backing up Secure Folder. Use Smart Switch to move it to a new Galaxy phone.",
          "None of these remove copies you already sent in chats or uploaded to other services.",
        ],
      },
      {
        heading: "Avoid losing hidden photos",
        bullets: [
          "Before you reset or replace your phone, move photos out of on-device folders, or turn on Locked Folder backup.",
          "Don't clear storage or cache for Files by Google or Google Photos with cleaner apps.",
          "For Secure Folder, turn on Reset with Samsung account during setup so a forgotten code doesn't lock you out.",
          "Keep a second copy of irreplaceable photos in encrypted storage. Our guide to [encrypting files before uploading to the cloud](/guides/how-to-encrypt-files-before-uploading-to-the-cloud/) shows how.",
        ],
        body: [],
      },
    ],
    faq: [
      {
        q: "Where is Locked Folder in Google Photos?",
        a: "Open Google Photos and tap Collections, then Locked. On older versions, look under Library > Utilities.",
      },
      {
        q: "Is Google Photos Locked Folder backed up?",
        a: "Only if you turn on Back up Locked Folder in Photos settings, or back up items one by one. Otherwise, the photos stay on that phone only.",
      },
      {
        q: "What happens to Locked Folder if I uninstall Google Photos?",
        a: "Items that aren't backed up are deleted. Turn on backup or move them out first.",
      },
      {
        q: "Can I set a different password for Locked Folder?",
        a: "No. It uses your phone's screen lock. Safe folder in Files by Google and Samsung Secure Folder let you set a separate code.",
      },
      {
        q: "How do I hide photos on Samsung?",
        a: "Use Secure Folder: select photos in Gallery, tap More, then Move to Secure Folder. Google Photos Locked Folder also works on Samsung phones.",
      },
    ],
    apps: [
      "google-photos-locked-folder",
      "files-by-google-safe-folder",
      "samsung-secure-folder",
      "android-private-space",
    ],
    related: ["best-photo-vault-apps", "are-photo-vault-apps-safe", "how-to-hide-apps-on-android"],
  },

  // 7. Are photo vault apps safe?
  {
    slug: "are-photo-vault-apps-safe",
    category: "photo-vault",
    title: "Are Photo Vault Apps Safe? Risks and How to Choose (2026)",
    description:
      "Are photo vault apps safe? Learn the difference between hiding and encryption, the backup and data-loss risks, ads and trackers, and how to choose a vault.",
    keyword: "are photo vault apps safe",
    published: "2026-11-08",
    updated: "2026-11-08",
    answer:
      "Photo vault apps are safe enough for keeping photos away from people who borrow your phone, but not all of them encrypt your files. The biggest risk is data loss: many store photos only inside the app, so uninstalling it or losing your phone can erase them. Pick one with encryption and a backup option.",
    intro: [
      "Photo vault apps promise to keep private pictures behind a PIN. Some do that well. Others only hide files, show heavy ads, or make it hard to get your photos back out.",
      "This guide explains what to check before you trust a vault with photos you can't replace, and how to move them out safely if you change your mind.",
    ],
    sections: [
      {
        heading: "Hiding vs encryption: the key difference",
        body: [
          "A vault that only hides files moves them into the app's own storage and puts a PIN screen in front. That stops someone browsing your gallery. It doesn't stop someone who can read the phone's storage directly.",
          "A vault that encrypts files scrambles them so they are unreadable without the key. If the app or its developer says files are encrypted, look for specifics: what is encrypted, on the device or only in the cloud, and whether cloud backups are end-to-end encrypted.",
          "Built-in options are a good baseline. The iPhone Hidden album and Google Photos Locked Folder are free and come from the phone or app maker. See [how to hide photos on iPhone](/guides/how-to-hide-photos-on-iphone/) and [how to hide photos on Android](/guides/how-to-hide-photos-on-android/).",
        ],
      },
      {
        heading: "The biggest risk: losing your photos",
        body: [
          "Most complaints about vault apps are not about hackers. They are about photos that disappeared. These are the common causes.",
        ],
        bullets: [
          "Deleting the app: if photos are stored only inside the vault, uninstalling it usually deletes them.",
          "Switching phones: some vaults don't move with a normal phone transfer or backup. Check the app's own transfer or backup instructions before you switch.",
          "Forgetting the PIN: some vaults offer recovery by email, some offer none.",
          "Cloud backup tied to a subscription: if backup is a paid feature and the subscription lapses, check what happens to the backed-up copies.",
          "The app is pulled from the store or stops being updated. Your photos may still work, but the app may break after an OS update.",
        ],
      },
      {
        heading: "Ads, trackers and permissions",
        body: [
          "Many free vault apps make money from ads. Ads don't mean your photos are being shared, but ad SDKs collect device data, and some free vaults show ads often enough to get in the way.",
          "Before installing, check the App Privacy section on the App Store or the Data safety section on Google Play. These are written by the developer, so they are a starting point, not proof.",
        ],
        bullets: [
          "Be wary of vaults that ask for contacts, location or other permissions that a photo vault doesn't need.",
          "On Android, a vault that also locks other apps may need Usage access or Accessibility permissions. Only grant these to apps you trust.",
          "Calculator-style disguised vaults are fine, but the disguise doesn't make them more secure. Compare them in our [calculator vault apps](/best-calculator-vault-apps/) list.",
        ],
      },
      {
        heading: "How to choose a safe photo vault",
        body: [
          "Use this checklist. A vault that meets most of it is a reasonable choice. Our [best photo vault apps](/best-photo-vault-apps/) list shows how popular options compare.",
        ],
        bullets: [
          "It clearly states that files are encrypted on the device.",
          "It has a backup option, ideally end-to-end encrypted, or an easy way to export everything.",
          "It explains what happens if you delete the app or switch phones.",
          "It has a recovery option for a forgotten PIN that you understand and are comfortable with.",
          "It is updated regularly and has a clear privacy policy.",
          "Free tier limits and ads are acceptable to you. Know what the paid plan adds before you fill the vault.",
          "For files beyond photos, an encrypted file tool such as [Cryptomator](/reviews/cryptomator/) gives you more control.",
        ],
      },
      {
        heading: "How to move photos out of a vault safely",
        body: [
          "Do this before deleting a vault app or moving to a new phone. Button names vary by app, so look for Export, Unhide, Restore or Save to gallery.",
        ],
        steps: [
          {
            title: "Count what you have",
            text: "Open the vault and note how many photos and videos are in each album.",
          },
          {
            title: "Export a small batch first",
            text: "Export a few items to your phone's gallery and check that they open at full quality.",
          },
          {
            title: "Export everything",
            text: "Export the rest in batches. Keep the vault app open until each batch finishes.",
          },
          {
            title: "Verify the count",
            text: "Compare the number of exported items with your notes. Check that videos play.",
          },
          {
            title: "Protect them again",
            text: "Move the exported photos into their new home, such as the Hidden album, Locked Folder or a new vault, and back them up.",
          },
          {
            title: "Only then delete the old vault",
            text: "Uninstall the vault app once you have confirmed every item is safe elsewhere.",
          },
        ],
      },
    ],
    faq: [
      {
        q: "Can photo vault apps see my photos?",
        a: "It depends on the app. If photos are encrypted on your device and backups are end-to-end encrypted, the developer can't view them. If cloud backups are not end-to-end encrypted, the company could technically access them.",
      },
      {
        q: "What happens to my photos if I delete a vault app?",
        a: "If photos are stored only inside the app and not backed up, they are usually deleted with it. Export them before you uninstall.",
      },
      {
        q: "Are free photo vault apps safe?",
        a: "Some are. Free vaults often rely on ads and limit backups. Check whether files are encrypted and how you can export them.",
      },
      {
        q: "Is the iPhone Hidden album safer than a vault app?",
        a: "It is locked with Face ID and backed up with iCloud Photos, and it won't disappear if an app is deleted. Its weakness is that anyone with your iPhone passcode can open it.",
      },
      {
        q: "Can police or hackers get into a photo vault?",
        a: "A well-encrypted vault with a strong PIN is hard to break into. A vault that only hides files gives much less protection against someone with forensic tools or full access to the phone.",
      },
    ],
    apps: [
      "keepsafe",
      "private-photo-vault",
      "vaulty",
      "lockmypix",
      "calculator-vault",
      "apple-photos-hidden-album",
      "google-photos-locked-folder",
    ],
    related: ["best-photo-vault-apps", "how-to-hide-photos-on-iphone", "how-to-hide-photos-on-android", "best-calculator-vault-apps"],
  },

  // 8. Encrypt files before uploading to the cloud
  {
    slug: "how-to-encrypt-files-before-uploading-to-the-cloud",
    category: "file-encryption",
    title: "How to Encrypt Files Before Uploading to the Cloud (2026)",
    description:
      "Encrypt files before uploading them to Google Drive, Dropbox, OneDrive or iCloud with Cryptomator, 7-Zip or VeraCrypt, and keep your passwords from being lost.",
    keyword: "encrypt files before uploading to cloud",
    published: "2026-11-08",
    updated: "2026-11-08",
    answer:
      "Install Cryptomator, create a vault inside your cloud sync folder, set a strong password, and save the recovery key. Files you put in the unlocked vault are encrypted before they sync. For one-off sharing, use 7-Zip with AES-256 and encrypted file names. Store every password in a password manager.",
    intro: [
      "Most cloud storage encrypts your files, but the provider usually holds the keys. Encrypting files yourself before they upload means the provider stores only scrambled data.",
      "This guide covers three free tools for different jobs, plus the part people often skip: keeping the password safe so you don't lock yourself out.",
    ],
    sections: [
      {
        heading: "Pick the right tool",
        body: [
          "Each tool fits a different job. For a broader comparison, see our [best file encryption apps](/best-file-encryption-apps/) list.",
        ],
        bullets: [
          "Cryptomator: best for an everyday encrypted folder that syncs with Google Drive, Dropbox, OneDrive, iCloud Drive and others. It encrypts each file separately, so only changed files re-upload. Free and open source on desktop. Mobile apps are free to read, with a paid upgrade for full access.",
          "7-Zip: best for encrypting a batch of files to send or archive once. Windows only. Creates a password-protected .7z file.",
          "VeraCrypt: best for a large encrypted drive on your computer or an external disk. It works with cloud folders, but it isn't built for them.",
          "Already end-to-end encrypted services such as [Proton Drive](/reviews/proton-drive/) and Tresorit do the encryption for you, if you are willing to switch providers.",
        ],
      },
      {
        heading: "How to encrypt cloud files with Cryptomator",
        body: [
          "Cryptomator is not a sync app. Install your cloud provider's desktop app first, so you have a local folder that syncs.",
        ],
        steps: [
          {
            title: "Install Cryptomator",
            text: "Download it from the official Cryptomator site for Windows, macOS or Linux.",
          },
          {
            title: "Create a vault",
            text: "Click the plus button in the bottom-left corner, then Create New Vault. Give it a name.",
          },
          {
            title: "Store it in your cloud folder",
            text: "Choose your cloud provider's folder, or pick Custom Location and browse to it.",
          },
          {
            title: "Set a strong password",
            text: "Use a long passphrase. Cryptomator can't reset it for you. Save it in your password manager right away.",
          },
          {
            title: "Create and save the recovery key",
            text: "Choose to create a recovery key, then print it or store it somewhere safe and separate from the password. It can reset a forgotten password.",
          },
          {
            title: "Unlock and add files",
            text: "Unlock the vault with your password. It opens as a drive or folder. Files you put there are encrypted, and your sync app uploads the encrypted versions.",
          },
          {
            title: "Lock it when done",
            text: "Lock the vault in Cryptomator when you finish. The encrypted files stay in your cloud folder.",
          },
        ],
      },
      {
        heading: "How to encrypt files with 7-Zip",
        body: [
          "Use 7-Zip when you want a single encrypted file to upload or share. On Windows 11, you may need to click Show more options to see the 7-Zip menu.",
        ],
        steps: [
          {
            title: "Select the files",
            text: "In File Explorer, select the files or folder, right-click, and choose 7-Zip > Add to archive.",
          },
          {
            title: "Choose 7z format",
            text: "Set Archive format to 7z. The zip format can be encrypted too, but 7z can also hide file names.",
          },
          {
            title: "Set encryption",
            text: "Under Encryption, enter and re-enter a strong password. Make sure the method is AES-256.",
          },
          {
            title: "Encrypt file names",
            text: "Check Encrypt file names, so no one can see what is inside without the password.",
          },
          {
            title: "Create and upload",
            text: "Click OK, then upload the .7z file. Send the password through a different channel than the file.",
          },
        ],
      },
      {
        heading: "Using VeraCrypt with cloud storage",
        body: [
          "VeraCrypt creates an encrypted container: one large file that mounts as a drive. It is strong encryption, but a single big file is awkward for cloud sync.",
        ],
        bullets: [
          "Some sync apps re-upload the whole container after any change, which can be slow for large containers.",
          "VeraCrypt preserves the container's modification time by default, which can stop some sync apps from noticing a change. You can change this in VeraCrypt's preferences.",
          "Always dismount the container before it syncs, and never open it on two devices at once. Both can corrupt it.",
          "Keep containers small if you sync them, or use Cryptomator instead. See our [VeraCrypt review](/reviews/veracrypt/) for setup details.",
        ],
      },
      {
        heading: "Managing keys and passwords",
        body: [
          "With client-side encryption, nobody can reset your password. If you lose it, the files are gone. This is the most common way people lose encrypted data.",
        ],
        bullets: [
          "Store every vault and archive password in a password manager such as [Bitwarden](/reviews/bitwarden/) or Proton Pass.",
          "Use long passphrases of several random words, not short passwords.",
          "Print Cryptomator recovery keys and keep them somewhere safe, away from the device.",
          "Don't send a password in the same email or chat as the encrypted file.",
          "Test that you can open an encrypted file on a second device before deleting the unencrypted originals.",
        ],
      },
      {
        heading: "What this does and doesn't protect against",
        bullets: [
          "Protects against: the cloud provider reading your files, a breach of your cloud account, and files shared by mistake.",
          "Doesn't protect against: malware on your computer while a vault is unlocked, or someone who has your password.",
          "Doesn't hide everything: Cryptomator encrypts file names and contents, but the number of files and their approximate sizes are still visible.",
          "Doesn't replace backups: keep a separate backup, because an encrypted file that is deleted or corrupted is still lost.",
        ],
        body: [],
      },
    ],
    faq: [
      {
        q: "Is Google Drive encrypted?",
        a: "Google encrypts files in transit and at rest, but Google holds the keys. Encrypting files yourself first means Google stores only data it can't read.",
      },
      {
        q: "Is Cryptomator free?",
        a: "The desktop apps for Windows, macOS and Linux are free and open source. The iOS and Android apps let you view vaults for free and charge for full access.",
      },
      {
        q: "Is a password-protected zip file secure?",
        a: "It can be, if it uses AES-256 and a strong password. Older ZipCrypto encryption is weak, so use 7-Zip with AES-256, and the 7z format if you also want to hide file names.",
      },
      {
        q: "What happens if I forget my Cryptomator password?",
        a: "You can reset it with the recovery key if you created one. Without the password or the recovery key, the files can't be decrypted.",
      },
      {
        q: "Should I use VeraCrypt or Cryptomator for cloud storage?",
        a: "Cryptomator is built for cloud sync and encrypts files one by one. VeraCrypt is better for local drives and external disks.",
      },
    ],
    apps: ["cryptomator", "7-zip", "veracrypt", "proton-drive", "tresorit", "bitwarden", "proton-pass"],
    related: ["best-file-encryption-apps", "are-photo-vault-apps-safe", "best-private-notes-apps"],
  },
];
