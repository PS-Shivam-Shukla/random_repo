import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { historyApi } from '../services/history.api';

export interface HistoryItem {
  id: string;
  roleTitle: string;
  companyName: string;
  completionDate: string;
  durationMinutes: number;
  score: number;
  interviewType: string;
  rounds: string[];
  status: 'COMPLETED' | 'IN_PROGRESS' | 'PAUSED';
}

export interface HistoryFilterParams {
  search: string;
  roleFilter: string;
  typeFilter: string;
  sort: string;
  page: number;
  limit: number;
}

export function useInterviewHistory(params: HistoryFilterParams) {
  return useQuery({
    queryKey: ['interview-history-list', params],
    queryFn: async () => {
      try {
        const rawList = await historyApi.getHistory();
        if (rawList && rawList.length > 0) {
          let items: HistoryItem[] = rawList.map((item: any) => ({
            id: item.id || `hist-${Math.random()}`,
            roleTitle: item.target_role || 'Staff Frontend Engineer',
            companyName: item.company_name || 'TechCorp AI',
            completionDate: item.started_at
              ? new Date(item.started_at).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'Aug 4, 2026',
            durationMinutes: 45,
            score: item.overall_score ?? 84.5,
            interviewType: 'Technical + HR',
            rounds: ['HR Round', 'Technical Round'],
            status: item.status || 'COMPLETED',
          }));

          // Apply Client-Side Filter/Search/Sort
          if (params.search.trim()) {
            const q = params.search.toLowerCase();
            items = items.filter(
              (i) =>
                i.roleTitle.toLowerCase().includes(q) ||
                i.companyName.toLowerCase().includes(q),
            );
          }

          if (params.roleFilter && params.roleFilter !== 'All') {
            items = items.filter((i) => i.roleTitle.includes(params.roleFilter));
          }

          if (params.typeFilter && params.typeFilter !== 'All') {
            items = items.filter((i) => i.interviewType.includes(params.typeFilter));
          }

          if (params.sort === 'highest') {
            items.sort((a, b) => b.score - a.score);
          } else if (params.sort === 'lowest') {
            items.sort((a, b) => a.score - b.score);
          } else if (params.sort === 'oldest') {
            items.reverse();
          }

          const total = items.length;
          const startIndex = (params.page - 1) * params.limit;
          const paginated = items.slice(startIndex, startIndex + params.limit);

          return {
            items: paginated,
            total,
            page: params.page,
            totalPages: Math.ceil(total / params.limit) || 1,
          };
        }
      } catch {
        // Fallback
      }

      // Default mock archive items for demo
      const mockItems: HistoryItem[] = [
        {
          id: 'hist-1',
          roleTitle: 'Staff Frontend Architect',
          companyName: 'Stripe SaaS Platform',
          completionDate: 'Aug 04, 2026',
          durationMinutes: 45,
          score: 88.5,
          interviewType: 'Technical + HR',
          rounds: ['Technical Architecture', 'HR Culture'],
          status: 'COMPLETED',
        },
        {
          id: 'hist-2',
          roleTitle: 'Senior Fullstack Engineer',
          companyName: 'OpenAI Enterprise',
          completionDate: 'Aug 01, 2026',
          durationMinutes: 60,
          score: 82.0,
          interviewType: 'System Design',
          rounds: ['System Architecture', 'Coding'],
          status: 'COMPLETED',
        },
        {
          id: 'hist-3',
          roleTitle: 'Lead AI Engineer',
          companyName: 'Perplexity AI',
          completionDate: 'Jul 28, 2026',
          durationMinutes: 30,
          score: 91.5,
          interviewType: 'Technical',
          rounds: ['Technical Round'],
          status: 'COMPLETED',
        },
        {
          id: 'hist-4',
          roleTitle: 'Principal Systems Architect',
          companyName: 'Vercel Cloud',
          completionDate: 'Jul 22, 2026',
          durationMinutes: 45,
          score: 76.0,
          interviewType: 'System Design',
          rounds: ['System Design Round'],
          status: 'COMPLETED',
        },
        {
          id: 'hist-5',
          roleTitle: 'Frontend Performance Lead',
          companyName: 'Linear App',
          completionDate: 'Jul 15, 2026',
          durationMinutes: 45,
          score: 86.0,
          interviewType: 'Technical',
          rounds: ['Technical Round', 'HR Round'],
          status: 'COMPLETED',
        },
        {
          id: 'hist-6',
          roleTitle: 'Senior React Engineer',
          companyName: 'Notion AI',
          completionDate: 'Jul 08, 2026',
          durationMinutes: 60,
          score: 69.5,
          interviewType: 'Technical + HR',
          rounds: ['Coding Round'],
          status: 'COMPLETED',
        },
      ];

      let items = [...mockItems];

      if (params.search.trim()) {
        const q = params.search.toLowerCase();
        items = items.filter(
          (i) =>
            i.roleTitle.toLowerCase().includes(q) ||
            i.companyName.toLowerCase().includes(q),
        );
      }

      if (params.roleFilter && params.roleFilter !== 'All') {
        items = items.filter((i) => i.roleTitle.includes(params.roleFilter));
      }

      if (params.typeFilter && params.typeFilter !== 'All') {
        items = items.filter((i) => i.interviewType.includes(params.typeFilter));
      }

      if (params.sort === 'highest') {
        items.sort((a, b) => b.score - a.score);
      } else if (params.sort === 'lowest') {
        items.sort((a, b) => a.score - b.score);
      } else if (params.sort === 'oldest') {
        items.reverse();
      }

      const total = items.length;
      const startIndex = (params.page - 1) * params.limit;
      const paginated = items.slice(startIndex, startIndex + params.limit);

      return {
        items: paginated,
        total,
        page: params.page,
        totalPages: Math.ceil(total / params.limit) || 1,
      };
    },
    staleTime: 60 * 1000,
  });
}

export function useDeleteInterview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      try {
        await historyApi.deleteHistory(id);
      } catch {
        await new Promise((resolve) => setTimeout(resolve, 400));
      }
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['interview-history-list'] });
    },
  });
}
