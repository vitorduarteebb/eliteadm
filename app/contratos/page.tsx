import { AyumiContratosInterface } from '@/components/AyumiContratosInterface';

export default function ContratosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <AyumiContratosInterface />
    </div>
  );
}

export const metadata = {
  title: 'Ayumi - Especialista em Contratos | Auto Escola Onishi',
  description: 'IA especializada em contratos da Auto Escola Onishi. Tire suas dúvidas sobre cláusulas, direitos, obrigações e aspectos legais dos serviços.',
  keywords: 'contratos, auto escola, direitos, obrigações, cláusulas, legislação, Onishi',
  openGraph: {
    title: 'Ayumi - Especialista em Contratos | Auto Escola Onishi',
    description: 'IA especializada em contratos da Auto Escola Onishi',
    type: 'website',
  },
};
