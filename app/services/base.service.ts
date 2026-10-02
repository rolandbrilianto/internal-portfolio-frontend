import type { ServiceResult } from '~/types/common'

/**
 * Frontend-only data access abstraction.
 *
 * No network request is performed in this phase. Each method returns an
 * empty result with `not_connected` status so a future REST/GraphQL client
 * can be swapped in without touching stores or components.
 */
export interface DataService<TKey, TItem> {
  /** Read path. Maps to GET on a future backend. */
  fetchAll(): Promise<ServiceResult<TItem[]>>
  /** Read path for a single record. */
  fetchById(id: TKey): Promise<ServiceResult<TItem | null>>
}

export function notConnected<T>(message: string): ServiceResult<T> {
  return { data: undefined as T, status: 'not_connected', message }
}

/** Simulates the latency of a real request so loading states stay meaningful. */
export function simulateLatency(delay = 150): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, delay))
}

export function emptyList<T>(): ServiceResult<T[]> {
  return { data: [], status: 'empty', message: 'No records are available yet.' }
}

export function notFound<T>(message: string): ServiceResult<T | null> {
  return { data: null, status: 'empty', message }
}
