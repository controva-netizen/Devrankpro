<?php
/**
 * Controva LLC - Contact Form Mailer
 * Handles submissions from the Contact Us form and delivers them to support@controvallc.com
 */

// 1. CORS & Response Headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, X-Requested-With');
header('Content-Type: application/json; charset=UTF-8');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed. Only POST is supported.']);
    exit;
}

// 2. Parse Incoming Payload
$rawInput = file_get_contents('php://input');
$input = json_decode($rawInput, true);

if (!is_array($input) || empty($input)) {
    $input = $_POST;
}

// Honeypot anti-spam check
if (!empty($input['botcheck']) || !empty($input['_honey'])) {
    // Silently drop bot submissions
    echo json_encode(['success' => true, 'message' => 'Message received.']);
    exit;
}

// 3. Sanitize and Validate Fields
$name    = isset($input['name']) ? trim(strip_tags($input['name'])) : '';
$email   = isset($input['email']) ? trim(filter_var($input['email'], FILTER_SANITIZE_EMAIL)) : '';
$company = isset($input['company']) ? trim(strip_tags($input['company'])) : 'Not specified';
$budget  = isset($input['budget']) ? trim(strip_tags($input['budget'])) : 'Not specified';
$source  = isset($input['source']) ? trim(strip_tags($input['source'])) : 'Website';
$message = isset($input['message']) ? trim(strip_tags($input['message'])) : '';

if (empty($name) || empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL) || empty($message)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Please provide a valid name, email address, and project description.'
    ]);
    exit;
}

// 4. Prepare Email Content
$recipient = 'support@controvallc.com';
$subject = "🚨 New Project Inquiry from " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8');

$budgetLabels = [
    'lt5k' => '< $5,000',
    '5k-10k' => '$5,000 - $10,000',
    '10k-25k' => '$10,000 - $25,000',
    'gt25k' => '$25,000+'
];
$budgetFormatted = isset($budgetLabels[$budget]) ? $budgetLabels[$budget] : $budget;

$boundary = md5(time());

// Headers
$headers = "From: Controva Website <support@controvallc.com>\r\n";
$headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/alternative; boundary=\"" . $boundary . "\"\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Plain text version
$plainBody = "--" . $boundary . "\r\n";
$plainBody .= "Content-Type: text/plain; charset=UTF-8\r\n";
$plainBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$plainBody .= "NEW CONTACT FORM INQUIRY\n";
$plainBody .= "========================\n\n";
$plainBody .= "Name: " . $name . "\n";
$plainBody .= "Email: " . $email . "\n";
$plainBody .= "Company: " . $company . "\n";
$plainBody .= "Budget Range: " . $budgetFormatted . "\n";
$plainBody .= "Heard Via: " . $source . "\n";
$plainBody .= "Date: " . date('Y-m-d H:i:s T') . "\n\n";
$plainBody .= "Project Description:\n";
$plainBody .= $message . "\n\n";
$plainBody .= "--------------------------------------------------\n";
$plainBody .= "Submitted via Controva LLC Official Website (https://www.controvallc.com)\n\n";

// HTML version
$htmlBody = "--" . $boundary . "\r\n";
$htmlBody .= "Content-Type: text/html; charset=UTF-8\r\n";
$htmlBody .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$htmlBody .= '<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background-color: #0c0d12; color: #f3f4f6; margin: 0; padding: 24px; }
    .card { background-color: #161821; border: 1px solid #282b3a; border-radius: 12px; max-width: 600px; margin: 0 auto; overflow: hidden; }
    .header { background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 24px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 20px; font-weight: 700; }
    .content { padding: 24px; }
    .field { margin-bottom: 16px; border-bottom: 1px solid #232634; padding-bottom: 12px; }
    .field:last-child { border-bottom: none; }
    .label { font-size: 11px; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em; margin-bottom: 4px; }
    .value { font-size: 15px; color: #f9fafb; font-weight: 500; }
    .message-box { background-color: #0e1017; border: 1px solid #282b3a; border-radius: 8px; padding: 16px; margin-top: 8px; white-space: pre-wrap; font-family: inherit; font-size: 14px; line-height: 1.6; color: #e5e7eb; }
    .footer { padding: 16px 24px; background-color: #11131a; text-align: center; font-size: 12px; color: #6b7280; }
  </style>
</head>
<body>
  <div class="card">
    <div class="header">
      <h1>🚨 New Lead Submission</h1>
      <p style="margin: 4px 0 0 0; opacity: 0.9; font-size: 13px;">Controva LLC Website Contact Form</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Full Name</div>
        <div class="value">' . htmlspecialchars($name) . '</div>
      </div>
      <div class="field">
        <div class="label">Email Address</div>
        <div class="value"><a href="mailto:' . htmlspecialchars($email) . '" style="color: #60a5fa; text-decoration: none;">' . htmlspecialchars($email) . '</a></div>
      </div>
      <div class="field">
        <div class="label">Company / Organization</div>
        <div class="value">' . htmlspecialchars($company) . '</div>
      </div>
      <div class="field">
        <div class="label">Budget Range</div>
        <div class="value">' . htmlspecialchars($budgetFormatted) . '</div>
      </div>
      <div class="field">
        <div class="label">Acquisition Source</div>
        <div class="value">' . htmlspecialchars($source) . '</div>
      </div>
      <div class="field">
        <div class="label">Project Details & Requirements</div>
        <div class="message-box">' . nl2br(htmlspecialchars($message)) . '</div>
      </div>
    </div>
    <div class="footer">
      Received on ' . date('Y-m-d H:i:s T') . ' via www.controvallc.com
    </div>
  </div>
</body>
</html>';

$fullMessage = $plainBody . $htmlBody . "--" . $boundary . "--";

// 5. Send Email via PHP mail()
$mailSent = @mail($recipient, $subject, $fullMessage, $headers, "-f support@controvallc.com");

if ($mailSent) {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been received. Our team will contact you within 4 business hours.'
    ]);
} else {
    // Try fallback without custom envelope parameter
    $fallbackSent = @mail($recipient, $subject, $fullMessage, $headers);
    if ($fallbackSent) {
        echo json_encode([
            'success' => true,
            'message' => 'Thank you! Your message has been received. Our team will contact you within 4 business hours.'
        ]);
    } else {
        http_response_code(500);
        echo json_encode([
            'success' => false,
            'message' => 'Unable to dispatch email from server. Please email us directly at support@controvallc.com'
        ]);
    }
}
