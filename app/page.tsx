"use client";

import {useState} from "react";
import {AppIcon,type IconName} from "./components/AppIcon";

type MenuItem={icon:IconName;name:string};

const menus:MenuItem[]=[
  {icon:"dashboard",name:"Painel"},
  {icon:"students",name:"Alunos"},
  {icon:"reportCard",name:"Boletins"},
  {icon:"finance",name:"Financeiro"},
  {icon:"payment",name:"Lançar pagamento"},
  {icon:"pix",name:"Pix"},
  {icon:"announcements",name:"Comunicados"},
  {icon:"calendar",name:"Calendário"},
  {icon:"publications",name:"Publicações"},
  {icon:"contracts",name:"Contratos"},
  {icon:"notifications",name:"Notificações"},
  {icon:"staff",name:"Equipe escolar"},
  {icon:"settings",name:"Configurações"},
  {icon:"audit",name:"Auditoria"},
  {icon:"orphanRecords",name:"Registros órfãos"},
  {icon:"backup",name:"Segurança e Backup"},
  {icon:"schoolManagement",name:"Gestão escolar"},
];

const alunos=[
  {nome:"Alice Santos",turma:"5º Ano A",resp:"Carla Santos",situacao:"Ativa",mensalidade:"Em dia"},
  {nome:"Bruno Almeida",turma:"7º Ano B",resp:"Paulo Almeida",situacao:"Ativo",mensalidade:"Pendente"},
  {nome:"Clara Ribeiro",turma:"3º Ano A",resp:"Marina Ribeiro",situacao:"Ativa",mensalidade:"Em dia"},
  {nome:"Diego Nascimento",turma:"8º Ano A",resp:"Sônia Nascimento",situacao:"Ativo",mensalidade:"Em dia"},
  {nome:"Elisa Oliveira",turma:"6º Ano B",resp:"Rafael Oliveira",situacao:"Ativa",mensalidade:"Pendente"},
];

const comunicados=[
  {titulo:"Reunião de responsáveis",texto:"Encontro pedagógico na próxima sexta-feira, às 18h30.",tipo:"Importante",data:"Hoje, 09:20"},
  {titulo:"Período de avaliações",texto:"Confira o calendário de avaliações do 2º bimestre.",tipo:"Acadêmico",data:"Ontem, 16:40"},
  {titulo:"Festa da família",texto:"Inscrições abertas para apresentações e atividades.",tipo:"Evento",data:"10/07/2026"},
];

export default function Home(){
  const [tela,setTela]=useState<"vitrine"|"login"|"sistema">("vitrine");
  const [menu,setMenu]=useState("Painel");
  const [busca,setBusca]=useState("");
  const [toast,setToast]=useState("");
  const [modal,setModal]=useState("");
  const [publicados]=useState(comunicados);
  const [mobile,setMobile]=useState(false);

  const avisar=(mensagem:string)=>{
    setToast(mensagem);
    window.setTimeout(()=>setToast(""),2600);
  };
  const abrir=(tipo:string)=>setModal(tipo);

  if(tela==="vitrine"){
    return <main className="vitrine">
      <nav>
        <b>AGENT<span>O</span>STUDIO</b>
        <a href="https://github.com/fabiobrito01" target="_blank" rel="noreferrer">GitHub ↗</a>
      </nav>
      <section className="vHero">
        <div>
          <small>DEMONSTRAÇÕES DE PRODUTOS</small>
          <h1>Conheça a gestão escolar <em>na prática.</em></h1>
          <p>Explore uma simulação completa, criada com dados fictícios para apresentar a experiência do produto sem expor código, infraestrutura ou informações privadas.</p>
          <button className="iconText" onClick={()=>setTela("login")}>
            Abrir demonstração interativa <AppIcon name="next" size={18}/>
          </button>
        </div>
        <div className="preview"><div className="pTop"/><div className="pBody"><i/><section><b/><span/><span/><div><u/><u/><u/></div></section></div></div>
      </section>
      <section className="vCards">
        <article><strong>13 módulos navegáveis</strong><span>Da matrícula à auditoria</span></article>
        <article><strong>Ações simuladas</strong><span>Cadastros, filtros e pagamentos</span></article>
        <article><strong>Dados 100% fictícios</strong><span>Produto privado protegido</span></article>
      </section>
    </main>;
  }

  if(tela==="login"){
    return <main className="loginReal">
      <button className="voltar iconText" onClick={()=>setTela("vitrine")}><AppIcon name="back" size={18}/> Voltar</button>
      <form onSubmit={evento=>{evento.preventDefault();setTela("sistema");}}>
        <div className="capLogo"><AppIcon name="schoolManagement" size={42}/></div>
        <h1>Sistema de Gestão Escolar</h1>
        <b>Gestão Escolar Integrada</b>
        <label>E-mail<input defaultValue="demo@agentostudio.com.br"/></label>
        <label>Senha<input type="password" defaultValue="demonstracao"/></label>
        <button className="iconText"><AppIcon name="login" size={19}/> Entrar na demonstração</button>
        <a role="button" tabIndex={0} onClick={()=>avisar("Recuperação simulada: nenhuma mensagem foi enviada.")} onKeyDown={evento=>{if(evento.key==="Enter"||evento.key===" ")avisar("Recuperação simulada: nenhuma mensagem foi enviada.");}}>Esqueci minha senha</a>
        <small>Ambiente demonstrativo · Nenhum dado é armazenado</small>
      </form>
      {toast&&<Toast text={toast}/>} 
    </main>;
  }

  const filtrados=alunos.filter(aluno=>(aluno.nome+aluno.turma+aluno.resp).toLowerCase().includes(busca.toLowerCase()));

  if(tela==="sistema"&&menu!=="Painel"){
    const extra=["Financeiro","Pix","Contratos"].includes(menu)
      ? <button className="iconButton" aria-label={`Adicionar em ${menu}`} title={`Adicionar em ${menu}`} onClick={()=>abrir(menu==="Financeiro"?"cobranca":menu==="Pix"?"pagamento":"contrato")}><AppIcon name="add"/></button>
      : null;

    return <TelaModulo titulo={menu} voltar={()=>setMenu("Painel")} extra={extra}>
      {menu==="Alunos"?<Alunos dados={filtrados} busca={busca} setBusca={setBusca} abrir={abrir}/>
      :menu==="Boletins"?<Boletins avisar={avisar}/>
      :menu==="Financeiro"?<Financeiro abrir={abrir}/>
      :menu==="Lançar pagamento"?<Lancar avisar={avisar}/>
      :menu==="Pix"?<Pix avisar={avisar}/>
      :menu==="Comunicados"||menu==="Publicações"?<Comunicados dados={publicados} abrir={abrir}/>
      :menu==="Calendário"?<Calendario abrir={abrir}/>
      :menu==="Contratos"?<Contratos avisar={avisar}/>
      :menu==="Equipe escolar"?<Equipe abrir={abrir}/>
      :menu==="Auditoria"?<Auditoria/>
      :menu==="Notificações"?<VazioReal icone="notifications" texto="Nenhuma notificação no momento."/>
      :menu==="Registros órfãos"?<Orfaos/>
      :menu==="Segurança e Backup"?<Backup avisar={avisar}/>
      :menu==="Gestão escolar"?<Gestao setMenu={setMenu}/>
      :<Configuracoes avisar={avisar}/>} 
      {modal&&<Modal tipo={modal} fechar={()=>setModal("")} salvar={mensagem=>{setModal("");avisar(mensagem);}}/>}
      {toast&&<Toast text={toast}/>} 
    </TelaModulo>;
  }

  return <main className="app">
    <header>
      <button className="hamb iconButton" aria-label={mobile?"Fechar menu":"Abrir menu"} title={mobile?"Fechar menu":"Abrir menu"} aria-expanded={mobile} onClick={()=>setMobile(!mobile)}><AppIcon name={mobile?"close":"menu"}/></button>
      <b className="headerTitle"><AppIcon name="back" size={19}/> Sistema Escolar de Gestão</b>
      <div className="headerActions">
        <button className="iconButton" aria-label="Notificações" title="Notificações" onClick={()=>setMenu("Notificações")}><AppIcon name="notifications"/></button>
        <button className="iconButton" aria-label="Sair da demonstração" title="Sair da demonstração" onClick={()=>setTela("vitrine")}><AppIcon name="logout"/></button>
      </div>
    </header>
    <aside className={mobile?"open":""}>
      <div className="brand"><span><AppIcon className="brandIcon" name="schoolManagement" size={34}/></span></div>
      <div className="usuario"><i>A</i><span><b>Administrador</b><small>Administrador</small></span></div>
      <label className="navTitle">Navegação</label>
      <nav>
        {menus.filter(item=>item.name!=="Painel").map(item=><button key={item.name} className={menu===item.name?"ativo":""} aria-current={menu===item.name?"page":undefined} onClick={()=>{setMenu(item.name);setMobile(false);}}><i><AppIcon name={item.icon} size={19}/></i>{item.name}<span><AppIcon name="next" size={16}/></span></button>)}
      </nav>
    </aside>
    <section className="principal"><Painel abrir={abrir} avisar={avisar}/></section>
    {modal&&<Modal tipo={modal} fechar={()=>setModal("")} salvar={mensagem=>{setModal("");avisar(mensagem);}}/>}
    {toast&&<Toast text={toast}/>} 
  </main>;
}

function TelaModulo({titulo,voltar,extra,children}:{titulo:string;voltar:()=>void;extra?:React.ReactNode;children:React.ReactNode}){
  return <main className="modScreen">
    <header>
      <button className="iconButton" aria-label="Voltar ao painel" title="Voltar ao painel" onClick={voltar}><AppIcon name="back"/></button>
      <h1>{titulo}</h1>
      <div>{extra}</div>
    </header>
    <div className="demoRibbon">AMBIENTE DE DEMONSTRAÇÃO · TODOS OS DADOS SÃO FICTÍCIOS</div>
    <section className="modBody">{children}</section>
  </main>;
}

function Painel({abrir,avisar}:{abrir:(tipo:string)=>void;avisar:(mensagem:string)=>void}){
  return <>
    <section className="institucional">
      <div className="brasao"><AppIcon name="schoolManagement" size={38}/></div>
      <div><h1>Escola Modelo AgentOStudio</h1><p>Educação de qualidade, organização e relacionamento próximo com as famílias.</p><b>● Bem-vindo, Administrador.</b></div>
      <div className="social">
        <button onClick={()=>avisar("Contato demonstrativo")}><AppIcon name="whatsapp" size={18}/>WhatsApp</button>
        <button onClick={()=>avisar("Rede social demonstrativa")}><AppIcon name="instagram" size={18}/>Instagram</button>
      </div>
    </section>
    <div className="stats"><Card t="Acesso" v="Administrador"/><Card t="Permissões" v="10"/><Card t="Avisos" v="3"/><Card t="Publicações" v="8"/></div>
    <button className="acao laranja" onClick={()=>abrir("matricula")}><b><AppIcon name="userAdd"/> Nova matrícula</b><small>Cadastrar aluno e criar lançamento financeiro</small><AppIcon className="nextIcon" name="next" size={28}/></button>
    <button className="acao azulClaro" onClick={()=>abrir("pagamento")}><b><AppIcon name="payment"/> Lançar pagamento</b><small>Dinheiro, Pix, cartão ou outra forma</small><AppIcon className="nextIcon" name="next" size={28}/></button>
    <div className="painelGrid">
      <section className="bloco">
        <div className="blocoHead"><h3>Painel informativo</h3><button onClick={()=>abrir("comunicado")}><AppIcon name="add" size={18}/> Nova publicação</button></div>
        <div className="vazio"><AppIcon name="publications" size={38}/><span>Área livre para publicações e informações da escola.</span></div>
      </section>
      <section className="bloco"><h3>Avisos rápidos</h3><p className="aviso"><AppIcon name="announcements" size={19}/> Reunião pedagógica confirmada para sexta-feira, às 18h30.</p></section>
    </div>
  </>;
}

function Card({t,v}:{t:string;v:string}){return <article><small>{t}</small><strong>{v}</strong></article>;}

function Cabecalho({titulo,sub,acao,onClick}:{titulo:string;sub:string;acao?:string;onClick?:()=>void}){
  return <div className="cab"><div><h1>{titulo}</h1><p>{sub}</p></div>{acao&&<button onClick={onClick}><AppIcon name="add" size={18}/>{acao}</button>}</div>;
}

function Alunos({dados,busca,setBusca,abrir}:{dados:typeof alunos;busca:string;setBusca:(valor:string)=>void;abrir:(tipo:string)=>void}){
  return <>
    <div className="buscaGrande"><input value={busca} onChange={evento=>setBusca(evento.target.value)} placeholder="Buscar aluno, responsável, turma ou telefone" aria-label="Buscar aluno, responsável, turma ou telefone"/></div>
    <div className="tools">
      <span><AppIcon name="students" size={18}/>72 de 72 alunos</span>
      <select aria-label="Filtrar por turma"><option>Todas as turmas</option><option>5º Ano A</option><option>7º Ano B</option></select>
      <button><AppIcon name="export" size={18}/>Exportar CSV</button>
      <button><AppIcon name="pdf" size={18}/>PDF por turma</button>
      <button><AppIcon name="import" size={18}/>Importar CSV</button>
    </div>
    <div className="realTable alunosReal">
      <div className="realTr realTh"><b>Aluno</b><b>ID</b><b>Matrícula</b><b>Nascimento</b><b>Turma</b><b>Turno</b><b>Responsável</b><b>Status</b><b>Ações</b></div>
      {dados.map((aluno,indice)=><div className="realTr" key={aluno.nome}>
        <b>{aluno.nome}</b><span>aluno_{String(indice+1).padStart(4,"0")}</span><span>{2022+indice}</span><span>{["17/08/2017","12/03/2016","24/03/2018"][indice%3]}</span><span>{aluno.turma}</span><span>{indice?"Vespertino":"Matutino"}</span><span>{aluno.resp}</span><span>Ativo</span>
        <div className="rowActions">
          <button aria-label={`Ver ficha de ${aluno.nome}`} title="Ver ficha" onClick={()=>abrir("ficha")}><AppIcon name="view" size={18}/></button>
          <button aria-label={`Ver boletim de ${aluno.nome}`} title="Ver boletim"><AppIcon name="reportCard" size={18}/></button>
          <button aria-label={`Ver documento de ${aluno.nome}`} title="Ver documento"><AppIcon name="pdf" size={18}/></button>
          <button aria-label={`Editar ${aluno.nome}`} title="Editar"><AppIcon name="edit" size={18}/></button>
        </div>
      </div>)}
    </div>
    <button className="fab" onClick={()=>abrir("matricula")}><AppIcon name="userAdd"/>Aluno</button>
  </>;
}

function Boletins({avisar}:{avisar:(mensagem:string)=>void}){
  const [aluno,setAluno]=useState("");
  const disciplinas=["Português","Matemática","Ciências","História","Geografia","Inglês"];
  if(aluno){
    return <>
      <section className="boletimHero"><h2>{aluno}</h2><div><span>Matrícula <b>2026</b></span><span>Turma <b>5º Ano A</b></span><span>Turno <b>Matutino</b></span><span>Unidade <b>1ª</b></span><span>Média <b>8,4</b></span><span>Situação <b>Em lançamento</b></span></div></section>
      <div className="infoLine"><AppIcon name="audit" size={18}/>Aguardando ciência · Link demonstrativo gerado para o responsável.</div>
      <section className="regras"><h3>Regras do boletim</h3><div className="ruleGrid"><label>Fórmula da média<input value="Soma das notas / quantidade de notas" readOnly/></label><label>Média para aprovação<input value="7,0" readOnly/></label><label>Média para recuperação<input value="5,0" readOnly/></label></div></section>
      <h3>Lançamento de notas</h3>
      <div className="gradeNotas"><div className="notaHead">Disciplina　 Nota 1　 Nota 2　 Faltas　 Média　 Situação　 Observação</div>{disciplinas.map((disciplina,indice)=><div key={disciplina}><input value={disciplina} readOnly/><input defaultValue={`${8+indice%2},0`}/><input defaultValue={`${7+indice%3},5`}/><input defaultValue={indice}/><b>{indice%2?"8,0":"7,8"}</b><input defaultValue="Aprovado"/><input placeholder="Observação"/></div>)}</div>
      <button className="fab" onClick={()=>avisar("Notas fictícias salvas.")}><AppIcon name="check"/>Salvar</button>
    </>;
  }
  return <>
    <section className="blueIntro"><h2 className="iconText"><AppIcon name="reportCard"/>Boletim Escolar</h2><p>Ano letivo 2026 — selecione o aluno e a unidade.</p></section>
    <div className="boletimTools"><input placeholder="Buscar aluno" aria-label="Buscar aluno"/><button className="iconText"><AppIcon name="check" size={17}/>1ª</button><button>2ª</button><button>3ª</button><button><AppIcon name="add" size={17}/>Adicionar unidade</button></div>
    <div className="studentList">{alunos.map(item=><button key={item.nome} onClick={()=>setAluno(item.nome)}><i><AppIcon name="reportCard" size={20}/></i><span>{item.nome}<small>Matrícula: 2026 | Turma: {item.turma} | Turno: Matutino</small></span><b><AppIcon name="next" size={18}/></b></button>)}</div>
  </>;
}

function Financeiro({abrir}:{abrir:(tipo:string)=>void}){
  const meses=["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
  return <>
    <div className="summaryChips"><span><AppIcon name="students" size={18}/>Alunos: 72</span><span>● Pago: 49</span><span>▲ Vencido: 3</span><span><AppIcon name="audit" size={18}/>Pendente: 20</span></div>
    <div className="financeTools"><input placeholder="Buscar aluno" aria-label="Buscar aluno"/><button>Todos</button><button>● Pago</button><button>● Vencido</button><button>● Pendente</button><select aria-label="Filtrar por turma"><option>Todas as turmas</option></select><button><AppIcon name="pdf" size={18}/>Imprimir / PDF</button><button><AppIcon name="export" size={18}/>Exportar CSV</button></div>
    <div className="monthMatrix"><div className="matrixHead"><b>Aluno</b>{meses.map(mes=><b key={mes}>{mes}</b>)}</div>{alunos.map((aluno,indiceAluno)=><div className="matrixRow" key={aluno.nome}><b>{aluno.nome}</b>{meses.map((mes,indiceMes)=>{const pago=indiceMes<6-indiceAluno%2;const vencido=!pago&&indiceMes===6&&indiceAluno>2;return <button key={mes} className={pago?"pago":vencido?"vencido":"pendente"} onClick={()=>abrir("cobranca")}><strong className="iconText">{pago?"Pago":vencido?"Vencido":"Pendente"}<AppIcon name="edit" size={13}/></strong><small>{pago?`12/${String(indiceMes+1).padStart(2,"0")}/2026`:"R$ 280,00"}</small></button>;})}</div>)}</div>
    <button className="fab iconButton" aria-label="Adicionar cobrança" title="Adicionar cobrança" onClick={()=>abrir("cobranca")}><AppIcon name="add"/></button>
  </>;
}

function Lancar({avisar}:{avisar:(mensagem:string)=>void}){
  return <section className="pagina estreita"><Cabecalho titulo="Lançar pagamento" sub="Registre um recebimento demonstrativo"/><div className="formCard"><label>Aluno<select><option>Selecione um aluno</option>{alunos.map(aluno=><option key={aluno.nome}>{aluno.nome}</option>)}</select></label><div><label>Referência<select><option>Julho/2026</option><option>Junho/2026</option></select></label><label>Valor<input defaultValue="680,00"/></label></div><label>Forma de pagamento<div className="formas"><button>Pix</button><button>Dinheiro</button><button>Cartão</button><button>Transferência</button></div></label><label>Observação<textarea placeholder="Observação opcional"/></label><button className="salvar" onClick={()=>avisar("Pagamento demonstrativo registrado com sucesso!")}><AppIcon name="check"/>Confirmar pagamento</button></div></section>;
}

function Pix({avisar}:{avisar:(mensagem:string)=>void}){
  const [copiado,setCopiado]=useState(false);
  return <section className="pagina"><Cabecalho titulo="Pix" sub="Cobranças rápidas e conciliação demonstrativa"/><div className="pixGrid"><div className="formCard"><h3>Gerar cobrança Pix</h3><label>Aluno<select><option>Bruno Almeida</option><option>Elisa Oliveira</option></select></label><label>Valor<input defaultValue="720,00"/></label><label>Descrição<input defaultValue="Mensalidade Julho/2026"/></label><button className="salvar" onClick={()=>avisar("QR Code Pix demonstrativo atualizado.")}><AppIcon name="pix"/>Gerar QR Code</button></div><div className="qrCard"><div className="qr"><AppIcon name="pix" size={52}/></div><b>R$ 720,00</b><span>PIX-DEMO-AGENTOSTUDIO-2026</span><button className="iconText" onClick={()=>{setCopiado(true);avisar("Código Pix fictício copiado.");}}>{copiado?<><AppIcon name="check" size={18}/>Código copiado</>:<>Copiar código Pix</>}</button></div></div></section>;
}

function Comunicados({dados,abrir}:{dados:typeof comunicados;abrir:(tipo:string)=>void}){
  return <section className="pagina"><Cabecalho titulo="Comunicados" sub="Informações para famílias, alunos e equipe" acao="Novo comunicado" onClick={()=>abrir("comunicado")}/><div className="comunicados">{dados.map(comunicado=><article key={comunicado.titulo}><i><AppIcon name="announcements" size={23}/></i><div><small>{comunicado.tipo} · {comunicado.data}</small><h3>{comunicado.titulo}</h3><p>{comunicado.texto}</p><button onClick={()=>abrir("comunicadoDetalhe")}>Ver comunicado</button></div></article>)}</div></section>;
}

function Calendario({abrir}:{abrir:(tipo:string)=>void}){
  return <section className="pagina"><Cabecalho titulo="Calendário escolar" sub="Julho de 2026" acao="Novo evento" onClick={()=>abrir("evento")}/><div className="cal"><div className="dias">{["DOM","SEG","TER","QUA","QUI","SEX","SÁB"].map(dia=><b key={dia}>{dia}</b>)}{Array.from({length:35},(_,indice)=><button key={indice} className={[18,22,29].includes(indice-2)?"temEvento":""}>{indice<3||indice>33?"":indice-2}{indice===20&&<small>Reunião</small>}{indice===24&&<small>Avaliação</small>}{indice===31&&<small>Encerramento</small>}</button>)}</div><aside><h3>Próximos eventos</h3><p><b>18 JUL</b><span>Reunião de responsáveis<small>18h30 · Auditório</small></span></p><p><b>22 JUL</b><span>Avaliação pedagógica<small>Turno regular</small></span></p><p><b>29 JUL</b><span>Encerramento do bimestre<small>Todo o dia</small></span></p></aside></div></section>;
}

function Contratos({avisar}:{avisar:(mensagem:string)=>void}){
  return <section className="pagina"><Cabecalho titulo="Contratos" sub="Documentos, aceite e acompanhamento"/><div className="stats"><Card t="Contratos ativos" v="268"/><Card t="Aguardando aceite" v="12"/><Card t="Assinados este mês" v="34"/><Card t="Taxa de conclusão" v="96%"/></div><div className="tabela"><div className="tr th"><span>RESPONSÁVEL</span><span>ALUNO</span><span>DOCUMENTO</span><span>STATUS</span><span></span></div>{alunos.slice(0,4).map((aluno,indice)=><div className="tr" key={aluno.nome}><b>{aluno.resp}</b><span>{aluno.nome}</span><span>Contrato educacional 2026</span><mark className={indice===1?"pend":"ok"}>{indice===1?"Aguardando":"Assinado"}</mark><button className="iconText" onClick={()=>avisar("Prévia fictícia do contrato aberta.")}><AppIcon name="view" size={17}/>Visualizar</button></div>)}</div></section>;
}

function Equipe({abrir}:{abrir:(tipo:string)=>void}){
  return <section className="pagina"><Cabecalho titulo="Equipe escolar" sub="Usuários, funções e permissões" acao="Adicionar membro" onClick={()=>abrir("equipe")}/><div className="equipe">{[["Mariana Costa","Diretora","Administrador"],["Carlos Lima","Coordenador","Pedagógico"],["Fernanda Reis","Secretária","Atendimento"],["João Alves","Professor","Docente"]].map(pessoa=><article key={pessoa[0]}><i>{pessoa[0].split(" ").map(parte=>parte[0]).join("")}</i><h3>{pessoa[0]}</h3><p>{pessoa[1]}</p><mark className="ok">{pessoa[2]}</mark><button className="iconText" onClick={()=>abrir("permissoes")}><AppIcon name="settings" size={17}/>Gerenciar acesso</button></article>)}</div></section>;
}

function Auditoria(){
  return <section className="pagina"><Cabecalho titulo="Auditoria" sub="Histórico de ações no ambiente demonstrativo"/><div className="timeline">{[["Hoje, 09:20","Administrador","Visualizou o painel financeiro"],["Hoje, 09:12","Secretaria","Registrou pagamento fictício"],["Ontem, 16:45","Coordenação","Publicou comunicado demonstrativo"],["Ontem, 14:30","Administrador","Atualizou permissões de acesso"],["10/07, 11:08","Sistema","Backup demonstrativo concluído"]].map(item=><article key={item[0]+item[2]}><i><AppIcon name="check" size={17}/></i><span><b>{item[2]}</b><small>{item[1]} · {item[0]}</small></span></article>)}</div></section>;
}

function Configuracoes({avisar}:{avisar:(mensagem:string)=>void}){
  return <section className="pagina estreita"><Cabecalho titulo="Configurações" sub="Preferências desta demonstração"/><div className="formCard"><label>Nome da instituição<input defaultValue="Escola Modelo AgentOStudio"/></label><label>Ano letivo<select><option>2026</option></select></label><label className="switch"><input type="checkbox" defaultChecked/> Ativar notificações demonstrativas</label><label className="switch"><input type="checkbox" defaultChecked/> Exibir resumo financeiro no painel</label><button className="salvar" onClick={()=>avisar("Preferências demonstrativas salvas.")}><AppIcon name="check"/>Salvar configurações</button></div></section>;
}

function VazioReal({icone,texto}:{icone:IconName;texto:string}){return <div className="emptyReal"><AppIcon name={icone} size={42}/><p>{texto}</p></div>;}

function Orfaos(){
  return <>
    <section className="whiteCard"><h2><AppIcon name="orphanRecords"/>Histórico de alunos removidos</h2><p>Esta área demonstra a revisão segura de registros financeiros antes de qualquer exclusão definitiva.</p><div className="summaryChips"><span><AppIcon name="reportCard" size={18}/>Mensalidades órfãs: 0</span><span><AppIcon name="pix" size={18}/>Pix órfãos: 0</span></div></section>
    <section className="whiteCard"><h3>Mensalidades de alunos removidos (0)</h3><p>Nenhuma mensalidade órfã encontrada.</p></section>
    <section className="whiteCard"><h3>Cobranças Pix de alunos removidos (0)</h3><p>Nenhuma cobrança Pix órfã encontrada.</p></section>
  </>;
}

function Backup({avisar}:{avisar:(mensagem:string)=>void}){
  const opcoes=[["Backup manual seguro","Gera uma cópia criptografada dos dados e anexos."],["Backup automático","Agenda uma rotina periódica no ambiente da instituição."],["Verificação e restauração protegida","Confere o pacote antes de qualquer recuperação."]];
  return <>
    <div className="protect"><AppIcon name="shield" size={23}/><b>Proteção contra perda de dados</b><span>Esta demonstração não acessa arquivos nem executa comandos no computador.</span></div>
    <section className="whiteCard steps"><h3><AppIcon name="info" size={20}/>Como funciona no produto</h3><p><b>1</b> O administrador cria um pacote criptografado.</p><p><b>2</b> O sistema verifica a integridade antes da restauração.</p><p><b>3</b> A restauração exige confirmação explícita.</p></section>
    {opcoes.map(opcao=><section className="whiteCard" key={opcao[0]}><h3><AppIcon name="backup" size={20}/>{opcao[0]}</h3><p>{opcao[1]}</p><div className="fakeCommand">AÇÃO PROTEGIDA · DISPONÍVEL SOMENTE NO PRODUTO PRIVADO</div><button className="outline" onClick={()=>avisar("Simulação concluída. Nenhuma ação foi executada.")}><AppIcon name="shield" size={18}/>Executar simulação segura</button></section>)}
  </>;
}

function Gestao({setMenu}:{setMenu:(menu:string)=>void}){
  const itens:{icon:IconName;label:string;target:string}[]=[
    {icon:"students",label:"Alunos",target:"Alunos"},
    {icon:"userAdd",label:"Nova matrícula",target:"Alunos"},
    {icon:"reportCard",label:"Boletins escolares",target:"Boletins"},
    {icon:"finance",label:"Financeiro",target:"Financeiro"},
    {icon:"settings",label:"Configurações da escola",target:"Configurações"},
    {icon:"audit",label:"Auditoria interna",target:"Auditoria"},
    {icon:"orphanRecords",label:"Registros órfãos",target:"Registros órfãos"},
    {icon:"backup",label:"Segurança e Backup",target:"Segurança e Backup"},
    {icon:"announcements",label:"Comunicados",target:"Comunicados"},
  ];
  return <><section className="adminHero"><h2>Painel administrativo</h2><p>Visão rápida da operação escolar.</p><div><Card t="Alunos" v="72"/><Card t="Pagos" v="49"/><Card t="Pendentes" v="20"/><Card t="Comunicados" v="3"/></div></section><div className="adminLinks">{itens.map(item=><button key={item.label} onClick={()=>setMenu(item.target)}><i><AppIcon name={item.icon} size={20}/></i><span>{item.label}<small>Explorar recursos demonstrativos deste módulo</small></span><b><AppIcon name="next" size={18}/></b></button>)}</div></>;
}

function Modal({tipo,fechar,salvar}:{tipo:string;fechar:()=>void;salvar:(mensagem:string)=>void}){
  const titulos:Record<string,string>={matricula:"Nova matrícula",pagamento:"Lançar pagamento",comunicado:"Novo comunicado",ficha:"Ficha do aluno",cobranca:"Nova cobrança",evento:"Novo evento",equipe:"Adicionar membro",permissoes:"Permissões de acesso",comunicadoDetalhe:"Detalhes do comunicado",contrato:"Novo contrato"};
  return <div className="overlay" onMouseDown={evento=>{if(evento.target===evento.currentTarget)fechar();}}><section className="modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button className="x iconButton" aria-label="Fechar" title="Fechar" onClick={fechar}><AppIcon name="close"/></button><small>AMBIENTE DEMONSTRATIVO</small><h2 id="modal-title">{titulos[tipo]||tipo}</h2>{tipo==="ficha"?<><div className="ficha"><i>AS</i><div><b>Alice Santos</b><span>5º Ano A · Matrícula 2026-001</span></div></div><div className="miniStats"><Card t="Frequência" v="96%"/><Card t="Média geral" v="8,5"/></div></>:tipo==="comunicadoDetalhe"?<><h3>Reunião de responsáveis</h3><p>Encontro pedagógico na próxima sexta-feira, às 18h30. Este conteúdo é inteiramente fictício.</p></>:<><label>Título ou nome<input placeholder="Digite uma informação fictícia"/></label><div className="duplo"><label>Categoria<select><option>Geral</option><option>Acadêmico</option><option>Financeiro</option></select></label><label>Data<input type="date" defaultValue="2026-07-18"/></label></div><label>Detalhes<textarea placeholder="Conteúdo demonstrativo"/></label></>}<div className="modalAcoes"><button onClick={fechar}>Cancelar</button><button className="iconText" onClick={()=>salvar(`${titulos[tipo]||"Ação"} concluída na demonstração.`)}><AppIcon name="check" size={18}/>Salvar demonstração</button></div></section></div>;
}

function Toast({text}:{text:string}){return <div className="toast"><AppIcon name="check" size={18}/>{text}</div>;}
