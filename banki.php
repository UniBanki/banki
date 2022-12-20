<?php
require_once "../../php/banki/login.php";
$request = json_decode(file_get_contents('php://input'), true);

$body = $request['body'];

switch($body['method']){
    case 'login':
        $response = login($body['username'], $body['password'], $body['sessionid']);
}

header("Content-Type: application/json");
echo json_encode($response);
