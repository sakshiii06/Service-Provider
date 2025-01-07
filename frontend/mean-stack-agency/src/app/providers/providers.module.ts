import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { ProvidersComponent } from './providers.component';
import { AddProvidersComponent } from './add-providers/add-providers.component';
import { DeletePComponent } from './delete-providers/delete-providers.component';
import { DetailsProvidersComponent } from './details-providers/details-providers.component';
import { EditProvidersComponent } from './edit-providers/edit-providers.component';

@NgModule({
  declarations: [
    ProvidersComponent,
    AddProvidersComponent,
    DeletePComponent,
    DetailsProvidersComponent,
    EditProvidersComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule, // Add this here
  ],
  exports: [
    ProvidersComponent,
    AddProvidersComponent,
    DeletePComponent,
    DetailsProvidersComponent,
    EditProvidersComponent,
  ],
})
export class ProvidersModule {}


