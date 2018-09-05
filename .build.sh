#!/bin/bash

project=biblioteca
pkgs=/var/www/pkgs/$project
production=/var/www/$project

# restart production server

#ps -aux | grep --extended-regexp "[8]083" | awk '{print $2}'
cd $production
./node_modules/forever/bin/forever stop database.js
git pull origin master
./node_modules/forever/bin/forever database.js 8083


# move compressed files and sha/gpg signatures to packages directory
git archive --format=tar -v -o $project.tar.gz HEAD
git archive --format=zip -v -o $project.zip HEAD

sha256sum *.tar.gz *.zip > sha256sums.txt
gpg --pinentry-mode loopback --passphrase $gpgpass --batch --yes --detach-sign -a sha256sums.txt

mv $project.tar.gz $project.zip sha256sums.txt* $pkgs
