export default function formatMemberSince(timestamp?: string): string {
  if (!timestamp) return 'Unknown date';

  const date = new Date(timestamp);

  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
