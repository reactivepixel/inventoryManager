#!/bin/bash
# Update database after a schema change

# Set your remote name
remote_name=origin

# Set your mysql username
user=root

# Set your mysql password
# This is currently not used in the script but feel free
# Just be sure to add the -p flag along with the $password variable name down below in mysql_action function
password=password


git_pull () {
  echo ======================
  echo Pulling down master...
  echo ======================

  git pull $remote_name master

  echo ======================
  echo git pull completed
  echo ======================
  echo

  npm_install
}

npm_install () {
  echo ======================
  echo Running npm install...
  echo ======================

  npm install

  echo ======================
  echo all packages updated
  echo ======================
  echo

  mysql_restart
}

mysql_restart () {
  mysql.server restart

  mysql_action
}

mysql_action () {
  result=$(mysql -u $user -s -N -e "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME='gravity'");

  if [ $result ];
    then
      echo ======================
      echo Dropping $result db
      echo ======================
      echo

      mysql -u root -e "DROP DATABASE gravity;"

      echo ======================
      echo Recreating $result db
      echo ======================
      echo

      mysql -u root -e "CREATE DATABASE gravity;"
    else
      echo ======================
      echo Creating $result db
      echo ======================
      echo

      mysql -u root -e "CREATE DATABASE gravity;"
    fi

  echo ======================
  echo I am root...
  echo ======================
  echo

  gulp_dev_task
}

gulp_dev_task () {
  gulp dev
}

git_pull