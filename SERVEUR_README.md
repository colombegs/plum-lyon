# 🚀 Guide de démarrage du serveur

## Utilisation rapide

### Option 1 : Alias global (recommandé)
Depuis n'importe quel terminal, tapez simplement :
```bash
plum-server
```

Ou avec un port personnalisé :
```bash
plum-server 3000
```

**Note** : Après avoir ajouté l'alias, vous devrez peut-être recharger votre shell :
```bash
source ~/.zshrc
```

### Option 2 : Script direct
Depuis le répertoire du projet :
```bash
./start-server.sh
```

Ou avec un port personnalisé :
```bash
./start-server.sh 3000
```

## Fonctionnalités

- ✅ **Arrêt automatique** : Tue les processus existants sur le port avant de démarrer
- ✅ **Détection automatique** : Utilise le serveur disponible (Python, Node.js, PHP)
- ✅ **Port par défaut** : 8000 (modifiable)
- ✅ **Affichage des URLs** : Affiche les URLs d'accès au serveur

## Serveurs supportés

Le script détecte et utilise automatiquement (dans cet ordre) :
1. Python 3 (`python3 -m http.server`)
2. Python 2 (`python -m SimpleHTTPServer`)
3. Node.js (`npx serve`)
4. PHP (`php -S`)

## Arrêter le serveur

Appuyez sur `Ctrl+C` dans le terminal où le serveur tourne.

## Dépannage

Si le port est déjà utilisé, le script le libère automatiquement. Si vous rencontrez des problèmes :

```bash
# Vérifier les processus sur le port 8000
lsof -i :8000

# Tuer manuellement un processus
kill -9 <PID>
```

