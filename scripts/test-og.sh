#!/bin/bash

# Make sure the script is executable
# chmod +x scripts/test-og.sh

# Get the metadata from the local development server
curl -s http://localhost:3000/blog/test-og-metadata | grep -A 10 '<meta property="og:"'
