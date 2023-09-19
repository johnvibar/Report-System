#! /bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

# move to the project folder
cd $SCRIPT_DIR
npm install && npm run aws-postbuild
cp frontend/public/.htaccess frontend/build/.htaccess
