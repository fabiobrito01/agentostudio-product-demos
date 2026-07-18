import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("mantém a identidade da demonstração AgentOStudio", async () => {
  const page = await readFile(
    new URL("../app/page.tsx", import.meta.url),
    "utf8",
  );

  assert.match(page, /AgentOStudio/i);
  assert.match(page, /Demonstração Interativa/i);
});

test("mantém ícones centralizados e suporte a toque", async () => {
  const [page, icons, layout, touch, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(
      new URL("../app/components/AppIcon.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/touch.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /AppIcon/);
  assert.match(icons, /from "lucide-react"/);
  assert.match(icons, /instagram:\s*Camera/);
  assert.doesNotMatch(icons, /\bInstagram\b/);

  assert.match(layout, /touch\.css/);
  assert.match(touch, /touch-action:\s*manipulation/);
  assert.match(touch, /prefers-reduced-motion/);
  assert.match(packageJson, /"lucide-react"/);
});
