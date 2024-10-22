import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [MatProgressSpinnerModule, NgIf, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  styleUrl: './spinner.component.scss',
  template: ''
})
export class SpinnerComponent {
  readonly dialog = inject(MatDialog);
  openDialogRef?: MatDialogRef<SpinnerDialogComponent, any>;
  public hide() {
    this.dialog.closeAll();
  }
  public show() {
    this.openDialogRef = this.dialog.open(SpinnerDialogComponent, {
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
      disableClose: true
    });
  }
}


@Component({
  selector: 'app-spinner-dialog',
  templateUrl: './spinner.component.html',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerDialogComponent {
  public loadingMessage: string = "Loading...";

  readonly dialogRef = inject(MatDialogRef<SpinnerDialogComponent>);


}