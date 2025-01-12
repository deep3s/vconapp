import { Component } from "@angular/core";

@Component({
  selector: "app-vertical-header-renderer",
  template: `
    <div class="vertical-header">
      {{ params.displayName }}
    </div>
  `,
  styles: [
    `
      .vertical-header {
        transform: rotate(-90deg);
        white-space: nowrap;
      }
    `,
  ],
})
export class VerticalHeaderRendererComponent {
  params: any;
}
