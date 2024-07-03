#!/bin/bash

DB_NAME="mydatabase.db"
TABLE_NAME="users"
CSV_FILE="data.csv"

sqlite3 $DB_NAME <<EOF
DROP TABLE IF EXISTS $TABLE_NAME;
CREATE TABLE $TABLE_NAME (
    id INTEGER PRIMARY KEY,
    name TEXT,
    email TEXT
);
.mode csv
.import $CSV_FILE $TABLE_NAME
EOF

echo "Data imported successfully into $TABLE_NAME table in $DB_NAME database."
