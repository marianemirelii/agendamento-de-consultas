// Array para armazenar os agendamentos
const agendamentos = [];

// Referências ao DOM
const formularioAgendamento = document.getElementById('formAgendamento');
const mensagem = document.getElementById('mensagem');
const listaAgendamentos = document.getElementById('agendamentos');
const botaoAlternarAgendamentos = document.getElementById('alternarAgendamentos');
const containerListaAgendamentos = document.getElementById('listaAgendamentos');

// Função para verificar se o horário já está reservado
function horarioDisponivel(data, horario) {
    return !agendamentos.some(agendamento => agendamento.data === data && agendamento.horario === horario);
}

// Função para lidar com o envio do formulário
formularioAgendamento.addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    // Obtendo os valores do formulário
    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;

    // Verificar se o horário está disponível
    if (horarioDisponivel(data, horario)) {
        // Agendamento aceito, salvar as informações
        agendamentos.push({ nome, cpf, data, horario });
        mensagem.style.color = 'green';
        mensagem.textContent = 'Consulta agendada com sucesso!';
        formularioAgendamento.reset(); // Limpar o formulário
        exibirAgendamentos(); // Atualizar a lista de agendamentos
        exibirHorariosDisponiveis(); // Atualizar a lista de vagas disponíveis imediatamente
    } else {
        // Horário indisponível
        mensagem.style.color = 'red';
        mensagem.textContent = 'Esse horário já está reservado. Por favor, escolha outro.';
    }
});

// Função para exibir a lista de agendamentos
function exibirAgendamentos() {
    // Limpar a lista atual
    listaAgendamentos.innerHTML = '';

    // Adicionar os agendamentos na tabela
    agendamentos.forEach(agendamento => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${agendamento.nome}</td>
            <td>${agendamento.cpf}</td>
            <td>${agendamento.data}</td>
            <td>${agendamento.horario}</td>
        `;
        listaAgendamentos.appendChild(tr);
    });
}

// Função para exibir a lista de vagas disponíveis
function exibirHorariosDisponiveis() {
    // Horários possíveis
    const horarios = ["08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

    // Limpar a lista atual
    listaHorariosDisponiveis.innerHTML = '';

    // Filtrar horários disponíveis
    const dataSelecionada = document.getElementById('data').value;
    const horariosDisponiveis = horarios.filter(horario => horarioDisponivel(dataSelecionada, horario));


}

// Funções para alternar a visibilidade das tabelas
botaoAlternarAgendamentos.addEventListener('click', function() {
    containerListaAgendamentos.classList.toggle('escondido');
});
