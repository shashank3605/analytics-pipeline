# 🚀 Scalable Analytics Pipeline

A high-throughput event ingestion and analytics backend built with Node.js, Redis, BullMQ, PostgreSQL, and Prisma. The system uses asynchronous queue-based processing and batch aggregation to handle around **7,000 events/sec** at ~14ms latency.

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
           ↓         ↓           ↓
       Validation  BullMQ    Batch Upsert
       Rate Limit  Queue     Aggregation
```

---

## 🔥 Features

- ⚡ Asynchronous event ingestion
- 📦 Redis-backed queue using BullMQ
- 🔄 Batch worker processing
- 🗄️ PostgreSQL raw + aggregate tables
- 🧠 Prisma ORM
- 🔐 API key authentication
- 🚦 Rate limiting
- 📈 Load tested (~7k req/sec with Autocannon)

---

## 📦 Tech Stack

| Technology | Purpose |
|---|---|
| Node.js + Express | API server |
| Redis + BullMQ | Queue management |
| PostgreSQL | Data storage |
| Prisma ORM | Database access |
| Zod | Input validation |
| Pino | Structured logging |
| Autocannon | Load testing |

---

## 🧠 Design Decisions

- **Queue-based architecture** to decouple ingestion from processing — API responds instantly, processing happens async
- **Batch processing** to reduce DB write load — workers process events in bulk not one by one
- **Raw + aggregate tables** — raw for audit trail, aggregate for fast analytics queries
- **Single worker locally** — multiple workers cause DB contention, increasing latency
- **Identified Prisma upsert as bottleneck** — next step is raw SQL batch upserts with `ON CONFLICT`

---

## 📈 Load Testing

```bash
autocannon -c 100 -d 30 -m POST \
  -H "Content-Type: application/json" \
  -H "x-api-key: my-secret-dev-key" \
  -b '{"eventType":"click","userId":"user_123","metadata":{}}' \
  http://localhost:5001/api/events
```

---

## ⚙️ Local Setup

```bash
# Clone the repo
git clone https://github.com/shashank3605/analytics-pipeline
cd analytics-pipeline

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npx prisma migrate dev

# Start the server
npm run dev

# Start the worker (separate terminal)
npm run worker
```

---

## ⚠️ Known Limitations

- Prisma upsert becomes a bottleneck beyond ~7k req/sec
- Multiple workers increase DB contention in local environment

---

## 🔮 Future Improvements

- Raw SQL batch upserts using `ON CONFLICT DO UPDATE`
- Docker + docker-compose setup
- Monitoring with Prometheus + Grafana
- Dead-letter queue for failed events
- Horizontal scaling with managed Redis

---

## 👤 Author

**Shashank Singh** — [GitHub](https://github.com/shashank3605) · [LinkedIn](https://linkedin.com/in/shashank-singh-935b311a1)
