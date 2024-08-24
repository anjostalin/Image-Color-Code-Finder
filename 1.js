const imageInput = document.getElementById('imageInput');
const uploadedImage = document.getElementById('uploadedImage');
const colorDisplayHex = document.getElementById('colorDisplayHex');
const colorDisplayRgb = document.getElementById('colorDisplayRgb');
const imageContainer = document.getElementById('imageContainer');
const customAlert = document.getElementById('customAlert');
const alertMessage = document.getElementById('alertMessage');

colorDisplayHex.addEventListener('click', function () {
    //window.open('', '_blank');  PLACE YOUR AD OR WEBSITE TO REDIRECT HERE
    copyToClipboard(colorDisplayHex.textContent.split(': ')[1]);
    showAlert('Hex color copied to clipboard!');
});

colorDisplayRgb.addEventListener('click', function () {
    //window.open('', '_blank');  PLACE YOUR AD OR WEBSITE TO REDIRECT HERE
    copyToClipboard(colorDisplayRgb.textContent.split(': ')[1]);
    showAlert('RGB color copied to clipboard!');
});

document.getElementsByClassName("close")[0].onclick = function () {
    customAlert.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == customAlert) {
        customAlert.style.display = "none";
    }
}

function copyToClipboard(text) {
    const dummyElement = document.createElement('textarea');
    document.body.appendChild(dummyElement);
    dummyElement.value = text;
    dummyElement.select();
    document.execCommand('copy');
    document.body.removeChild(dummyElement);
}

function showAlert(message) {
    alertMessage.textContent = message;
    customAlert.style.display = "block";
    setTimeout(function () {
        customAlert.style.display = "none";
    }, 2000);
}

imageInput.addEventListener('change', function () {
    const file = this.files[0];
    const reader = new FileReader();
    reader.onload = function (event) {
        //window.open('', '_blank');  PLACE YOUR AD OR WEBSITE TO REDIRECT HERE
        uploadedImage.src = event.target.result;
        imageContainer.style.display = 'block';
    };
    reader.readAsDataURL(file);
});

uploadedImage.addEventListener('click', function (event) {
    //window.open('', '_blank');  PLACE YOUR AD OR WEBSITE TO REDIRECT HERE
    const x = event.offsetX;
    const y = event.offsetY;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;
    context.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    const pixel = context.getImageData(x, y, 1, 1).data;
    const hexColor = rgbToHex(pixel[0], pixel[1], pixel[2]);
    const rgbColor = `rgb(${pixel[0]}, ${pixel[1]}, ${pixel[2]})`;

    colorDisplayHex.textContent = `HEX: ${hexColor}`;
    colorDisplayHex.style.color = hexColor;
    colorDisplayHex.style.backgroundColor = getContrastingColor(hexColor);
    colorDisplayHex.style.display = 'block';

    colorDisplayRgb.textContent = `RGB: ${rgbColor}`;
    colorDisplayRgb.style.color = hexColor;
    colorDisplayRgb.style.backgroundColor = getContrastingColor(hexColor);
    colorDisplayRgb.style.display = 'block';
});

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function getContrastingColor(hexColor) {
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    return luminance > 0.5 ? '#000' : '#fff';
}