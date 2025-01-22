document.addEventListener('DOMContentLoaded', () => {
    const trainButton = document.getElementById('trainButton');
    const trainInput = document.getElementById('trainInput');
    const predictInput = document.getElementById('predictInput');
    const predictionSpan = document.getElementById('prediction');

    trainButton.addEventListener('click', async () => {
        const sentence = trainInput.value;
        if (sentence) {
            await fetch('/train', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sentence })
            });
            alert('Model trained with new sentence!');
            trainInput.value = '';
        }
    });

    predictInput.addEventListener('input', async () => {
        const prefix = predictInput.value;
        if (prefix) {
            const response = await fetch(`/predict?prefix=${encodeURIComponent(prefix)}`);
            const data = await response.json();
            predictionSpan.textContent = data.prediction || '';
        } else {
            predictionSpan.textContent = '';
        }
    });
});
