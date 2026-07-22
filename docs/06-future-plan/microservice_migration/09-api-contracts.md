# Backend API Contracts

## Conventions

- Base path: `/api/v1`
- JSON request and response bodies.
- IDs remain the existing domain IDs (`IDPhong`, `IDBai`, `LeadID`) at the integration boundary.
- Public read endpoints do not require authentication.
- Admin write endpoints require authentication and role checks.

## Standard response shapes

Successful single resource:

```json
{ "data": {}, "meta": {} }
```

Successful collection:

```json
{
  "data": [],
  "meta": { "page": 1, "pageSize": 12, "total": 0 }
}
```

Error:

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid request",
    "details": []
  }
}
```

## Read endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/rooms` | List active rooms with area, price and amenity filters |
| GET | `/rooms/:id` | Get a room and resolved gallery |
| GET | `/roommates` | List active roommate posts |
| GET | `/roommates/:id` | Get a roommate post and related room |
| GET | `/health` | Service health check |

Room query parameters: `khuVuc`, `giaMin`, `giaMax`, `amenities`, `page`, `pageSize`.

Roommate query parameters: `postType`, `gender`, `khuVuc`, `page`, `pageSize`.

## Write endpoints

| Method | Endpoint | Required role | Purpose |
|---|---|---|---|
| POST | `/leads` | Public, rate-limited | Create a lead from a room or roommate source |
| POST/PATCH | `/admin/rooms/:id` | ADMIN/SALE | Update room data when permitted |
| POST/PATCH | `/admin/roommates/:id` | ADMIN/SALE | Manage roommate posts |
| GET | `/admin/leads` | ADMIN/SALE | Review leads |

Lead request:

```json
{ "sourceType": "ROOM", "sourceId": "ROOM001" }
```

The API must verify that `sourceId` exists and that the source is publicly active before creating a public lead.

## Contract rules

- Never return service keys or internal database credentials.
- Never expose private customer or sale fields on public endpoints.
- Validate all input with shared schemas.
- Version breaking changes under a new API version.
