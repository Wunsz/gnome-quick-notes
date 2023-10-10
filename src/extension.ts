import './styles/stylesheet.css';

import { Extension } from 'resource:///org/gnome/shell/extensions/extension.js';
import * as Main from 'resource:///org/gnome/shell/ui/main.js';

import Indicator from './components/Indicator';
import NotePanel from './components/NotePanel';
import store from './store';

export default class NotesExtension extends Extension {
  private indicator: Indicator | null = null;
  private notePanel: NotePanel | null = null;

  enable() {
    store.init();

    this.notePanel = new NotePanel();
    Main.layoutManager.addTopChrome(this.notePanel);

    this.indicator = new Indicator(this.notePanel);
    Main.panel.addToStatusArea(this.uuid, this.indicator);
  }

  disable() {
    this.notePanel?.destroy();
    this.notePanel = null;

    this.indicator?.destroy();
    this.indicator = null;

    store.reset();
  }
}
