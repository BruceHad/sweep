-- Groups
select 
    group_id,
    group_name,
    comp_id
from sweep_groups
;
-- Users
select user_id,
    username,
    email,
    av_url
from sweep_users
;

-- User Groups
select 
    swg_id,
    group_id,
    user_id
from sweep_user_group
;

-- Users + Groups
select 
    su.user_id,
    su.username,
    su.email,
    su.av_url,
    sg.group_id,
    sg.group_name
from sweep_users su
    inner join sweep_user_group sug
    on (su.user_id = sug.user_id)
    inner join sweep_groups sg
    on (sg.group_id = sug.group_id)
where su.user = '5340529'

-- Teams
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
    and (sut.group_id = '$group_id' or sut.group_id is null)
;

-- Competitions
select *
from sweep_competitions
;

-- All
select 
    sweep_groups.group_id,
    sweep_groups.group_name,
    sweep_groups.competition,
    sweep_users.user_id,
    sweep_users.username,
    sweep_users.nickname,
    sweep_users.av_url,
    sweep_teams.team_id,
    sweep_teams.name,
    sweep_teams.status,
    sweep_teams.odds,
    sweep_teams.competition,
    sweep_users.user_id,
    sweep_users.username,
    sweep_users.nickname
from sweep_groups
    inner join sweep_users
    on (sweep_groups.group_id = sweep_users.group_id)
    left join sweep_user_team 
    on (sweep_users.user_id = sweep_user_team.user_id)
    left outer join sweep_teams
    on (sweep_teams.team_id = sweep_user_team.team_id)
;

SELECT
    sweep_teams.team_id,
    sweep_teams.name,
    sweep_teams.status,
    sweep_teams.odds,
    sweep_teams.competition,
    if(sweep_user_team.user_id is not null, 'true', 'false') picked
FROM sweep_teams
    left join sweep_user_team
    on (sweep_teams.team_id = sweep_user_team.team_id)

;

