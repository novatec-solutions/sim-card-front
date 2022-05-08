import { animate, style, transition, trigger } from "@angular/animations";

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('MigrationFormComponent => MigrationHelpComponent', [
      style({ opacity: 0 }),
      animate(400, style({ opacity: 1 }))
    ]),
    transition('MigrationHelpComponent => MigrationFormComponent', [
      style({ opacity: 0 }),
      animate(400, style({ opacity: 1 }))
    ])
  ]);
