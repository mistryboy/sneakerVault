import { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from './ToastContext';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { addToast } = useToast();

  useEffect(() => {
    // Reverting to Simple Method: Check for existing session in localStorage
    const savedUser = localStorage.getItem('vault_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Artificial delay for premium feel
      await new Promise(resolve => setTimeout(resolve, 800));

      const users = JSON.parse(localStorage.getItem('vault_users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        const sessionUser = {
          id: foundUser.id,
          email: foundUser.email,
          name: foundUser.name,
          initial: foundUser.name.charAt(0).toUpperCase()
        };
        setUser(sessionUser);
        localStorage.setItem('vault_current_user', JSON.stringify(sessionUser));
        setAuthModalOpen(false);
        addToast('Welcome back to the Vault.');
      } else {
        throw new Error('Invalid email or password.');
      }
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      const users = JSON.parse(localStorage.getItem('vault_users') || '[]');
      
      if (users.some(u => u.email === email)) {
        throw new Error('Email already registered.');
      }

      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        password,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('vault_users', JSON.stringify(users));

      const sessionUser = {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        initial: newUser.name.charAt(0).toUpperCase()
      };

      setUser(sessionUser);
      localStorage.setItem('vault_current_user', JSON.stringify(sessionUser));
      setAuthModalOpen(false);
      addToast('Account created. Access granted.');
    } catch (error) {
      addToast(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('vault_current_user');
    addToast('Signed out from the Vault.', 'success');
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      authModalOpen,
      setAuthModalOpen,
      loading
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
