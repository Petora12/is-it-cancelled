// pages/Detail.tsx
import { useParams, useNavigate } from 'react-router';
import { useShowDetail } from '../hooks/useShowDetail';
import { DetailView } from '../components/DetailView';

export function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: detail, isPending } = useShowDetail(id ? Number(id) : null);

  return (
    <DetailView
      detail={detail ?? null}
      loading={isPending}
      onBack={() => navigate('/')}
    />
  );
}
