#!/bin/bash

# Script pour relancer les serveurs backend et frontend dans des terminaux externes
# Usage: ./relance-servers.sh [frontend_port] [backend_port]

FRONTEND_PORT=${1:-8000}
BACKEND_PORT=${2:-3000}
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔄 Relance des serveurs..."
echo "📁 Répertoire: $PROJECT_DIR"
echo ""

# Fonction pour tuer les processus sur un port
kill_port() {
    local port=$1
    echo "🛑 Arrêt des processus existants sur le port $port..."
    
    if command -v lsof &> /dev/null; then
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    elif command -v netstat &> /dev/null; then
        PIDS=$(netstat -anv | grep ":$port" | grep LISTEN | awk '{print $9}' | sort -u)
        if [ ! -z "$PIDS" ]; then
            kill -9 $PIDS 2>/dev/null || true
        fi
    fi
    
    sleep 1
}

# Fonction pour créer et lancer un serveur dans un terminal externe
launch_server() {
    local name=$1
    local port=$2
    local command=$3
    local description=$4
    
    kill_port $port
    
    TEMP_SCRIPT=$(mktemp -t plum-${name}-XXXXXX.sh 2>/dev/null || echo "/tmp/plum-${name}-$$.sh")
    cat > "$TEMP_SCRIPT" << EOF
#!/bin/bash
cd "$PROJECT_DIR"
clear
echo "🚀 Serveur ${name} - Plum Living"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📁 Répertoire: $PROJECT_DIR"
echo "🌐 Port: $port"
echo "📝 Description: $description"
echo ""
echo "✅ Serveur démarré"
echo "📍 URL: http://localhost:$port"
echo "📍 URL: http://127.0.0.1:$port"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""
$command
EOF
    
    chmod +x "$TEMP_SCRIPT"
    
    # Ouvrir un nouveau terminal avec le script
    osascript -e "tell application \"Terminal\" to do script \"$TEMP_SCRIPT\"" 2>/dev/null || {
        echo "⚠️  Impossible d'ouvrir un terminal externe pour ${name}"
        echo "💡 Exécutez manuellement: $TEMP_SCRIPT"
        return 1
    }
    
    echo "✅ Terminal externe ouvert pour ${name} (port $port)"
    return 0
}

# Détecter et lancer le serveur BACKEND
BACKEND_CMD=""
BACKEND_FOUND=false

# Vérifier si un package.json existe (Node.js backend)
if [ -f "$PROJECT_DIR/package.json" ]; then
    if command -v npm &> /dev/null; then
        # Vérifier si un script "start" ou "dev" existe
        if grep -q "\"start\"" "$PROJECT_DIR/package.json" || grep -q "\"dev\"" "$PROJECT_DIR/package.json"; then
            if grep -q "\"dev\"" "$PROJECT_DIR/package.json"; then
                BACKEND_CMD="npm run dev"
            else
                BACKEND_CMD="npm start"
            fi
            BACKEND_FOUND=true
            echo "📦 Backend Node.js détecté (npm)"
        fi
    fi
fi

# Vérifier si un serveur Python backend existe (Flask, FastAPI, Django)
if [ "$BACKEND_FOUND" = false ]; then
    if [ -f "$PROJECT_DIR/app.py" ] || [ -f "$PROJECT_DIR/main.py" ] || [ -f "$PROJECT_DIR/server.py" ]; then
        if command -v python3 &> /dev/null; then
            if [ -f "$PROJECT_DIR/requirements.txt" ]; then
                # Flask ou FastAPI
                if grep -q "flask" "$PROJECT_DIR/requirements.txt" 2>/dev/null; then
                    BACKEND_CMD="python3 -m flask run --port=$BACKEND_PORT"
                    BACKEND_FOUND=true
                    echo "🐍 Backend Flask détecté"
                elif grep -q "fastapi" "$PROJECT_DIR/requirements.txt" 2>/dev/null; then
                    BACKEND_CMD="python3 -m uvicorn main:app --port $BACKEND_PORT"
                    BACKEND_FOUND=true
                    echo "🐍 Backend FastAPI détecté"
                fi
            fi
        fi
    fi
fi

# Vérifier si un serveur Go existe
if [ "$BACKEND_FOUND" = false ]; then
    if [ -f "$PROJECT_DIR/main.go" ] || [ -f "$PROJECT_DIR/server.go" ]; then
        if command -v go &> /dev/null; then
            BACKEND_CMD="go run *.go"
            BACKEND_FOUND=true
            echo "🐹 Backend Go détecté"
        fi
    fi
fi

# Lancer le backend si trouvé
if [ "$BACKEND_FOUND" = true ]; then
    launch_server "BACKEND" "$BACKEND_PORT" "$BACKEND_CMD" "Serveur backend API"
    sleep 1
else
    echo "ℹ️  Aucun backend détecté (recherche: package.json, app.py, main.py, server.py, main.go)"
    echo "   Le projet semble être uniquement frontend"
fi

# Détecter et lancer le serveur FRONTEND
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
    echo "❌ Erreur: Aucun serveur HTTP trouvé pour le frontend"
    echo ""
    echo "Veuillez installer l'un des outils suivants:"
    echo "  - Python 3 (recommandé): brew install python3"
    echo "  - Node.js: brew install node"
    echo "  - PHP: brew install php"
    exit 1
fi

launch_server "FRONTEND" "$FRONTEND_PORT" "$FRONTEND_CMD" "Serveur frontend statique"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ Serveurs relancés dans des terminaux externes"
if [ "$BACKEND_FOUND" = true ]; then
    echo "📍 Backend: http://localhost:$BACKEND_PORT"
fi
echo "📍 Frontend: http://localhost:$FRONTEND_PORT"
echo ""
echo "💡 Pour arrêter les serveurs, fermez les terminaux ou appuyez sur Ctrl+C dans chaque terminal"



