# Instructions to Run Backend, Database, and Frontend with Docker

This guide provides step-by-step instructions to build and run the backend, database (SQLite) and containers using Docker.

---

## **1. Prerequisites**
- Docker installed on your system.

---

## **2. Running the Database (SQLite)**

1. **Build the SQLite image**:
   ```bash
   docker build -t sqlite-container .
   ```

2. **Run the SQLite container**:
   ```bash
   docker run -d --name sqlite-container -v db_data:/data sqlite-container
   ```

3. **Access SQLite Database**:
   To access the SQLite database in the container:
   ```bash
   docker exec -it sqlite-container sqlite3 /data/pokemon.sqlite
   ```

---

## **3. Running the Backend**

1. **Build the Backend image**:
   ```bash
   docker build -t pokemon-backend .
   ```

2. **Run the Backend container**:
   ```bash
   docker run -d --name pokemon-backend --env DB_PATH=/data/pokemon.sqlite --volume db_data:/data -p 3000:3000 pokemon-backend
   ```

3. **Access the Backend API**:
   The backend API will be available at:
   ```
   http://localhost:3000
   ```

4. **Test the API**:
   Example endpoint to get Pokémon data:
   ```bash
   curl http://localhost:3000/api/pokemon?offset=0&limit=20
   ```



