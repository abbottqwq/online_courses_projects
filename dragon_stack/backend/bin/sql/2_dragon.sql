create table dragon (
    id serial primary key,
    birthday timestamp not null,
    nickname varchar(64),
    generationId integer,
    foreign key (generationId) references generation (id)
);