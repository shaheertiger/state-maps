import { iconFor } from '@/lib/ui';
/** One icon size and stroke everywhere: 18px, 1.5 stroke, text-role colour. */
export default function TopicIcon({ name, size = 18 }: { name: string; size?: number }) {
  const I = iconFor(name);
  return <I size={size} strokeWidth={1.5} aria-hidden="true" className="icon" />;
}
