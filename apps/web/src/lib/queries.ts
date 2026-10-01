import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from './api'

export function useServices() {
  return useQuery({ queryKey: ['services'], queryFn: api.services.list })
}

export function useService(slug: string | undefined) {
  return useQuery({
    queryKey: ['service', slug],
    queryFn: () => api.services.get(slug!),
    enabled: !!slug,
  })
}

export function useProducts() {
  return useQuery({ queryKey: ['products'], queryFn: api.products.list })
}

export function useProduct(slug: string | undefined) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => api.products.get(slug!),
    enabled: !!slug,
  })
}

export function useBookings() {
  return useQuery({ queryKey: ['bookings'], queryFn: api.bookings.list })
}

export function useCreateBooking() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.bookings.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['bookings'] }),
  })
}
