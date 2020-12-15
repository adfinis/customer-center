#!/usr/bin/env bash
set -e
set -x

# Change to project directory
cd $(dirname $(dirname $(realpath ${0})))

# Install dependencies
ln -s config-dev.js backend/config.js
make install-frontend install-backend
docker-compose up -d
make install
