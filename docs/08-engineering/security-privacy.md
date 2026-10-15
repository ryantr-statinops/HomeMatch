# Security and privacy

- Secrets are scoped to the service that needs them and supplied through deployment secret stores.
- Public web never receives database credentials, crawler credentials, provider tokens or model-store secrets.
- Crawler fetches only sources approved in source discovery; obey applicable access terms and request limits. Do not bypass authentication, paywalls, CAPTCHAs or access controls.
- Store source URL, observation time and provenance. Keep data minimization and retention decisions explicit per field/source.
- Anonymous session identifiers must not encode identity; rotate/expire them and support deletion according to the finalized privacy policy.
- Do not collect contact details or infer sensitive traits unless product need, legal basis and retention are reviewed.
- Logs exclude credentials, raw personal data and full scraped page bodies.
- Threat model covers SSRF/source URL validation, HTML/parser payloads, injection, abuse/rate limits and artifact integrity.

Source eligibility and privacy requirements are release gates, not assumptions that every public page can be harvested or republished.
