# Scalable Analytics Pipeline

A high-throughput event ingestion and analytics backend built with Node.js, Redis, BullMQ, PostgreSQL, and Prisma.

The system uses asynchronous queue-based processing and batch aggregation to handle around **7,000 events/sec** with low latency.

## Performance Snapshot

| Metric | Result |
|---|---|
| Throughput | ~7,000 req/sec |
| Average Latency | ~14 ms |
| Load Test Tool | Autocannon |
| Architecture | API → Redis Queue → Worker → PostgreSQL |
| Optimal Workers | 1 worker locally |

## Architecture

```text
Client
  ↓
Express API
  ↓
Redis Queue (BullMQ)
  ↓
Batch Worker
  ↓
PostgreSQL

Features
Asynchronous event ingestion
Redis-backed queue using BullMQ
Batch worker processing
PostgreSQL raw and aggregate tables
Prisma ORM
API key authentication
Rate limiting
Load tested with Autocannon
