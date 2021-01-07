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

if [ ${machine} == "MinGw" ] || [ ${machine} == "Cygwin" ]; then
	for i in "${arr[@]}"; do
		echo "$i"
		psql.exe -U node_user dragonstackdb <"$i"
	done
elif [ ${machine} == "Mac" ] || [ ${machine} == "Linux" ]; then
	for i in "${arr[@]}"; do
		echo "$i"
		psql -U node_user dragonstackdb <"$i"
	done
fi

node ./bin/insertTraits.js


echo "dragonstackdb configure"
$SHELL
