import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private router: Router // Servicio Router para redirección
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  async onLogin() {
    if (this.loginForm.invalid) {
      this.showToast('Por favor, complete todos los campos.');
      return;
    }

    const loading = await this.loadingCtrl.create({
      message: 'Iniciando sesión...',
    });
    await loading.present();

    const { email, password } = this.loginForm.value;

    try {
      await this.firebaseService.login(email, password);
      await loading.dismiss();
      this.showToast('Inicio de sesión exitoso');
      this.router.navigate(['/tabs/tab1']); // Redirigir al tab1
    } catch (error: any) {
      await loading.dismiss();
      this.showToast(`Error: ${error.message}`);
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
    });
    await toast.present();
  }
  registro() {
    this.router.navigate(['/registro']);
  }
  recuperar() {
    this.router.navigate(['/recuperar']);
  }
}