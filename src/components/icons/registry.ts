// 📂 src/components/icons/registry.ts
// 👉 Registre centralisé : n'importe QUE les icônes nécessaires (tree-shaking)

import {
	AlertTriangle,
	AtSign,
	Baby,
	BookOpen,
	Calendar,
	CheckCircle2,
	ChevronDown,
	ChevronLeft,
	ChevronRight,
	ChevronUp,
	Clock,
	Copy,
	Download,
	Eye,
	EyeOff,
	Footprints,
	Heart,
	Home,
	Image as ImageIcon,
	Info,
	Loader2,
	LogOut,
	Mail,
	MapPin,
	Menu,
	Phone,
	Search,
	Send,
	SendHorizontal,
	Settings,
	Smile,
	Star,
	Upload,
	User,
	Users,
	X,
	XCircle,
	ZoomIn,
	ZoomOut,
} from 'lucide-react'

/**
 * Registre des icônes Lucide
 *
 * Avantages :
 * - Tree-shaking automatique (seules les icônes importées sont incluses)
 * - Typage strict (IconName)
 * - Cohérence d'usage dans toute l'app
 * - Refactoring facilité (renommage, remplacement)
 *
 * @example
 * ```tsx
 * <Icon name="success" size="md" />
 * ```
 */
export const ICONS = {
	// Icônes de feedback
	info: Info,
	warning: AlertTriangle,
	success: CheckCircle2,
	error: XCircle,

	// Icônes de navigation
	chevronLeft: ChevronLeft,
	chevronRight: ChevronRight,
	chevronDown: ChevronDown,
	chevronUp: ChevronUp,

	// Icônes de formulaire
	mail: Mail,
	email: AtSign,
	phone: Phone,
	user: User,
	send: Send,
	sendHorizontal: SendHorizontal,

	// Icônes UI
	close: X,
	menu: Menu,
	home: Home,
	loader: Loader2,

	// Icônes de contenu
	clock: Clock,
	mapPin: MapPin,
	copy: Copy,
	calendar: Calendar,
	users: Users,
	heart: Heart,
	star: Star,
	baby: Baby,
	footprints: Footprints,
	smile: Smile,
	bookOpen: BookOpen,

	// Icônes d'actions
	download: Download,
	upload: Upload,
	search: Search,
	settings: Settings,
	logout: LogOut,
	eye: Eye,
	eyeOff: EyeOff,

	// Icônes galerie
	image: ImageIcon,
	zoomIn: ZoomIn,
	zoomOut: ZoomOut,
} as const

/**
 * Type union de tous les noms d'icônes disponibles
 * Auto-complété dans l'IDE + validation TypeScript
 */
export type IconName = keyof typeof ICONS
