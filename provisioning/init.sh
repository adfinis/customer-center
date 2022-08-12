#!/usr/bin/env bash
set -e

# Change to project directory
cd $(dirname $(dirname $(realpath ${0})))

# Install dependencies
make install-frontend
docker-compose up -d
make install
