<?php
include("connection.php");
$name=$_GET['name'];
$lastname=$_GET['lastname'];
echo "my name is ".$name." my last name is ".$lastname.'<br />';
$sql="select * from demand_point limit 10";
$result_query = pg_query($sql);
$output=[];
$output=pg_fetch_all($result_query);
print_r($output);

?>