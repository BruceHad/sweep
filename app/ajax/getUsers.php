<?php
require_once 'db.php'; // The mysql database connection script

if(isset($_GET['name'])){
    $name=$_GET['name'];
    $group = $_GET['group'];

    $query=mysql_query("
    select id from sweep_users 
    where username = '$name';") or die(mysql_error());

    echo "Complete, $name, $group has been added to sweep_users .";

    while($obj = mysql_fetch_object($query)) {
        $arr[] = $obj;
    }
     
    # JSON-encode the response
    echo $json_response = json_encode($arr);
}


?>