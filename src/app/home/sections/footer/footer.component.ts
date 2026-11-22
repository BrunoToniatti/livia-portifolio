import { Component } from '@angular/core';
import { IconComponent } from '../../../shared/icon.component';
import { CONTACT, NAV, PROCEDURES, whatsappLink } from '../../../shared/site.data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [IconComponent],
  template: `
    <footer class="footer">
      <div class="container">
        <div class="footer__top">
          <div class="footer__brand">
            <span class="footer__name">Dra. Lívia Ribeiro</span>
            <span class="footer__sub">Estética Avançada</span>
            <p class="footer__tagline">Realçando a sua beleza com amor e delicadeza.</p>
            <div class="footer__social">
              <a [href]="whatsapp" target="_blank" rel="noopener" aria-label="WhatsApp">
                <app-icon name="whatsapp" />
              </a>
              <a [href]="contact.instagramUrl" target="_blank" rel="noopener" aria-label="Instagram">
                <app-icon name="instagram" />
              </a>
            </div>
          </div>

          <nav class="footer__col" aria-label="Navegação do rodapé">
            <h3>Navegue</h3>
            <ul>
              <li><a href="#inicio">Início</a></li>
              @for (item of nav; track item.id) {
                <li><a [href]="'#' + item.id">{{ item.label }}</a></li>
              }
            </ul>
          </nav>

          <div class="footer__col">
            <h3>Procedimentos</h3>
            <ul>
              @for (p of procedures; track p.id) {
                <li><a href="#procedimentos">{{ p.name }}</a></li>
              }
            </ul>
          </div>

          <div class="footer__col">
            <h3>Contato</h3>
            <ul class="footer__contact">
              <li>
                <a [href]="whatsapp" target="_blank" rel="noopener"><app-icon name="whatsapp" /> {{ contact.phoneDisplay }}</a>
              </li>
              <li>
                <a [href]="contact.instagramUrl" target="_blank" rel="noopener"><app-icon name="instagram" /> {{ contact.instagramHandle }}</a>
              </li>
              <li><app-icon name="pin" /> {{ contact.city }}</li>
            </ul>
          </div>
        </div>

        <div class="footer__bottom">
          <p>© {{ year }} {{ contact.fullName }}. Todos os direitos reservados.</p>
          <a href="#inicio" class="footer__top-link">
            Voltar ao topo
            <app-icon name="arrowDown" class="up" />
          </a>
        </div>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly year = new Date().getFullYear();
  readonly contact = CONTACT;
  readonly nav = NAV;
  readonly procedures = PROCEDURES;
  readonly whatsapp = whatsappLink();
}
