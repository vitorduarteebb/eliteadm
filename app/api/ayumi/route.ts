import { NextRequest, NextResponse } from 'next/server';
import { AYUMI_CONFIG } from '@/config/ayumi';
import { defaultAyumiRules } from '@/lib/ayumiRules';

export async function POST(request: NextRequest) {
  let body: any = {};

  try {
    body = await request.json();
    
    if (!body.message) {
      return NextResponse.json({
        error: 'Mensagem é obrigatória'
      }, { status: 400 });
    }

    // Simular a API da Adapta ONE baseado no arquivo fornecido
    const ayumiResponse = await simulateAdaptaOneAPI(body.message);
    
    if (ayumiResponse) {
      return NextResponse.json({
        response: ayumiResponse,
        source: 'simulated_adapta_one'
      });
    }

    // Se não conseguir simular, usar fallback
    const fallbackResponse = generateFallbackResponse(body.message);
    return NextResponse.json({
      response: fallbackResponse,
      source: 'fallback'
    });

  } catch (error) {
    console.error('Erro interno na API Ayumi:', error);
    const fallbackResponse = generateFallbackResponse(body.message || '');
    return NextResponse.json({
      response: fallbackResponse,
      source: 'fallback'
    });
  }
}

// Simular a API da Adapta ONE baseado no arquivo fornecido
async function simulateAdaptaOneAPI(message: string): Promise<string | null> {
  const cleanMessage = message.trim().toLowerCase();
  
  // Respostas específicas baseadas no arquivo da Adapta ONE
  
  // CFC Teórico
  if (cleanMessage.includes('cfc') && (cleanMessage.includes('teórico') || cleanMessage.includes('teorico'))) {
    return `Para a obtenção da sua primeira habilitação nas categorias A e B, o curso teórico-técnico no CFC (Centro de Formação de Condutores) possui uma carga horária total de 45 horas-aula.

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

Lembre-se que a Autoescola Onishi oferece o CFC Teórico Online, permitindo que você faça as aulas do conforto da sua casa ou trabalho, com um portal do aluno que disponibiliza conteúdo extra 24h por dia.`;
  }

  // Verificação de CNH cassada
  if (cleanMessage.includes('cnh') && (cleanMessage.includes('cassada') || cleanMessage.includes('cassação') || cleanMessage.includes('verificar'))) {
    return `Para verificar se a CNH de um cliente está cassada ou suspensa, é importante saber que essa informação é registrada nos sistemas oficiais de trânsito.

De acordo com a Resolução CONTRAN nº 789, de 18 de junho de 2020, em seu Art. 33, § 1º, "O condutor penalizado com suspensão do direito de dirigir ou cassação do documento de habilitação terá o seu registro bloqueado pelo mesmo prazo da penalidade." Além disso, o § 3º do mesmo artigo complementa que "A suspensão do direito de dirigir e a proibição de se obter a habilitação, imputadas pelo Poder Judiciário, serão registradas na BINCO." O Código de Trânsito Brasileiro (CTB), no Art. 159, § 7º, também estabelece que "A cada condutor corresponderá um único registro no RENACH, agregando-se neste todas as informações."

No entanto, os documentos internos que tenho disponíveis não detalham o procedimento exato para que um colaborador da Autoescola Onishi acesse diretamente essas informações nos sistemas do Detran-SP.

Gostaria que eu pesquisasse nos sites oficiais do Detran-SP ou Poupatempo-SP para encontrar o passo a passo de como realizar essa consulta?`;
  }

  // Aulas práticas
  if (cleanMessage.includes('aulas') && cleanMessage.includes('práticas') || cleanMessage.includes('aula') && cleanMessage.includes('prática')) {
    return `De acordo com nossos contratos de prestação de serviços para Primeira Habilitação, Adição de Categoria e Reabilitação de CNH, o agendamento das aulas práticas segue a mesma regra:

Contratos Onishi, Adição de Categoria, Item 14.g; Reabilitação de CNH, Item 18.g; Primeira Habilitação, Item 21.g

"Para as aulas práticas, será feito sempre 2 agendamentos por vez (4 aulas), sempre de acordo com a disponibilidade da agenda da autoescola. Após realizar esses 2 agendamentos, o Aluno(a) agenda mais 2 dias (4 aulas) e assim sucessivamente."

Isso significa que o aluno pode agendar 2 agendamentos por vez, totalizando 4 aulas. Após a realização dessas aulas, ele poderá agendar as próximas 4, e assim por diante, sempre respeitando a disponibilidade da agenda da autoescola.`;
  }

  // Agendar todas as aulas de uma vez
  if (cleanMessage.includes('todas') && cleanMessage.includes('aulas') && (cleanMessage.includes('uma vez') || cleanMessage.includes('vez') || cleanMessage.includes('só'))) {
    return `Entendo perfeitamente o seu desejo de agendar todas as aulas práticas de uma vez para se organizar. No entanto, de acordo com os nossos protocolos e para garantir a qualidade e a disponibilidade para todos os alunos, não é possível agendar todas as aulas práticas de uma só vez.

Nosso sistema de agendamento é planejado para otimizar a agenda da autoescola e assegurar que todos os alunos tenham acesso justo às aulas.

Como funciona o agendamento:

• As aulas práticas são agendadas sempre em pares (equivalente a 4 aulas) por vez
• Após a realização desses dois agendamentos, você poderá agendar mais dois dias (totalizando mais 4 aulas) e assim sucessivamente
• O agendamento é feito de acordo com a disponibilidade da agenda da autoescola

Essa metodologia garante que todos os alunos ativos no processo tenham acesso às aulas de forma contínua e justa.

Base nos nossos documentos:
O contrato de "PRIMEIRA HABILITAÇÃO" detalha: "Para as aulas práticas, será feito sempre 2 agendamentos por vez (4 aulas), sempre de acordo com a disponibilidade da agenda da autoescola. Após realizar esses 2 agendamentos, o Aluno(a) agenda mais 2 dias (4 aulas) e assim sucessivamente."

Nosso objetivo é sempre priorizar o atendimento de todos os nossos alunos, cada um em seu processo de habilitação, conforme a disponibilidade da agenda da autoescola.`;
  }

  // Cancelamento de contrato
  if (cleanMessage.includes('cancelar') || cleanMessage.includes('cancelamento') || cleanMessage.includes('desistir') || cleanMessage.includes('desistência')) {
    return `De acordo com nossos contratos, o cancelamento de contrato é possível, mas está sujeito a uma taxa administrativa.

**Taxa de Cancelamento: R$ 300,00**

**Como funciona o cancelamento:**

• **Taxa obrigatória:** R$ 300,00 para emissão do termo de cancelamento
• **Liberação do sistema:** A taxa deve ser paga para processar a liberação
• **Reembolso:** Os valores já pagos podem ser reembolsados, dependendo do prazo

**Base nos nossos documentos:**

**Primeira Habilitação (Item 36):** "No ato do cancelamento de contrato, desistências ou transferência de local ou autoescola, haverá a cobrança de taxa administrativa de cancelamento de R$300,00 que deverá ser paga para que seja emitido o termo de cancelamento e a liberação do(a) CONTRATANTE no sistema."

**Adição de Categoria (Item 40):** Mesma regra aplicável.

**Reabilitação de CNH (Item 44):** Mesma regra aplicável.

**Como solicitar o cancelamento:**

1. **E-mail:** sac@autoescolaonishi.com.br
2. **Presencial:** Na autoescola
3. **Informações necessárias:** Nome completo, categoria de habilitação e motivo do cancelamento

**Importante:** A taxa de R$ 300,00 é obrigatória para processar o cancelamento e liberar sua matrícula no sistema.`;
  }

  // Adição de categoria
  if (cleanMessage.includes('adição') && cleanMessage.includes('categoria')) {
    return `Não, o cliente que busca a adição da categoria A à sua CNH não precisa fazer aulas teóricas (CFC) novamente.

De acordo com a Resolução CONTRAN nº 789, de 18 de junho de 2020, o processo para adição de categoria foca na prática veicular. O Art. 9º, Parágrafo único, estabelece que:

"No caso de mudança ou adição de categoria, o condutor deverá cumprir as instruções previstas nos itens 2 ou 3 do ANEXO II."

Ao consultar o ANEXO II, item 3 ("CURSO PARA ADIÇÃO DE CATEGORIA"), verifica-se que a estrutura curricular para adição de categoria A (e B) compreende apenas o Curso de Prática de Direção Veicular, com carga horária mínima de 15 horas-aula. Não há menção a um curso teórico-técnico ou exame teórico para este processo.

As aulas teóricas e o exame teórico são exigidos para a obtenção da primeira habilitação (ACC ou CNH), conforme o Art. 2º, § 1º, e Art. 3º, III da mesma Resolução.`;
  }

  // Exame psicotécnico obrigatório
  if (cleanMessage.includes('psicotécnico') && cleanMessage.includes('obrigatório')) {
    return `Sim, o exame psicotécnico (Avaliação Psicológica) é obrigatório para a adição da categoria A.

Conforme a Resolução CONTRAN nº 789, de 18 de junho de 2020, o Art. 5º, § 2º, estabelece claramente:

Resolução CONTRAN nº 789, Art. 5º, § 2º

"A Avaliação Psicológica será exigida nos seguintes casos: I – obtenção da ACC e da CNH; II – renovação do documento de habilitação, se o condutor exercer a atividade de transporte remunerado de pessoas ou bens; III – substituição do documento de habilitação obtido em país estrangeiro; e IV – por solicitação do perito examinador."

Embora a adição de categoria não esteja explicitamente listada no Art. 5º, § 2º, a Avaliação Psicológica é parte integrante do processo de habilitação, que inclui a adição de categoria. O Art. 2º, § 1º, da mesma Resolução, ao descrever o processo de habilitação, menciona a Avaliação Psicológica como uma das etapas:

Resolução CONTRAN nº 789, Art. 2º, § 1º

"Para o processo de habilitação de que trata o caput, após o devido cadastramento dos dados informativos no Registro Nacional de Condutores Habilitados (RENACH), o candidato deverá realizar Avaliação Psicológica, Exame de Aptidão Física e Mental, Curso Teórico-técnico, Exame Teórico-técnico, Curso de Prática de Direção Veicular e Exame de Prática de Direção Veicular, nesta ordem."

Além disso, nossos contratos também reforçam a necessidade dos exames médicos e psicotécnicos para o andamento do processo de adição de categoria:

Contrato de Prestação de Serviços - Adição de Categoria, Item 2.c

"Estar APTO nos Exames Médicos e Psicotécnicos do Detran."

Portanto, sim, o exame psicotécnico é uma etapa obrigatória para a adição da categoria A.`;
  }

  // RG perdido - documentos alternativos
  if (cleanMessage.includes('rg') && (cleanMessage.includes('perdeu') || cleanMessage.includes('perdido'))) {
    return `Se o candidato perdeu o RG, ele poderá apresentar outros documentos no exame prático, desde que sejam originais e em perfeito estado.

De acordo com o nosso Contrato de Prestação de Serviços - Primeira Habilitação, item 29, e também presente nos contratos de Adição de Categoria e Reabilitação de CNH, o aluno deverá comparecer ao exame prático portando obrigatoriamente:

Cédula de identidade original e em perfeito estado (não são aceitas cédulas plastificadas, abertas ou dilaceradas, nem fotocópia autenticada ou foto simples no celular).
No caso de dúvida, trazer juntamente a Carteira Profissional ou reservista.
Documentos digitais serão aceitos somente os oficiais em seus Apps, tais como RG Digital, Título de eleitor (e-Título) com foto atualizada e CNH Digital.

É crucial alertar que:

Boletim de Ocorrência por perda, roubo ou furto NÃO substitui os documentos acima.
A falta do documento original com foto no dia do exame prático será considerada falta, gerando débitos.

Portanto, o candidato pode utilizar a Carteira Profissional, a Reservista ou as versões digitais oficiais do RG, Título de Eleitor (com foto atualizada) ou CNH, acessadas diretamente pelos aplicativos correspondentes.`;
  }

  // Débitos por falta no exame
  if (cleanMessage.includes('débitos') && cleanMessage.includes('falta')) {
    return `Os débitos por falta no exame variam conforme o tipo de exame e o contrato. Veja os valores e condições:

1. Falta no Exame Teórico:

Valor: R$ 50,00
Contratos: Primeira Habilitação (Item 19) e Reabilitação de CNH (Item 16).
Condição: O aluno que tiver sua prova teórica anulada, cancelada ou for reprovado pagará essa taxa para remarcação, aguardando o prazo de 15 dias para a nova prova.

2. Falta no Exame Prático:

Valor: R$ 100,00
Contratos: Adição de Categoria (Item 24), Reabilitação de CNH (Item 28) e Primeira Habilitação (Item 30).
Condição: Uma vez agendado e confirmado, o exame prático não poderá ser cancelado ou desmarcado sob nenhuma hipótese, nem mesmo com aviso prévio. Somente será aceito atestado médico do próprio aluno, com respectivo CID (não serão aceitos terceiros e acompanhantes) e deverá ser aprovado pela diretoria da Autoescola.

3. Falta na Prova Eletrônica (Curso de Reciclagem EAD):

Valor: R$ 70,00
Contrato: Curso de Reciclagem Online EAD (Item 9).
Condição: Atraso superior a 15 minutos no dia da prova eletrônica presencialmente na unidade do CFC será considerado falta e irá gerar o débito. Para não ser considerada falta, o aluno deve comunicar o CFC com 48 horas de antecedência.

É fundamental que o aluno esteja ciente dessas condições, pois a falta no exame, além do débito, pode gerar atrasos no processo de habilitação.`;
  }

  // Taxa de reprovação exame prático
  if (cleanMessage.includes('reprovação') && cleanMessage.includes('exame') && cleanMessage.includes('prático')) {
    return `Em caso de reprovação no exame prático, o aluno deverá seguir as seguintes condições, que são consistentes em nossos contratos para Primeira Habilitação, Adição de Categoria e Reabilitação de CNH:

Taxa de Remarcação: O aluno reprovado no Exame Prático pagará uma taxa de remarcação no valor de R$ 350,00.
Prazo para Remarcação: Deverá aguardar o prazo de 15 (quinze) dias para a remarcação de uma nova prova prática.
O que a taxa cobre: Essa taxa compreende a disponibilização de veículo, instrutores, reagendamento e a taxa do Detran.
Aviso de Alteração de Valor: A Autoescola reserva-se o direito de alterar o valor dessa taxa sem aviso prévio, devendo sempre fixar a alteração no mural de avisos da unidade.

Contratos Onishi, Adição de Categoria, Item 25; Reabilitação de CNH, Item 29; Primeira Habilitação, Item 30

"O(A) ALUNO(A) que for reprovado(a) no Exame Prático pagará taxa de remarcação no valor de R$350,00 e aguardará o prazo de 15 (Quinze) dias para remarcação de nova prova prática. Essa taxa compreende a disponibilização de veículo, instrutores, reagendamento e taxa do Detran. A Autoescola reserva-se o direito de alterar o valor sem aviso prévio, devendo sempre fixar a alteração no mural de avisos."`;
  }

  // Retornar null se não encontrar resposta específica para usar o fallback
  return null;
}

function generateFallbackResponse(message: string): string {
  const cleanMessage = message.trim().toLowerCase();
  
  // Respostas específicas e detalhadas para o contexto do Grupo Onishi
  if (cleanMessage.includes('habilitação') || cleanMessage.includes('cnh') || cleanMessage.includes('detran') || cleanMessage.includes('processo') || 
      cleanMessage.includes('cfc') || cleanMessage.includes('teórico') || cleanMessage.includes('curso') || cleanMessage.includes('aulas') ||
      cleanMessage.includes('exame') || cleanMessage.includes('prova') || cleanMessage.includes('prático') || cleanMessage.includes('direção')) {
    return `Olá! O processo de habilitação para obter a Carteira Nacional de Habilitação (CNH) no Brasil é padronizado pelo Código de Trânsito Brasileiro (CTB) e regulamentado pelo CONTRAN, com etapas bem definidas que visam preparar o futuro condutor. Na Autoescola Onishi, buscamos tornar essa jornada o mais eficiente e completa possível.

Veja o passo a passo:

1. Pré-requisitos e Abertura do Processo
Para iniciar o processo de habilitação, o candidato deve atender aos seguintes requisitos básicos:

Idade: Ser penalmente imputável (ter 18 anos completos). A emancipação não antecipa esse requisito.
Alfabetização: Saber ler e escrever.
Documentação: Possuir documento de identidade (RG, Carteira de Trabalho, Passaporte ou outro documento com foto) e Cadastro de Pessoa Física (CPF).
Com os requisitos atendidos, o processo é aberto no órgão ou entidade executiva de trânsito do seu Estado ou do Distrito Federal. A matrícula na Autoescola Onishi tem validade de 12 meses a partir do cadastro no sistema RENACH (Registro Nacional de Condutores Habilitados).

2. Exames Médico e Psicotécnico
Esta é a primeira etapa presencial. O candidato deve ser considerado APTO nos exames de:

Aptidão Física e Mental: Realizado por um médico perito examinador credenciado pelo Detran.
Avaliação Psicológica: Realizada por um psicólogo perito examinador credenciado pelo Detran.
A Autoescola Onishi não interfere no atendimento, horários ou resultados dessas clínicas, sendo de responsabilidade do aluno o contato direto com os profissionais para agendamento e dúvidas.

3. Curso Teórico-Técnico (CFC Teórico)
Após ser aprovado nos exames médico e psicotécnico, o aluno inicia o curso teórico.

Carga Horária: O curso possui 45 horas-aula.
Modalidade: Na Autoescola Onishi, o CFC Teórico é oferecido na modalidade EAD Online, permitindo que o aluno estude do conforto de sua casa ou trabalho.
Conteúdo: Abrange Legislação de Trânsito, Direção Defensiva, Noções de Primeiros Socorros, Noções de Proteção e Respeito ao Meio Ambiente e Convívio Social, e Noções sobre Funcionamento do Veículo.
Acompanhamento: O sistema utiliza biometria facial para controle de presença. A Autoescola Onishi oferece um Portal do Aluno com material didático de apoio, resumos de aulas e simulados para auxiliar nos estudos.

4. Exame Teórico
Ao concluir o CFC Teórico, o aluno realiza o exame teórico.

Formato: Prova com, no mínimo, 30 questões de múltipla escolha.
Aprovação: Para ser aprovado, o candidato deve acertar, no mínimo, 70% das questões (21 acertos).
Remarcação: Em caso de reprovação, o aluno pode realizar uma nova prova após 15 dias, mediante o pagamento de uma taxa de remarcação.

5. Curso de Prática de Direção Veicular (CFC Prático)
Com a aprovação no exame teórico, o aluno inicia as aulas práticas.

Carga Horária: Mínimo de 20 horas-aula para as categorias A (moto) e B (carro), sendo pelo menos 1 hora-aula realizada no período noturno.
Veículos: As aulas são realizadas em veículos da autoescola, equipados para aprendizagem. Para aulas de moto, as aulas são realizadas em pista externa específica.
LADV: O aluno deve portar a Licença para Aprendizagem de Direção Veicular (LADV) e um documento de identificação com foto durante as aulas.
Acompanhamento: O instrutor acompanha o aluno, fornecendo feedback detalhado sobre o desempenho e os pontos a serem melhorados, conforme o plano de aulas exclusivo da Autoescola Onishi.

6. Exame Prático de Direção Veicular
Esta é a última etapa para a obtenção da CNH.

Realização: O exame é realizado em via pública, com a presença de examinadores do Detran.
Avaliação: O candidato é avaliado por faltas cometidas (eliminatórias, graves, médias e leves). A reprovação ocorre com uma falta eliminatória ou com mais de três pontos negativos.
Remarcação: Em caso de reprovação, o aluno pode remarcar o exame após 15 dias, mediante o pagamento de uma taxa de remarcação que cobre os custos operacionais (veículo, instrutor, taxas do Detran).

7. Emissão da Permissão para Dirigir (PPD) ou CNH
PPD: Após a aprovação no exame prático, o candidato recebe a Permissão para Dirigir (PPD), com validade de um ano.
CNH Definitiva: Ao final do período de um ano da PPD, se o condutor não tiver cometido nenhuma infração de natureza grave ou gravíssima, nem for reincidente em infração média, a CNH definitiva será emitida.
Documento: A CNH é emitida em meio físico e/ou digital, tem fé pública e equivale a documento de identidade em todo o território nacional. As taxas de emissão e transferência são de responsabilidade do aluno.

Este processo é projetado para garantir que os novos condutores estejam bem preparados e seguros para o trânsito.

Fontes:

L9503Compilado.pdf (Código de Trânsito Brasileiro - CTB), Art. 140, 147, 148, 159.
RESOLUÇÃO Nº 789, DE 18 DE JUNHO DE 2020 (CONSOLIDADA).pdf, Art. 2, 3, 4, 7, 8, 11, 13, 18, 22, 28.
contratos-Onishi.pdf, contrato "PRIMEIRA HABILITAÇÃO".
Protocolo-de-Vendas-e-Atendimento.pdf, seção "JORNADA DE APRENDIZADO", "Etapas do Processo de Habilitação".`;
  }
  
  if (cleanMessage.includes('ctb') || cleanMessage.includes('código') || cleanMessage.includes('trânsito') || cleanMessage.includes('legislação')) {
    return `O Código de Trânsito Brasileiro (CTB) é a legislação que regulamenta o trânsito em todo o território nacional. Na Autoescola Onishi, ensinamos todas as normas para você dirigir com segurança e sem multas.

Principais pontos do CTB:

1. Infrações Graves (7 pontos):
- Excesso de velocidade: 7 pontos + multa
- Avançar sinal vermelho: 7 pontos + multa
- Dirigir sem CNH: 7 pontos + multa
- Dirigir sob influência de álcool: 7 pontos + multa + suspensão

2. Infrações Médias (5 pontos):
- Estacionar em local proibido: 4 pontos + multa
- Não usar cinto de segurança: 5 pontos + multa
- Dirigir sem documentos: 5 pontos + multa
- Ultrapassar pela direita: 5 pontos + multa

3. Infrações Leves (3 pontos):
- Dirigir com apenas uma mão: 3 pontos + multa
- Usar calçado inadequado: 3 pontos + multa
- Não sinalizar manobras: 3 pontos + multa

Sistema de Pontos:
- Acumular 20 pontos = suspensão da CNH
- Curso de reciclagem obrigatório
- Respeitar sempre a sinalização

Dicas da Onishi:
- Mantenha-se sempre atualizado sobre mudanças na legislação
- Use sempre o cinto de segurança
- Respeite os limites de velocidade
- Sinalize todas as manobras

Gostaria de saber mais sobre alguma infração específica?`;
  }
  
  if (cleanMessage.includes('atendimento') || cleanMessage.includes('cliente') || cleanMessage.includes('vendas') || cleanMessage.includes('melhorar')) {
    return `No Grupo Onishi, acreditamos que o sucesso nas vendas e no atendimento ao cliente é fundamental para o crescimento da empresa e da sua carreira.

Princípios do Atendimento de Excelência:

1. Primeiro Contato
- Seja sempre cordial e prestativo
- Apresente-se e identifique a necessidade do cliente
- Demonstre interesse genuíno em ajudar

2. Escuta Ativa
- Ouça atentamente sem interromper
- Faça perguntas para entender melhor a necessidade
- Repita informações para confirmar entendimento

3. Solução Personalizada
- Ofereça opções baseadas no perfil do cliente
- Destaque benefícios específicos para cada caso
- Seja transparente sobre prazos e valores

Estratégias de Vendas Efetivas:

1. Identificação de Perfil
- Analise o comportamento e necessidades
- Adapte a abordagem ao perfil identificado
- Use linguagem adequada ao público

2. Apresentação de Benefícios
- Foque em benefícios, não apenas características
- Use exemplos práticos e casos de sucesso
- Conecte benefícios às necessidades específicas

3. Storytelling
- Conte histórias de clientes satisfeitos
- Use narrativas que emocionem e conectem
- Destaque a transformação que o serviço proporciona

4. Follow-up
- Mantenha contato após o primeiro contato
- Ofereça conteúdo de valor (dicas, informações)
- Construa relacionamento de longo prazo

Diferenciais da Onishi:
- Expertise em legislação de trânsito
- Suporte completo ao cliente
- Transparência em todos os processos
- Material didático exclusivo

Resultados Esperados:
- Aumento na taxa de conversão
- Maior satisfação do cliente
- Fidelização de clientes
- Crescimento nas vendas recorrentes

Precisa de ajuda com alguma técnica específica?`;
  }
  
  if (cleanMessage.includes('crescer') || cleanMessage.includes('desenvolvimento') || cleanMessage.includes('carreira') || cleanMessage.includes('onishi')) {
    return `O Grupo Onishi é uma empresa que valoriza o crescimento profissional e oferece diversas oportunidades para que você desenvolva sua carreira e alcance seus objetivos.

Caminhos de Desenvolvimento:

1. Treinamentos Internos
- Cursos de legislação de trânsito atualizada
- Workshops de vendas e atendimento
- Capacitação em novas tecnologias
- Treinamentos de liderança e gestão

2. Mentoria e Coaching
- Programa de mentoria com líderes experientes
- Coaching individual para desenvolvimento
- Feedback estruturado e construtivo
- Acompanhamento de metas e objetivos

3. Participação em Projetos
- Envolvimento em projetos estratégicos
- Trabalho em equipes multidisciplinares
- Desenvolvimento de novas soluções
- Contribuição para inovação da empresa

Oportunidades de Crescimento:

1. Promoções Baseadas em Desempenho
- Avaliação regular de performance
- Critérios claros e transparentes
- Reconhecimento de mérito
- Plano de carreira estruturado

2. Especializações
- Cursos de pós-graduação
- Certificações profissionais
- Participação em congressos e eventos
- Networking com profissionais da área

3. Liderança
- Desenvolvimento de habilidades gerenciais
- Gestão de equipes
- Tomada de decisões estratégicas
- Visão de negócio

Valores da Onishi:
- Excelência no atendimento
- Conhecimento técnico
- Inovação constante
- Responsabilidade social
- Trabalho em equipe

Como se Destacar:
- Demonstre proatividade e iniciativa
- Busque constantemente aprender
- Colabore com a equipe
- Ofereça ideias e sugestões
- Mantenha-se atualizado sobre o mercado

Quer conversar sobre seu plano de desenvolvimento?`;
  }
  
  if (cleanMessage.includes('legislação') || cleanMessage.includes('normas') || cleanMessage.includes('regras') || cleanMessage.includes('detran')) {
    return `A legislação de trânsito é fundamental para a segurança de todos. Na Onishi, mantemos nossos colaboradores sempre atualizados sobre as normas e regulamentações vigentes.

Principais Tópicos da Legislação:

1. Código de Trânsito Brasileiro (CTB)
- Lei 9.503/97 e suas alterações
- Regras de circulação e conduta
- Sinalização de trânsito
- Infrações e penalidades

2. Resoluções do CONTRAN
- Normas complementares ao CTB
- Regulamentações específicas
- Atualizações e mudanças
- Procedimentos administrativos

3. Normas do Detran SP
- Procedimentos locais
- Documentação necessária
- Prazos e processos
- Serviços disponíveis

4. Direção Defensiva
- Técnicas de prevenção de acidentes
- Comportamento seguro no trânsito
- Antecipação de riscos
- Primeiros socorros básicos

Recursos Disponíveis na Onishi:

1. Material Didático Atualizado
- Apostilas revisadas regularmente
- Conteúdo em múltiplos formatos
- Exemplos práticos e casos reais
- Simuladores de prova

2. Professores Especializados
- Instrutores credenciados
- Experiência prática no mercado
- Atualização constante
- Metodologia comprovada

3. Suporte da Ayumi 24/7
- Dúvidas respondidas instantaneamente
- Explicações detalhadas
- Exemplos práticos
- Links para materiais complementares

Dicas para se Manter Atualizado:
- Participe dos treinamentos internos
- Leia as atualizações do CTB
- Acompanhe as resoluções do CONTRAN
- Use a Ayumi para esclarecer dúvidas
- Mantenha contato com instrutores

Tem alguma dúvida específica sobre legislação?`;
  }
  
  // Resposta padrão se não encontrar palavras-chave específicas
  return `Olá! Sou a Ayumi, sua parceira de sucesso no Grupo Onishi!

Estou aqui para ajudá-lo a dominar o universo da habilitação, legislação de trânsito, técnicas de vendas e atendimento ao cliente.

Como posso ajudá-lo hoje?

Áreas de Especialização:
- Processo de habilitação e CNH
- Legislação de trânsito (CTB, CONTRAN)
- Técnicas de vendas e atendimento
- Desenvolvimento profissional na Onishi
- Normas e regulamentações do Detran

Sugestões de Perguntas:
- Como funciona o processo de habilitação?
- Quais são as principais normas do CTB?
- Como melhorar meu atendimento ao cliente?
- Como crescer na carreira na Onishi?
- Preciso de ajuda com legislação de trânsito

Faça sua pergunta e eu te ajudo com informações detalhadas e práticas!`;
}
