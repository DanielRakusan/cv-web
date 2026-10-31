// Content negotiation pro AI agenty: "Accept: text/markdown" na / vrací
// čisté markdown shrnutí (rewrite v next.config.ts) místo HTML s JS bundly.
export async function GET(request: Request) {
  const origin = new URL(request.url).origin;
  const res = await fetch(`${origin}/llms-full.txt`);
  const body = res.ok ? await res.text() : "# Daniel Rakušan\n";
  return new Response(body, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Vary: "Accept",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
