<?php
/**
 * TIMIA — gestore delle richieste inviate dal form preventivo.
 *
 * Requisiti: PHP 7.4+ con funzione mail() abilitata sull'hosting
 * (in alternativa sostituire l'invio con PHPMailer via SMTP autenticato).
 * IMPORTANTE: file non testabile in locale — provare un invio reale sul server prima della messa online.
 *
 * Risponde in JSON quando la richiesta arriva dal JavaScript del sito (header Accept: application/json);
 * altrimenti (browser senza JS) reindirizza alla pagina /contatti/grazie/.
 */
declare(strict_types=1);

// ---------------------------------------------------------------- configurazione
const MAIL_TO         = 'info@timia.it';
const MAIL_FROM       = 'noreply@timia.it'; // casella del dominio del sito: necessaria per SPF/DMARC
const MAX_FILES       = 5;
const MAX_TOTAL_BYTES = 10 * 1024 * 1024;
const MIN_SECONDS     = 3;                  // invii più rapidi sono considerati automatici (bot)
const ALLOWED = [
    'pdf'  => ['application/pdf'],
    'jpg'  => ['image/jpeg'],
    'jpeg' => ['image/jpeg'],
    'png'  => ['image/png'],
    'doc'  => ['application/msword', 'application/octet-stream'],
    'docx' => ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip', 'application/octet-stream'],
    'xls'  => ['application/vnd.ms-excel', 'application/octet-stream'],
    'xlsx' => ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/zip', 'application/octet-stream'],
];
const TIPI = ['preventivo' => 'Preventivo', 'consulenza' => 'Consulenza', 'analisi' => 'Analisi', 'ricontatto' => 'Ricontatto'];

// ---------------------------------------------------------------- risposta
$wantsJson = strpos($_SERVER['HTTP_ACCEPT'] ?? '', 'application/json') !== false;

function respond(bool $ok, string $message = '', string $ref = '', int $code = 200): void
{
    global $wantsJson;
    if ($wantsJson) {
        http_response_code($code);
        header('Content-Type: application/json; charset=utf-8');
        header('Cache-Control: no-store');
        echo json_encode(['ok' => $ok, 'message' => $message, 'ref' => $ref], JSON_UNESCAPED_UNICODE);
    } elseif ($ok) {
        header('Location: /contatti/grazie/', true, 303);
    } else {
        http_response_code($code >= 400 ? $code : 400);
        header('Content-Type: text/html; charset=utf-8');
        $safe = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');
        echo "<!doctype html><html lang=\"it\"><meta charset=\"utf-8\"><title>Invio non riuscito</title>"
           . "<body style=\"font-family:sans-serif;max-width:40rem;margin:4rem auto;padding:0 1rem\">"
           . "<h1>Invio non riuscito</h1><p>{$safe}</p>"
           . "<p><a href=\"/contatti/\">Torna al modulo</a> oppure chiama il +39 0742 391253.</p></body></html>";
    }
    exit;
}

function field(string $key, int $max = 500): string
{
    $v = $_POST[$key] ?? '';
    if (!is_string($v)) return '';
    $v = trim(str_replace(["\0", "\r"], '', $v));
    return function_exists('mb_substr') ? mb_substr($v, 0, $max, 'UTF-8') : substr($v, 0, $max);
}

function oneLine(string $v): string
{
    return trim(preg_replace('/[\r\n\t]+/', ' ', $v) ?? '');
}

// ---------------------------------------------------------------- controlli di base
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(false, 'Metodo non consentito.', '', 405);
}
if (field('website') !== '') {
    respond(true); // honeypot compilato: bot. Si risponde OK senza inviare nulla.
}
$ts = (int) field('ts', 20);
if ($ts > 0 && (time() - intdiv($ts, 1000)) < MIN_SECONDS) {
    respond(false, 'Invio troppo rapido. Riprova tra qualche secondo.', '', 429);
}

// ---------------------------------------------------------------- validazione
$tipo = field('tipo', 20);
if (!array_key_exists($tipo, TIPI)) respond(false, 'Seleziona il tipo di richiesta.', '', 422);

$data = [
    'ragione_sociale' => oneLine(field('ragione_sociale', 150)),
    'piva'            => oneLine(field('piva', 16)),
    'referente'       => oneLine(field('referente', 120)),
    'ruolo'           => oneLine(field('ruolo', 120)),
    'telefono'        => oneLine(field('telefono', 30)),
    'email'           => oneLine(field('email', 150)),
    'servizio'        => oneLine(field('servizio', 80)),
    'tipologia'       => oneLine(field('tipologia', 120)),
    'descrizione'     => field('descrizione', 1500),
    'eer'             => oneLine(field('eer', 12)),
    'stato'           => oneLine(field('stato', 40)),
    'quantita'        => oneLine(field('quantita', 20)),
    'unita'           => oneLine(field('unita', 10)),
    'frequenza'       => oneLine(field('frequenza', 20)),
    'periodicita'     => oneLine(field('periodicita', 30)),
    'provincia'       => oneLine(field('provincia', 2)),
    'fascia'          => oneLine(field('fascia', 40)),
    'note'            => field('note', 2000),
    'origine'         => oneLine(field('origine', 400)),
];
$privacy   = field('privacy', 2) === 'si';
$marketing = field('marketing', 2) === 'si';

$errors = [];
foreach (['ragione_sociale' => 'ragione sociale', 'referente' => 'referente', 'telefono' => 'telefono', 'email' => 'email'] as $k => $label) {
    if ($data[$k] === '') $errors[] = "il campo {$label} è obbligatorio";
}
if ($data['email'] !== '' && !filter_var($data['email'], FILTER_VALIDATE_EMAIL)) $errors[] = 'indirizzo email non valido';
if ($data['telefono'] !== '' && !preg_match('/^[0-9+()\s.\/-]{6,30}$/', $data['telefono'])) $errors[] = 'numero di telefono non valido';
if ($data['eer'] !== '' && !preg_match('/^\s*\d{2}\s?\d{2}\s?\d{2}\s?\*?\s*$/', $data['eer'])) $errors[] = 'codice EER non valido';
if (in_array($tipo, ['preventivo', 'analisi'], true)) {
    if ($data['tipologia'] === '') $errors[] = 'indica la tipologia di rifiuto';
    if ($data['provincia'] === '') $errors[] = 'indica la provincia di ritiro';
}
if ($tipo === 'preventivo') {
    if ($data['quantita'] === '' || !is_numeric(str_replace(',', '.', $data['quantita']))) $errors[] = 'indica la quantità stimata';
    if ($data['unita'] === '') $errors[] = 'indica l’unità di misura';
    if ($data['frequenza'] === '') $errors[] = 'indica la frequenza';
}
if (!$privacy) $errors[] = 'è necessario accettare l’informativa privacy';
if ($errors) respond(false, 'Controlla i dati inseriti: ' . implode('; ', $errors) . '.', '', 422);

$ref = field('ref', 20);
if (!preg_match('/^TIM-\d{6}-[A-Z0-9]{4}$/', $ref)) {
    $ref = 'TIM-' . date('ymd') . '-' . strtoupper(substr(bin2hex(random_bytes(3)), 0, 4));
}

// ---------------------------------------------------------------- allegati
$attachments = [];
if (!empty($_FILES['allegati']) && is_array($_FILES['allegati']['name'])) {
    $f = $_FILES['allegati'];
    $count = count($f['name']);
    $total = 0;
    $finfo = function_exists('finfo_open') ? finfo_open(FILEINFO_MIME_TYPE) : null;
    for ($i = 0; $i < $count; $i++) {
        if ($f['error'][$i] === UPLOAD_ERR_NO_FILE) continue;
        if ($f['error'][$i] !== UPLOAD_ERR_OK) respond(false, 'Errore nel caricamento degli allegati.', '', 422);
        if (count($attachments) >= MAX_FILES) respond(false, 'Puoi allegare al massimo ' . MAX_FILES . ' file.', '', 422);
        $tmp = $f['tmp_name'][$i];
        if (!is_uploaded_file($tmp)) continue;
        $total += (int) $f['size'][$i];
        if ($total > MAX_TOTAL_BYTES) respond(false, 'Gli allegati superano i 10 MB complessivi.', '', 413);
        $name = preg_replace('/[^A-Za-z0-9._-]/', '_', basename((string) $f['name'][$i])) ?: 'allegato';
        $ext = strtolower(pathinfo($name, PATHINFO_EXTENSION));
        if (!isset(ALLOWED[$ext])) respond(false, 'Formato di file non consentito: ' . $name, '', 415);
        $mime = $finfo ? (string) finfo_file($finfo, $tmp) : 'application/octet-stream';
        if ($finfo && !in_array($mime, ALLOWED[$ext], true)) respond(false, 'Il contenuto del file non corrisponde al formato: ' . $name, '', 415);
        $attachments[] = ['name' => $name, 'mime' => $mime, 'data' => (string) file_get_contents($tmp)];
    }
}

// ---------------------------------------------------------------- composizione email
$rows = [
    'Codice richiesta'   => $ref,
    'Tipo di richiesta'  => TIPI[$tipo],
    'Servizio'           => $data['servizio'],
    'Tipologia rifiuto'  => $data['tipologia'],
    'Codice EER'         => $data['eer'],
    'Stato fisico'       => $data['stato'],
    'Quantità'           => trim($data['quantita'] . ' ' . $data['unita']),
    'Frequenza'          => trim($data['frequenza'] . ($data['periodicita'] ? ' (' . $data['periodicita'] . ')' : '')),
    'Provincia di ritiro'=> $data['provincia'],
    'Descrizione'        => $data['descrizione'],
    '---'                => '',
    'Ragione sociale'    => $data['ragione_sociale'],
    'P.IVA'              => $data['piva'],
    'Referente'          => $data['referente'],
    'Ruolo'              => $data['ruolo'],
    'Telefono'           => $data['telefono'],
    'Email'              => $data['email'],
    'Fascia di ricontatto' => $data['fascia'],
    'Note'               => $data['note'],
    '----'               => '',
    'Consenso privacy'   => 'Sì (' . date('d/m/Y H:i') . ')',
    'Consenso marketing' => $marketing ? 'Sì' : 'No',
    'Origine visita'     => $data['origine'],
    'IP'                 => $_SERVER['REMOTE_ADDR'] ?? '',
    'Allegati'           => $attachments ? implode(', ', array_column($attachments, 'name')) : 'nessuno',
];
$text = "Nuova richiesta dal sito web\n\n";
foreach ($rows as $label => $value) {
    if (strpos($label, '---') === 0) { $text .= "\n"; continue; }
    if ($value === '') continue;
    $text .= str_pad($label . ':', 22) . ' ' . $value . "\n";
}

$subject = '=?UTF-8?B?' . base64_encode('[Sito] ' . TIPI[$tipo] . ' – ' . $data['ragione_sociale'] . ' – ' . $ref) . '?=';
$boundary = 'timia_' . bin2hex(random_bytes(12));
$headers = [
    'From: "Sito TIMIA" <' . MAIL_FROM . '>',
    'Reply-To: ' . $data['email'],
    'MIME-Version: 1.0',
    'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
    'X-Mailer: TIMIA-form',
];
$body  = "--{$boundary}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n";
$body .= chunk_split(base64_encode($text)) . "\r\n";
foreach ($attachments as $a) {
    $body .= "--{$boundary}\r\n";
    $body .= "Content-Type: {$a['mime']}; name=\"{$a['name']}\"\r\n";
    $body .= "Content-Transfer-Encoding: base64\r\n";
    $body .= "Content-Disposition: attachment; filename=\"{$a['name']}\"\r\n\r\n";
    $body .= chunk_split(base64_encode($a['data'])) . "\r\n";
}
$body .= "--{$boundary}--\r\n";

$sent = @mail(MAIL_TO, $subject, $body, implode("\r\n", $headers), '-f' . MAIL_FROM);
if (!$sent) {
    // Alcuni hosting non accettano il parametro -f: nuovo tentativo senza.
    $sent = @mail(MAIL_TO, $subject, $body, implode("\r\n", $headers));
}
if (!$sent) {
    respond(false, 'Non è stato possibile inviare la richiesta. Chiamaci al +39 0742 391253 o scrivi a info@timia.it.', '', 500);
}

respond(true, 'Richiesta inviata', $ref);
