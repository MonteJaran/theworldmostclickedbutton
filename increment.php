<?php
header('Content-Type: application/json');
$file = "http://localhost/Testing/value.json";
$maxValue = 500;
$amount = intval($_GET['value']);

// Check if the request method is GET and if the value parameter is set
if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['value'])) {
    // Create the file if it does not exist
    if (!file_exists($file)) {
        file_put_contents($file, json_encode(["value" => 0]));
    }

    // Read the existing value from the file
    $data = json_decode(file_get_contents($file), true);
    $value = intval($data["value"]);

    // Add the new value to the existing value and check if it exceeds the maximum value
    $newValue = $value + $amount;
    if ($newValue > $maxValue) {
        $clickAmount = $maxValue - $value;
    } else {
        $clickAmount = $amount;
    }

    // Update the value in the file
    $data["value"] = $value + $clickAmount;
    file_put_contents($file, json_encode($data));

    // Return the updated value as a JSON response
    echo json_encode($data);
} else {
    // Return an error message if the request method or parameter is incorrect
    http_response_code(400);
    echo json_encode(["error" => "Invalid request"]);
}

?>
