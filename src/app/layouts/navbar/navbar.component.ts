import { Component, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/mytranslate/mytranslate.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isligin = input<boolean>(true)
   readonly authService = inject(AuthService)
  private readonly myTranslateService = inject(MyTranslateService)
  private readonly translateService = inject(TranslateService)


  chang(lang: string): void {
    this.myTranslateService.changelangTranslate(lang)
  }
  currentLang(lang:string): boolean {
    return this.translateService.currentLang === lang;
  }

}
