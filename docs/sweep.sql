-- Groups
select 
    group_id,
    group_name,
    competition
from sweep_groups
;

select user_id,
    username,
    nickname,
    av_url,
    group_id
from sweep_users
;

-- User Groups
select user_id, nickname, av_url, group_name, competition
    from sweep_users 
    inner join sweep_groups
    on (sweep_users.group_id = sweep_groups.group_id)
    where competition = 'wc2014'
order by group_name, competition
;

-- Teams
select 
    team_id,
    name,
    status,
    odds,
    competition
from sweep_teams
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

