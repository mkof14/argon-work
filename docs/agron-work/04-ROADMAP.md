# AGRON Work: Roadmap запуска

## Этап 0 (0-4 недели): Product Discovery + Foundation
- зафиксировать домены рынка и ICP сегменты
- сформировать skill taxonomy для drone/robotics/AI/data
- проектирование UX map для Talent и Client
- утвердить монетизацию и legal базу

Deliverables:
- PRD v1
- архитектура v1
- дизайн-система v1 (tokens + UI foundations)

## Этап 1 (1-3 месяц): MVP Marketplace
MVP функционал:
- регистрация и авторизация
- профили Talent/Client
- публикация вакансий и проектов
- отклики, shortlisting, чат
- базовый AI matching
- escrow-платежи (минимальный контур)
- RU/EN локализация

KPI-goal:
- 1,000+ специалистов
- 100+ активных заказчиков
- fill rate > 25%

## Этап 2 (4-6 месяц): Scale Features
- расширенные фильтры поиска и recommendation feed
- рейтинги, отзывы, trust score
- контракты по milestones и документы
- мобильный опыт (PWA + mobile app foundation)
- enterprise кабинет (команды, роли, approval flow)

KPI-goal:
- repeat hire rate > 35%
- dispute rate < 3%

## Этап 3 (7-12 месяц): Enterprise + Global
- мультивалютные выплаты и налоговые сценарии
- KYB/KYC automation
- white-label/enterprise API
- расширение языков (ES/AR/HE и др.)
- ML модели прогнозирования качества найма

KPI-goal:
- enterprise ARR рост
- международная доля заказов > 20%

## Этап 4 (12+ месяц): Ecosystem Platform
- marketplace приложений и интеграций
- marketplace обучающих треков и сертификаций
- автономные AI-агенты рекрутинга и staffing automation

## Стартовая реализация в текущем репозитории
1. Web:
- новые разделы `AGRON Work` (landing + jobs + talent + employers + pricing + trust + about)

2. API:
- модули `jobs`, `profiles`, `matching`, `messages`, `contracts`

3. Data:
- миграции PostgreSQL для core сущностей
- индексация для поиска

4. Analytics:
- события воронки (publish -> apply -> interview -> hire -> repeat)
