create table dragon (
    id             serial primary key,
    birthdate      timestamp not null,
    nickname       varchar(64),
    "generationId" integer,
    foreign key ("generationId") references generation (id)
);