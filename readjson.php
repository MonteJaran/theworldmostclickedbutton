<?php
  $json = file_get_contents('http://localhost/Testing/value.json');
  header('Content-Type: application/json');
  echo $json;
?>
