# Gebruik een lichte Python-image
FROM python:3.11-slim

# Zet werkdirectory in de container
WORKDIR /app

# Kopieer requirements en installeer Python packages
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Kopieer de hele backend-code naar de container
COPY . .

# Zorg dat poort 5000 bereikbaar is
EXPOSE 5000

# Start de app
CMD ["python", "app.py"]
