#!/bin/bash
set -e

# Ensure Node.js (>=16) is available
if ! command -v node >/dev/null; then
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

# Install project dependencies and run tests
npm ci
npm test
