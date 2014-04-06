<?php

require_once 'db.php'; // The mysql database connection script

if(isset($_GET['comp'])){
    $comp = $_GET['comp'];
    $group = $_GET['group'];
    $query=mysql_query("
    select 
        st.team_id,
        st.name,
        st.status,
        st.competition,
        sut.user_id,
        sut.group_id
    from sweep_teams st
        left outer join sweep_user_team sut
        on (st.team_id = sut.team_id)
    where st.competition = '$comp'
        and (sut.group_id = '$group' or sut.group_id is null)
    ;") or die(mysql_error());
     
    # Collect the results
    while($obj = mysql_fetch_object($query)) {
        $arr[] = $obj;
    }
    # JSON-encode the response
    echo $json_response = json_encode($arr);
} else {
    echo "Not found";
}

?>