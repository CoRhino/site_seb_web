<?php
/*
 * api/counter.php — Compteur de visiteurs old-school
 * Chaque requête GET = +1. Stocké dans data/counter.txt (exclu du rsync).
 * Sébastien CoRhino © 2026
 */
ini_set('display_errors', '0'); // jamais de warning PHP dans une réponse JSON
error_reporting(0);

header('Content-Type: application/json');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Access-Control-Allow-Origin: *');

$file = __DIR__ . '/../data/counter.txt';

$n = 0;
if (file_exists($file)) {
    $n = (int) @file_get_contents($file);
}
$n++;

@file_put_contents($file, $n, LOCK_EX);

echo json_encode(['n' => $n]);
