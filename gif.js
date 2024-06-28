let gifCount = 0;
const maxGifs = 9;

async function generateGif() {
    if (gifCount < maxGifs) {
        try {
            const response = await fetch('https://yesno.wtf/api');
            const data = await response.json();
            const gifContainer = document.getElementById('gif-container');
            const gifItem = document.createElement('div');
            gifItem.className = 'gif-item';
            const gifImage = document.createElement('img');
            gifImage.src = data.image;
            gifItem.appendChild(gifImage);

            const removeButton = document.createElement('button');
            removeButton.className = 'remove-btn';
            removeButton.innerText = 'Eliminar';
            removeButton.onclick = () => removeGif(gifItem);
            gifItem.appendChild(removeButton);

            gifContainer.appendChild(gifItem);
            gifCount++;
        } catch (error) {
            console.error('Error al generar el GIF:', error);
        }
    } else {
        alert('Eh nomas puedes 9, no manches pa que quieres mas?');
    }
}

function removeGif(gifItem) {
    gifItem.remove();
    gifCount--;
}
