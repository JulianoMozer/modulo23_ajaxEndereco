$(document).ready(function() {
    // Aplicar máscara no campo CEP
    $('#cep').mask('00000-000');

    // Função de busca do CEP (ao clicar no botão)
    $('#btn-buscar-cep').on('click', function() {
        var cep = $('#cep').val().trim();

        // Remover o traço para validar o CEP
        var cepValid = cep.replace('-', '');

        if (cepValid.length !== 8) {
            alert('CEP inválido. Deve conter 8 dígitos.');
            return;
        }

        // Exibe o spinner
        $(this).addClass('loading');

        // Requisição AJAX para buscar o CEP
        $.getJSON(`https://viacep.com.br/ws/${cepValid}/json/`, function(data) {
            if (data.erro) {
                alert('CEP não encontrado.');
            } else {
                // Preenchendo os campos com os dados da resposta
                $('#endereco').val(data.logradouro);
                $('#bairro').val(data.bairro);
                $('#cidade').val(data.localidade);
                $('#estado').val(data.uf);
            }
        }).fail(function() {
            alert('Erro ao buscar o CEP.');
        }).always(function() {
            // Esconde o spinner após finalizar a requisição
            $('#btn-buscar-cep').removeClass('loading');
        });
    });

    // Validação do envio do formulário
    $('#formulario').on('submit', function(event) {
        event.preventDefault(); // Impede envio do formulário

        var nome = $('#nome').val().trim();
        var sobrenome = $('#sobrenome').val().trim();
        var email = $('#email').val().trim();
        var cep = $('#cep').val().trim();
        var numero = $('#numero').val().trim();

        if (nome === '' || sobrenome === '' || email === '' || cep === '' || numero === '') {
            alert('Todos os campos devem ser preenchidos.');
            return;
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Por favor, insira um e-mail válido.');
            return;
        }

        alert('Formulário enviado com sucesso!');

        // Limpar os campos após o envio com sucesso
        $('#formulario')[0].reset();
        // Limpar os campos de endereço, bairro, cidade e estado que são "readonly"
        $('#endereco, #bairro, #cidade, #estado').val('');
    });
});
