#!/bin/bash
set -e
yum update -y
npm install -g npm
npm install --global yarn
npm install pm2 -g
