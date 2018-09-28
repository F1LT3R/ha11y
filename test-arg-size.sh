#!/bin/bash
a="1"
while true
do
    a=$a$a
    echo "$(date) $(numfmt --to=iec-i --suffix=B --padding=7 ${#a})" 
done