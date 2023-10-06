import './styles/stylesheet.css';

import St from 'gi://St';

import {Extension, gettext as _} from 'resource:///org/gnome/shell/extensions/extension.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import {registerGObjectClass} from "./utils/gjs";

@registerGObjectClass
class Indicator extends PanelMenu.Button {
  _init() {
    super._init(0.0, _('My Shiny Indicator'));

    this.add_child(new St.Icon({
      icon_name: 'face-smile-symbolic',
      style_class: 'gnome-quick-notes--system-status-icon',
    }));

    let item = new PopupMenu.PopupMenuItem(_('Show Notification'));
    item.connect('activate', () => {
      Main.notify(_('Whatʼs up, folks?'));
    });
    this.menu.addMenuItem(item);
  }
}

export default class IndicatorExampleExtension extends Extension {
  private _indicator: Indicator | null = null;

  enable() {
    // @ts-ignore
    this._indicator = new Indicator();
    Main.panel.addToStatusArea(this.uuid, this._indicator);
  }

  disable() {
    this._indicator?.destroy();
    this._indicator = null;
  }
}
