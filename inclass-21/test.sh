#!/bin/bash
PORT=3000

echo "POST /register"
curl -H 'Content-Type: application/json' http://localhost:3000/register -d "{ \"username\":\"jocelyn\", \"password\":\"han\" }"
echo ""

echo "POST /login"
curl -H 'Content-Type: application/json' http://localhost:3000/login -d "{ \"username\":\"lu\", \"password\":\"mypassword\" }"
echo ""
