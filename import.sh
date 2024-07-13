#!/bin/bash

DB_NAME="mydatabase.db"
TABLE_NAME="movies"
CSV_FILE="movielist.csv"

sqlite3 $DB_NAME <<EOF
DROP TABLE IF EXISTS $TABLE_NAME;
CREATE TABLE movies (
    id INTEGER PRIMARY KEY,
    title TEXT,
    year INTEGER,
    producers TEXT,
    studios TEXT,
    winner BOOLEAN
);
.mode csv
.import $CSV_FILE $TABLE_NAME
EOF

echo "Data imported successfully into $TABLE_NAME table in $DB_NAME database."
