#!/bin/bash

# Script pour démarrer/relancer un serveur de développement local
# Usage: ./start-server.sh [port] [--external]
# L'option --external ouvre le serveur dans un terminal externe

PORT=${1:-8000}
EXTERNAL=false

# Vérifier si --external est passé
if [[ "$1" == "--external" ]] || [[ "$2" == "--external" ]]; then
    EXTERNAL=true
    # Si le premier argument est --external, utiliser le port par défaut
    if [[ "$1" == "--external" ]]; then
        PORT=8000
    fi
fi

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Fonction pour tuer les processus sur le port
kill_port() {
    local port=$1
    echo "🛑 Arrêt des processus existants sur le port $port..."
    
    # macOS/Linux
    if command -v lsof &> /dev/null; then
        lsof -ti:$port | xargs kill -9 2>/dev/null || true
    # Alternative avec netstat (si lsof n'est pas disponible)
    elif command -v netstat &> /dev/null; then
        PIDS=$(netstat -anv | grep ":$port" | grep LISTEN | awk '{print $9}' | sort -u)
        if [ ! -z "$PIDS" ]; then
            kill -9 $PIDS 2>/dev/null || true
        fi
    fi
    
    sleep 1
}

# Tuer les processus existants
kill_port $PORT

# Détecter le serveur disponible
SERVER_CMD=""
if command -v python3 &> /dev/null; then
    SERVER_CMD="python3 -m http.server $PORT"
elif command -v python &> /dev/null; then
    SERVER_CMD="python -m SimpleHTTPServer $PORT"
elif command -v npx &> /dev/null; then
    SERVER_CMD="npx -y serve -p $PORT"
elif command -v php &> /dev/null; then
    SERVER_CMD="php -S localhost:$PORT"
else
    echo "❌ Erreur: Aucun serveur HTTP trouvé"
    echo ""
    echo "Veuillez installer l'un des outils suivants:"
    echo "  - Python 3 (recommandé): brew install python3"
    echo "  - Node.js: brew install node"
    echo "  - PHP: brew install php"
    exit 1
fi

# Si --external est activé, ouvrir dans un terminal externe
if [ "$EXTERNAL" = true ]; then
    echo "🚀 Ouverture du serveur dans un terminal externe..."
    echo "📁 Répertoire: $PROJECT_DIR"
    echo "🌐 Port: $PORT"
    echo ""
    
    # Créer un script temporaire pour le terminal externe
    TEMP_SCRIPT=$(mktemp -t plum-server-XXXXXX.sh 2>/dev/null || echo "/tmp/plum-server-$$.sh")
    cat > "$TEMP_SCRIPT" << EOF
#!/bin/bash
cd "$PROJECT_DIR"
echo "🚀 Serveur Plum Living"
echo "📁 Répertoire: $PROJECT_DIR"
echo "🌐 Port: $PORT"
echo ""
echo "✅ Serveur démarré"
echo "📍 URL: http://localhost:$PORT"
echo "📍 URL: http://127.0.0.1:$PORT"
echo ""
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""
$SERVER_CMD
EOF
    chmod +x "$TEMP_SCRIPT"
    
    # Ouvrir un nouveau terminal avec le script
    osascript -e "tell application \"Terminal\" to do script \"$TEMP_SCRIPT\""
    
    echo "✅ Terminal externe ouvert avec le serveur"
    echo "📍 URL: http://localhost:$PORT"
else
    # Mode normal : lancer dans le terminal actuel
    echo "🚀 Démarrage du serveur pour Plum Living..."
    echo "📁 Répertoire: $PROJECT_DIR"
    echo "🌐 Port: $PORT"
    echo ""
    
    if [[ "$SERVER_CMD" == *"python3"* ]]; then
        echo "✅ Utilisation de Python 3 HTTP Server"
    elif [[ "$SERVER_CMD" == *"python"* ]]; then
        echo "✅ Utilisation de Python HTTP Server"
    elif [[ "$SERVER_CMD" == *"npx"* ]]; then
        echo "✅ Utilisation de npx serve"
    elif [[ "$SERVER_CMD" == *"php"* ]]; then
        echo "✅ Utilisation de PHP Built-in Server"
    fi
    
    echo "📍 URL: http://localhost:$PORT"
    echo "📍 URL: http://127.0.0.1:$PORT"
    echo ""
    echo "Appuyez sur Ctrl+C pour arrêter le serveur"
    echo ""
    
    cd "$PROJECT_DIR" && eval "$SERVER_CMD"
fi

