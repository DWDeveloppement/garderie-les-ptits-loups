#!/bin/bash

# Script pour tuer les processus sur les ports spécifiés
# Usage: ./scripts/kill-ports.sh [ports...]

# Couleurs pour l'affichage
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Fonction pour tuer un port
kill_port() {
    local port=$1
    printf "${YELLOW}🔍 Recherche de processus sur le port ${port}...${NC}\n"
    
    # Chercher le PID du processus utilisant le port
    local pid=$(lsof -ti:$port 2>/dev/null)
    
    if [ -z "$pid" ]; then
        printf "${GREEN}✅ Aucun processus trouvé sur le port ${port}${NC}\n"
    else
        printf "${YELLOW}⚠️  Processus trouvé (PID: ${pid}) sur le port ${port}${NC}\n"
        kill -9 $pid 2>/dev/null
        if [ $? -eq 0 ]; then
            printf "${GREEN}✅ Port ${port} libéré avec succès${NC}\n"
        else
            printf "${RED}❌ Erreur lors de la libération du port ${port}${NC}\n"
        fi
    fi
    printf "\n"
}

# Si aucun argument, afficher l'usage
if [ $# -eq 0 ]; then
    printf "${RED}Usage: $0 [ports...]${NC}\n"
    printf "Exemple: $0 3000 3333\n"
    exit 1
fi

# Tuer tous les ports passés en arguments
for port in "$@"; do
    kill_port $port
done

printf "${GREEN}✨ Terminé !${NC}\n"

