# AGRON Work: Целевая архитектура платформы

## 1. Продуктовые контуры
- Public Web (многостраничный сайт + SEO + маркетинг)
- Marketplace App (кабинеты Talent/Client/Admin)
- API Platform (BFF + domain services)
- Data & AI Layer (поиск, рекомендации, аналитика)

## 2. Frontend архитектура
- Next.js (App Router), i18n-first, SSR/ISR
- Design System в `packages/ui`
- Модули:
  - поиск вакансий/специалистов
  - профиль и портфолио
  - создание задачи/тендера
  - коммуникации и workflow исполнения
  - биллинг и документы

UX требования:
- mobile-first responsive
- быстрый first paint
- доступность WCAG AA
- мультиязычность (EN/RU/ES/AR/HE + масштабирование)

## 3. Backend архитектура (modular monolith -> services)
На старте:
- модульный backend (Fastify + TypeScript)
- четкие bounded contexts и событийная шина

Доменные модули:
1. auth-iam
2. profiles-skills
3. jobs-marketplace
4. matching-recommendation
5. contracts-workflow
6. payments-ledger
7. comms-notifications
8. trust-safety
9. analytics-reporting

Эволюция:
- при росте нагрузки выделение high-traffic модулей в независимые сервисы

## 4. Data слой
- PostgreSQL: транзакционные данные (jobs, users, contracts, payments)
- Redis: кэш, очереди, rate limits, сессии
- Object Storage: документы, сертификаты, медиа портфолио
- Search Index (OpenSearch/Elastic): полнотекстовый и векторный поиск
- Event stream (Kafka/NATS): доменные события

## 5. AI/ML слой
- Skill ontology + embeddings
- AI matching/ranking pipeline
- risk scoring (fraud, dispute probability)
- recommendation system (jobs/talents/learning)
- LLM copilot:
  - генерация вакансий
  - улучшение профиля специалиста
  - авто-суммаризация откликов

## 6. Безопасность и комплаенс
- OAuth2/OIDC + MFA
- RBAC/ABAC для enterprise аккаунтов
- audit logs и immutable event trail
- шифрование at-rest/in-transit
- GDPR/CCPA-ready data policies
- KYC/KYB интеграции

## 7. High-load подход
- CDN + edge caching
- горизонтальное масштабирование API
- queue-driven async jobs
- read replicas для аналитических запросов
- idempotent processing для платежей/уведомлений
- SLO: 99.9% uptime (постепенно к 99.95%)

## 8. Наблюдаемость
- OpenTelemetry traces
- centralized logging
- метрики продуктов и инфраструктуры в едином дашборде
- alerting по SLA/API/error budgets
