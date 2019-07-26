<?php
$cn=2;

if($cn==0) {	
  $DB_host = "localhost";
  $DB_user = "root";
  $DB_pass = "";
  $DB_name = "tutorial";
  //$DB_name = "live";
} else if($cn==1) {		
  $DB_host = "sql171.main-hosting.eu";
	$DB_user = "u442399508_user";
	$DB_pass = "aidfi1992";
	$DB_name = "u442399508_aidfi";
} else if($cn==2) {	
	$DB_host = "ricky.heliohost.org";
  $DB_user = "updesk_JBE";
	$DB_pass = "jan2070";
  $DB_name = "updesk_tutorials";  
}

try {
  $DBcon = new PDO("mysql:host={$DB_host};dbname={$DB_name}",$DB_user,$DB_pass); 
  $DBcon->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
  echo "ERROR : ".$e->getMessage();
}
?>