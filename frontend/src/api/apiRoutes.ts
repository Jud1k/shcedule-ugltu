export const apiRoutes = {
  auth: {
    register: '/register/',
    login: '/login/',
    logout: '/logout/',
    check: '/check/',
    refresh: '/refresh/',
  },

  group: {
    base: '/group/',
    byId: (id: string) => `/group/${id}`,
    search: '/group/search',
    summary: '/group/summary/',
  },

  room: {
    base: '/room/',
    search: '/room/search',
    byId: (id: string) => `/room/${id}`,
  },

  building: {
    base: '/building/',
    byId: (id: string) => `/building/${id}`,
  },

  subject: {
    base: '/subject/',
    byId: (id: string) => `/subject/${id}`,
  },

  teacher: {
    base: '/teacher/',
    search: '/teacher/search',
    byId: (id: string) => `/teacher/${id}`,
  },

  lesson: {
    base: '/lesson/',
    byId: (id: string) => `/lesson/${id}`,
  },
};
