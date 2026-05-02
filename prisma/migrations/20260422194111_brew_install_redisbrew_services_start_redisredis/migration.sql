-- CreateTable
CREATE TABLE "events_raw" (
    "id" TEXT NOT NULL,
    "ingestionId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "userId" TEXT,
    "sessionId" TEXT,
    "pageUrl" TEXT,
    "metadata" JSONB,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_raw_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_event_stats" (
    "id" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "eventType" TEXT NOT NULL,
    "totalCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "daily_event_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "page_stats" (
    "id" TEXT NOT NULL,
    "pageUrl" TEXT NOT NULL,
    "eventDate" TIMESTAMP(3) NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "page_stats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_failures" (
    "id" TEXT NOT NULL,
    "ingestionId" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "errorMessage" TEXT NOT NULL,
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "failedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_failures_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "events_raw_ingestionId_key" ON "events_raw"("ingestionId");

-- CreateIndex
CREATE INDEX "events_raw_eventType_idx" ON "events_raw"("eventType");

-- CreateIndex
CREATE INDEX "events_raw_eventTime_idx" ON "events_raw"("eventTime");

-- CreateIndex
CREATE INDEX "daily_event_stats_eventDate_idx" ON "daily_event_stats"("eventDate");

-- CreateIndex
CREATE INDEX "daily_event_stats_eventType_idx" ON "daily_event_stats"("eventType");

-- CreateIndex
CREATE UNIQUE INDEX "daily_event_stats_eventDate_eventType_key" ON "daily_event_stats"("eventDate", "eventType");

-- CreateIndex
CREATE INDEX "page_stats_eventDate_idx" ON "page_stats"("eventDate");

-- CreateIndex
CREATE UNIQUE INDEX "page_stats_pageUrl_eventDate_key" ON "page_stats"("pageUrl", "eventDate");

-- CreateIndex
CREATE INDEX "event_failures_ingestionId_idx" ON "event_failures"("ingestionId");
