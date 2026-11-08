export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Static, first-party data only; "<" is escaped to keep the tag well-formed.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
