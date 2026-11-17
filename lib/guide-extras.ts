// Guide-specific "common mistakes" and a closing bottom line, the two sections the best-ranking
// competitor guides end with. Each entry is written for its own task; nothing here is shared text.
export type Mistake={title:string;body:string};
export type GuideExtras={mistakes:Mistake[];bottomLine:string};

export const guideExtras:Record<string,GuideExtras>={
 'how-to-hide-apps-on-iphone':{mistakes:[
  {title:'Removing the icon and calling it hidden',body:'Remove from Home Screen only moves the icon to App Library. The app still opens without Face ID and still shows up in search.'},
  {title:'Expecting every app to offer Hide',body:'Hide appears only for eligible downloaded apps. Most of Apple’s built-in apps can be locked but not hidden.'},
  {title:'Forgetting the passcode fallback',body:'Anyone who knows your iPhone passcode can open the Hidden folder. Keep the passcode private if hiding is meant to stop someone in your home.'},
  {title:'Assuming the App Store forgets the app',body:'Purchase history in your Apple Account still lists it. Hiding changes what appears on this phone, not account records.'},
 ],bottomLine:'On iOS 18, hold the icon and choose Hide and Require Face ID for any eligible downloaded app. Test the Hidden folder afterwards, and remember that your passcode and App Store purchase history are outside what hiding controls.'},
 'how-to-find-hidden-apps-on-iphone':{mistakes:[
  {title:'Searching only the Home Screen pages',body:'Hidden apps are never on a Home Screen page. Swipe past the last page to App Library and scroll to the Hidden folder at the bottom.'},
  {title:'Relying on Spotlight',body:'Apps hidden with the iOS 18 feature are left out of search results, so an empty search does not mean the app is gone.'},
  {title:'Confusing deleted with hidden',body:'If Hidden is empty, the app may have been deleted. Reinstalling from your App Store purchases brings the app back, but not necessarily its data.'},
 ],bottomLine:'Open App Library, tap Hidden and authenticate: that is where iOS 18 keeps hidden apps. If the app is not there, check whether it was deleted before assuming anything else.'},
 'how-to-unhide-apps-on-iphone':{mistakes:[
  {title:'Looking for an Unhide switch in Settings',body:'The action lives on the app itself. Open Hidden in App Library, hold the app and choose Don’t Require Face ID, Touch ID or Passcode.'},
  {title:'Expecting the icon back on the Home Screen',body:'An unhidden app returns to App Library. Hold it there and choose Add to Home Screen if you want the icon back on a page.'},
  {title:'Deleting and reinstalling instead',body:'Reinstalling can remove data the app stored only on the phone. Unhiding keeps everything in place.'},
 ],bottomLine:'Unhiding is the reverse of hiding: authenticate in the Hidden folder, remove the Face ID requirement, then put the icon back on a Home Screen page yourself.'},
 'how-to-lock-apps-on-iphone':{mistakes:[
  {title:'Thinking a lock also hides the app',body:'A locked app keeps its icon and name in view. Use Hide and Require Face ID if you also want it out of sight.'},
  {title:'Expecting a separate password per app',body:'The lock uses Face ID or Touch ID with your device passcode as the fallback. Anyone with that passcode can open every locked app.'},
  {title:'Skipping the test',body:'Quit the app from the app switcher and reopen it. If it opens without a prompt, the lock was not applied.'},
  {title:'Trying to lock Settings',body:'Some apps, including Settings, do not offer the lock. Use Screen Time restrictions for controls the lock cannot cover.'},
 ],bottomLine:'Hold the app, choose Require Face ID, then quit and reopen it to confirm. The lock is only as strong as how private your device passcode is.'},
 'how-to-hide-photos-iphone':{mistakes:[
  {title:'Leaving the Hidden album on display',body:'Hidden still appears under Utilities unless you turn off Show Hidden Album in the Photos settings.'},
  {title:'Turning off the Face ID requirement',body:'The Use Face ID setting for Photos is what locks Hidden and Recently Deleted. If it is off, anyone holding the unlocked phone can open them.'},
  {title:'Assuming sent copies are hidden too',body:'Hiding changes your library view only. Photos already shared in Messages, AirDrop or a shared album stay where they were sent.'},
  {title:'Expecting it to stay on one device',body:'With iCloud Photos on, the hidden status follows the picture to your iPad and Mac.'},
 ],bottomLine:'Hide the photo, keep Use Face ID on, and decide whether the Hidden album should show under Utilities. Then deal with any copies you already sent, which hiding cannot reach.'},
 'password-protect-photos-iphone':{mistakes:[
  {title:'Looking for an album password in Photos',body:'Photos has no per-album password. Hidden is protected by Face ID, Touch ID or the device passcode.'},
  {title:'Leaving the original behind',body:'Copying a photo into a locked note or vault leaves the original in Photos, and deleting it keeps it in Recently Deleted for about 30 days.'},
  {title:'Forgetting a custom Notes password',body:'Apple cannot recover it. Resetting the Notes password only applies to notes you lock afterwards.'},
 ],bottomLine:'For most people, Hidden with Face ID is enough. If you need a separate password, use a locked note or a vault app, and remove the original from Photos and Recently Deleted once you have checked the copy.'},
 'best-photo-vault-apps-iphone':{mistakes:[
  {title:'Choosing by the lock screen',body:'A PIN pad says nothing about encryption or recovery. Read who holds the keys and how a lost password is handled.'},
  {title:'Trusting a disguise',body:'A calculator-style icon hides the app’s purpose; it does not add protection to the files inside.'},
  {title:'Skipping the export test',body:'Export a sample photo and video before you move a library in, so you know you can get full-quality files back out.'},
  {title:'Leaving originals in Photos',body:'After import, the originals stay in Photos and then in Recently Deleted for about 30 days unless you remove them.'},
 ],bottomLine:'Pick a vault by its documented encryption, recovery and export, not its icon or lock screen. Rehearse import and export with sample files before trusting it with originals.'},
 'do-hidden-photos-sync-to-icloud':{mistakes:[
  {title:'Assuming hidden means local only',body:'With iCloud Photos on, the photo and its hidden status sync to every device signed in to the same Apple Account.'},
  {title:'Forgetting the Mac',body:'On a Mac, the Hidden album has its own lock setting in Photos. Check it there rather than assuming the iPhone setting carries over.'},
  {title:'Mixing up hidden and encrypted',body:'iCloud stores photos encrypted, but Apple holds the keys unless Advanced Data Protection is turned on.'},
 ],bottomLine:'Hidden photos do sync through iCloud Photos. Check the Hidden album lock on each device that shares your Apple Account, and consider Advanced Data Protection if who holds the keys matters to you.'},
 'stop-icloud-photos-syncing':{mistakes:[
  {title:'Picking Remove from iPhone too quickly',body:'With Optimize iPhone Storage on, the phone may hold only smaller versions. Choose Download Photos & Videos first if you want full copies on the device.'},
  {title:'Thinking it deletes from iCloud',body:'Turning off sync on one device does not delete your iCloud library; the photos stay in iCloud and on your other devices.'},
  {title:'Using Turn Off & Delete by mistake',body:'That option in iCloud storage settings removes the library from iCloud after a grace period. It is an account-wide decision, not a device setting.'},
 ],bottomLine:'Turn off iCloud Photos on the one device you want to disconnect, download full copies first if you need them, and stay away from the account-wide delete option.'},
 'recover-hidden-photos-iphone':{mistakes:[
  {title:'Checking only Recents',body:'Hidden photos never appear in Recents. Open the Hidden album under Utilities and authenticate.'},
  {title:'Missing a turned-off Hidden album',body:'If Show Hidden Album is off in the Photos settings, the album disappears from Utilities. Turn it on to look inside.'},
  {title:'Waiting too long on a deletion',body:'Deleted items stay in Recently Deleted for about 30 days, then they are gone from the library.'},
  {title:'Restoring a backup over newer photos',body:'Restoring an older backup can replace pictures taken since. Save new photos elsewhere before you restore.'},
 ],bottomLine:'Look in Hidden first, then Recently Deleted, then the right account and library view. Only consider a backup restore after newer photos are safe.'},
 'turn-off-shared-with-you-photos':{mistakes:[
  {title:'Expecting it to delete photos',body:'Turning off Shared with You changes where shared photos appear. The messages and their attachments stay in the conversation.'},
  {title:'Forgetting one-off conversations',body:'To stop one person’s photos only, open that conversation’s details and turn off Show in Shared with You.'},
  {title:'Confusing it with Shared Library',body:'Shared with You covers photos sent in Messages. A Shared Photo Library is a separate arrangement with its own participants.'},
 ],bottomLine:'Use the Messages setting to stop shared photos appearing in Photos, or the per-conversation switch for one person. Neither deletes anything, so remove saved copies yourself.'},
 'family-sharing-photo-privacy':{mistakes:[
  {title:'Sharing one Apple Account',body:'Two people signed in to one account see one photo library. Family Sharing works with separate accounts.'},
  {title:'Confusing shared storage with a shared library',body:'Sharing an iCloud+ plan pools storage space only. Each person’s photos stay private unless they share them.'},
  {title:'Forgetting old shared albums',body:'Shared Albums and a Shared Photo Library keep their participants until you remove them, and removal does not recall saved copies.'},
 ],bottomLine:'Give each family member their own Apple Account, share the storage plan, and review shared albums and Shared Library participants as a separate step.'},
 'remove-photo-location-iphone':{mistakes:[
  {title:'Turning off Camera location and stopping there',body:'That stops location being saved in new photos. Photos you already took keep theirs.'},
  {title:'Skipping the share options',body:'In the share sheet, tap Options and turn off Location to send a copy without it.'},
  {title:'Not editing a single photo',body:'For one picture, open its info, choose Adjust next to the location and pick No Location.'},
  {title:'Ignoring what is in the picture',body:'Street signs, house numbers and landmarks can reveal a place even with no location data attached.'},
 ],bottomLine:'Turn off location for future Camera photos, strip it from individual pictures with Adjust › No Location, and use the share Options switch for anything you send.'},
 'hidden-photos-new-iphone':{mistakes:[
  {title:'Erasing the old phone first',body:'Open Hidden on the new iPhone and check a few items before you wipe the old one.'},
  {title:'Assuming vault apps move with Quick Start',body:'Many vault apps keep files only in their own storage. Use the vault’s own backup or export before switching.'},
  {title:'Not waiting for iCloud to finish',body:'If you rely on iCloud Photos, let the upload complete on the old phone before you erase it.'},
 ],bottomLine:'Check that Hidden and any vault content arrived on the new iPhone, using each vault’s own transfer method, before erasing the old phone.'},
 'hidden-vs-encrypted-photo-vault':{mistakes:[
  {title:'Treating Hidden as encryption',body:'Hidden is a library view behind device authentication. It does not add another layer of encryption to the files.'},
  {title:'Trusting marketing terms',body:'Phrases like military-grade say nothing about who holds the keys. Look for a plain statement of end-to-end or zero-knowledge encryption.'},
  {title:'Ignoring recovery',body:'With a zero-knowledge vault, a lost password can mean lost files. That is the price of the provider not holding the keys.'},
 ],bottomLine:'Hidden keeps casual viewers out; an encrypted vault decides who can read the files at all. Choose based on whether you can live with its recovery rules.'},
 'move-photos-to-private-vault':{mistakes:[
  {title:'Deleting originals before checking',body:'Open, export and compare a few imported files first. Only then remove the originals from Photos.'},
  {title:'Forgetting Recently Deleted',body:'Deleted originals stay in Recently Deleted for about 30 days. Empty it if they must leave the library.'},
  {title:'Not checking quality',body:'Some import routes save smaller or converted files. Compare resolution and video playback against the original.'},
 ],bottomLine:'Import, verify by exporting a sample, and only then delete the originals and clear Recently Deleted. Keep the old copies until the check passes.'},
 'face-id-photo-locker-iphone':{mistakes:[
  {title:'Equating Face ID with encryption',body:'Face ID decides who can open the app. How the files are stored depends on the app.'},
  {title:'Forgetting the passcode fallback',body:'When Face ID fails, the device passcode usually unlocks the locker too.'},
  {title:'Adding someone as an alternate appearance',body:'A second face enrolled in Face ID can unlock everything that uses Face ID, lockers included.'},
 ],bottomLine:'Face ID is a convenient gate, not a vault. Check the app’s storage and recovery details and keep your passcode and enrolled faces to yourself.'},
 'password-protect-folder-iphone':{mistakes:[
  {title:'Looking for a folder password in Files',body:'The Files app has no per-folder password. On iOS 18 you can lock the Files app itself with Face ID.'},
  {title:'Expecting compressed files to be protected',body:'Compress in Files makes a zip without a password.'},
  {title:'Overlooking document passwords',body:'Pages, Numbers and Keynote can set a password on an individual document, which travels with the file.'},
 ],bottomLine:'There is no folder password on iPhone. Lock the Files app, password-protect individual documents, or use an encrypted storage app for whole folders.'},
 'how-to-hide-messages-on-iphone':{mistakes:[
  {title:'Changing alerts but not previews',body:'Hide Alerts silences a conversation; its preview can still appear. Set Show Previews to When Unlocked or Never.'},
  {title:'Expecting Messages to hide',body:'Messages can be locked with Face ID on iOS 18 but, as a built-in app, it cannot be hidden.'},
  {title:'Forgetting other devices',body:'An iPad or Mac on the same Apple Account can show the same conversations.'},
 ],bottomLine:'Turn off previews, mute conversations you want quiet, lock Messages with Face ID, and check every device signed in to your account.'},
 'hide-notifications-lock-screen-iphone':{mistakes:[
  {title:'Setting previews globally and stopping',body:'Individual apps can override the global Show Previews choice. Check the apps that matter in Notifications settings.'},
  {title:'Choosing When Unlocked and expecting nothing',body:'When Unlocked still reveals content to anyone your Face ID recognises, including alternate appearances.'},
  {title:'Leaving the list view on',body:'Display As Count shows only a number on the Lock Screen until you tap it.'},
 ],bottomLine:'Set Show Previews to Never or When Unlocked, check per-app overrides, and switch the Lock Screen to Count if you want only a number shown.'},
 'how-to-lock-notes-iphone':{mistakes:[
  {title:'Forgetting a custom password',body:'Apple cannot recover a custom Notes password, and resetting it only applies to notes locked afterwards.'},
  {title:'Trying to lock a shared note',body:'Shared notes cannot be locked. Stop sharing first, then lock.'},
  {title:'Using a non-iCloud account',body:'Only notes in iCloud or On My iPhone can be locked; notes synced from other email accounts cannot.'},
 ],bottomLine:'Use your device passcode for Notes locks unless you have a reason for a separate password, and keep any custom password somewhere you will find it.'},
 'how-to-block-apps-iphone':{mistakes:[
  {title:'Reusing the device passcode',body:'Pick a Screen Time passcode the user of the phone does not know, or the limits are easy to undo.'},
  {title:'Leaving Ignore Limit available',body:'Turn on Block at End of Limit, otherwise an App Limit can be dismissed with a tap.'},
  {title:'Forgetting new downloads',body:'Content & Privacy Restrictions can block installing apps from the App Store altogether.'},
 ],bottomLine:'Set a separate Screen Time passcode, use Block at End of Limit, and restrict App Store installs if new apps should not appear.'},
};
