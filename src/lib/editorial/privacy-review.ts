export const reviewQuestions = [
  { id: "goal", label: "What do you want to review?", options: [["browsing", "Casual browsing on my phone"], ["sharing", "Who can see shared pictures"], ["moving", "Moving to a new phone or vault"]] },
  { id: "cloud", label: "How is your library stored?", options: [["unknown", "I'm not sure"], ["icloud", "I use iCloud Photos"], ["local", "I keep it on this device"]] },
  { id: "access", label: "What other access should you check?", options: [["device", "Someone may know my device passcode"], ["family", "Family or shared accounts"], ["links", "Shared albums or links"]] },
] as const;
export type ReviewAnswers = { goal: string; cloud: string; access: string };
export const defaultAnswers: ReviewAnswers = { goal: "browsing", cloud: "unknown", access: "device" };
export const reviewActions = [
  { id: "inventory", title: "Locate originals and existing copies", body: "List Photos, vaults, messages, shared destinations and signed-in devices. Do not delete anything while you are establishing where the originals reside.", slug: "how-to-hide-photos-iphone" },
  { id: "hidden", title: "Check the Hidden collection and its lock", body: "Use a harmless sample to verify visibility and authentication. Confirm what the device passcode permits.", slug: "password-protect-photos-iphone" },
  { id: "sync", title: "Trace the iCloud synchronization path", body: "Confirm the Apple Account and Photos sync setting. Download needed originals before disconnecting a device.", slug: "stop-icloud-photos-syncing" },
  { id: "family", title: "Separate Family Sharing from shared photo access", body: "Confirm separate Apple Accounts and inspect Shared Albums or Shared Library participants independently of the storage subscription.", slug: "family-sharing-photo-privacy" },
  { id: "links", title: "Review recipients and public links", body: "Review each shared destination. Revoking access does not recall copies recipients have already saved.", slug: "turn-off-shared-with-you-photos" },
  { id: "recovery", title: "Test import, export and recovery", body: "Rehearse with non-sensitive images and a video. Verify a recovery route before making a vault or new phone your only copy.", slug: "move-photos-to-private-vault" },
  { id: "metadata", title: "Inspect location and the visible frame", body: "Review photo details and share options, then check a sample output. An address visible in the picture remains visible after metadata changes.", slug: "remove-photo-location-iphone" },
] as const;
export function normalizeAnswers(input: Partial<ReviewAnswers>): ReviewAnswers {
  return Object.fromEntries(reviewQuestions.map(q => [q.id, q.options.some(o => o[0] === input[q.id]) ? input[q.id] : defaultAnswers[q.id]])) as ReviewAnswers;
}
export function buildReview(raw: Partial<ReviewAnswers>) {
  const a = normalizeAnswers(raw);
  const ids = new Set(["inventory", "metadata"]);
  if (a.goal === "browsing" || a.access === "device") ids.add("hidden");
  if (a.cloud !== "local") ids.add("sync");
  if (a.access === "family") ids.add("family");
  if (a.goal === "sharing" || a.access === "links") ids.add("links");
  if (a.goal === "moving") ids.add("recovery");
  return reviewActions.filter(action => ids.has(action.id));
}
