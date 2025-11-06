import { useLocation } from 'wouter';
import VerificationPage from '@/components/VerificationPage';

export default function VerifyPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(location.split('?')[1]);
  const token = params.get('token') || '';

  return <VerificationPage token={token} />;
}
