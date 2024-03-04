const cardContainer = document.getElementById('card-container');
const shuffleButton = document.getElementById('shuffle-button');
const revealButton = document.getElementById('reveal-button');

let arcanosMaiores = []; // Armazena os arcanos maiores com as descrições expandidas

fetch('arcanos_maiores.json')
    .then(response => response.json())
    .then(data => {
        arcanosMaiores = data;
    })
    .catch(error => console.error('Erro ao carregar arcanos_maiores.json:', error));

function shuffleCards() {
    // Exibir a animação de carregamento
    cardContainer.innerHTML = '';
    const animationContainer = document.createElement('div');
    animationContainer.id = 'loading-animation';
    cardContainer.appendChild(animationContainer);

    // Carregar os dados da animação de carregamento
    fetch('loading.json')
        .then(response => response.json())
        .then(data => {
            // Configurar a animação de carregamento
            animation = lottie.loadAnimation({
                container: animationContainer,
                renderer: 'svg',
                loop: true,
                autoplay: true,
                animationData: data // Aqui você passa os dados da animação que foram carregados
            });

            // Simular um atraso para o carregamento (você pode remover isso depois)
            setTimeout(() => {
                // Remover a animação de carregamento
                cardContainer.removeChild(animationContainer);
                revealCard()
            }, 3000); // Altere o tempo conforme necessário

            // Realizar o embaralhamento após um certo tempo (você pode ajustar isso conforme necessário)
            setTimeout(() => {
                // Coloque a lógica real de embaralhamento aqui
            }, 2000); // Tempo de espera para a animação (2000ms = 2 segundos)
        })
        .catch(error => console.error('Erro ao carregar loading.json:', error));
}

function revealCard() {
    const randomIndex = Math.floor(Math.random() * arcanosMaiores.length);
    const card = arcanosMaiores[randomIndex];
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.innerHTML = `
        <h3>${card.nome}</h3>
        <img src="${card.imagem}" alt="${card.nome}">
        <p>${card.descricao}</p>
    `;
    cardContainer.innerHTML = '';
    cardContainer.appendChild(cardElement);
}

shuffleButton.addEventListener('click', function () {
    shuffleCards();

});
