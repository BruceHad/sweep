<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['comp']))
{
    $comp = $_GET['comp'];
    if(isset($_GET['group'])){
        $group = $_GET['group'];
        $query=mysql_query("
            select
              st.team_id,
              st.team_name,
              st.status team_status,
              sp.pick_name,
              sp.g_group_id
            from 
              sweep_teams st
              left outer join (
                select 
                  t_team_id,
                  pick_name,
                  g_group_id
                from sweep_picks
                where g_group_id = '$group')sp
                on (st.team_id = sp.t_team_id)
            where st.c_comp_id = '$comp'
        ;") or die(mysql_error());
    }
     
    # Collect the results
    while($obj = mysql_fetch_object($query)) {
        $arr[] = $obj;
    }
    # JSON-encode the response
    echo $json_response = json_encode($arr);
} 
else {
    echo "Not found";
}

?>