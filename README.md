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

## 🔥 **Features**

- ⚡ Asynchronous event ingestion  
- 📦 Redis-backed queue using BullMQ  
- 🔄 Batch worker processing  
- 🗄️ PostgreSQL raw + aggregate tables  
- 🧠 Prisma ORM  
- 🔐 API key authentication  
- 🚦 Rate limiting  
- 📈 Load tested (~7k req/sec)  

## 📦 Tech Stack

- Node.js  
- Express.js  
- PostgreSQL  
- Prisma  
- Redis  
- BullMQ  
- Zod  
- Pino  
- Autocannon  

## 📈 Load Testing

```bash
autocannon -c 100 -d 30 -m POST \
-H "Content-Type: application/json" \
-H "x-api-key: my-secret-dev-key" \
-b '{...}' \
http://localhost:5001/api/events


---

## 5️⃣ Add **Design Decisions (interview gold)**

```md
## 🧠 Design Decisions

- Queue-based architecture to decouple ingestion and processing  
- Batch processing to reduce DB load  
- Raw + aggregate tables for fast analytics  
- Identified Prisma upsert as bottleneck  
- Found that multiple workers increase DB contention locally  


## ⚠️ Limitations

- Prisma upsert limits scaling (~7k/sec)  
- DB contention with multiple workers  

## 🔮 Future Improvements

- Raw SQL batch upserts (`ON CONFLICT`)  
- Monitoring (Prometheus + Grafana)  
- Dead-letter queue  
- Docker setup  
