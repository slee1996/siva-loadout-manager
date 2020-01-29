create table users (
    user_id serial primary key,
    email varchar(50),
    username varchar(50),
    password varchar(100)
)

create table loadouts (
    loadout_id serial primary key,
    foreign key (user_id) references users(user_id),
    char_class int, --1: Hunter, 2: Titan, 3: Warlock
    kinetic int,
    energy int,
    heavy int,
    helmet int,
    arms int,
    chest int,
    legs int,
    class_item int,
    membership_id varchar(150)
)

create table weapons (
    weapon_id serial primary key,
    itemHash int,
    itemInstanceId varchar(100),
    quantity int,
    itemHash varchar(100),
    itemHash varchar(100),
    itemHash varchar(100),
    itemHash varchar(100),
    itemHash varchar(100),
    itemHash varchar(100),
    itemHash varchar(100),
    itemHash varchar(100),
)