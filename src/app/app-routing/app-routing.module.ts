
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ImportComponent } from '../Import/Import.component';
import { StarterControlSidebarComponent} from '../starter/starter-control-sidebar/starter-control-sidebar.component'

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', redirectTo: 'extractemails', pathMatch: 'full' },
     { path: 'extractemails', component: ImportComponent },
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
