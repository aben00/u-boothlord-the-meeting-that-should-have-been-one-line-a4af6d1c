// SPDX-License-Identifier: MIT
// The Meeting That Should Have Been One Line — a make.fun program/v1 entry.
//
// What this does: it writes one fixed sentence — the single line that
// could have replaced an entire pointless meeting — to /output/entry.txt.
// The sentence is a constant, not generated, so every run produces the
// same bytes. The program only checks the sentence against the
// competition's gate (UTF-8 text, 1 to 200 characters, not only
// whitespace) and writes it out.
//
// The line: the meeting could have been one line, everyone agrees,
// nobody knows what was agreed to, and they'll meet again next week
// to agree about that too.

import * as fs from "node:fs";
import * as path from "node:path";

// The entry: one sentence, 142 characters, about a meeting that should
// have been one line.
const ENTRY =
  "This meeting could have been one line: we all agree, nobody knows what we agreed to, and we will meet again next week to agree about that too.";

const OUT_DIR = "/output";
const OUT_FILE = path.join(OUT_DIR, "entry.txt");

function main(): void {
  // Gate check, same as the competition's sealed scorer: UTF-8 text of
  // 1 to 200 characters, not only white space.
  const chars = [...ENTRY].length;
  if (chars < 1 || chars > 200) {
    throw new Error(`entry is ${chars} characters, must be 1-200`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry is only white space");
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });
  // Written with no trailing newline: the file is exactly the sentence,
  // 142 characters, so the gate and the judge both see only the sentence.
  fs.writeFileSync(OUT_FILE, ENTRY, "utf8");
}

main();
