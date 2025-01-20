FROM nouchka/sqlite3:latest

# Set the working directory where the database will be stored
WORKDIR /data

# Expose a volume for persistent storage
VOLUME ["/data"]

# Default command to keep the SQLite service alive
CMD ["sqlite3"]
