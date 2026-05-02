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
```
## 🔥 Features

- ⚡ Asynchronous event ingestion  
- 📦 Redis-backed queue using BullMQ  
- 🔄 Batch worker processing  
- 🗄️ PostgreSQL raw + aggregate tables  
- 🧠 Prisma ORM  
- 🔐 API key authentication  
- 🚦 Rate limiting  
- 📈 Load tested (~7k req/sec)  

---

## 🧠 How It Works

1. Client sends event → API receives request  
2. API validates and pushes event to Redis queue  
3. BullMQ manages job queue  
4. Worker processes events asynchronously  
5. Data stored in PostgreSQL (raw + aggregate)

---

## 📁 Project Structure

```text
src/
├── controllers/
├── routes/
├── services/
├── workers/
├── config/
├── validators/
prisma/
.env
```

---

## ⚙️ Setup Instructions

### 1. Clone repository
```bash
git clone https://github.com/your-username/analytics-pipeline.git
cd analytics-pipeline
```
---

### 2. Install dependencies
```bash
npm install
```
---

### 3. Setup environment variables
```bash
PORT=5001
DATABASE_URL="postgresql://username@localhost:5432/analytics_db"
REDIS_URL="redis://127.0.0.1:6379"
```
---

### 4. Run database migrations
```bash
npx prisma migrate dev
```
---

### 5. Start server
```bash
npm run dev
```
---

### 6. Start worker (important)
```bash
npm run worker:dev
```

## 🧪 API Usage

### Send Event

```bash
curl -X POST http://localhost:5001/api/events \
-H "Content-Type: application/json" \
-d '{
  "eventType": "page_view",
  "userId": "user_1",
  "sessionId": "session_1",
  "pageUrl": "/home",
  "metadata": { "device": "mobile" },
  "timestamp": "2026-04-23T10:00:00.000Z"
}'
