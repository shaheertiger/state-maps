const iconRules: [RegExp, string][] = [
  [/unhide|find|search|where/i, '🔍'],
  [/notification|alert|preview/i, '🔔'],
  [/message|imessage|whatsapp|chat/i, '💬'],
  [/note/i, '📝'],
  [/block|screen time|restrict/i, '⛔'],
  [/lock|passcode|face id|touch id/i, '🔒'],
  [/photo|image|camera|instagram|exif|metadata/i, '🖼️'],
  [/hide|hidden/i, '🙈'],
  [/icloud|cloud|shar/i, '☁️'],
  [/vault|secur|encrypt|keepsafe|ente/i, '🛡️'],
  [/recover|backup|restore/i, '🔁'],
  [/safari|browser|web/i, '🧭'],
  [/checkup|review|checklist/i, '✅'],
  [/compar|best|choose/i, '⚖️'],
  [/glossary|term|definition/i, '📖'],
  [/mac/i, '💻'],
  [/ipad/i, '📲'],
  [/app|iphone/i, '📱'],
];
/** Decorative emoji for a title. Always render with aria-hidden. */
export function iconFor(text: string): string {
  for (const [re, icon] of iconRules) if (re.test(text)) return icon;
  return '✦';
}
/** Approximate reading time in minutes for a block of text. */
export function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
}
