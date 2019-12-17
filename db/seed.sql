create table users (
    user_id serial primary key,
    email varchar(50),
    username varchar(50),
    password varchar(100)
)

create table loadouts (
    loadout_id serial primary key,
    foreign key (user_id) references users(user_id),
    kinetic varchar(50),
    energy varchar(50),
    heavy varchar(50),
    helmet varchar(50),
    arms varchar(50),
    chest varchar(50),
    legs varchar(50),
    class varchar(50)
)