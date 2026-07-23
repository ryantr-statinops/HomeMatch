# Final Architecture Decision

## Status

Accepted decision for the next implementation cycle.

## Decision

HomeMatch will first use a modular monolith backend with two frontend applications. It will not start as a full microservices system.

The backend modular monolith will be implemented with Python and FastAPI. It
will run as a separate Vercel project from `services/api`. FastAPI-generated
OpenAPI is the source contract used to generate the TypeScript client consumed
by Public Web and Admin Portal.

```text
Public Web ─┐
Admin Portal ─┼── Backend API (modular monolith)
             │      ├── Auth/RBAC
             │      ├── Rooms
             │      ├── Roommates
             │      ├── Leads
             │      └── Media
             │
             └── Supabase PostgreSQL
                         └── ImageCache → Google Drive
```

## Why this decision

- The product has one dominant business domain.
- The team and maintenance capacity are small.
- Most current traffic is read-oriented public traffic.
- Full microservices would add deployment, networking, observability and data-consistency costs too early.
- A modular backend preserves future extraction boundaries without paying that cost now.

## Explicitly not included in the first implementation

- TODO API
- Separate Users API
- Separate Auth service
- Redis/message queue
- Background worker
- Traefik/API gateway
- Zipkin/distributed tracing

These may be added only when a real product or operational requirement exists.

## Extraction rule

A module may become an independent service only when at least one of these is demonstrated:

- independent scaling requirement;
- independent deployment requirement;
- different reliability boundary;
- separate team ownership;
- real asynchronous workload;
- measurable bottleneck in the modular backend.

## Migration principle

Move one capability at a time while preserving the current public behavior. The backend becomes the only client-facing data boundary before any service extraction is considered.
