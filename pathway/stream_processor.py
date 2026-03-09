import pathway as pw

class WasteEvent(pw.Schema):
    timestamp: pw.DateTimeUtc
    user: str
    category: str
    points: int
    confidence: float
    ward: str

events = pw.io.jsonlines.read(
    "../data/waste_events.json",
    schema=WasteEvent,
    mode="streaming"
)

category_stats = events.groupby(pw.this.category).reduce(
    total_scans=pw.reducers.count()
)

leaderboard = events.groupby(pw.this.user).reduce(
    total_points=pw.reducers.sum(pw.this.points),
    scans=pw.reducers.count()
)

ward_stats = events.groupby(pw.this.ward).reduce(
    scans=pw.reducers.count(),
    total_points=pw.reducers.sum(pw.this.points)
)

pw.io.jsonlines.write(
    category_stats,
    "analytics/category_stats.json"
)

pw.io.jsonlines.write(
    leaderboard,
    "analytics/leaderboard.json"
)

pw.io.jsonlines.write(
    ward_stats,
    "analytics/ward_stats.json"
)

pw.run()