#!/bin/bash

# Script simple pour tuer les serveurs et lancer back/front
# Usage: ./start.sh [frontend_port] [backend_port]

FRONTEND_PORT=${1:-8000}
BACKEND_PORT=${2:-3000}
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🛑 Arrêt des serveurs existants..."

# Fonction pour tuer les processus sur un port
kill_port() {
    local port=$1
    if command -v lsof &> /dev/null; then
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    elif command -v netstat &> /dev/null; then
        PIDS=$(netstat -anv | grep ":$port" | grep LISTEN | awk '{print $9}' | sort -u)
        if [ ! -z "$PIDS" ]; then
            kill -9 $PIDS 2>/dev/null || true
        fi
    fi
}

# Tuer les serveurs sur les ports frontend et backend
kill_port $FRONTEND_PORT
kill_port $BACKEND_PORT

sleep 1

# Détecter et lancer le BACKEND
BACKEND_CMD=""
BACKEND_FOUND=false

# Vérifier Node.js backend
if [ -f "$PROJECT_DIR/package.json" ] && command -v npm &> /dev/null; then
    if grep -q "\"dev\"" "$PROJECT_DIR/package.json"; then
        BACKEND_CMD="npm run dev"
        BACKEND_FOUND=true
    elif grep -q "\"start\"" "$PROJECT_DIR/package.json"; then
        BACKEND_CMD="npm start"
        BACKEND_FOUND=true
    fi
fi

# Vérifier Python backend
if [ "$BACKEND_FOUND" = false ]; then
    if [ -f "$PROJECT_DIR/app.py" ] || [ -f "$PROJECT_DIR/main.py" ] || [ -f "$PROJECT_DIR/server.py" ]; then
        if command -v python3 &> /dev/null; then
            if [ -f "$PROJECT_DIR/requirements.txt" ]; then
                if grep -q "flask" "$PROJECT_DIR/requirements.txt" 2>/dev/null; then
                    BACKEND_CMD="python3 -m flask run --port=$BACKEND_PORT"
                    BACKEND_FOUND=true
                elif grep -q "fastapi" "$PROJECT_DIR/requirements.txt" 2>/dev/null; then
                    BACKEND_CMD="python3 -m uvicorn main:app --port $BACKEND_PORT"
                    BACKEND_FOUND=true
                fi
            fi
        fi
    fi
fi

# Lancer le backend si trouvé
if [ "$BACKEND_FOUND" = true ]; then
    echo "🚀 Lancement du backend sur le port $BACKEND_PORT..."
    cd "$PROJECT_DIR" && $BACKEND_CMD &
    BACKEND_PID=$!
    echo "✅ Backend démarré (PID: $BACKEND_PID)"
    echo "📍 Backend: http://localhost:$BACKEND_PORT"
fi

# Détecter et lancer le FRONTEND
FRONTEND_CMD=""
if command -v python3 &> /dev/null; then
    FRONTEND_CMD="python3 -m http.server $FRONTEND_PORT"
elif command -v python &> /dev/null; then
    FRONTEND_CMD="python -m SimpleHTTPServer $FRONTEND_PORT"
elif command -v npx &> /dev/null; then
    FRONTEND_CMD="npx -y serve -p $FRONTEND_PORT"
elif command -v php &> /dev/null; then
    FRONTEND_CMD="php -S localhost:$FRONTEND_PORT"
else
    echo "❌ Erreur: Aucun serveur HTTP trouvé"
    exit 1
fi

echo "🚀 Lancement du frontend sur le port $FRONTEND_PORT..."
cd "$PROJECT_DIR" && $FRONTEND_CMD
