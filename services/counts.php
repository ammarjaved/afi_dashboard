


<?php
include("connection.php");

class Tehsil extends connection {
    function __construct()
    {
        $this->connectionDB();

    }

    public function getAllCounts() {

  //   $sql="select date_created::date,count(*) from demand_point where  date_created::date<>'2021-12-01' group by date_created::date order by date_created::date";where  a.date_created::date<>'2021-12-01'
      $sql="select b.username,count(*) from demand_point a inner join tbl_user_info b on a.user_id=b.user_id  group by b.username";
        $output = array();
        $result_query = pg_query($sql);
        if ($result_query) {
            $arrq = pg_fetch_all($result_query);
            $output['total']= $arrq;
                    
        }

        $sql="select  b.username,count(*) from demand_point a  ,tbl_user_info b  where data_submited is not null and a.user_id=b.user_id group by b.username";
        //$output = array();
        $result_query = pg_query($sql);
        if ($result_query) {
            $arrq = pg_fetch_all($result_query);
            $output['submitted']= $arrq;
                    
        }

        return json_encode($output);

        $this->closeConnection();
    }

    public function getTodayCounts() {

        //   $sql="select date_created::date,count(*) from demand_point where  date_created::date<>'2021-12-01' group by date_created::date order by date_created::date";
            $sql="select b.username,count(*) from demand_point a inner join tbl_user_info b on a.user_id=b.user_id where  a.updated_at::date=now()::date group by b.username";
              $output = array();
              $result_query = pg_query($sql);
              if ($result_query) {
                  $arrq = pg_fetch_all($result_query);
                  $output= $arrq;
                          
              }
      
              return json_encode($output);
      
              $this->closeConnection();
          }
 
              
              public function getDateCounts() {

                //   $sql="select date_created::date,count(*) from demand_point where  date_created::date<>'2021-12-01' group by date_created::date order by date_created::date";
                    $sql="select b.username,a.updated_at::date,count(*) from demand_point a inner join tbl_user_info b on a.user_id=b.user_id where  a.user_id is not null and updated_at>'2022-02-07 02:43:44.20696' group by b.username,a.updated_at::date order by updated_at::date";
                      $output = array();
                      $result_query = pg_query($sql);
                      if ($result_query) {
                          $arrq = pg_fetch_all($result_query);
                          $output= $arrq;
                                  
                      }
              
                      return json_encode($output);
              
                      $this->closeConnection();
                  }      

                  public function getTotal_SurveyedCount() {

                    //   $sql="select date_created::date,count(*) from demand_point where  date_created::date<>'2021-12-01' group by date_created::date order by date_created::date";
                        $sql="select count(*) from demand_point where phase is not null and phase<>''";
                          $output = array();
                          $result_query = pg_query($sql);
                          if ($result_query) {
                              $arrq = pg_fetch_all($result_query);
                              $output= $arrq;
                                      
                          }
                  
                          return json_encode($output);
                  
                          $this->closeConnection();
                      }    
                      
                    public function getTotal_DoneToday() {

                        //   $sql="select date_created::date,count(*) from demand_point where  date_created::date<>'2021-12-01' group by date_created::date order by date_created::date";
                            $sql="select count(*) from demand_point where updated_at::date=now()::date";
                              $output = array();
                              $result_query = pg_query($sql);
                              if ($result_query) {
                                  $arrq = pg_fetch_all($result_query);
                                  $output= $arrq;
                                          
                              }
                      
                              return json_encode($output);
                      
                              $this->closeConnection();
                    }      

                    public function getTotal_submitted() {

                            //   $sql="select date_created::date,count(*) from demand_point where  date_created::date<>'2021-12-01' group by date_created::date order by date_created::date";
                                $sql="select count(*) from demand_point where data_submited is not null";
                                  $output = array();
                                  $result_query = pg_query($sql);
                                  if ($result_query) {
                                      $arrq = pg_fetch_all($result_query);
                                      $output= $arrq;
                                              
                                  }
                          
                                  return json_encode($output);
                          
                                  $this->closeConnection();
                    }          
}

$json = new Tehsil();
//$json->closeConnection();
if($_GET['id']=='all'){
echo $json->getAllCounts();
}else if($_GET['id']=='today'){
    echo $json->getTodayCounts();
}else if($_GET['id']=='date'){
    echo $json->getDateCounts();
}else if($_GET['id']=='total'){
    echo $json->getTotal_SurveyedCount();
}
else if($_GET['id']=='today_survey'){
    echo $json->getTotal_DoneToday();
}
else if($_GET['id']=='submit'){
    echo $json->getTotal_submitted();
}


