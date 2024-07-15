# Use the official PostgreSQL image from the Docker Hub
FROM postgres:latest

# Set environment variables for the PostgreSQL database
ENV POSTGRES_DB=fin_track_db
ENV POSTGRES_USER=myuser
ENV POSTGRES_PASSWORD=mypassword

# Copy any custom initialization scripts to the Docker entrypoint directory
# Any .sql or .sh files in this directory will be run when the container starts
COPY ./initdb/ /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432
