# Migration Phases

## Phase 1 - Foundation

### Goals

- establish repo structure for web, admin, and api
- define shared contracts
- keep existing functionality working

### Deliverables

- `apps/web`
- `apps/admin`
- `apps/api`
- `packages/shared`
- base routing and environment config

## Phase 2 - Backend Read Layer

### Goals

- move room and roommate reads into backend endpoints
- preserve current UI output

### Deliverables

- room listing endpoint
- room detail endpoint
- roommate listing endpoint
- roommate detail endpoint

## Phase 3 - Lead Write Path

### Goals

- centralize lead creation
- protect the write path with validation

### Deliverables

- create lead endpoint
- validation for source type and source ID
- standardized success/error responses

## Phase 4 - Admin Portal

### Goals

- let sale/admin edit data safely
- keep public site read-only

### Deliverables

- login and role checks
- room CRUD
- roommate CRUD
- lead review screens

## Phase 5 - Media Handling

### Goals

- keep Google Drive as image storage
- hide image resolution behind backend logic

### Deliverables

- image path resolver
- cache lookup strategy
- fallback behavior when URL is missing

## Phase 6 - Hardening

### Goals

- make the system safer and easier to operate

### Deliverables

- logging
- audit trail for admin changes
- health check
- error monitoring
- API versioning if needed

## Exit Criteria

Migration is ready when:

- public site still works
- admin can update room data
- leads are recorded correctly
- image URLs still resolve
- no client reads DB directly

