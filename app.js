
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photo = document.getElementById('photo');
const captureBtn = document.getElementById('captureBtn');
const photoPreview = document.querySelector('.photo-preview');


navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    video.srcObject = stream;
  })
  .catch(err => {
    console.error("Error accessing camera: ", err);
  });

captureBtn.addEventListener('click', () => {
  const context = canvas.getContext('2d');
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  

  const photoData = canvas.toDataURL('image/png');
  photo.src = photoData;

  photoPreview.classList.add('visible');
  localStorage.setItem('capturedPhoto', photoData);
});


window.addEventListener('load', () => {
  const savedPhoto = localStorage.getItem('capturedPhoto');
  if (savedPhoto) {
    photo.src = savedPhoto;
    photoPreview.classList.add('visible');
  }
});



// Registra o Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('ServiceWorker registrado com sucesso:', registration.scope);
        })
        .catch(error => {
          console.log('Falha ao registrar o ServiceWorker:', error);
        });
    });
  }
  