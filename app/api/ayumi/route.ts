import { NextRequest, NextResponse } from 'next/server';
import { findAyumiAnswer } from '@/lib/ayumiDatabase';

export async function POST(request: NextRequest) {
  let body: any = {};

  try {
    body = await request.json();
    
    if (!body.message) {
      return NextResponse.json({
        error: 'Mensagem é obrigatória'
      }, { status: 400 });
    }

    // Buscar resposta no banco de dados estruturado
    const ayumiResponse = findAyumiAnswer(body.message);
    
    if (ayumiResponse) {
      return NextResponse.json({
        response: ayumiResponse,
        source: 'ayumi_database'
      });
    }

    // Se não encontrar no banco de dados, usar resposta específica para perguntas não cobertas
    const specificResponse = generateSpecificResponse(body.message);
    return NextResponse.json({
      response: specificResponse,
      source: 'specific_response'
    });

  } catch (error) {
    console.error('Erro interno na API Ayumi:', error);
    return NextResponse.json({
      response: 'Desculpe, ocorreu um erro interno. Por favor, tente novamente.',
      source: 'error'
    }, { status: 500 });
  }
}

// Gerar resposta específica para perguntas não cobertas no banco de dados
function generateSpecificResponse(message: string): string {
  const cleanMessage = message.trim().toLowerCase();
  
  // Respostas específicas para perguntas comuns não cobertas no banco de dados
  
  if (cleanMessage.includes('como funciona') && cleanMessage.includes('processo') && cleanMessage.includes('habilitação')) {
    return `Olá! O processo de habilitação para obter a Carteira Nacional de Habilitação (CNH) no Brasil é padronizado pelo Código de Trânsito Brasileiro (CTB) e regulamentado pelo CONTRAN, com etapas bem definidas que visam preparar o futuro condutor. Na Autoescola Onishi, buscamos tornar essa jornada o mais eficiente e completa possível.

Veja o passo a passo:

1. Pré-requisitos e Abertura do Processo
Para iniciar o processo de habilitação, o candidato deve atender aos seguintes requisitos básicos:
- Idade: Ser penalmente imputável (ter 18 anos completos). A emancipação não antecipa esse requisito.
- Alfabetização: Saber ler e escrever.
- Documentação: Possuir documento de identidade (RG, Carteira de Trabalho, Passaporte ou outro documento com foto) e Cadastro de Pessoa Física (CPF).

2. Exames Médico e Psicotécnico
Esta é a primeira etapa presencial. O candidato deve ser considerado APTO nos exames de:
- Aptidão Física e Mental: Realizado por um médico perito examinador credenciado pelo Detran.
- Avaliação Psicológica: Realizada por um psicólogo perito examinador credenciado pelo Detran.

3. Curso Teórico-Técnico (CFC Teórico)
Após ser aprovado nos exames médico e psicotécnico, o aluno inicia o curso teórico.
- Carga Horária: O curso possui 45 horas-aula.
- Modalidade: Na Autoescola Onishi, o CFC Teórico é oferecido na modalidade EAD Online.

4. Exame Teórico
Ao concluir o CFC Teórico, o aluno realiza o exame teórico.
- Formato: Prova com, no mínimo, 30 questões de múltipla escolha.
- Aprovação: Para ser aprovado, o candidato deve acertar, no mínimo, 70% das questões (21 acertos).

5. Curso de Prática de Direção Veicular (CFC Prático)
Com a aprovação no exame teórico, o aluno inicia as aulas práticas.
- Carga Horária: Mínimo de 20 horas-aula para as categorias A (moto) e B (carro).

6. Exame Prático de Direção Veicular
Esta é a última etapa para a obtenção da CNH.
- Realização: O exame é realizado em via pública, com a presença de examinadores do Detran.

7. Emissão da Permissão para Dirigir (PPD) ou CNH
- PPD: Após a aprovação no exame prático, o candidato recebe a Permissão para Dirigir (PPD), com validade de um ano.
- CNH Definitiva: Ao final do período de um ano da PPD, se o condutor não tiver cometido nenhuma infração de natureza grave ou gravíssima, a CNH definitiva será emitida.`;
  }
  
  if (cleanMessage.includes('diferenciais') || cleanMessage.includes('por que') || cleanMessage.includes('escolher')) {
    return `Que ótima pergunta! É fundamental que nossos colaboradores saibam e consigam transmitir os diferenciais da Autoescola Onishi para nossos clientes. Nosso foco é oferecer uma experiência completa e de alta qualidade.

Aqui estão os nossos principais diferenciais:

1. Melhor Avaliada no Google: Somos a autoescola MELHOR AVALIADA no Google na Grande São Paulo.

2. Agilidade no Processo e Início Imediato: Oferecemos AGILIDADE no processo de habilitação, com início IMEDIATO dos cursos.

3. CFC Teórico Online: Somos um dos poucos com CFC TEÓRICO ONLINE, permitindo que o aluno faça as aulas do conforto de sua casa ou trabalho.

4. Portal do Aluno Exclusivo: Dispomos de um Portal do Aluno em nosso site, com conteúdo extra 24h por dia.

5. Plano de Aulas Exclusivo com Acompanhamento Individual: Nosso Plano de Aulas é Exclusivo, com acompanhamento individual e feedback aula a aula com o instrutor.

6. Sala de Provas Moderna no Local: Temos uma sala de provas moderna onde o aluno pode optar por fazer sua prova de habilitação aqui mesmo.

7. Estrutura Completa e Moderna: Contamos com uma infraestrutura completa e moderna, incluindo salas climatizadas.

8. Foco na Qualidade e Atendimento Diferenciado: Nosso modelo é focado na qualidade do atendimento e do ensino.`;
  }
  
  if (cleanMessage.includes('quinta') && cleanMessage.includes('feira')) {
    return `Olá! Sendo quinta-feira, há algumas rotinas importantes que devem ser realizadas na Autoescola Onishi, especialmente aquelas relacionadas à organização e processamento de taxas.

Com base nos nossos protocolos, as principais atividades para hoje incluem:

Processamento de Taxas:
- Você deve alimentar as informações no sistema Abel para gerar as taxas dos exames teóricos. Este é um procedimento que ocorre toda terça e quinta-feira.
- Após alimentar as informações, você deve enviar o arquivo para o Rodrigo pagar as taxas.
- Certifique-se de que a lista de alunos e os dossiês estejam completos e prontos até as 14:00 para que a Camila possa conferir até as 15:00.

Rotinas de Aulas Teóricas (CFC Teórico):
- Abrir as aulas teóricas EAD online no e-CNH e Pro Condutor, configurando as turmas e horários corretos.
- Monitorar a presença dos alunos e a contabilização das aulas na plataforma.
- Atualizar os grupos de WhatsApp das turmas, removendo alunos que já finalizaram o curso.

Atendimento Geral:
- Atender clientes presencialmente, por telefone, WhatsApp e e-mail, seguindo os protocolos de atendimento e vendas.
- Manter a sala de provas organizada e pronta para uso, verificando computadores, câmeras e colete de identificação.

Organização e Manutenção:
- Manter a limpeza e organização da sala de aula e demais ambientes da autoescola.
- Verificar os veículos de prática (nível de combustível, limpeza, calibragem dos pneus) para as aulas e exames.`;
  }
  
  if (cleanMessage.includes('melhorar') && (cleanMessage.includes('atendimento') || cleanMessage.includes('vendas'))) {
    return `Essa é uma excelente pergunta! Melhorar o atendimento ao cliente e converter mais vendas são objetivos contínuos e essenciais para o sucesso da Autoescola Onishi. Para isso, podemos focar em alguns pilares fundamentais:

1. Entenda Profundamente o Cliente e Suas Necessidades
Antes de apresentar soluções, ouça e compreenda o que o cliente realmente busca. Faça perguntas estratégicas para identificar suas dores e expectativas.

2. Apresente Nossos Diferenciais de Forma Impactante
Não apenas liste os serviços, mas mostre o valor e os benefícios que a Autoescola Onishi oferece.

3. Construa Conexão e Confiança
A venda não é apenas uma transação, mas a construção de um relacionamento.

4. Foco na Qualidade do Atendimento em Todos os Canais
Seja presencialmente, por telefone, WhatsApp ou e-mail, a qualidade do atendimento deve ser a mesma.

Ao aplicar essas estratégias, você não apenas melhora a experiência do cliente, mas também aumenta as chances de conversão, pois o cliente se sentirá seguro, valorizado e confiante em escolher a Autoescola Onishi.`;
  }
  
  // Resposta padrão para perguntas não cobertas
  return `Olá! Sou a Ayumi, sua parceira de sucesso na Autoescola Onishi! 🤝

Estou aqui para ajudá-lo com informações precisas sobre nossos processos, políticas e tudo relacionado ao universo da habilitação.

Para perguntas específicas sobre:
- Processo de habilitação e CNH
- Aulas práticas e teóricas
- Documentos necessários
- Exames médico e psicotécnico
- Débitos e taxas
- Agendamentos
- E muito mais

Por favor, seja mais específico na sua pergunta para que eu possa te ajudar com a resposta mais precisa e detalhada possível!

Como posso te auxiliar hoje?`;
}
