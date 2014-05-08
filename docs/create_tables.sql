create table if not exists sweep_competitions(
    comp_id varchar(10) not null,
    comp_name varchar(50) not null,
    primary key (comp_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 
;

insert into sweep_competitions
    (comp_id, comp_name)
values
    ('wc2014', 'World Cup 2014')
;

create table if not exists sweep_groups(
    group_id int(10) not null auto_increment,
    group_name varchar(50) not null,
    c_comp_id  varchar(10) not null,
    primary key (group_id),
    FOREIGN KEY (c_comp_id) REFERENCES sweep_competitions(comp_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5
;

insert into sweep_groups
    (group_id, group_name, c_comp_id)
values
    (5, 'First Group', 'wc2014')
;

create table if not exists sweep_teams(
    team_id int(10) not null auto_increment,
    team_name varchar(50) not null,
    status  varchar(10) not null,
    c_comp_id varchar(10) not null,
    primary key (team_id),
    FOREIGN KEY (c_comp_id) REFERENCES sweep_competitions(comp_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 
;

insert into `sweep_teams` 
    (`c_comp_id`, `team_name`, `status`)
values 
    ('wc2014', 'Brazil', 'in'),
('wc2014', 'Croatia', 'in'),
('wc2014', 'Mexico', 'in'),
('wc2014', 'Cameroon', 'in'),
('wc2014', 'Spain', 'in'),
('wc2014', 'Netherlands', 'in'),
('wc2014', 'Chile', 'in'),
('wc2014', 'Australia', 'in');
--
('wc2014', 'Colombia', 'in'),
('wc2014', 'Greece', 'in'),
('wc2014', 'Ivory Coast', 'in'),
('wc2014', 'Japan', 'in'),
('wc2014', 'Uruguay', 'in'),
('wc2014', 'Costa Rica', 'in'),
('wc2014', 'England', 'in'),
('wc2014', 'Italy', 'in'),
('wc2014', 'Switzerland', 'in'),
('wc2014', 'Ecuador', 'in'),
('wc2014', 'France', 'in'),
('wc2014', 'Honduras', 'in'),
('wc2014', 'Argentina', 'in'),
('wc2014', 'Bosnia-Hercegovina', 'in'),
('wc2014', 'Iran', 'in'),
('wc2014', 'Nigeria', 'in'),
('wc2014', 'Germany', 'in'),
('wc2014', 'Portugal', 'in'),
('wc2014', 'Ghana', 'in'),
('wc2014', 'USA', 'in'),
('wc2014', 'Belgium', 'in'),
('wc2014', 'Algeria', 'in'),
('wc2014', 'Russia', 'in'),
('wc2014', 'South Korea', 'in')
;

create table if not exists sweep_picks(
    sp_id int(10) not null auto_increment,
    t_team_id int(10) not null,
    pick_name varchar(50) not null,
    g_group_id int(10) not null,
    primary key (sp_id),
    FOREIGN KEY (t_team_id) REFERENCES sweep_teams(team_id),
    FOREIGN KEY (g_group_id) REFERENCES sweep_groups(group_id)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=5 
;

