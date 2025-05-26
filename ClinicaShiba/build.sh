#!/bin/bash

# Install dependencies
npm ci

# Build the Angular app for production
npm run build:prod

echo "Build completed successfully!" 