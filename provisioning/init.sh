#!/usr/bin/env bash
set -e

# Change to project directory
cd $(dirname $(dirname $(realpath ${0})))

# Install dependencies
ln -sfn config-dev.js backend/config.js
make install-frontend install-backend
docker-compose up -d
make install
