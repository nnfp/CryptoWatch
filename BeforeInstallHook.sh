#!/bin/bash
set -e
yum update -y
yum -y install nodejs
npm install -g npm
npm i yarn
npm install pm2 -g
yarn
