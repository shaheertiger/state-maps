export const relatedProductUrl='https://www.vaultforyou.app/';
// The product link appears only where a reader is choosing private photo or file storage.
// A sitewide link from every app record looks like a link scheme under Google's spam policies.
export const productGuides=new Set(['best-photo-vault-apps-iphone','hidden-vs-encrypted-photo-vault','move-photos-to-private-vault','password-protect-photos-iphone','face-id-photo-locker-iphone','password-protect-folder-iphone','hidden-photos-new-iphone','how-to-hide-photos-iphone']);
export function isRelatedProductUrl(url:string|undefined|null){if(!url)return false;try{return new URL(url).hostname.replace(/^www\./,'')==='vaultforyou.app';}catch{return false;}}
export function appendProductBacklink(body:string){
 const cleaned=body.replace(/\n\n## Private photo and document storage\n\nFor photos and documents you choose to store separately, explore \[VaultForYou\]\(https:\/\/www\.vaultforyou\.app\/\)\.\n?$/,'');
 const withoutDuplicate=cleaned.replace(/\[([^\]]+)\]\(https?:\/\/(?:www\.)?vaultforyou\.app(?:\/[^\s)]*)?\)/gi,'$1');
 return withoutDuplicate.trimEnd()+`\n\n## Private photo and document storage\n\nFor photos and documents you choose to store separately, explore [VaultForYou](${relatedProductUrl}).\n`;
}
