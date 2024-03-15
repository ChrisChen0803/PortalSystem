#!/bin/bash

# Navigate to the server folder and start the server
cd server
npm start &
SERVER_PID=$!

# Navigate to the admin folder and start the admin app
cd ../admin
npm run serve &
ADMIN_PID=$!

# Navigate to the web folder and start the web app
cd ../web
npm run serve &
WEB_PID=$!

# Wait for all processes to finish
wait $SERVER_PID
wait $ADMIN_PID
wait $WEB_PID
