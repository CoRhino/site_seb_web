<?php
/*
 * api/newsletter.php — Collecte d'inscriptions courriel (en attendant Cyberimpact)
 * POST { email } -> ajoute une ligne dans data/newsletter.txt (une adresse par ligne).
 * Pas de DB, pas de dépendance externe. Sébastien CoRhino © 2026
 */
header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Access-Control-Allow-Origin: *');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
$email = is_array($body) ? trim((string) ($body['email'] ?? '')) : '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['ok' => false, 'error' => 'invalid']);
    exit;
}

$file = __DIR__ . '/../data/newsletter.txt';

$existing = file_exists($file) ? (@file_get_contents($file) ?: '') : '';
if (stripos($existing, $email . "\n") === false) {
    @file_put_contents($file, $email . "\n", FILE_APPEND | LOCK_EX);
}

echo json_encode(['ok' => true]);
