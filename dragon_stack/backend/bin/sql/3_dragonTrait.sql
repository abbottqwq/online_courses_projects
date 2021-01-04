create table dragonTrait(
    traitId INTEGER,
    dragonId INTEGER,
    foreign key (traitId) REFERENCES trait(id),
    foreign key (dragonId) REFERENCES dragon(id)
)