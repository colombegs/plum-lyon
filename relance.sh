#!/bin/bash

# Script pour relancer le serveur frontend dans un terminal externe
# Usage: ./relance.sh [port]

PORT=${1:-8000}
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🔄 Relance du serveur..."
echo "📁 Répertoire: $PROJECT_DIR"
echo "🌐 Port: $PORT"
echo ""

# Arrêter les processus existants sur le port
echo "🛑 Arrêt des processus existants sur le port $PORT..."
if command -v lsof &> /dev/null; then
    lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
elif command -v netstat &> /dev/null; then
    PIDS=$(netstat -anv | grep ":$PORT" | grep LISTEN | awk '{print $9}' | sort -u)
    if [ ! -z "$PIDS" ]; then
        kill -9 $PIDS 2>/dev/null || true
    fi
fi

sleep 1

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

# Créer un script temporaire pour le terminal externe
TEMP_SCRIPT=$(mktemp -t plum-server-XXXXXX.sh 2>/dev/null || echo "/tmp/plum-server-$$.sh")
cat > "$TEMP_SCRIPT" << EOF
#!/bin/bash
cd "$PROJECT_DIR"
clear
echo "🚀 Serveur Plum Living"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
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
echo ""
echo "📍 URL: http://localhost:$PORT"
echo "📍 URL: http://127.0.0.1:$PORT"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Appuyez sur Ctrl+C pour arrêter le serveur"
echo ""
$SERVER_CMD
EOF

chmod +x "$TEMP_SCRIPT"

# Ouvrir un nouveau terminal avec le script
osascript -e "tell application \"Terminal\" to do script \"$TEMP_SCRIPT\"" 2>/dev/null || {
    echo "⚠️  Impossible d'ouvrir un terminal externe automatiquement"
    echo "💡 Exécutez manuellement: $TEMP_SCRIPT"
    exit 1
}

echo "✅ Terminal externe ouvert avec le serveur"
echo "📍 URL: http://localhost:$PORT"
echo ""
echo "💡 Pour arrêter le serveur, fermez le terminal ou appuyez sur Ctrl+C dans le terminal du serveur"
