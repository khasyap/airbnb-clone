# Production Architecture — Vacation Rental Marketplace

This document describes a production-scale architecture similar in scope to Airbnb.

```
                                    ┌─────────────┐
                                    │    USER     │
                                    └──────┬──────┘
                                           │
                                    ┌──────▼──────┐
                                    │  CDN / Edge │  (Cloudflare / Fastly / CloudFront)
                                    │  + WAF      │
                                    └──────┬──────┘
                                           │
                                    ┌──────▼──────┐
                                    │ Web App     │  (React SSR / Next.js / static)
                                    │ (Listing,   │
                                    │  Search UI) │
                                    └──────┬──────┘
                                           │
                                    ┌──────▼──────┐
                                    │ API Gateway │  (Kong / AWS API GW / Envoy)
                                    │ Load Bal.   │
                                    └──────┬──────┘
                                           │
              ┌────────────────────────────┼────────────────────────────┐
              │                            │                            │
       ┌──────▼──────┐            ┌────────▼────────┐           ┌───────▼───────┐
       │ Auth Service│            │ Listing Service │           │ Search Service│
       │ (OAuth, JWT)│            │ (CRUD, media)   │           │ (OpenSearch)  │
       └──────┬──────┘            └────────┬────────┘           └───────┬───────┘
              │                            │                            │
       ┌──────▼──────┐            ┌────────▼────────┐           ┌───────▼───────┐
       │ User Service│            │ Booking Service │           │ Pricing Svc   │
       └──────┬──────┘            └────────┬────────┘           └───────┬───────┘
              │                            │                            │
       ┌──────▼──────┐            ┌────────▼────────┐           ┌───────▼───────┐
       │ Review Svc  │            │ Payment Service │           │ Media Service │
       │ Messaging   │            │ (Stripe etc.)   │           │ (S3 + CDN)    │
       │ Notification│            └────────┬────────┘           └───────────────┘
       │ Recommend.  │                     │
       └─────────────┘                     │
                                           │
                              ┌────────────▼────────────┐
                              │     Data Layer          │
                              │                         │
                              │  PostgreSQL (primary)   │
                              │  + read replicas        │
                              │  Redis (cache/session)  │
                              │  OpenSearch / ES        │
                              │  Object storage (S3)    │
                              │  Data warehouse         │
                              │  Kafka / Event bus     │
                              └─────────────────────────┘
```

## Key Flows

**Read path (listing page)**  
CDN → Web App → API Gateway → Listing Service (cache hit in Redis) → PostgreSQL / Media Service (signed URLs).

**Search**  
Search Service indexes listing documents from event stream; queries go to OpenSearch with geo + filter facets.

**Booking transaction**  
Booking Service → availability lock (Redis) → Payment Service → write reservation → publish events → Notification + Calendar update.

**Image pipeline**  
Upload → Media Service → virus scan → resize variants → Object storage → CDN.

## Infrastructure

- Kubernetes (or ECS) for microservices
- Horizontal pod autoscaling
- Multi-region active-active for critical paths
- CI/CD (GitHub Actions / ArgoCD)
- Observability: Prometheus, Grafana, OpenTelemetry, centralized logging
- Secrets: Vault / AWS Secrets Manager
- Backups + PITR for databases
- WAF + rate limiting at edge

This architecture supports millions of listings and concurrent bookings while keeping the listing-page experience fast via edge caching and aggressive CDN use for images and static assets.
