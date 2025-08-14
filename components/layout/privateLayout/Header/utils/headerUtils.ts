// Header utility functions and constants

export interface User {
  id: string;
  name: string;
  role: string;
  avatar?: string;
  initials: string;
}

export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  action: string;
}

// Get user initials from full name
export const getUserInitials = (fullName: string): string => {
  return fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .slice(0, 2);
};

// Menu items configuration
export const menuItems: MenuItem[] = [
  {
    id: '1',
    title: 'My Profile',
    icon: '👤',
    action: 'profile',
  },
  {
    id: '2',
    title: 'My Guardian',
    icon: '👨‍👩‍👧‍👦',
    action: 'guardian',
  },
  {
    id: '3',
    title: 'My Scholarships',
    icon: '🏆',
    action: 'scholarships',
  },
];

// Mock user data (replace with actual user data from Redux/context)
export const mockUser: User = {
  id: '1',
  name: 'John Smith',
  role: 'Student Dashboard',
  initials: getUserInitials('John Smith'),
};

// Navigation handlers
export const handleNavigation = (action: string) => {
  switch (action) {
    case 'profile':
      console.log('Navigate to Profile');
      // router.push('/profile');
      break;
    case 'guardian':
      console.log('Navigate to Guardian');
      // router.push('/guardian');
      break;
    case 'scholarships':
      console.log('Navigate to Scholarships');
      // router.push('/scholarships');
      break;
    case 'logout':
      console.log('Logout user');
      // Handle logout logic
      break;
    default:
      console.log('Unknown action:', action);
  }
};
