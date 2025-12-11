# Guide de Configuration MCP pour Figma dans Cursor

## 📋 Vue d'ensemble

Ce guide explique comment configurer un serveur MCP (Model Context Protocol) pour accéder à Figma depuis Cursor.

## 🔧 Configuration dans Cursor

### Option 1 : Via l'interface Cursor (Recommandé)

1. **Ouvrir les paramètres de Cursor**
   - Sur macOS : `Cmd + ,` ou `Cursor > Settings`
   - Sur Windows/Linux : `Ctrl + ,` ou `File > Preferences > Settings`

2. **Rechercher "MCP" dans les paramètres**
   - Tapez "MCP" dans la barre de recherche des paramètres
   - Ou allez dans `Features > MCP Servers`

3. **Ajouter un serveur MCP**
   - Cliquez sur "Add MCP Server" ou le bouton "+"
   - Configurez comme suit :

### Option 2 : Via le fichier de configuration

Le fichier de configuration MCP se trouve généralement à :
- **macOS** : `~/Library/Application Support/Cursor/User/globalStorage/mcp.json`
- **Windows** : `%APPDATA%\Cursor\User\globalStorage\mcp.json`
- **Linux** : `~/.config/Cursor/User/globalStorage/mcp.json`

## 🎨 Configuration pour Figma MCP Server

### Installation du serveur MCP Figma

1. **Installer Node.js** (si ce n'est pas déjà fait)
   ```bash
   # Vérifier l'installation
   node --version
   npm --version
   ```

2. **Installer le serveur MCP Figma**
   ```bash
   npm install -g @modelcontextprotocol/server-figma
   ```

### Configuration dans Cursor

**Votre token est déjà configuré dans `mcp-config.local.json` !**

Pour l'ajouter dans Cursor, vous avez deux options :

#### Option A : Copier la configuration manuellement

1. Ouvrez les paramètres MCP dans Cursor
2. Ajoutez un nouveau serveur avec :
   - **Name** : `figma`
   - **Command** : `npx`
   - **Args** : `-y`, `@modelcontextprotocol/server-figma`
   - **Environment Variables** :
     - `FIGMA_ACCESS_TOKEN` : `figd_qaDhEhi20s7qm1UFNLxzLSFFFaeWNDQmPtpqnOr9`

#### Option B : Importer depuis le fichier

Le fichier `mcp-config.local.json` contient déjà votre configuration. Vous pouvez :
1. Ouvrir le fichier de configuration MCP de Cursor (voir emplacement ci-dessous)
2. Copier le contenu de `mcp-config.local.json` dans la section `mcpServers`

## 🔌 Configuration pour un serveur MCP local personnalisé

Si vous avez votre propre serveur MCP local :

```json
{
  "mcpServers": {
    "mon-serveur-local": {
      "command": "node",
      "args": ["/chemin/vers/votre/serveur-mcp.js"],
      "env": {}
    }
  }
}
```

Ou si votre serveur MCP tourne sur un port local :

```json
{
  "mcpServers": {
    "mon-serveur-local": {
      "url": "http://localhost:3000",
      "transport": "http"
    }
  }
}
```

## ✅ Vérification

Après configuration :

1. **Redémarrer Cursor** pour que les changements prennent effet

2. **Vérifier la connexion**
   - Les ressources MCP devraient apparaître automatiquement
   - Vous pouvez utiliser les commandes `list_mcp_resources` et `fetch_mcp_resource`

## 📚 Ressources supplémentaires

- [Documentation MCP officielle](https://modelcontextprotocol.io)
- [Serveur MCP Figma](https://github.com/modelcontextprotocol/servers/tree/main/src/figma)
- [Documentation Cursor MCP](https://cursor.sh/docs/mcp)

## 🐛 Dépannage

### Le serveur MCP ne se connecte pas

1. Vérifiez que Node.js est installé : `node --version`
2. Vérifiez que le token Figma est valide
3. Vérifiez les logs dans Cursor (View > Output > MCP)
4. Redémarrez Cursor

### Les ressources ne s'affichent pas

1. Attendez quelques secondes après le démarrage de Cursor
2. Vérifiez que le serveur MCP est bien démarré
3. Consultez les logs de Cursor pour les erreurs

