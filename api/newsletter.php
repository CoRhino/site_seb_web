<?php
/*
 * api/newsletter.php — Collecte d'inscriptions courriel (en attendant Cyberimpact)
 * POST { email } -> ajoute une ligne dans data/newsletter.txt (une adresse par ligne).
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

$body  = json_decode(file_get_contents('php://input'), true);
$email = is_array($body) ? trim((string) ($body['email'] ?? '')) : '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'invalid']);
    exit;
}

$file = __DIR__ . '/../data/newsletter.txt';

$existing = file_exists($file) ? (file_get_contents($file) ?: '') : '';
if (stripos($existing, $email . "\n") !== false) {
    echo json_encode(['ok' => true, 'msg' => 'already']);
    exit;
}

$written = file_put_contents($file, $email . "\n", FILE_APPEND | LOCK_EX);
if ($written === false) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'write_failed']);
    exit;
}

echo json_encode(['ok' => true]);
