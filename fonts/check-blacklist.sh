#!/bin/bash
# Script pour vérifier la présence des fichiers Blacklist

BLACKLIST_DIR="./blacklist"
REQUIRED_FILES=(
  "Great Studio - Blacklist-Regular.otf"
  "Great Studio - Blacklist Variable Thin.ttf"
)

echo "Vérification des fichiers Blacklist..."
echo ""

if [ ! -d "$BLACKLIST_DIR" ]; then
  echo "❌ Le dossier $BLACKLIST_DIR n'existe pas"
  exit 1
fi

echo "📁 Fichiers trouvés dans $BLACKLIST_DIR:"
ls -1 "$BLACKLIST_DIR" | head -10
echo ""

MISSING=0
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$BLACKLIST_DIR/$file" ]; then
    echo "✅ $file"
  else
    echo "❌ $file (MANQUANT)"
    MISSING=1
  fi
done

echo ""
if [ $MISSING -eq 0 ]; then
  echo "✅ Les fichiers essentiels sont présents !"
else
  echo "⚠️  Certains fichiers essentiels manquent"
  echo ""
  echo "Pour télécharger depuis Dropbox:"
  echo "1. Ouvrez le lien Dropbox"
  echo "2. Téléchargez tous les fichiers"
  echo "3. Placez-les dans: $(pwd)/blacklist/"
fi





