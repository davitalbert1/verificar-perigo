// Função para normalizar o link, removendo "www." se presente
function normalizarLink(link) {
    return link.replace(/^www\./, '');
}

// Função para verificar se o link está presente no JSON
function verificarLink() {
    const linkParaVerificar = document.getElementById('linkInput').value;
    const linkNormalizado = normalizarLink(linkParaVerificar);

    fetch('lista.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(lista => {
            // Verifica se o link normalizado ou o link original está presente no JSON
            const resultado = lista.some(item => 
                normalizarLink(item.DomainAddress) === linkNormalizado || 
                item.DomainAddress === linkParaVerificar
            );

            if (resultado) {
                document.getElementById('resultado').innerText = `O link "${linkParaVerificar}" é ruim.`;
            } else {
                document.getElementById('resultado').innerText = `O link "${linkParaVerificar}" é bom.`;
            }
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo JSON:", error);
            document.getElementById('resultado').innerText = "Erro ao carregar o arquivo JSON.";
        });
}