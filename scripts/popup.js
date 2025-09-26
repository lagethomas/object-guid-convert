document.addEventListener('DOMContentLoaded', () => {
    const converterBtn = document.getElementById('converterBtn');
    const resultadoP = document.getElementById('resultado');

    converterBtn.addEventListener('click', converter);
    resultadoP.addEventListener('click', copiarTexto);

    function converter() {
        const tipoConversao = document.getElementById('tipoConversao').value;
        const entrada = document.getElementById('entrada').value.trim();

        if (tipoConversao === "hexToGuid") {
            converterHexParaGuid(entrada, resultadoP);
        } else if (tipoConversao === "guidToHex") {
            converterGuidParaHex(entrada, resultadoP);
        } else if (tipoConversao === "hexToBase64") {
            converterHexParaBase64(entrada, resultadoP);
        }
    }

    function converterHexParaGuid(hexInput, resultado) {
        const hex = hexInput.replace(/\s+/g, '').toUpperCase();
        if (hex.length !== 32) {
            resultado.innerText = 'Por favor, insira um GUID hexadecimal válido.';
            resultado.style.backgroundColor = '#dc3545';
            return;
        }

        const bloco1 = inverterBloco(hex.substring(0, 8));
        const bloco2 = inverterBloco(hex.substring(8, 12));
        const bloco3 = inverterBloco(hex.substring(12, 16));
        const bloco4 = hex.substring(16, 20);
        const bloco5 = hex.substring(20);

        const guid = `${bloco1}-${bloco2}-${bloco3}-${bloco4}-${bloco5}`.toLowerCase();
        resultado.innerText = guid;
        resultado.style.backgroundColor = '#28a745';
    }

    function converterGuidParaHex(guidInput, resultado) {
        const guid = guidInput.replace(/[^a-fA-F0-9]/g, '').toUpperCase();
        if (guid.length !== 32) {
            resultado.innerText = 'Por favor, insira um GUID válido.';
            resultado.style.backgroundColor = '#dc3545';
            return;
        }

        const bloco1 = inverterBloco(guid.substring(0, 8));
        const bloco2 = inverterBloco(guid.substring(8, 12));
        const bloco3 = inverterBloco(guid.substring(12, 16));
        const bloco4 = guid.substring(16, 20);
        const bloco5 = guid.substring(20);

        const hex = `${bloco1}${bloco2}${bloco3}${bloco4}${bloco5}`.toUpperCase();
        resultado.innerText = hex;
        resultado.style.backgroundColor = '#28a745';
    }

    function converterHexParaBase64(hexInput, resultado) {
        const hex = hexInput.replace(/\s+/g, '').toUpperCase();
        if (!/^[0-9A-F]+$/i.test(hex) || hex.length % 2 !== 0) {
            resultado.innerText = 'Por favor, insira um valor hexadecimal válido.';
            resultado.style.backgroundColor = '#dc3545';
            return;
        }

        const bytes = [];
        for (let i = 0; i < hex.length; i += 2) {
            bytes.push(parseInt(hex.substring(i, i + 2), 16));
        }

        const base64 = btoa(String.fromCharCode(...bytes));
        resultado.innerText = base64;
        resultado.style.backgroundColor = '#28a745';
    }

    function inverterBloco(bloco) {
        return bloco.match(/.{2}/g).reverse().join('');
    }

    function copiarTexto() {
        const textoParaCopiar = this.innerText;
        if (textoParaCopiar === 'Aguardando conversão...' || textoParaCopiar === 'Copiado!') {
            return;
        }

        navigator.clipboard.writeText(textoParaCopiar).then(() => {
            const originalText = this.innerText;
            this.innerText = 'Copiado!';
            setTimeout(() => {
                this.innerText = originalText;
            }, 1000);
        }).catch(err => {
            console.error('Falha ao copiar texto: ', err);
        });
    }
});
