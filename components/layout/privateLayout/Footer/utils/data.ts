export interface FooterTabItem {
  id: string;
  label: string;
  icon: string;
  route: string;
  isActive?: boolean;
}

export const footerTabs: FooterTabItem[] = [
  {
    id: '1',
    label: 'Home',
    icon: 'home',
    route: '/(Home)',
  },
  {
    id: '2',
    label: 'Learning',
    icon: 'book',
    route: '/learning',
  },
  {
    id: '3',
    label: 'Schedule',
    icon: 'calendar',
    route: '/schedule',
  },
  {
    id: '4',
    label: 'Games',
    icon: 'game',
    route: '/games',
  },
  {
    id: '5',
    label: 'Exams',
    icon: 'exam',
    route: '/exams',
  },
];