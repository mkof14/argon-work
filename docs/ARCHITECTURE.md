# AGRON Architecture (Initial)

## Core domains

1. Identity and Access
- JWT auth
- RBAC by role and organization

2. Learning Management
- Courses, lessons, exams
- Progress and certification

3. Simulation Engine
- Session ingestion
- Scoring and incident analysis

4. Operations
- Mission assignment
- Field execution checklist

5. Payments
- Subscription billing
- Enterprise invoicing integration

6. AI Reporting
- Field report generation
- Recommendation pipelines

## System layout

- Frontend: Next.js web app (desktop + mobile responsive)
- Mobile: React Native app (planned)
- API: Fastify + TypeScript
- Data: PostgreSQL + Redis + object storage
- Observability: OpenTelemetry + centralized logs (planned)
