-- CreateIndex
CREATE INDEX "daily_event_stats_createdAt_idx" ON "daily_event_stats"("createdAt");

-- CreateIndex
CREATE INDEX "event_failures_failedAt_idx" ON "event_failures"("failedAt");

-- CreateIndex
CREATE INDEX "events_raw_pageUrl_idx" ON "events_raw"("pageUrl");

-- CreateIndex
CREATE INDEX "events_raw_createdAt_idx" ON "events_raw"("createdAt");

-- CreateIndex
CREATE INDEX "page_stats_pageUrl_idx" ON "page_stats"("pageUrl");

-- CreateIndex
CREATE INDEX "page_stats_createdAt_idx" ON "page_stats"("createdAt");
