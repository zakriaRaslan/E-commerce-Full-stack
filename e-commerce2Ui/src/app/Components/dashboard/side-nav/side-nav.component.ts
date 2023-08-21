import { Component } from '@angular/core';
import { faGauge,faCirclePlus,faPen,faUsers,faAddressCard } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent {
  dashboard=faGauge;
  addProduct = faCirclePlus
  edit = faPen;
  users=faUsers;
  contact = faAddressCard;
}
