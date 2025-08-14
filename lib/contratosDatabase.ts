export interface ContractQA {
  keywords: string[];
  question: string;
  answer: string;
  category: string;
  contractSection: string;
  legalBasis?: string;
}

export const contratosDatabase: ContractQA[] = [
  {
    keywords: ['obrigações', 'aluno', 'deveres', 'responsabilidades', 'deve'],
    question: 'Quais são as obrigações do aluno no contrato?',
    answer: `De acordo com o contrato da Auto Escola Onishi, as principais obrigações do aluno incluem:

• Frequentar as aulas teóricas e práticas conforme agendado
• Apresentar toda a documentação necessária no prazo estabelecido
• Pagar as taxas e valores contratados em dia
• Respeitar os horários e regras da autoescola
• Comparecer aos exames agendados
• Manter a LADV (Licença para Aprendizagem de Direção Veicular) em dia
• Comunicar mudanças de endereço ou dados pessoais
• Devolver materiais e documentos da autoescola quando solicitado

O não cumprimento dessas obrigações pode resultar em penalidades conforme estabelecido no contrato, incluindo multas e possível rescisão contratual.`,
    category: 'Obrigações e Responsabilidades',
    contractSection: 'Cláusulas de Obrigações do Aluno',
    legalBasis: 'Código de Defesa do Consumidor - Lei 8.078/90'
  },
  {
    keywords: ['cancelamento', 'desistir', 'rescindir', 'terminar', 'sair'],
    question: 'Como funciona o cancelamento do contrato?',
    answer: `O processo de cancelamento do contrato da Auto Escola Onishi segue as seguintes regras:

• O aluno pode solicitar o cancelamento a qualquer momento
• Será necessário apresentar justificativa por escrito
• Pode haver cobrança de taxas administrativas
• O valor já pago será calculado proporcionalmente aos serviços utilizados
• Documentos e materiais da autoescola devem ser devolvidos
• O cancelamento deve ser formalizado por escrito
• Pode haver prazo de carência para processamento

Para iniciar o processo de cancelamento, entre em contato com nossa equipe administrativa e solicite o formulário de cancelamento.`,
    category: 'Cancelamento e Rescisão',
    contractSection: 'Cláusulas de Cancelamento',
    legalBasis: 'Código Civil - Lei 10.406/2002'
  },
  {
    keywords: ['taxas', 'valores', 'preços', 'custos', 'quanto', 'valor'],
    question: 'Quais são os valores e taxas do contrato?',
    answer: `Os valores e taxas da Auto Escola Onishi incluem:

• Taxa de matrícula
• Valor do curso teórico (CFC)
• Valor das aulas práticas
• Taxas de exames (médico, psicotécnico, teórico e prático)
• Taxas de remarcação em caso de falta:
  - Exame teórico: R$ 50,00
  - Exame prático: R$ 100,00
• Taxas administrativas para alterações
• Taxas de segunda via de documentos

Os valores específicos são informados no momento da contratação e podem variar conforme o tipo de serviço. Para informações atualizadas sobre preços, consulte nossa equipe comercial.`,
    category: 'Valores e Taxas',
    contractSection: 'Tabela de Preços e Taxas',
    legalBasis: 'Código de Defesa do Consumidor - Lei 8.078/90'
  },
  {
    keywords: ['falta', 'não compareceu', 'ausente', 'ausência', 'perdeu'],
    question: 'O que acontece em caso de falta nas aulas ou exames?',
    answer: `Em caso de falta nas aulas ou exames da Auto Escola Onishi:

• Falta nas aulas práticas: pode ser remarcada conforme disponibilidade
• Falta no exame teórico: taxa de R$ 50,00 para remarcação
• Falta no exame prático: taxa de R$ 100,00 para remarcação
• Falta justificada com atestado médico: sem cobrança de taxa
• Falta não justificada: cobrança da taxa correspondente
• Falta em exames agendados: pode gerar débitos automáticos
• Falta em aulas práticas: pode afetar o cronograma de conclusão

É importante comunicar a falta com antecedência sempre que possível para evitar cobranças desnecessárias e reorganizar o cronograma.`,
    category: 'Faltas e Penalidades',
    contractSection: 'Política de Faltas e Penalidades',
    legalBasis: 'Contrato de Prestação de Serviços'
  },
  {
    keywords: ['agendamento', 'marcar', 'horário', 'data', 'agenda'],
    question: 'Como funciona o sistema de agendamento?',
    answer: `O sistema de agendamento da Auto Escola Onishi funciona da seguinte forma:

• Aulas práticas: agendamento de 2 dias por vez (4 aulas)
• Exames teóricos: agendamento conforme disponibilidade do sistema
• Exames práticos: agendamento após conclusão das aulas práticas
• Horários disponíveis: de segunda a sexta, das 8h às 18h
• Agendamentos podem ser feitos presencialmente ou por telefone
• Alterações devem ser solicitadas com antecedência mínima de 24h
• Cancelamentos de última hora podem gerar taxas
• A agenda é atualizada semanalmente

Para agendar suas aulas ou exames, entre em contato com nossa equipe ou compareça pessoalmente à autoescola.`,
    category: 'Agendamento e Horários',
    contractSection: 'Sistema de Agendamento',
    legalBasis: 'Contrato de Prestação de Serviços'
  },
  {
    keywords: ['documentos', 'documentação', 'requisitos', 'comprovantes', 'rg', 'cpf'],
    question: 'Quais documentos são necessários?',
    answer: `Os documentos necessários para iniciar o processo na Auto Escola Onishi são:

• RG original em perfeito estado de conservação
• CPF
• Comprovante de residência atualizado
• 2 fotos 3x4 (para alguns processos)
• Comprovante de escolaridade (para alguns casos)

Documentos digitais oficiais também são aceitos:
• RG Digital
• e-Título com foto atualizada
• CNH Digital

Fotos de documentos ou documentos fora dos aplicativos oficiais não são aceitos. Todos os documentos devem estar legíveis e atualizados.`,
    category: 'Documentação',
    contractSection: 'Requisitos de Documentação',
    legalBasis: 'Resolução CONTRAN nº 789/2020'
  },
  {
    keywords: ['prazo', 'tempo', 'duração', 'quanto tempo', 'demora'],
    question: 'Qual é o prazo para conclusão do curso?',
    answer: `O prazo para conclusão do curso na Auto Escola Onishi varia conforme o tipo de serviço:

• Primeira habilitação: prazo médio de 3 a 6 meses
• Adição de categoria: prazo médio de 1 a 3 meses
• Reabilitação de CNH: prazo médio de 2 a 4 meses

Os prazos dependem de:
• Disponibilidade do aluno para as aulas
• Aprovação nos exames
• Disponibilidade da agenda da autoescola
• Cumprimento de todos os requisitos legais

É importante manter a frequência nas aulas para não estender desnecessariamente o prazo de conclusão.`,
    category: 'Prazos e Cronograma',
    contractSection: 'Cronograma de Execução',
    legalBasis: 'Resolução CONTRAN nº 789/2020'
  },
  {
    keywords: ['garantia', 'qualidade', 'reclamação', 'problema', 'erro'],
    question: 'Quais são as garantias e como fazer reclamações?',
    answer: `A Auto Escola Onishi oferece as seguintes garantias:

• Garantia de qualidade no ensino
• Garantia de cumprimento dos prazos estabelecidos
• Garantia de disponibilidade dos instrutores
• Garantia de manutenção dos veículos

Para reclamações:
• Primeiro, entre em contato com a equipe da autoescola
• Se não for resolvido, solicite o livro de reclamações
• Você também pode registrar reclamação no Procon
• Para questões contratuais, consulte um advogado

A autoescola se compromete a resolver todas as questões de forma ágil e transparente.`,
    category: 'Garantias e Reclamações',
    contractSection: 'Cláusulas de Garantia',
    legalBasis: 'Código de Defesa do Consumidor - Lei 8.078/90'
  },
  {
    keywords: ['alteração', 'mudança', 'modificar', 'trocar', 'alterar'],
    question: 'Posso alterar o contrato após a assinatura?',
    answer: `Alterações no contrato após a assinatura são possíveis, mas seguem regras específicas:

• Alterações de dados pessoais: sempre permitidas
• Alterações de horários: conforme disponibilidade
• Alterações de instrutor: conforme disponibilidade
• Alterações de veículo: conforme disponibilidade
• Alterações de endereço: sempre permitidas

Para alterações contratuais:
• Deve ser solicitado por escrito
• Pode haver taxa administrativa
• Depende da disponibilidade da autoescola
• Não pode alterar a essência do contrato

Todas as alterações devem ser formalizadas por escrito para garantir a segurança das partes.`,
    category: 'Alterações Contratuais',
    contractSection: 'Cláusulas de Alteração',
    legalBasis: 'Código Civil - Lei 10.406/2002'
  },
  {
    keywords: ['multa', 'penalidade', 'sanção', 'punição', 'cobrança'],
    question: 'Quais são as multas e penalidades do contrato?',
    answer: `O contrato da Auto Escola Onishi estabelece as seguintes multas e penalidades:

• Falta no exame teórico: R$ 50,00
• Falta no exame prático: R$ 100,00
• Atraso no pagamento: juros de mora
• Cancelamento sem justificativa: taxa administrativa
• Não devolução de materiais: cobrança do valor
• Alterações de última hora: taxa administrativa

As penalidades visam:
• Garantir o cumprimento do contrato
• Compensar custos administrativos
• Manter a organização da agenda
• Preservar a qualidade do serviço

Todas as multas e penalidades são previstas no contrato e comunicadas previamente ao aluno.`,
    category: 'Multas e Penalidades',
    contractSection: 'Cláusulas de Penalidades',
    legalBasis: 'Código Civil - Lei 10.406/2002'
  },
  {
    keywords: ['confidencialidade', 'privacidade', 'dados', 'informações', 'segredo'],
    question: 'Como é tratada a confidencialidade dos dados?',
    answer: `A Auto Escola Onishi garante total confidencialidade dos dados do aluno:

• Todos os dados pessoais são protegidos
• As informações não são compartilhadas com terceiros
• Os documentos são armazenados com segurança
• O acesso aos dados é restrito à equipe autorizada
• A confidencialidade é mantida mesmo após o término do contrato

Exceções apenas para:
• Cumprimento de obrigações legais
• Autorização expressa do aluno
• Necessidade de defesa da autoescola

A autoescola se compromete a seguir todas as normas de proteção de dados pessoais vigentes no Brasil.`,
    category: 'Confidencialidade e Privacidade',
    contractSection: 'Cláusulas de Confidencialidade',
    legalBasis: 'Lei Geral de Proteção de Dados - LGPD'
  }
];

export function findContractAnswer(message: string): string | null {
  const cleanMessage = message.toLowerCase();
  
  // Buscar resposta mais relevante
  const relevantQA = contratosDatabase.find(qa =>
    qa.keywords.some(keyword => cleanMessage.includes(keyword))
  );
  
  if (relevantQA) {
    return relevantQA.answer;
  }
  
  return null;
}

export function getContractCategories(): string[] {
  const categories = contratosDatabase.map(qa => qa.category);
  return [...new Set(categories)];
}

export function getContractSections(): string[] {
  const sections = contratosDatabase.map(qa => qa.contractSection);
  return [...new Set(sections)];
}
