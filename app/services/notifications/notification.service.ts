import type { AppNotification, NotificationCounts } from '~/types/notification'
import type { ServiceResult } from '~/types/common'
import { emptyList, simulateLatency } from '../base.service'

/**
 * Notification service abstraction (BRD FR-NT-01, FR-NT-02).
 * Reminder generation and email delivery belong to a later backend phase —
 * this service only models the read contract.
 */
export const notificationService = {
  async fetchNotifications(): Promise<{ data: AppNotification[], counts: NotificationCounts }> {
    await simulateLatency()
    return {
      data: [],
      counts: { total: 0, unread: 0, critical: 0 }
    }
  },

  async fetchUnread(): Promise<ServiceResult<AppNotification[]>> {
    await simulateLatency()
    return emptyList<AppNotification>()
  },

  /** Read state is kept in memory only until a backend endpoint exists. */
  async updateReadState(payload: { id: string | null, read: boolean }): Promise<ServiceResult<boolean>> {
    return { data: payload.read, status: 'not_connected', message: 'Notification persistence is not connected yet.' }
  }
}
