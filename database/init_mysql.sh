#!/bin/bash

DB="simulatie_db"
USER="root"
PASS="P@ssword1234!"

for file in *.sql; do
    echo "Importing $file..."
    mysql -u $USER -p$PASS $DB < "$file"
done
