/**
 * Sanity CLI Configuration
 * This file re-exports the configuration from src/sanity/sanity.config.ts
 * Keep this file at root for Sanity CLI compatibility
 */

import { defineCliConfig } from 'sanity/cli'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!

export default defineCliConfig({ api: { projectId, dataset } })
