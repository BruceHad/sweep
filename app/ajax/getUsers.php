<?php
require_once 'db.php'; // The mysql database connection script

if(isset($_GET['email'])){
    $email=$_GET['email'];
    $query=mysql_query("
    select 
        su.user_id,
        su.username,
        su.email,
        su.av_url
    from sweep_users su
    where su.email =  '$email'
;") or die(mysql_error());


    while($obj = mysql_fetch_object($query)) {
        $arr[] = $obj;
    }
     
    # JSON-encode the response
    echo $json_response = json_encode($arr);
}


?>