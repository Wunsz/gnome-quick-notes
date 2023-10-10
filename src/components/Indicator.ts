import St from 'gi://St';
import { gettext as _ } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';
import * as PanelMenu from 'resource:///org/gnome/shell/ui/panelMenu.js';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

import { registerGObjectClass } from '../utils/gjs';
import NotePanel from './NotePanel';

@registerGObjectClass
class Indicator extends PanelMenu.Button {
  private notePanel: NotePanel;

  constructor(notePanel: NotePanel) {
    super(0.5, _('My Shiny Indicator'));

    this.notePanel = notePanel;
  }

  _init() {
    super._init(0.5, _('My Shiny Indicator'));

    this.add_child(
      new St.Icon({
        icon_name: 'text-editor-symbolic',
        style_class: 'gnome-quick-notes--system-status-icon',
        margin_left: 0,
        margin_right: 0,
        icon_size: 16,
      }),
    );

    const openNotes = new PopupMenu.PopupMenuItem(_('Open notes'));
    openNotes.connect('activate', () => {
      this.notePanel.show();
    });

    this.menu.addMenuItem(openNotes);

    const openSettings = new PopupMenu.PopupMenuItem(_('Settings'));
    openSettings.connect('activate', () => {
      Main.notify(_('Whatʼs up, folks?'));
    });

    this.menu.addMenuItem(openSettings);
  }
}

export default Indicator;
