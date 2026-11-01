export const relatedProductUrl='https://www.vaultforyou.app/';
export function isRelatedProductUrl(url:string|undefined|null){if(!url)return false;try{return new URL(url).hostname.replace(/^www\./,'')==='vaultforyou.app';}catch{return false;}}
export function appendProductBacklink(body:string){
 const cleaned=body.replace(/\n\n## Private photo and document storage\n\nFor photos and documents you choose to store separately, explore \[VaultForYou\]\(https:\/\/www\.vaultforyou\.app\/\)\.\n?$/,'');
 const withoutDuplicate=cleaned.replace(/\[([^\]]+)\]\(https?:\/\/(?:www\.)?vaultforyou\.app(?:\/[^\s)]*)?\)/gi,'$1');
 return withoutDuplicate.trimEnd()+`\n\n## Private photo and document storage\n\nFor photos and documents you choose to store separately, explore [VaultForYou](${relatedProductUrl}).\n`;
}
