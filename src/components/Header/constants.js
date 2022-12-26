const links = (ofComponent) => ({
  withAuth: [
    {
      id: 1,
      title: 'HOME',
      route: '/',
    },
    {
      id: 2,
      title: 'DASHBOARD',
      route: '/dashboard',
    },
    {
      id: 3,
      title: 'NEEDS',
      route: '/needs',
    },
    {
      id: 4,
      title: 'PROFILE',
      route: '/profile',
    },
    {
      id: 5,
      title: ofComponent === "Login" ? null : 'Log In / Sign Up',
      route: ofComponent === "Login" ? null : '/login',
    }
  ],
  withoutAuth: [
    {
      id: 1,
      title: 'HOME',
      route: '/',
    },
    {
      id: 2,
      title: 'NEEDS',
      route: '/needs',
    },
    {
      id: 3,
      title: ofComponent === "Login" ? null : 'Log In / Sign Up',
      route: ofComponent === "Login" ? null : '/login',
    }
  ],
});

export {
  links,
}
