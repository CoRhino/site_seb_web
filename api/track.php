<?php
/*
 * api/track.php — Stats internes (première partie, aucune donnée envoyée à un tiers)
 * POST { event, page, value, meta, session } -> ajoute une ligne dans data/analytics.db (SQLite).
 * Best-effort : un échec n'affecte jamais l'UI (appelé via sendBeacon/fetch fire-and-forget).
 * Sébastien CoRhino © 2026
 */
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://www.ananasday.com', 'https://ananasday.com'];
if (in_array($origin, $allowed, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

$allowedEvents = ['pageview', 'theme', 'lang', 'click', 'track_progress'];

$body  = json_decode(file_get_contents('php://input'), true);
$event = is_array($body) ? (string) ($body['event'] ?? '') : '';

if (!in_array($event, $allowedEvents, true)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid_event']);
    exit;
}

$clip = fn($v, $len) => mb_substr(trim((string) $v), 0, $len);

$page    = $clip($body['page']    ?? '', 60);
$value   = $clip($body['value']   ?? '', 120);
$session = $clip($body['session'] ?? '', 64);
$meta    = is_array($body['meta'] ?? null) ? substr(json_encode($body['meta']), 0, 500) : null;

try {
    $db = new PDO('sqlite:' . __DIR__ . '/../data/analytics.db');
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $db->exec("CREATE TABLE IF NOT EXISTS events (
        id      INTEGER PRIMARY KEY AUTOINCREMENT,
        ts      TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
        event   TEXT NOT NULL,
        page    TEXT,
        value   TEXT,
        meta    TEXT,
        session TEXT
    )");
    $stmt = $db->prepare('INSERT INTO events (event, page, value, meta, session) VALUES (?, ?, ?, ?, ?)');
    $stmt->execute([$event, $page, $value, $meta, $session]);
    echo json_encode(['ok' => true]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'write_failed']);
}
