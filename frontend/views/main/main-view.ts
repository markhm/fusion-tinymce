import '@vaadin/vaadin-app-layout';
import { AppLayoutElement } from '@vaadin/vaadin-app-layout';
import '@vaadin/vaadin-app-layout/vaadin-drawer-toggle';
import '@vaadin/vaadin-avatar/vaadin-avatar';
import '@vaadin/vaadin-tabs';
import '@vaadin/vaadin-tabs/vaadin-tab';
import { customElement, html } from 'lit-element';
import { router } from '../../index';
import { ViewRoute, views } from '../../routes';
import { appStore } from '../../stores/app-store';
import { Layout } from '../view';
import styles from './main-view.css';

@customElement('main-view')
export class MainView extends Layout {
  static get styles() {
    return [styles];
  }

  render() {
    return html`
      <vaadin-app-layout primary-section="drawer">
        <header slot="navbar" theme="dark">
          <vaadin-drawer-toggle></vaadin-drawer-toggle>
          <h1>${appStore.currentViewTitle}</h1>
          <vaadin-avatar></vaadin-avatar>
        </header>

        <div slot="drawer">
          <div id="logo">
            <img src="images/logo.png" alt="${appStore.applicationName} logo" />
            <span>${appStore.applicationName}</span>
          </div>
          <hr />
          <vaadin-tabs orientation="vertical" theme="minimal" .selected=${this.getSelectedViewRoute()}>
            ${this.getMenuRoutes().map(
              (viewRoute) => html`
                <vaadin-tab>
                  <a href="${router.urlForPath(viewRoute.path)}" tabindex="-1">${viewRoute.title}</a>
                </vaadin-tab>
              `
            )}
          </vaadin-tabs>
        </div>
        <slot></slot>
      </vaadin-app-layout>
    `;
  }

  connectedCallback() {
    super.connectedCallback();

    this.reaction(
      () => appStore.location,
      () => {
        AppLayoutElement.dispatchCloseOverlayDrawerEvent();
      }
    );
  }

  private getMenuRoutes(): ViewRoute[] {
    return views.filter((route) => route.title);

    return views.filter((route) => route.title);
  }

  private getSelectedViewRoute(): number {
    return this.getMenuRoutes().findIndex((viewRoute) => viewRoute.path == appStore.location);
  }
}
