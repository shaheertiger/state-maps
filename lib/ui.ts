import { AppWindow, Bell, BookOpen, Ban, Cloud, EyeOff, FileText, Image, Laptop, ListChecks, Lock, MessageSquare, RotateCcw, Scale, Search, Shield, Compass, Smartphone, Tablet, type LucideIcon } from 'lucide-react';
const iconRules: [RegExp, LucideIcon][] = [
  [/unhide|find|search|where/i, Search],
  [/notification|alert|preview/i, Bell],
  [/message|imessage|whatsapp|chat/i, MessageSquare],
  [/note/i, FileText],
  [/block|screen time|restrict/i, Ban],
  [/lock|passcode|face id|touch id/i, Lock],
  [/photo|image|camera|instagram|exif|metadata/i, Image],
  [/hide|hidden/i, EyeOff],
  [/icloud|cloud|shar/i, Cloud],
  [/vault|secur|encrypt|keepsafe|ente/i, Shield],
  [/recover|backup|restore/i, RotateCcw],
  [/safari|browser|web/i, Compass],
  [/checkup|review|checklist/i, ListChecks],
  [/compar|best|choose/i, Scale],
  [/glossary|term|definition/i, BookOpen],
  [/mac/i, Laptop],
  [/ipad/i, Tablet],
  [/iphone/i, Smartphone],
];
/** Line icon for a title. Render decoratively with aria-hidden. */
export function iconFor(text: string): LucideIcon {
  for (const [re, icon] of iconRules) if (re.test(text)) return icon;
  return AppWindow;
}
/** Approximate reading time in minutes for a block of text. */
export function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
}
