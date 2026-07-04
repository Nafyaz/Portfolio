#!/bin/sh

echo "Generating ASCII Artwork"
cowsay -f dragon 'Run for cover, I am Dragon!!!' >> dragon.txt
grep -i "dragon" dragon.txt
cat dragon.txt