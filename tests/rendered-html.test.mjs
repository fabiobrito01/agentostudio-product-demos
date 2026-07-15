import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);

  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renderiza a demonstração AgentOStudio", async () => {
  const response = await render();

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );

  const html = await response.text();

  assert.match(html, /AgentOStudio/i);
  assert.match(html, /Demonstração Interativa/i);
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
