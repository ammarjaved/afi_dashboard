<?php
session_start();
include 'connection.php';
$output = array();



$sql1="select cd_id from public.fpl1;";
$sql2="select cd_id from public.sfp_l2;";
$sql3="select cd_id from public.mfp_l3;";



//echo $sql1."<br/>";
$query1=pg_query($sql1);
$query2=pg_query($sql2);
$query3=pg_query($sql3);




if($query1)
{
    

echo  json_encode($output);

?>