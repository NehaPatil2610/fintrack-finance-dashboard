import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { mockTransactions } from '../data/transactions'

export const useFinanceStore = create(
  persist(
    (set, get) => ({
      transactions: mockTransactions,
      userRole: 'Viewer',
      searchQuery: '',
      filter: {
        type: 'all',
        sortBy: 'date',
        sortDir: 'desc',
      },

      setUserRole: (userRole) => set({ userRole }),

      setSearch: (searchQuery) => set({ searchQuery }),

      setFilter: (partial) =>
        set((state) => ({
          filter: { ...state.filter, ...partial },
        })),

      addTransaction: (payload) => {
        const txs = get().transactions
        const nextId = txs.reduce((m, t) => Math.max(m, t.id ?? 0), 0) + 1
        const tx = {
          id: nextId,
          date: payload.date,
          category: payload.category,
          merchant: payload.merchant ?? '',
          amount: Number(payload.amount),
          type: payload.type,
        }
        set({
          transactions: [...txs, tx].sort((a, b) => a.date.localeCompare(b.date)),
        })
      },

      updateTransaction: (id, payload) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id
              ? {
                  ...t,
                  ...payload,
                  merchant:
                    payload.merchant !== undefined
                      ? payload.merchant
                      : t.merchant ?? '',
                  amount:
                    payload.amount !== undefined
                      ? Number(payload.amount)
                      : t.amount,
                }
              : t,
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),
    }),
    {
      name: 'fintrack-persist',
      partialize: (state) => ({
        transactions: state.transactions,
        userRole: state.userRole,
      }),
    },
  ),
)
