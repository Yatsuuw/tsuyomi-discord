/**
 * Prints `[label, value]` pairs as a list of "label: value" items, skipping the empty values. Labels are
 * in italics so that the bold name of the embed field holding the list stands out above them.
 */
export function labelledLines(pairs: [label: string, value: string | null | undefined][]): string {
  return pairs.flatMap(([label, value]) => (value ? [`- *${label}:* ${value}`] : [])).join('\n');
}
