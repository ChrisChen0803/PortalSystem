#!/bin/bash

# Navigate to the server folder and run npm install
echo "Installing dependencies for server..."
cd server
npm install
cd ..

# Navigate to the admin folder and run npm install
echo "Installing dependencies for admin..."
cd admin
npm install
cd ..

# Navigate to the web folder and run npm install
echo "Installing dependencies for web..."
cd web
npm install
cd ..
