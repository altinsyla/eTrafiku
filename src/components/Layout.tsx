
import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { getNotifications, getUserProfile } from '@/lib/storage';
import NotificationPanel from './NotificationPanel';
import { User } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [notificationCount, setNotificationCount] = useState(0);
  const [showNotifications, setShowNotifications] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  
  // Update notification count on mount and when notifications change
  useEffect(() => {
    updateNotificationCount();
    checkUserLoggedIn();
  }, []);
  
  const updateNotificationCount = () => {
    const notifications = getNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;
    setNotificationCount(unreadCount);
  };
  
  const checkUserLoggedIn = () => {
    const userProfile = getUserProfile();
    if (userProfile.id) {
      setUserLoggedIn(true);
      setUserName(userProfile.name || '');
    } else {
      setUserLoggedIn(false);
    }
  };
  
  const navItems = [
    { path: '/', label: 'Home', icon: 'Home' },
    { path: '/tickets', label: 'Tickets', icon: 'Ticket' },
    { path: '/planner', label: 'Trip Planner', icon: 'Map' },
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-30">
        <div className="container mx-auto px-4 flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
          <img src='/eTrafiku.png' alt="Logo" className="h-8 w-8 rounded-full" />
          <span className="font-bold text-xl">eTrafiku</span>
      </Link>
          
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={() => setShowNotifications(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              
              {notificationCount > 0 && (
                <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 min-w-[1.25rem] min-h-[1.25rem] flex items-center justify-center">
                  {notificationCount}
                </Badge>
              )}
            </Button>
            
            {userLoggedIn ? (
              <Button
                variant="outline"
                size="sm"
                className="hidden md:flex items-center gap-2"
                onClick={() => navigate('/profile')}
              >
                <User size={16} />
                <span>{userName}</span>
              </Button>
            ) : (
              <div className="hidden md:flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button 
                  size="sm" 
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </div>
            )}
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[250px] sm:w-[300px]">
                <div className="py-6">
                  <nav className="flex flex-col space-y-2">
                    {navItems.map((item) => (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`px-4 py-2 rounded-md ${
                          location.pathname === item.path
                            ? 'bg-primary text-white'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {item.label}
                      </Link>
                    ))}
                    
                    {userLoggedIn ? (
                      <>
                        <Link
                          to="/profile"
                          className={`px-4 py-2 rounded-md ${
                            location.pathname === '/profile'
                              ? 'bg-primary text-white'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          My Profile
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/login"
                          className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="px-4 py-2 rounded-md text-gray-700 hover:bg-gray-100"
                        >
                          Register
                        </Link>
                      </>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.path
                      ? 'bg-primary-100 text-primary'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>
      
      {/* Notification Panel */}
      <Sheet open={showNotifications} onOpenChange={setShowNotifications}>
        <SheetContent side="right" className="w-[90vw] sm:w-[450px]">
          <NotificationPanel 
            notifications={getNotifications()} 
            onClose={() => setShowNotifications(false)}
            onNotificationsUpdate={() => {
              updateNotificationCount();
            }}
          />
        </SheetContent>
      </Sheet>
      
      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
