import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Treinamento da Ayumi | EliteADM',
  description: 'Módulo de aperfeiçoamento e correção da IA Ayumi baseado em feedback dos usuários',
};

export default function AyumiTrainingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {children}
    </div>
  );
}
