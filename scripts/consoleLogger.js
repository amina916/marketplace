// scripts/consoleLogger.js
document.addEventListener('DOMContentLoaded', function() {
    // Слушаем событие formValid из validation.js
    document.addEventListener('formValid', function(event) {
        // Получаем данные формы
        const formData = event.detail;
        
        // Очищаем консоль для наглядности
        console.clear();
        
        // Красивое оформление вывода
        console.log('%c📝 ОТПРАВКА ФОРМЫ', 'font-size: 16px; font-weight: bold; color: #2ecc71;');
        console.log('%c══════════════════════════════', 'color: #666;');
        
        // Построчный вывод данных
        console.log('%c👤 Имя:', 'font-weight: bold;', formData.name);
        console.log('%c📧 Email:', 'font-weight: bold;', formData.email);
        console.log('%c📞 Телефон:', 'font-weight: bold;', formData.phone);
        console.log('%c💬 Сообщение:', 'font-weight: bold;', formData.message);
        
        console.log('%c══════════════════════════════', 'color: #666;');
        console.log('%c🕐 Время отправки:', 'font-weight: bold;', formData.date);
        console.log('%c✅ Статус:', 'font-weight: bold; color: #2ecc71;', 'Успешно');
    });
});