#!/bin/bash
set -e
yum update -y
sudo su
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.37.2/install.sh | bash
. ~/.nvm/nvm.sh
nvm install node
node -v
npm install -g npm
npm i yarn
npm install pm2 -g

