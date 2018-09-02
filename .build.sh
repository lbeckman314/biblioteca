#!/bin/bash

project=biblioteca
production=/var/www/pkgs/$project

git archive --format=tar -v -o $project.tar.gz HEAD
git archive --format=zip -v -o $project.zip HEAD

#tar -zcvf $project.tar.gz $project
#zip -r $project.zip $project

sha256sum *.tar.gz *.zip > sha256sums.txt
gpg --pinentry-mode loopback --passphrase $gpgpass --batch --yes --detach-sign -a sha256sums.txt

mv $project.tar.gz $project.zip sha256sums.txt* $production
