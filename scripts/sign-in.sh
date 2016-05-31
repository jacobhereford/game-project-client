#!/bin/bash

curl "http://localhost:3000/sign-in" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --data "{
   \"credentials\": {
     \"email\": \"$EMAIL\",
     \"password\": \"$PASSWORD\"
   }
  }"
echo
