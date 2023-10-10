import Clutter from 'gi://Clutter';
import St from 'gi://St';
import * as Layout from 'resource:///org/gnome/shell/ui/layout.js';

import { loremIpsum } from '../mock';
import store, { StoreData } from '../store';
import { registerGObjectClass } from '../utils/gjs';
import Header from './Header';

@registerGObjectClass
class NotePanel extends St.BoxLayout {
  static getMonitorConstraint = () =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    new Layout.MonitorConstraint({ index: 0 });

  private header: Header;

  private boxLayout: St.BoxLayout;
  private textInput: St.Entry;
  private scrollView: St.ScrollView;

  constructor() {
    super({
      name: 'note-panel',
      style_class: 'note-panel',
      visible: false,
      vertical: true,
      reactive: true,
      can_focus: true,
      x_align: Clutter.ActorAlign.END,
      y_align: Clutter.ActorAlign.FILL,
      constraints: NotePanel.getMonitorConstraint(),
    });

    this.header = new Header();

    this.scrollView = new St.ScrollView({
      y_align: Clutter.ActorAlign.FILL,
      width: 500,
      overlay_scrollbars: true,
      x_expand: true,
      y_expand: true,
    });

    this.boxLayout = new St.BoxLayout({
      x_expand: true,
      y_expand: true,
      vertical: true,
    });

    this.textInput = new St.Entry({
      style_class: 'note-panel-entry',
      can_focus: true,
      width: 500,
      x_expand: true,
      y_align: Clutter.ActorAlign.FILL,
      y_expand: true,
      text: loremIpsum,
    });

    this.textInput.clutter_text.single_line_mode = false;
    this.textInput.clutter_text.line_wrap = store.wrapLines;

    this.textInput.clutter_text.x_expand = true;
    this.textInput.clutter_text.y_expand = true;
    this.textInput.clutter_text.y_align = Clutter.ActorAlign.FILL;

    this.boxLayout.add_child(this.textInput);
    this.scrollView.add_actor(this.boxLayout);
    this.add_child(this.header);
    this.add_child(this.scrollView);
    this.add_child(this.boxLayout);
  }

  private onWrapLinesChanged = (store: StoreData) => {
    if (this.textInput.clutter_text.line_wrap !== store.wrapLines) {
      this.textInput.clutter_text.line_wrap = store.wrapLines;
    }
  };

  override show() {
    store.addListener(this.onWrapLinesChanged);

    super.show();
  }

  override hide() {
    store.removeListener(this.onWrapLinesChanged);

    super.hide();
  }

  override destroy() {
    this.header.destroy();

    this.textInput.destroy();
    this.scrollView.destroy();
    this.boxLayout.destroy();
    super.destroy();
  }
}

export default NotePanel;
