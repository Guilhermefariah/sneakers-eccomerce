document.getElementById('registration-form').addEventListener('submit', function(event) {
    event.preventDefault()

    const username = document.getElementById('username').value.trim()
    const email = document.getElementById('email').value.trim()
    const password = document.getElementById('password').value
    const confirmPassword = document.getElementById('confirm-password').value

    const formMessage = document.getElementById('form-message')

    if (password !== confirmPassword) {
        formMessage.textContent = 'As senhas não coincidem.'
        return
    }

    formMessage.textContent = 'Cadastro realizado com sucesso!'
    formMessage.style.color = 'green'
})
