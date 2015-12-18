#!/bin/bash
#update database after a schema change

git_pull () {
    echo Pulling down master...
    git pull origin master
    echo git pull completed

    npm_install
}

npm_install () {
    echo Running npm install...
    npm install
    echo all packages updated

    mysql_restart
}

mysql_restart () {
    mysql.server restart

    mysql_action
}

mysql_action () {
    result=$(mysql -u root -s -N -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME='gravity'");

    if [ "$result" ];
        then
            echo Dropping "$result" db
            mysql -u root -e "DROP DATABASE gravity;"
            echo Recreating "$result" db
            mysql -u root -e "CREATE DATABASE gravity;"
        else
            echo Creating "$result" db
            mysql -u root -e "CREATE DATABASE gravity;"
        fi

    echo I am root...
    gulp_dev_task
}

gulp_dev_task () {
    gulp dev
}

git_pull