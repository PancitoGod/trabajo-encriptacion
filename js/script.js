// Validación: Evitar que se ingresen caracteres no permitidos o texto vacío
function validateInput(event) {
    const char = event.key; // Captura la tecla presionada
    const regex = /^[a-zA-ZñÑ0-9]+$/; // Permitir letras, números y "ñ", "Ñ"

    if (!regex.test(char)) {
        event.preventDefault(); // Evita que se ingrese el carácter no permitido
    }
}

function validateText(input) {
    if (!input || input.trim() === '') {
        alert('El campo no puede estar vacío.');
        return false;
    }
    if (!/^[a-zA-ZñÑ0-9]+$/.test(input)) {
        alert('El texto solo puede contener letras y números.');
        return false;
    }
    return true;
}

// Mostrar la sección específica
function showSection(section) {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('encrypt-section').style.display = 'none';
    document.getElementById('decrypt-section').style.display = 'none';
    document.getElementById('about-section').style.display = 'none';

    if (section === 'encrypt') {
        document.getElementById('encrypt-section').style.display = 'block';
    } else if (section === 'decrypt') {
        document.getElementById('decrypt-section').style.display = 'block';
    } else if (section === 'about') {
        document.getElementById('about-section').style.display = 'block';
    } else {
        document.getElementById('home-section').style.display = 'flex';
    }
}

// Volver al inicio y limpiar datos
function goToHome() {
    const inputFields = document.querySelectorAll('input[type="text"]');
    inputFields.forEach((input) => (input.value = ''));

    const resultFields = document.querySelectorAll('#encrypt-result, #decrypt-result');
    resultFields.forEach((result) => (result.innerText = ''));

    const copyButtons = document.querySelectorAll('#copy-encrypt-button, #copy-decrypt-button');
    copyButtons.forEach((button) => (button.style.display = 'none'));

    showSection('home');
}

// Encriptación estática (+5)
function firstEncryption(input) {
    const shift = 5;
    const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'; // Incluye Ñ
    const lowerAlphabet = 'abcdefghijklmnñopqrstuvwxyz'; // Incluye ñ
    let result = '';

    for (let char of input) {
        if (alphabet.includes(char)) {
            const index = (alphabet.indexOf(char) + shift) % alphabet.length;
            result += alphabet[index];
        } else if (lowerAlphabet.includes(char)) {
            const index = (lowerAlphabet.indexOf(char) + shift) % lowerAlphabet.length;
            result += lowerAlphabet[index];
        } else if (char >= '0' && char <= '9') {
            result += String.fromCharCode(((char.charCodeAt(0) - 48 + shift) % 10) + 48);
        } else {
            result += char; // Para caracteres no modificables
        }
    }

    return result;
}

// Encriptación dinámica
function dynamicEncryption(input) {
    const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    const lowerAlphabet = 'abcdefghijklmnñopqrstuvwxyz';
    let uppercaseShift = 0;
    let lowercaseShift = 0;
    let numberShift = 0;

    for (let char of input) {
        if (alphabet.includes(char)) {
            uppercaseShift += 1;
        } else if (lowerAlphabet.includes(char)) {
            lowercaseShift += 1;
        } else if (char >= '0' && char <= '9') {
            numberShift += 1;
        }
    }

    let result = '';
    for (let char of input) {
        if (alphabet.includes(char)) {
            const index = (alphabet.indexOf(char) + uppercaseShift) % alphabet.length;
            result += alphabet[index];
        } else if (lowerAlphabet.includes(char)) {
            const index = (lowerAlphabet.indexOf(char) - lowercaseShift + lowerAlphabet.length) % lowerAlphabet.length;
            result += lowerAlphabet[index];
        } else if (char >= '0' && char <= '9') {
            result += String.fromCharCode(((char.charCodeAt(0) - 48 + numberShift) % 10) + 48);
        } else {
            result += char;
        }
    }

    return result;
}

// Desencriptación dinámica (inverso)
function dynamicDecryption(input) {
    const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    const lowerAlphabet = 'abcdefghijklmnñopqrstuvwxyz';
    let uppercaseShift = 0;
    let lowercaseShift = 0;
    let numberShift = 0;

    for (let char of input) {
        if (alphabet.includes(char)) {
            uppercaseShift += 1;
        } else if (lowerAlphabet.includes(char)) {
            lowercaseShift += 1;
        } else if (char >= '0' && char <= '9') {
            numberShift += 1;
        }
    }

    let result = '';
    for (let char of input) {
        if (alphabet.includes(char)) {
            const index = (alphabet.indexOf(char) - uppercaseShift + alphabet.length) % alphabet.length;
            result += alphabet[index];
        } else if (lowerAlphabet.includes(char)) {
            const index = (lowerAlphabet.indexOf(char) + lowercaseShift) % lowerAlphabet.length;
            result += lowerAlphabet[index];
        } else if (char >= '0' && char <= '9') {
            result += String.fromCharCode(((char.charCodeAt(0) - 48 - numberShift + 10) % 10) + 48);
        } else {
            result += char;
        }
    }

    return result;
}

// Desencriptación estática (-5)
function firstDecryption(input) {
    const shift = 5;
    const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
    const lowerAlphabet = 'abcdefghijklmnñopqrstuvwxyz';
    let result = '';

    for (let char of input) {
        if (alphabet.includes(char)) {
            const index = (alphabet.indexOf(char) - shift + alphabet.length) % alphabet.length;
            result += alphabet[index];
        } else if (lowerAlphabet.includes(char)) {
            const index = (lowerAlphabet.indexOf(char) - shift + lowerAlphabet.length) % lowerAlphabet.length;
            result += lowerAlphabet[index];
        } else if (char >= '0' && char <= '9') {
            result += String.fromCharCode(((char.charCodeAt(0) - 48 - shift + 10) % 10) + 48);
        } else {
            result += char;
        }
    }

    return result;
}

// Encriptar texto (Estático → Dinámico)
function encryptText() {
    const input = document.getElementById('encrypt-text-input').value;
    if (!validateText(input)) return;

    const pruebaEncrypted = dynamicEncryption(input);
    const firstEncrypted = firstEncryption(input);
    const finalEncrypted = dynamicEncryption(firstEncrypted);
    
    document.getElementById('encrypt-result').innerText = `Texto Encriptado: ${finalEncrypted}`;
    document.getElementById('copy-encrypt-button').style.display = 'inline-block';
}

// Desencriptar texto (Dinámico → Estático)
function decryptText() {
    const input = document.getElementById('decrypt-text-input').value;
    if (!validateText(input)) return;

    const firstDecrypted = dynamicDecryption(input);
    const finalDecrypted = firstDecryption(firstDecrypted);

    document.getElementById('decrypt-result').innerText = `Texto Desencriptado: ${finalDecrypted}`;
    document.getElementById('copy-decrypt-button').style.display = 'inline-block';
}

// Copiar texto encriptado al portapapeles
function copyEncryptToClipboard() {
    const resultText = document.getElementById('encrypt-result').innerText.replace('Texto Encriptado: ', '');
    navigator.clipboard.writeText(resultText).then(() => {
        alert('Texto copiado al portapapeles.');
    }).catch(() => {
        alert('No se pudo copiar el texto. Intenta nuevamente.');
    });
}

// Copiar texto desencriptado al portapapeles
function copyDecryptToClipboard() {
    const resultText = document.getElementById('decrypt-result').innerText.replace('Texto Desencriptado: ', '');
    navigator.clipboard.writeText(resultText).then(() => {
        alert('Texto copiado al portapapeles.');
    }).catch(() => {
        alert('No se pudo copiar el texto. Intenta nuevamente.');
    });
}

// Asignar eventos de validación a los inputs
document.getElementById('encrypt-text-input').addEventListener('keypress', validateInput);
document.getElementById('decrypt-text-input').addEventListener('keypress', validateInput);
