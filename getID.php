<?php
$rec=$_REQUEST['rec'];

include 'dbcon/dbcon.php'; 
  
$vValues="SELECT * FROM users WHERE id = ".$rec;
if($rec==0){
  $vValues="SELECT * FROM users ORDER BY id";
}

$jarr = array();
$statement = $DBcon->prepare($vValues);
$statement->execute();
while($rows=$statement->FETCH(PDO::FETCH_ASSOC)) {     
  $id=$rows['id'];
  $username=$rows['username'];
  $name=$rows['name'];
  $email=$rows['email'];
  $jarr[] = [ "id" => $id, "username" => $username, "name" => $name, "email" => $email ];
} 

echo json_encode($jarr);
?>