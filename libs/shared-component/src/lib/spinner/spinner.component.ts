import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { ProgressSpinnerMode } from '@angular/material/progress-spinner'

@Component({
  selector: 'shared-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent {
  @Input() mode: ProgressSpinnerMode = 'indeterminate'
  /** progress value used only when  mode is determinate*/
  @Input() progressValue!: number
  @Input() diameter!: number
}
