import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { setUserProfile } from '@/lib/storage';
import { toast } from 'sonner';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Ky është një autentifikim fiktiv - në një aplikacion real lidhet me backend
      setTimeout(() => {
        setUserProfile({
          id: `user-${uuidv4()}`,
          name: email.split('@')[0],
          email: email,
          preferredLanguage: 'sq'
        });

        toast.success('U kyçët me sukses');
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error('Kyçja dështoi. Ju lutem kontrolloni kredencialet.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Kyçu në eKosova</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ju@example.com" 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Fjalëkalimi</Label>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Duke u kyçur...' : 'Kyçu'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error('Fjalëkalimet nuk përputhen');
      return;
    }

    setIsLoading(true);
    
    try {
      // Ky është një regjistrim fiktiv - në një aplikacion real lidhet me backend
      setTimeout(() => {
        setUserProfile({
          id: `user-${uuidv4()}`,
          name: name,
          email: email,
          preferredLanguage: 'sq'
        });

        toast.success('Regjistrimi u krye me sukses!');
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error('Regjistrimi dështoi. Ju lutem provoni përsëri.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Krijo një Llogari</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Emri i Plotë</Label>
            <Input 
              id="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe" 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ju@example.com" 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Fjalëkalimi</Label>
            <Input 
              id="password" 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" 
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Konfirmo Fjalëkalimin</Label>
            <Input 
              id="confirmPassword" 
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••" 
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Duke krijuar llogarinë...' : 'Krijo Llogari'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
