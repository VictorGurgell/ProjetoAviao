document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const saveClientBtn = document.getElementById('save-client-btn');
    const clientForm = document.getElementById('client-form');
    const clientNameInput = document.getElementById('client-name');
    let currentSeat;

    // Função para abrir o modal e verificar se o assento está ocupado
    const openModal = (seatId) => {
        currentSeat = seatId;
        const clients = JSON.parse(localStorage.getItem('clients')) || {};
        const clientName = clients[seatId];

        if (clientName) {
            alert(`Assento já reservado por ${clientName}`);
            clientForm.style.display = 'none';
        } else {
            alert(`Assento está disponível, escreva o seu nome.`);
            clientForm.style.display = 'block';
            clientNameInput.value = '';
            modal.style.display = 'block';
        }
    };

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    saveClientBtn.addEventListener('click', () => {
        const clientName = clientNameInput.value.trim();
        if (clientName) {
            let clients = JSON.parse(localStorage.getItem('clients')) || {};
            clients[currentSeat] = clientName;
            localStorage.setItem('clients', JSON.stringify(clients));
            alert(`Cliente ${clientName} adicionado ao assento`);
            modal.style.display = 'none';
            updateSeatColors(); // Atualiza as cores dos assentos após adicionar o cliente
        } else {
            alert('Por favor, insira um nome.');
        }
    });

    const seats3 = document.querySelectorAll('.seat');

    seats3.forEach(seat => {
        seat.addEventListener('click', () => {
            openModal(seat.id);
        });
    });

    // Função para atualizar as cores dos assentos com base nos clientes no localStorage
    const updateSeatColors = () => {
        const clients = JSON.parse(localStorage.getItem('clients')) || {};
        seats3.forEach(seat => {
            const clientName = clients[seat.id];
            if (clientName) {
                seat.style.color = 'red'; // Define a cor do assento como vermelho se houver um cliente associado a ele
            }
        });
    };

    // Chama a função para atualizar as cores dos assentos quando a página é carregada
    updateSeatColors();
});
