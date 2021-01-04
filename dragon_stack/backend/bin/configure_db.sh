#!/bin/bash

shopt -s nullglob #The nullglob option causes the array to be empty if there are no matches
arr=(./bin/sql/*.sql)
echo ${arr[@]}

export PGPASSWORD='node_password'

echo "configuring dragonstackdb"

dropdb -U node_user dragonstackdb
createdb -U node_user dragonstackdb

unameOut="$(uname -s)"
case "${unameOut}" in
Linux*) machine=Linux ;;
Darwin*) machine=Mac ;;
CYGWIN*) machine=Cygwin ;;
MINGW*) machine=MinGw ;;
*) machine="UNKNOWN:${unameOut}" ;;
esac
echo ${machine}

# declare -a arr=("./bin/sql/generation.sql" "./bin/sql/dragon.sql" "./bin/sql/trait.sql")

if [ ${machine}=="MinGw" ] || [ ${machine}=="Cygwin" ]; then
	# psql.exe -U node_user dragonstackdb <./bin/sql/generation.sql
	# psql.exe -U node_user dragonstackdb <./bin/sql/dragon.sql
	# psql.exe -U node_user dragonstackdb <./bin/sql/trait.sql
	for i in "${arr[@]}"; do
		echo "$i"
		psql.exe -U node_user dragonstackdb <"$i"
	done

elif [ ${machine}=="Mac" ] || [ ${machine}=="Linux" ]; then
	# psql -U node_user dragonstackdb <./bin/sql/generation.sql
	# psql -U node_user dragonstackdb <./bin/sql/dragon.sql
	# psql -U node_user dragonstackdb <./bin/sql/trait.sql
	for i in "${arr[@]}"; do
		psql -U node_user dragonstackdb <"$i"
	done
fi

node ./bin/insertTraits.js

$SHELL
echo "dragonstackdb configure"
