import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent } from "./navigation/navigation.component";
@Component({
    selector: 'app-root',
    imports: [RouterOutlet, NavigationComponent],
    templateUrl: './app.component.html'
})
export class AppComponent {
}
