#!/bin/bash
set -e
yum update -y
yum install nodejs14
npm install -g npm
npm i yarn
npm install pm2 -g

