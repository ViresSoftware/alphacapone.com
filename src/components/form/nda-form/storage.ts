import type { NdaFlowStep } from "./StepNav"
import type { BuyerProfileValues, NdaFormValues } from "./schema"

const PREFIX = "alpha-nda-flow"
const KEY_FLOW = `${PREFIX}:state`
const KEY_NDA_DRAFT = `${PREFIX}:nda-draft`
const KEY_BUYER_DRAFT = `${PREFIX}:buyer-draft`

function readJSON<T>(key: string): T | null {
  if (typeof window === "undefined") return null
  try {
    const raw = window.localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : null
  } catch {
    return null
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore quota / privacy-mode errors
  }
}

function remove(key: string) {
  if (typeof window === "undefined") return
  try {
    window.localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

export type FlowSnapshot = {
  currentStep?: NdaFlowStep
  ndaData?: NdaFormValues | null
}

export const flowStorage = {
  read: () => readJSON<FlowSnapshot>(KEY_FLOW),
  write: (v: FlowSnapshot) => writeJSON(KEY_FLOW, v),
  clear: () => remove(KEY_FLOW),
}

export const ndaDraftStorage = {
  read: () => readJSON<Partial<NdaFormValues>>(KEY_NDA_DRAFT),
  write: (v: Partial<NdaFormValues>) => writeJSON(KEY_NDA_DRAFT, v),
  clear: () => remove(KEY_NDA_DRAFT),
}

export const buyerDraftStorage = {
  read: () => readJSON<Partial<BuyerProfileValues>>(KEY_BUYER_DRAFT),
  write: (v: Partial<BuyerProfileValues>) => writeJSON(KEY_BUYER_DRAFT, v),
  clear: () => remove(KEY_BUYER_DRAFT),
}

export function clearAllNdaFlowStorage() {
  flowStorage.clear()
  ndaDraftStorage.clear()
  buyerDraftStorage.clear()
}
