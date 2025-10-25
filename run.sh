#!/bin/bash

# Load environment variables from .env (if it exists)
if [ -f .env ]; then
    set -a
    source .env
    set +a
else
    echo ".env file not found! Using default sleep duration of 30 minutes."
    SLEEP_SECONDS=1800
fi

while true; do
    npx playwright test get_backers.spec.ts
    echo "Running check_backers.py script..."
    python3 check_backers.py
    echo "Sleeping for $SLEEP_SECONDS second(s) before next run..."
    sleep "$SLEEP_SECONDS"
done