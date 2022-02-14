#!/bin/bash
set -e
yum update -y
npm install -g npm
npm i yarn
npm install pm2 -g
yarn
