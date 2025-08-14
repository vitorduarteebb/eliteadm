export interface AyumiQA {
  keywords: string[];
  question: string;
  answer: string;
  category: string;
}

export const ayumiDatabase: AyumiQA[] = [
  {
    keywords: ['cnh', 'cassada', 'verificar', 'suspensa'],
    question: 'Como saber se a CNH do cliente está cassada?',
    answer: `Para verificar se a CNH de um cliente está cassada ou suspensa, é importante saber que essa informação é registrada nos sistemas oficiais de trânsito.

De acordo com a Resolução CONTRAN nº 789, de 18 de junho de 2020, em seu Art. 33, § 1º, "O condutor penalizado com suspensão do direito de dirigir ou cassação do documento de habilitação terá o seu registro bloqueado pelo mesmo prazo da penalidade." Além disso, o § 3º do mesmo artigo complementa que "A suspensão do direito de dirigir e a proibição de se obter a habilitação, imputadas pelo Poder Judiciário, serão registradas na BINCO." O Código de Trânsito Brasileiro (CTB), no Art. 159, § 7º, também estabelece que "A cada condutor corresponderá um único registro no RENACH, agregando-se neste todas as informações."

No entanto, os documentos internos que tenho disponíveis não detalham o procedimento exato para que um colaborador da Autoescola Onishi acesse diretamente essas informações nos sistemas do Detran-SP.`,
    category: 'CNH e Documentos'
  },
  {
    keywords: ['aulas', 'práticas', 'agendar', 'quantas'],
    question: 'Em nosso contrato, quantas aulas práticas o aluno poderá agendar?',
    answer: `De acordo com nossos contratos de prestação de serviços para Primeira Habilitação, Adição de Categoria e Reabilitação de CNH, o agendamento das aulas práticas segue a mesma regra:

Contratos Onishi, Adição de Categoria, Item 14.g; Reabilitação de CNH, Item 18.g; Primeira Habilitação, Item 21.g

"Para as aulas práticas, será feito sempre 2 agendamentos por vez (4 aulas), sempre de acordo com a disponibilidade da agenda da autoescola. Após realizar esses 2 agendamentos, o Aluno(a) agenda mais 2 dias (4 aulas) e assim sucessivamente."

Isso significa que o aluno pode agendar 2 agendamentos por vez, totalizando 4 aulas. Após a realização dessas aulas, ele poderá agendar as próximas 4, e assim por diante, sempre respeitando a disponibilidade da agenda da autoescola.`,
    category: 'Aulas Práticas'
  },
  {
    keywords: ['adição', 'categoria', 'a', 'cfc', 'teórico', 'teorico'],
    question: 'Na adição de categoria A o cliente faz aulas teóricas (CFC)?',
    answer: `Não, o cliente que busca a adição da categoria A à sua CNH não precisa fazer aulas teóricas (CFC) novamente.

De acordo com a Resolução CONTRAN nº 789, de 18 de junho de 2020, o processo para adição de categoria foca na prática veicular. O Art. 9º, Parágrafo único, estabelece que:

"No caso de mudança ou adição de categoria, o condutor deverá cumprir as instruções previstas nos itens 2 ou 3 do ANEXO II."

Ao consultar o ANEXO II, item 3 ("CURSO PARA ADIÇÃO DE CATEGORIA"), verifica-se que a estrutura curricular para adição de categoria A (e B) compreende apenas o Curso de Prática de Direção Veicular, com carga horária mínima de 15 horas-aula. Não há menção a um curso teórico-técnico ou exame teórico para este processo.`,
    category: 'Adição de Categoria'
  },
  {
    keywords: ['documentos', 'adição', 'categoria', 'a'],
    question: 'Quais documentos preciso para adição de categoria A?',
    answer: `Para a adição da categoria A à sua CNH, o cliente precisará dos seguintes documentos e requisitos, conforme nossos contratos e a legislação vigente:

Documentos para apresentação:
- Cópia do RG original em perfeito estado de conservação e CPF.
- Cópia e Original do Comprovante de Residência Atual (por exemplo: conta de energia elétrica, água, gás, telefone).

Para as aulas práticas e o exame prático, é fundamental portar:
- LADV (Licença para Aprendizagem de Direção Veicular) e RG ou documento com foto original.

Requisitos e exames:
- Estar APTO nos Exames Médicos e Psicotécnicos do Detran.`,
    category: 'Documentos'
  },
  {
    keywords: ['exame', 'psicotécnico', 'psicotecnico', 'obrigatório', 'obrigatorio', 'categoria', 'a'],
    question: 'O exame psicotécnico é obrigatório para a categoria A?',
    answer: `Sim, o exame psicotécnico (Avaliação Psicológica) é obrigatório para a adição da categoria A.

Conforme a Resolução CONTRAN nº 789, de 18 de junho de 2020, o Art. 5º, § 2º, estabelece claramente:

"A Avaliação Psicológica será exigida nos seguintes casos: I – obtenção da ACC e da CNH; II – renovação do documento de habilitação, se o condutor exercer a atividade de transporte remunerado de pessoas ou bens; III – substituição do documento de habilitação obtido em país estrangeiro; e IV – por solicitação do perito examinador."

Além disso, nossos contratos também reforçam a necessidade dos exames médicos e psicotécnicos para o andamento do processo de adição de categoria.`,
    category: 'Exames'
  },
  {
    keywords: ['rg', 'perdeu', 'documentos', 'exame', 'prático', 'pratico'],
    question: 'Nosso candidato perdeu o RG, quais documentos ele poderá levar no exame prático?',
    answer: `Se o candidato perdeu o RG, ele poderá apresentar outros documentos no exame prático, desde que sejam originais e em perfeito estado.

De acordo com o nosso Contrato de Prestação de Serviços - Primeira Habilitação, item 29, e também presente nos contratos de Adição de Categoria e Reabilitação de CNH, o aluno deverá comparecer ao exame prático portando obrigatoriamente:

- Cédula de identidade original e em perfeito estado (não são aceitas cédulas plastificadas, abertas ou dilaceradas, nem fotocópia autenticada ou foto simples no celular).
- No caso de dúvida, trazer juntamente a Carteira Profissional ou reservista.
- Documentos digitais serão aceitos somente os oficiais em seus Apps, tais como RG Digital, Título de eleitor (e-Título) com foto atualizada e CNH Digital.

É crucial alertar que:
- Boletim de Ocorrência por perda, roubo ou furto NÃO substitui os documentos acima.
- A falta do documento original com foto no dia do exame prático será considerada falta, gerando débitos.`,
    category: 'Documentos'
  },
  {
    keywords: ['débitos', 'falta', 'exame', 'valores'],
    question: 'Quais são os débitos por falta no exame?',
    answer: `Os débitos por falta no exame variam conforme o tipo de exame e o contrato. Veja os valores e condições:

1. Falta no Exame Teórico:
- Valor: R$ 50,00
- Contratos: Primeira Habilitação (Item 19) e Reabilitação de CNH (Item 16).
- Condição: O aluno que tiver sua prova teórica anulada, cancelada ou for reprovado pagará essa taxa para remarcação, aguardando o prazo de 15 dias para a nova prova.

2. Falta no Exame Prático:
- Valor: R$ 100,00
- Contratos: Adição de Categoria (Item 24), Reabilitação de CNH (Item 28) e Primeira Habilitação (Item 30).
- Condição: Uma vez agendado e confirmado, o exame prático não poderá ser cancelado ou desmarcado sob nenhuma hipótese, nem mesmo com aviso prévio. Somente será aceito atestado médico do próprio aluno, com respectivo CID (não serão aceitos terceiros e acompanhantes) e deverá ser aprovado pela diretoria da Autoescola.

3. Falta na Prova Eletrônica (Curso de Reciclagem EAD):
- Valor: R$ 70,00
- Contrato: Curso de Reciclagem Online EAD (Item 9).
- Condição: Atraso superior a 15 minutos no dia da prova eletrônica presencialmente na unidade do CFC será considerado falta e irá gerar o débito. Para não ser considerada falta, o aluno deve comunicar o CFC com 48 horas de antecedência.`,
    category: 'Débitos e Taxas'
  },
  {
    keywords: ['reprovação', 'exame', 'prático', 'pratico', 'taxa'],
    question: 'E em caso de reprovação do exame prático?',
    answer: `Em caso de reprovação no exame prático, o aluno deverá seguir as seguintes condições, que são consistentes em nossos contratos para Primeira Habilitação, Adição de Categoria e Reabilitação de CNH:

- Taxa de Remarcação: O aluno reprovado no Exame Prático pagará uma taxa de remarcação no valor de R$ 350,00.
- Prazo para Remarcação: Deverá aguardar o prazo de 15 (quinze) dias para a remarcação de uma nova prova prática.
- O que a taxa cobre: Essa taxa compreende a disponibilização de veículo, instrutores, reagendamento e a taxa do Detran.
- Aviso de Alteração de Valor: A Autoescola reserva-se o direito de alterar o valor dessa taxa sem aviso prévio, devendo sempre fixar a alteração no mural de avisos da unidade.

Contratos Onishi, Adição de Categoria, Item 25; Reabilitação de CNH, Item 29; Primeira Habilitação, Item 30

"O(A) ALUNO(A) que for reprovado(a) no Exame Prático pagará taxa de remarcação no valor de R$350,00 e aguardará o prazo de 15 (Quinze) dias para remarcação de nova prova prática. Essa taxa compreende a disponibilização de veículo, instrutores, reagendamento e taxa do Detran. A Autoescola reserva-se o direito de alterar o valor sem aviso prévio, devendo sempre fixar a alteração no mural de avisos."`,
    category: 'Débitos e Taxas'
  },
  {
    keywords: ['todas', 'aulas', 'uma', 'vez', 'agendar', 'direto'],
    question: 'O cliente quer agendar todas as suas aulas direto',
    answer: `Não, o cliente não pode agendar todas as suas aulas práticas de uma vez.

Conforme o nosso protocolo interno e o contrato de prestação de serviços, o agendamento das aulas práticas é feito de forma gradual para garantir a disponibilidade da agenda e a qualidade do atendimento para todos os alunos.

Você deve explicar ao cliente o seguinte:

"Prezado(a) cliente, compreendo o seu desejo de agendar todas as aulas de uma vez para otimizar seu tempo. No entanto, de acordo com o nosso protocolo de agendamento e o que está estabelecido em seu contrato, não é possível agendar todas as aulas práticas de uma só vez.

Nossa política visa assegurar que todos os alunos tenham acesso justo à agenda e que possamos manter a qualidade do ensino, evitando sobrecarga e garantindo a disponibilidade de instrutores e veículos.

O agendamento das aulas práticas é realizado em blocos de 2 agendamentos por vez (totalizando 4 aulas), sempre de acordo com a disponibilidade da agenda da autoescola. Após a realização dessas aulas, você poderá agendar os próximos 2 dias (4 aulas) e assim sucessivamente, até a conclusão da sua carga horária."

Base Contratual e Protocolo Interno:

Contratos Onishi (Adição de Categoria, Reabilitação de CNH, Primeira Habilitação), seção "DAS AULAS PRÁTICAS", Item 14.g (e similares):
"Para as aulas práticas, será feito sempre 2 agendamentos por vez (4 aulas), sempre de acordo com a disponibilidade da agenda da autoescola. Após realizar esses 2 agendamentos, o Aluno(a) agenda mais 2 dias (4 aulas) e assim sucessivamente."`,
    category: 'Agendamento'
  },
  {
    keywords: ['aulas', 'práticas', 'moto', 'local', 'onde'],
    question: 'Onde é feito as aulas práticas de moto?',
    answer: `As aulas práticas de moto são realizadas em uma pista externa localizada no seguinte endereço:

Av Frei Macário de S João - ao lado do cemitério Gethsêmani Morumbi.

É importante que o aluno esteja ciente de que:

- A coleta da digital será feita na Autoescola, e o aluno irá com o instrutor para o local de treinamento.
- A escolha do local da aula é feita exclusivamente pela Autoescola e pode ser alterada sem aviso prévio.
- Haverá aulas práticas mesmo em dias de chuva, sendo recomendado que o aluno traga capa de chuva.
- As aulas serão marcadas na unidade de matrícula do aluno, exclusivamente.
- O uso de capacete próprio é obrigatório para as aulas, e o aluno deve estar com calçado apropriado que se firme aos pés (chinelos, sandálias e sapatos de salto não são aceitos).

Essa informação está presente nos itens 14, 18 e 21 das seções "DAS AULAS PRÁTICAS" dos nossos contratos de Adição de Categoria, Reabilitação de CNH e Primeira Habilitação, respectivamente.`,
    category: 'Aulas Práticas'
  },
  {
    keywords: ['ladv', 'esqueceu', 'não', 'trouxe', 'aula'],
    question: 'O cliente não trouxe a LADV para a aula',
    answer: `Quando o cliente não traz a LADV (Licença para Aprendizagem de Direção Veicular) para a aula prática, ele não poderá realizar a aula.

Conforme o nosso Contrato de Prestação de Serviços, na seção "DAS AULAS PRÁTICAS", item 17:

"Somente poderá fazer a aula prática no veículo o aluno que estiver em posse da LADV e do RG ou documento com foto."
"Sem estes documentos o aluno não poderá fazer a aula sob nenhuma hipótese e será marcado falta, gerando débitos por aula perdida/marcada."

Portanto, você deve orientar o cliente que, sem a LADV, a aula não poderá ser ministrada e será registrada como falta, o que gerará um débito para ele. É fundamental que o aluno sempre porte a LADV e um documento de identificação com foto (RG ou CNH Digital oficial no aplicativo) para todas as aulas práticas.`,
    category: 'Documentos'
  },
  {
    keywords: ['clínica', 'clinica', 'médica', 'medica', 'falar', 'contato'],
    question: 'O cliente não está conseguindo falar com a clínica médica, o que tenho que fazer?',
    answer: `Compreendo a dificuldade do cliente em contatar a clínica médica. No entanto, é importante reforçar que a Autoescola Onishi não possui interferência no atendimento, horários ou procedimentos das clínicas médicas credenciadas pelo Detran.

Você deve orientar o cliente da seguinte forma:

"Prezado(a) cliente, entendo que esteja com dificuldades para falar com a clínica médica. Conforme estabelecido em nosso contrato, a Autoescola não tem qualquer interferência no atendimento, horários e resultados das Clínicas Médicas credenciadas pelo Detran.

Qualquer assunto relacionado aos exames, como reagendamentos, valores, formas de pagamento ou disponibilidade, deve ser tratado diretamente com o profissional ou a clínica credenciada.

Se a dificuldade de contato persistir ou se houver necessidade de um redirecionamento para outro profissional, a orientação é que você procure o Detran para obter auxílio. Eles são o órgão responsável por essa gestão e poderão indicar o caminho correto."

Base Contratual:

Contratos Onishi (Adição de Categoria, Reabilitação de CNH, Primeira Habilitação), seção "DOS EXAMES MÉDICO E PSICOTÉCNICO":
Item 6 (em todas as versões): "A Auto Escola não tem qualquer interferência no atendimento, horários e resultados das Clínicas Médicas credenciadas pelo Detran. Reagendamento de consultas, valores, formas de pagamento, disponibilidade e tudo que for necessário para realização do exame, deverá ser tratado diretamente com cada profissional e/ou cada clínica credenciada."
Item 7 (em todas as versões): "Todo e qualquer assunto relacionado aos exames deverão ser tratados diretamente com os médicos e psicólogos credenciados e em casos de dúvidas, procurar o Detran para o redirecionamento do profissional ou junta médica."`,
    category: 'Exames'
  },
  {
    keywords: ['cfc', 'teórico', 'teorico', 'quantas', 'aulas', 'matérias', 'materias'],
    question: 'Quantas aulas teóricas e quais as matérias preciso fazer no CFC teórico?',
    answer: `Para a obtenção da sua primeira habilitação nas categorias A e B, o curso teórico-técnico no CFC (Centro de Formação de Condutores) possui uma carga horária total de 45 horas-aula.

Cada hora-aula corresponde a 50 minutos, e a carga horária diária máxima permitida é de 5 horas-aula.

As matérias que você precisa fazer no CFC teórico são:

Legislação de Trânsito: 18 horas-aula
- Determinações do CTB quanto a veículos de duas ou mais rodas, formação do condutor, exigências para categorias de habilitação, documentos do condutor e do veículo, sinalização viária, penalidades e crimes de trânsito, direitos e deveres do cidadão, normas de circulação e conduta, infrações e penalidades.

Direção Defensiva para veículos de duas ou mais rodas: 16 horas-aula
- Conceito de direção defensiva, condução em condições adversas e situações de risco (ultrapassagens, derrapagem, buracos, cruzamentos, curvas, frenagem), como evitar acidentes, cuidados com os demais usuários da via, respeito mútuo, equipamentos de segurança, estado físico e mental do condutor e influência de substâncias psicoativas.

Noções de Primeiros Socorros: 4 horas-aula
- Sinalização do local do acidente, acionamento de recursos de emergência (bombeiros, polícia, ambulância), verificação das condições gerais da vítima, cuidados com a vítima (o que não fazer) e cuidados especiais com a vítima motociclista.

Noções de Proteção e Respeito ao Meio Ambiente e de Convívio Social no Trânsito: 4 horas-aula
- O veículo como agente poluidor (emissão de gases, partículas, ruído), regulamentação do CONAMA, manutenção preventiva para preservação do meio ambiente, relacionamento interpessoal, diferenças individuais, o indivíduo como cidadão.

Noções sobre Funcionamento do Veículo de duas ou mais rodas: 3 horas-aula
- Equipamentos de uso obrigatório, manuseio do extintor de incêndio, responsabilidade com a manutenção do veículo, alternativas para eventualidades comuns, condução econômica, verificação diária de itens básicos (água, óleo, pneus) e revisões pré-viagem.

Ao final do curso, você será submetido a um exame teórico-técnico com, no mínimo, 30 questões. Para ser aprovado, é necessário obter um aproveitamento mínimo de 70% de acertos.

Essas informações estão detalhadas na Resolução CONTRAN nº 789, de 18 de junho de 2020 (Consolidada), ANEXO II, Item 1.5.

Lembre-se que a Autoescola Onishi oferece o CFC Teórico Online, permitindo que você faça as aulas do conforto da sua casa ou trabalho, com um portal do aluno que disponibiliza conteúdo extra 24h por dia.`,
    category: 'CFC Teórico'
  }
];

export function findAyumiAnswer(message: string): string | null {
  const cleanMessage = message.trim().toLowerCase();
  
  // Procurar por correspondência exata primeiro
  for (const qa of ayumiDatabase) {
    const matchCount = qa.keywords.filter(keyword => 
      cleanMessage.includes(keyword.toLowerCase())
    ).length;
    
    // Se pelo menos 2 palavras-chave correspondem, retornar a resposta
    if (matchCount >= 2) {
      return qa.answer;
    }
  }
  
  // Se não encontrar correspondência exata, procurar por correspondência parcial
  for (const qa of ayumiDatabase) {
    for (const keyword of qa.keywords) {
      if (cleanMessage.includes(keyword.toLowerCase())) {
        return qa.answer;
      }
    }
  }
  
  return null;
}

