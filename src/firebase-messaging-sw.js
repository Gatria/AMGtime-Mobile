importScripts('https://www.gstatic.com/firebasejs/7.13.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.13.0/firebase-messaging.js');

firebase.initializeApp({apiKey: "AIzaSyC2pp4xXSu7FXOt0f6erUTkK4wTKDNizpk",
authDomain: "amgtime-d6fdf.firebaseapp.com",
databaseURL: "https://amgtime-d6fdf.firebaseio.com",
projectId: "amgtime-d6fdf",
storageBucket: "amgtime-d6fdf.appspot.com",
messagingSenderId: "834178252655",
appId: "1:834178252655:web:aade5e5fa22fd0a6eab29a"
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function(payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: '/assets/icons/Icon-1024x1024.png',
    actions:[{action: payload.data.category,title:'Open' }]
  };

  return self.registration.showNotification(notificationTitle,
    notificationOptions);
});


self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  if (event.action === 'archive') {
    clients.openWindow('/login');
  }
}, false);
