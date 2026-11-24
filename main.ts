// One-Line Office Joke: 24-Hour Sprint
// Writes a single office-life joke to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace, single line.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";

const LINE =
  "Our office plant has survived three rounds of layoffs, two CEOs, and a merger — HR just gave it a retention bonus.";

function main(): void {
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  const outPath = `${outDir}/entry.txt`;

  // Gate checks before writing.
  if (LINE.length < 1 || LINE.length > 200) {
    throw new Error(`line is ${LINE.length} characters, gate requires 1-200`);
  }
  if (!LINE.trim()) {
    throw new Error("line must not be only whitespace");
  }
  if (LINE.includes("\n")) {
    throw new Error("line must be a single line");
  }
  // Ties break on fewer bytes, so keep the byte count in view too.
  const bytes = Buffer.byteLength(LINE, "utf8");
  if (bytes > 200) {
    throw new Error(`line is ${bytes} bytes, gate caps at 200 characters`);
  }

  mkdirSync(outDir, { recursive: true });
  writeFileSync(outPath, LINE, "utf8");

  // Read back to verify the round-trip.
  const back = readFileSync(outPath, "utf8");
  if (back !== LINE) {
    throw new Error("round-trip mismatch");
  }
  console.log(`wrote ${LINE.length} chars to ${outPath}`);
}

main();
