#!/usr/bin/env python3
"""
Analyse des données d'utilisation Cursor
"""
import csv
import sys
from datetime import datetime
from collections import defaultdict

# Parse le CSV depuis stdin (avec tabulations)
data = []
reader = csv.DictReader(sys.stdin, delimiter='\t')
for row in reader:
    data.append(row)

# Debug: afficher les colonnes si nécessaire
if not data:
    print("Aucune donnée trouvée")
    sys.exit(1)

# Statistiques générales
total_cost = sum(float(row['Cost']) for row in data)
total_requests = len(data)
total_tokens = sum(int(row['Total Tokens']) for row in data)

# Par modèle
models = defaultdict(lambda: {'count': 0, 'cost': 0, 'tokens': 0})
for row in data:
    model = row['Model']
    models[model]['count'] += 1
    models[model]['cost'] += float(row['Cost'])
    models[model]['tokens'] += int(row['Total Tokens'])

# Par type (Kind)
kinds = defaultdict(lambda: {'count': 0, 'cost': 0})
for row in data:
    kind = row['Kind']
    kinds[kind]['count'] += 1
    kinds[kind]['cost'] += float(row['Cost'])

# Requêtes les plus coûteuses
expensive_requests = sorted(data, key=lambda x: float(x['Cost']), reverse=True)[:10]

# Analyse des dates
dates = [datetime.fromisoformat(row['Date'].replace('Z', '+00:00')) for row in data]
date_range = f"{min(dates).strftime('%Y-%m-%d')} à {max(dates).strftime('%Y-%m-%d')}"

print("=" * 80)
print("ANALYSE DE VOTRE UTILISATION CURSOR")
print("=" * 80)
print(f"\n📅 Période : {date_range}")
print(f"📊 Total de requêtes : {total_requests}")
print(f"💰 Coût total : ${total_cost:.2f}")
print(f"🔢 Total de tokens : {total_tokens:,}")

print("\n" + "=" * 80)
print("RÉPARTITION PAR MODÈLE")
print("=" * 80)
for model, stats in sorted(models.items(), key=lambda x: x[1]['cost'], reverse=True):
    pct = (stats['cost'] / total_cost * 100) if total_cost > 0 else 0
    print(f"\n{model}:")
    print(f"  • Requêtes : {stats['count']} ({stats['count']/total_requests*100:.1f}%)")
    print(f"  • Coût : ${stats['cost']:.2f} ({pct:.1f}% du total)")
    print(f"  • Tokens : {stats['tokens']:,}")

print("\n" + "=" * 80)
print("RÉPARTITION PAR TYPE")
print("=" * 80)
for kind, stats in sorted(kinds.items(), key=lambda x: x[1]['cost'], reverse=True):
    pct = (stats['cost'] / total_cost * 100) if total_cost > 0 else 0
    print(f"\n{kind}:")
    print(f"  • Requêtes : {stats['count']} ({stats['count']/total_requests*100:.1f}%)")
    print(f"  • Coût : ${stats['cost']:.2f} ({pct:.1f}% du total)")

print("\n" + "=" * 80)
print("TOP 10 REQUÊTES LES PLUS COÛTEUSES")
print("=" * 80)
for i, req in enumerate(expensive_requests[:10], 1):
    date = datetime.fromisoformat(req['Date'].replace('Z', '+00:00'))
    print(f"\n{i}. {date.strftime('%Y-%m-%d %H:%M')} - {req['Model']}")
    print(f"   Coût : ${float(req['Cost']):.2f}")
    print(f"   Tokens : {int(req['Total Tokens']):,}")
    print(f"   Cache Read : {int(req['Cache Read']):,}")

print("\n" + "=" * 80)
print("RECOMMANDATIONS")
print("=" * 80)

# Analyse et recommandations
opus_usage = models.get('claude-4.5-opus-high-thinking', {'count': 0, 'cost': 0})
opus_pct = (opus_usage['cost'] / total_cost * 100) if total_cost > 0 else 0

print(f"\n1. MODÈLE CLAUDE-4.5-OPUS-HIGH-THINKING")
print(f"   • Utilisé dans {opus_usage['count']} requêtes ({opus_pct:.1f}% du coût)")
if opus_pct > 50:
    print("   ⚠️  Ce modèle est très coûteux. Considérez utiliser 'auto' plus souvent")
    print("      qui choisit automatiquement le meilleur modèle selon le contexte.")

composer_usage = models.get('composer-1', {'count': 0, 'cost': 0})
if composer_usage['count'] > 0:
    print(f"\n2. COMPOSER-1 (AGENT)")
    print(f"   • {composer_usage['count']} requêtes gratuites")
    print("   ✅ Excellente utilisation ! Les agents sont gratuits.")

free_count = kinds.get('Free', {'count': 0})['count']
included_count = kinds.get('Included', {'count': 0})['count']
print(f"\n3. RÉPARTITION COÛTS")
print(f"   • Requêtes gratuites : {free_count}")
print(f"   • Requêtes incluses (abonnement) : {included_count}")
if total_cost > 0:
    print(f"   • Coût supplémentaire : ${total_cost:.2f}")
    print("   💡 Ce coût est probablement inclus dans votre abonnement Pro")

# Analyse du cache
total_cache_read = sum(int(row['Cache Read']) for row in data)
total_input = sum(int(row['Input (w/ Cache Write)']) + int(row['Input (w/o Cache Write)']) for row in data)
cache_efficiency = (total_cache_read / (total_cache_read + total_input) * 100) if (total_cache_read + total_input) > 0 else 0

print(f"\n4. EFFICACITÉ DU CACHE")
print(f"   • Cache lu : {total_cache_read:,} tokens")
print(f"   • Efficacité : {cache_efficiency:.1f}%")
if cache_efficiency < 30:
    print("   💡 Le cache pourrait être mieux utilisé. Les requêtes répétitives")
    print("      bénéficient du cache et réduisent les coûts.")

# Coût moyen par requête
avg_cost = total_cost / total_requests if total_requests > 0 else 0
print(f"\n5. COÛT MOYEN")
print(f"   • Coût moyen par requête : ${avg_cost:.4f}")
print(f"   • Tokens moyens par requête : {total_tokens/total_requests:,.0f}")

print("\n" + "=" * 80)
print("CONCLUSION")
print("=" * 80)
print(f"\nVotre utilisation totale : ${total_cost:.2f}")
print(f"Nombre de requêtes : {total_requests}")
print(f"\n💡 CONSEILS :")
print("   • Utilisez 'auto' au lieu de spécifier manuellement claude-4.5-opus")
print("   • Les agents Composer sont gratuits - utilisez-les pour les tâches complexes")
print("   • Le cache réduit les coûts - les requêtes similaires sont moins chères")
print("   • Votre renouvellement est le 19 décembre - vous avez encore du crédit inclus")
