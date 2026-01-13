"use client"

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}/api${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include',
      ...options,
    }

    const response = await fetch(url, config)

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Request failed' }))
      throw new Error(error.error || `HTTP ${response.status}`)
    }

    return response.json()
  }

  // Auth methods
  async getCurrentUser() {
    return this.request('/auth/me')
  }

  // Shipment methods
  async getShipments(params?: {
    page?: number
    limit?: number
    status?: string
  }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.status) searchParams.set('status', params.status)
    
    const query = searchParams.toString()
    return this.request(`/shipments${query ? `?${query}` : ''}`)
  }

  async getShipment(id: string) {
    return this.request(`/shipments/${id}`)
  }

  async createShipment(data: any) {
    return this.request('/shipments', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateShipment(id: string, data: any) {
    return this.request(`/shipments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  async cancelShipment(id: string) {
    return this.request(`/shipments/${id}`, {
      method: 'DELETE',
    })
  }

  // Tracking methods
  async trackShipment(trackingNumber: string) {
    return this.request(`/tracking/${trackingNumber}`)
  }

  // User profile methods
  async getUserProfile() {
    return this.request('/users/profile')
  }

  async updateUserProfile(data: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }

  // Address methods
  async getAddresses() {
    return this.request('/addresses')
  }

  async createAddress(data: any) {
    return this.request('/addresses', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Notification methods
  async getNotifications(params?: {
    page?: number
    limit?: number
    unreadOnly?: boolean
  }) {
    const searchParams = new URLSearchParams()
    if (params?.page) searchParams.set('page', params.page.toString())
    if (params?.limit) searchParams.set('limit', params.limit.toString())
    if (params?.unreadOnly) searchParams.set('unreadOnly', 'true')
    
    const query = searchParams.toString()
    return this.request(`/notifications${query ? `?${query}` : ''}`)
  }

  async markAllNotificationsRead() {
    return this.request('/notifications', {
      method: 'PUT',
    })
  }
}

export const apiClient = new ApiClient()