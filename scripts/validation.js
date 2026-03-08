// scripts/validation.js
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Сброс ошибок при вводе
    document.querySelectorAll('.form-control').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            const parent = this.closest('.form-group');
            if (parent) {
                const errors = parent.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            }
        });
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        // Сбрасываем предыдущие ошибки
        document.querySelectorAll('.form-control.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());

        let isValid = true;

        // 1. Проверка имени (не пустое, минимум 2 слова)
        const name = document.getElementById('name');
        const nameValue = name.value.trim();
        
        if (nameValue === '') {
            showError(name, 'Введите ваше имя');
            isValid = false;
        } else {
            const words = nameValue.split(' ').filter(word => word.length > 0);
            if (words.length < 2) {
                showError(name, 'Введите имя и фамилию');
                isValid = false;
            }
        }

        // 2. Проверка email
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email (пример: name@domain.ru)');
            isValid = false;
        }

        // 3. Проверка телефона (если заполнен)
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        
        if (phoneValue !== '') {
            const phoneDigits = phoneValue.replace(/\D/g, '');
            if (phoneDigits.length < 10 && phoneDigits.length > 0) {
                showError(phone, 'Введите 10 цифр номера');
                isValid = false;
            }
        }

        // 4. Проверка сообщения
        const message = document.getElementById('message');
        const messageValue = message.value.trim();
        
        if (messageValue === '') {
            showError(message, 'Введите сообщение');
            isValid = false;
        } else if (messageValue.length > 500) {
            showError(message, 'Сообщение не должно превышать 500 символов');
            isValid = false;
        }

        // 5. Проверка согласия (checkbox)
        const agreement = document.getElementById('agreement');
        if (agreement && !agreement.checked) {
            const parent = agreement.closest('.field');
            showCheckboxError(parent, 'Необходимо согласие на обработку данных');
            isValid = false;
        }

        // Если всё корректно - отправляем данные
        if (isValid) {
            const formData = {
                name: nameValue,
                email: emailValue,
                phone: phoneValue || 'не указан',
                message: messageValue,
                date: new Date().toLocaleString()
            };

            // Создаем и отправляем событие для консольного логгера
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);

            // Показываем сообщение об успехе
            alert('Спасибо! Форма успешно отправлена. Данные в консоли.');
            
            // Опционально: очищаем форму
            // form.reset();
        }
    });

    // Функция показа ошибки для обычных полей
    function showError(input, message) {
        input.classList.add('is-danger');
        
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        
        const parent = input.closest('.form-group');
        if (parent) {
            parent.appendChild(help);
        } else {
            input.parentNode.appendChild(help);
        }
    }

    // Функция показа ошибки для checkbox
    function showCheckboxError(container, message) {
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        container.appendChild(help);
    }
});