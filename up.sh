#!/bin/bash

# This script updates the website based on the last commit 

for line in `git show --stat --name-only --diff-filter=ACMRTUXB --oneline HEAD | tail -n +2`;
do
    curl -T $line ftp://dragonfli.es/public_html/thatoneline/$line --user dragonf 
done;
