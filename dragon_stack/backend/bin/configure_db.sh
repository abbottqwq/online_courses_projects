#!/bin/bash

export PGPASSWORD='node_password'

echo "configuring dragonstackdb"

dropdb -U node_user dragonstackdb
createdb -U node_user dragonstackdb

unameOut="$(uname -s)"
case "${unameOut}" in
    Linux*)     machine=Linux;;
    Darwin*)    machine=Mac;;
    CYGWIN*)    machine=Cygwin;;
    MINGW*)     machine=MinGw;;
    *)          machine="UNKNOWN:${unameOut}"
esac
echo ${machine}

if [ ${machine}=="MinGw" ] || [ ${machine}=="Cygwin" ]; 
then
psql.exe -U node_user dragonstackdb <./bin/sql/generation.sql
psql.exe -U node_user dragonstackdb <./bin/sql/dragon.sql
$SHELL
elif [ ${machine}=="Mac" ] || [ ${machine}=="Linux" ]; then
psql -U node_user dragonstackdb <./bin/sql/generation.sql
psql -U node_user dragonstackdb <./bin/sql/dragon.sql
fi


echo "dragonstackdb configure"
