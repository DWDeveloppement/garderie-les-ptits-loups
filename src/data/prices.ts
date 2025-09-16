// Types pour la structure Sanity optimisée (Option 3)
export type PriceItem = {
	description: string
	price: number
}

// Type de base réutilisable (DRY)
export type PricingSection = {
	label: string
	items: PriceItem[]
}

// Types composés sans répétition
export type PricingBlockMensuel = {
	label: string // "Prix au mois"
	journeeComplete: PricingSection
	matinRepas: PricingSection
	matinSansRepas: PricingSection
	apresMidiRepas: PricingSection
	apresMidiSansRepas: PricingSection
}

export type PricingBlockJournalier = {
	label: string // "Prix au jour"
	journeeComplete: PricingSection
	matinee: PricingSection
	apresMidi: PricingSection
}

{
	/* Redéfinition du document.
	 * Le titre Nurserie, Trotteurs et Grands, Subventions seront des titres en * h2 en dur dans chaque section.
	 * Chaque section aura 2 articles correspondans chaqun à un tableau de prix fixe avec un titre en h3 label string et un tableau prixAuMois et la même chose pour Prix au jour avev de nouveau un titre en h3 label string et un tableau prixAuJour.
	 * PriceDocument title et ageRange sont inutiles car seront en dur dans chaque section.
	 */
}
export type PriceDocument = {
	_id: string
	_type: string
	prixAuMois: PricingBlockMensuel
	prixAuJour: PricingBlockJournalier
}

export type SubsidiesDocument = {
	_id: string
	_type: string
	title: string // "Subventions communales de Mont-sur-Lausanne"
	labelIncomeRange: string // "Revenus annuels familial"
	labelReduction: string // "subvention accordée/jour"
	items: {
		incomeRange: string // "Revenus en CHF annuels familial déterminants"
		reductionDaily: number // "subvention accordée/jour"
	}[]
}

// Simulation des données Sanity - UN document avec 2 fieldsets
export const nurserieData: PriceDocument = {
	_id: 'nurserie',
	_type: 'priceDocument',
	prixAuMois: {
		label: 'Prix au mois',
		journeeComplete: {
			label: 'Journée complète',
			items: [
				{ description: '1 jour / semaine', price: 540 },
				{ description: '2 jours / semaine', price: 1080 },
				{ description: '3 jours / semaine', price: 1620 },
				{ description: '4 jours / semaine', price: 2160 },
				{ description: '5 jours / semaine', price: 2700 },
			],
		},
		matinRepas: {
			label: 'Matin avec repas',
			items: [
				{ description: '1 jour / semaine', price: 540 },
				{ description: '2 jours / semaine', price: 1080 },
				{ description: '3 jours / semaine', price: 1620 },
				{ description: '4 jours / semaine', price: 2160 },
				{ description: '5 jours / semaine', price: 2700 },
			],
		},
		matinSansRepas: {
			label: 'Matin sans repas',
			items: [
				{ description: '1 jour / semaine', price: 540 },
				{ description: '2 jours / semaine', price: 1080 },
				{ description: '3 jours / semaine', price: 1620 },
				{ description: '4 jours / semaine', price: 2160 },
				{ description: '5 jours / semaine', price: 2700 },
			],
		},
		apresMidiRepas: {
			label: 'Après-midi avec repas',
			items: [
				{ description: '1 jour / semaine', price: 540 },
				{ description: '2 jours / semaine', price: 1080 },
				{ description: '3 jours / semaine', price: 1620 },
				{ description: '4 jours / semaine', price: 2160 },
				{ description: '5 jours / semaine', price: 2700 },
			],
		},
		apresMidiSansRepas: {
			label: 'Après-midi sans repas',
			items: [
				{ description: '1 jour / semaine', price: 540 },
				{ description: '2 jours / semaine', price: 1080 },
				{ description: '3 jours / semaine', price: 1620 },
				{ description: '4 jours / semaine', price: 2160 },
				{ description: '5 jours / semaine', price: 2700 },
			],
		},
	},
	prixAuJour: {
		label: 'Prix au jour',
		journeeComplete: {
			label: 'Journée complète',
			items: [{ description: 'de 7h.00 à 18h.00 (repas inclus)', price: 135 }],
		},
		matinee: {
			label: 'Matinée',
			items: [
				{ description: 'de 7h.00 à 11h.15 (sans repas)', price: 80 },
				{ description: 'de 7h.00 à 12h.30 (repas inclus)', price: 85 },
				{ description: 'de 7h.00 à 14h.30 (repas et sieste inclus)', price: 85 },
			],
		},
		apresMidi: {
			label: 'Après-midi',
			items: [
				{ description: 'de 14h.30 à 18h.00 (sans repas)', price: 80 },
				{ description: 'de 14h.30 à 18h.00 (repas inclus)', price: 85 },
				{ description: 'de 14h.30 à 18h.00 (repas et sieste inclus)', price: 85 },
			],
		},
	},
}

export const trotteursGrandsData: PriceDocument = {
	_id: 'trotteurs-grands',
	_type: 'priceDocument',
	prixAuMois: {
		label: 'Prix au mois',
		journeeComplete: {
			label: 'Journée complète',
			items: [
				{ description: '1 jour / semaine', price: 480 },
				{ description: '2 jours / semaine', price: 960 },
				{ description: '3 jours / semaine', price: 1440 },
				{ description: '4 jours / semaine', price: 1920 },
				{ description: '5 jours / semaine', price: 2400 },
			],
		},
		matinRepas: {
			label: 'Matinée avec repas',
			items: [
				{ description: '1 jour / semaine', price: 480 },
				{ description: '2 jours / semaine', price: 960 },
				{ description: '3 jours / semaine', price: 1440 },
				{ description: '4 jours / semaine', price: 1920 },
				{ description: '5 jours / semaine', price: 2400 },
			],
		},
		matinSansRepas: {
			label: 'Matinée sans repas',
			items: [
				{ description: '1 jour / semaine', price: 480 },
				{ description: '2 jours / semaine', price: 960 },
				{ description: '3 jours / semaine', price: 1440 },
				{ description: '4 jours / semaine', price: 1920 },
				{ description: '5 jours / semaine', price: 2400 },
			],
		},
		apresMidiRepas: {
			label: 'Après-midi avec repas',
			items: [
				{ description: '1 jour / semaine', price: 480 },
				{ description: '2 jours / semaine', price: 960 },
				{ description: '3 jours / semaine', price: 1440 },
				{ description: '4 jours / semaine', price: 1920 },
				{ description: '5 jours / semaine', price: 2400 },
			],
		},
		apresMidiSansRepas: {
			label: 'Après-midi sans repas',
			items: [
				{ description: '1 jour / semaine', price: 480 },
				{ description: '2 jours / semaine', price: 960 },
				{ description: '3 jours / semaine', price: 1440 },
				{ description: '4 jours / semaine', price: 1920 },
				{ description: '5 jours / semaine', price: 2400 },
			],
		},
	},
	prixAuJour: {
		label: 'Prix au jour',
		journeeComplete: {
			label: 'Journée complète',
			items: [{ description: 'de 7h.00 à 18h.00 (repas inclus)', price: 120 }],
		},
		matinee: {
			label: 'Matinée',
			items: [
				{ description: 'de 7h.00 à 11h.15 (sans repas)', price: 70 },
				{ description: 'de 7h.00 à 12h.30 (repas inclus)', price: 75 },
				{ description: 'de 7h.00 à 14h.30 (repas et sieste inclus)', price: 75 },
			],
		},
		apresMidi: {
			label: 'Après-midi',
			items: [
				{ description: 'de 12h.30 à 18h.00 (sans repas)', price: 70 },
				{ description: 'de 11h.30 à 18h.00 (repas inclus)', price: 75 },
				{ description: 'de 11h.30 à 18h.00 (repas et sieste inclus)', price: 75 },
			],
		},
	},
}

export const labelHading = {
	incomeRange: 'Revenus annuels familial', // viendra de Sanity depuis un input prédéfini si le client veut le modifier
	reductionDaily: 'subvention accordée/jour', // viendra de Sanity depuis un input prédéfini si le client veut le modifier
}
export const subventionsData: SubsidiesDocument = {
	_id: 'subventions',
	_type: 'subsidiesDocument',
	title: 'Subventions communales de Mont-sur-Lausanne',
	labelIncomeRange: labelHading.incomeRange, // viendra de Sanity depuis un input prédéfini si le client veut le modifier
	labelReduction: labelHading.reductionDaily, // viendra de Sanity depuis un input prédéfini si le client veut le modifier
	//Les items viendront de Sanity grace à un add item dans le fieldset subventionsContent dans lequel il y aura un input pour le revenu et un input pour la subvention
	items: [
		{
			incomeRange: "Moins de CHF 60'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 74.77, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 60'001 à CHF 66'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 70.62, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 66'001 à CHF 72'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 66.46, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 72'001 à CHF 78'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 62.31, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 78'001 à CHF 84'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 58.16, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 84'001 à CHF 90'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 54.0, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 90'001 à CHF 96'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 49.85, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 96'001 à CHF 102'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 45.69, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 102'001 à CHF 108'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 41.54, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 108'001 à CHF 114'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 37.39, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 114'001 à CHF 120'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 33.23, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 120'001 à CHF 126'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 29.08, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 126'001 à CHF 132'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 24.93, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 132'001 à CHF 138'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 20.77, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 138'001 à CHF 144'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 16.62, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 144'001 à CHF 150'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 12.46, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 150'001 à CHF 156'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 8.31, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "De CHF 156'001 à CHF 162'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 4.16, // viendra de sanity depuis l'input pour la subvention
		},
		{
			incomeRange: "Plus de CHF 162'000", // viendra de sanity depuis l'input pour le revenu
			reductionDaily: 0.0, // viendra de sanity depuis l'input pour la subvention
		},
	],
}

//afficher les datas sous forme de commentaire pour le tableau copier coller des subventions ci dessous
/*
colonne 1                    | colonne 2
Revenus annuels familial     | subvention
Moins de CHF 60’000          | CHF 74.77
De CHF 60’001 à	CHF 66’000   | CHF 70.62
De CHF 66’001 à	CHF 72’000   | CHF 66.46
De CHF 72’001 à CHF 78‘000   | CHF 62.31
De CHF 78’001 à	CHF 84’000   | CHF 58.16
De CHF 84’001 à CHF 90’000   | CHF 54.00
De CHF 90’001 à	CHF 96’000   | CHF 49.85
De CHF 96’001 à CHF 102’000  | CHF 45.69
De CHF 102’001 à CHF 108’000 | CHF 41.54
De CHF 108’001 à CHF 114’000 | CHF 37.39
De CHF 114’001 à CHF 120’000 | CHF 33.23
De CHF 120’001 à CHF 126’000 | CHF 29.08
De CHF 126’001 à CHF 132’000 | CHF 24.93
De CHF 132’001 à CHF 138’000 | CHF 20.77
De CHF 138’001 à CHF 144’000 | CHF 16.62
De CHF 144’001 à CHF 150’000 | CHF 12.46
De CHF 150’001 à CHF 156’000 | CHF 8.31
De CHF 156’001 à CHF 162’000 | CHF 4.16
Plus de	CHF 162’000          | CHF 0.00
*/

// en mobile le tableau ser affiché avec un hading unique pour les 2 colonnes et le revenu et la subvention pour chaque row. ex:
/*
___________________________________
|Revenus annuels     | subvention | tablehead - tr - 2td
|---------------------------------|
|Moins de CHF 60'000 | CHF 74.77  |tbody - tr - 2td
----------------------------------
un gap de 1rem
_________________________________________
|Revenus annuels            | subvention | tablehad - tr - td
-----------------------------------------|
|De CHF 60’001 à CHF 66’000 | CHF 74.77 | tbody - tr - td
-----------------------------------------
un gap de 1rem
... jusqu'à la dernière ligne
*/
// Export centralisé pour faciliter l'import
export const allPriceDocuments = [nurserieData, trotteursGrandsData, subventionsData]

// ========================================
// SIMULATION SANITY CMS - STRUCTURE CORRECTE
// ========================================
//
// Cette structure simule exactement ce que Sanity retournerait
// avec la structure correcte (UN document avec 2 fieldsets) :
//
// Structure Sanity par document :
// Document "nurserie"
// ├── Fieldset "Prix au mois" (fieldset fixe)
// │   ├── label "Prix au mois" (fixe)
// │   ├── Toggle fixe "Journée complète" → Add Items (description + prix)
// │   ├── Toggle fixe "Matinée" → Add Items (description + prix)
// │   └── Toggle fixe "Après-midi" → Add Items (description + prix)
// ├── Fieldset "Prix au jour" (fieldset fixe)
// │   ├── label "Prix au jour" (fixe)
// │   ├── Toggle fixe "Journée complète" → Add Items (description + prix)
// │   ├── Toggle fixe "Matinée" → Add Items (description + prix)
// │   └── Toggle fixe "Après-midi" → Add Items (description + prix)
//
// Avantages :
// ✅ Sécurité maximale (fieldsets et toggles fixes)
// ✅ UX claire (un seul "Add Item" par toggle)
// ✅ Maintenance minimale (structure prévisible)
// ✅ Cohérence garantie (format uniforme)
