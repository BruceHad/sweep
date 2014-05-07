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
                st.name team_name,
                st.status team_status,
                sut.user_id user_name,
                sut.group_id
            from sweep_teams st
                left outer join sweep_user_team sut
                on (st.team_id = sut.team_id)
            where st.comp_id = '$comp'
            and (sut.group_id = '$group' or sut.group_id is null)
        ;") or die(mysql_error());
    }
    else {
        $query=mysql_query("
            select
                st.team_id,
                st.name team_name,
                st.status team_status,
                sut.user_id user_name,
                sut.group_id
            from sweep_teams st
            where st.comp_id = '$comp'
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