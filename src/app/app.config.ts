import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideFirebaseApp(() => initializeApp({"projectId":"portfolio-cf8c6","appId":"1:728589171041:web:2387838ea31aedcfbe6d20","storageBucket":"portfolio-cf8c6.appspot.com","apiKey":"AIzaSyBga1KOllEQ09yGv9_Gvku7mjNVGZvQfyI","authDomain":"portfolio-cf8c6.firebaseapp.com","messagingSenderId":"728589171041","measurementId":"G-M6QG9LCDVE"})), provideFirestore(() => getFirestore())]
};
