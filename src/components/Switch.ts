import Clutter from 'gi://Clutter';
import St from 'gi://St';
import * as PopupMenu from 'resource:///org/gnome/shell/ui/popupMenu.js';

import { registerGObjectClass } from '../utils/gjs';

interface SwitchProps {
  label: string;
  onChange: (value: boolean) => void;
  initialValue: boolean;
}

@registerGObjectClass
class Switch extends St.Button {
  private switch: PopupMenu.Switch;
  private textLabel: St.Label;
  private container: St.BoxLayout;

  constructor({ label, initialValue, onChange }: SwitchProps) {
    const container = new St.BoxLayout({
      x_expand: true,
      y_expand: true,
    });

    super({
      name: 'switch',
      style_class: 'switch',
      child: container,
      toggle_mode: true,
      can_focus: true,
      x_align: Clutter.ActorAlign.FILL,
      y_align: Clutter.ActorAlign.START,
    });

    this.container = container;
    // this.set_accessible_role(Atk.Role.CHECK_BOX);

    this.textLabel = new St.Label({
      text: label,
    });

    this.switch = new PopupMenu.Switch(initialValue);
    this.switch.can_focus = true;
    this.switch.reactive = true;

    this.connect('clicked', () => {
      this.switch.toggle();
      onChange(this.switch.state);
    });

    this.container.add_actor(this.textLabel);
    this.container.add_actor(this.switch);
  }

  override destroy() {
    this.textLabel.destroy();
    this.switch.destroy();
    this.container.destroy();

    super.destroy();
  }
}

export default Switch;
