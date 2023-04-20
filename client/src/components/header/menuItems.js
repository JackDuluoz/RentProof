export let menuItems = [
  {
    title: 'Admin',
    url: '/',
    admin: true,
    session: true,
    submenu: [
      {
        title: 'Dashboard',
        url: '/admin/dashboard',
      },
      {
        title: 'Pending',
        url: '/admin/pending',
      }
    ]
  },
  {
    title: 'Create',
    url: '/create',
    admin: false,
    session: true,
    submenu: [
    {
        title: 'Find Property',
        url: '/create/property',
      },
      {
        title: 'Update Price',
        url: '/create/update',
      }
    ]
  },
  {
    title: 'Login',
    url: '/login',
    admin: false,
    session: false
  },
  {
    title: 'Register',
    url: '/register',
    admin: false,
    session: false
  },
  {
    title: 'Logout',
    url: '/login',
    admin: false,
    session: true
  }
]