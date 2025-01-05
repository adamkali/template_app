#!/bin/bash

# Check if we have enough arguments
if [ $# -lt 2 ]; then
    echo "Usage: $0 <project_directory> <replacement_string>"
    exit 1
fi

PROJECT_DIR=$1
REPLACEMENT=$2

echo "Searching for 'template_app' in $PROJECT_DIR..."

find "$PROJECT_DIR" -type f -exec grep -r --color=never 'template_app' {} \; | sed "s/template_app/$REPLACEMENT/g"
