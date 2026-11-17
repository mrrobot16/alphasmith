/**
 * ads.txt for AdSense. Built from NEXT_PUBLIC_ADSENSE_CLIENT_ID, so it stays in step with the
 * rest of the setup. Returns 404 while the client ID is blank.
 */
export function GET() {
  const publisher = (process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID ?? "").replace(/^ca-/, "");
  if (!publisher) return new Response("Not found", { status: 404 });
  return new Response(`google.com, ${publisher}, DIRECT, f08c47fec0942fa0\n`, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
