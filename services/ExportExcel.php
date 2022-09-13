<?php
ini_set('MAX_EXECUTION_TIME', '-1');
session_start();
include("connection.php");
class ExportExcel extends connection
{
    function __construct()
    {
        $this->connectionDB();

    }
    public function loadData()
    {

        //$key=$_GET['key'];


       // $filename = "grab_data.xls"; // File Name
        $user=$_REQUEST['user'];
        $date=$_REQUEST['date'];
        $rand=rand();
        $filename=$user.'_'.$date. $rand.".xls";
        //if (!file_exists("../../".$user."_".$date)) {
         
        //    mkdir("./" . $user . "_" . $date.'-'.$rand);
       // }

        header("Content-Disposition: attachment; filename=\"$filename\"");
        header("Content-Type: application/vnd.ms-excel");



        $slash_sp=',';

              $sql = "select * from demand_point where user_id=$user and  updated_at::date='$date'::date";
              
             // $sql = "select * from demand_point where user_id=$user and  updated_at='$date'::date";
              //echo $sql;
          


         //echo $sql;

		  
      // exit();
        $result_query = pg_query($sql);
        $flag = false;
        while ($row = pg_fetch_assoc($result_query)) {  
			
            if (!$flag) {
                // display field/column names as first row
                echo implode("\t", array_keys($row)) . "\r\n";
                $flag = true;
            }
            echo implode("\t", array_values($row)) . "\r\n";
			
        }
		
		$this->closeConnection();
    }

}

$excel = new ExportExcel();
echo $excel->loadData();
?>