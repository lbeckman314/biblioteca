#!/bin/bash
set +x

project=biblioteca
pkgs=/var/www/pkgs/$project
production=/var/www/$project
main=database.js
port=8083
BUILD_ID=dontKillMe

echo "restart production server"
nodeid=`ps -aux | grep --extended-regexp "[${port:0:1}]${port:1}" | awk '{print $2}'`

if [ $nodeid ]
then
    kill $nodeid
fi

cd $production
git pull origin master
(node $main $port &)

echo "move compressed files and sha/gpg signatures to packages directory"
git archive --format=tar -o $project.tar.gz HEAD
git archive --format=zip -o $project.zip HEAD

sha256sum *.tar.gz *.zip > sha256sums.txt
gpg --pinentry-mode loopback --passphrase $gpgpass --batch --yes --detach-sign -a sha256sums.txt

mv $project.tar.gz $project.zip sha256sums.txt* $pkgs
