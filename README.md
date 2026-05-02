# 🚀 Scalable Analytics Pipeline

A high-throughput event ingestion and analytics backend built with Node.js, Redis, BullMQ, PostgreSQL, and Prisma.

The system uses asynchronous queue-based processing and batch aggregation to handle around **7,000 events/sec** with low latency.

---

## 📊 Performance Snapshot

| Metric | Result |
|---|---|
| Throughput | ~7,000 req/sec |
| Average Latency | ~14 ms |
| Load Test Tool | Autocannon |
| Architecture | API → Redis Queue → Worker → PostgreSQL |
| Optimal Workers | 1 worker locally |

---

## 🏗️ Architecture

```text
Client → API → Redis Queue → Worker → PostgreSQL
