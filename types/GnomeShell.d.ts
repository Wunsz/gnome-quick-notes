declare module 'resource:///org/gnome/shell/extensions/extension.js' {
  import Gio from '@girs/gio-2.0'

  export function gettext(str: string): string;

  export function ngettext(str: string, strPlural: string, n: number): string;

  export function pgettext(context: string, str: string): string;

  type ExtensionMetadata = {
    uuid: string;
    path: string;
    dir: Gio.File;
    'settings-schema': Gio.Settings
    'gettext-domain': string;
  }

  export class Extension {
    static lookupByURL(url: string): Extension;

    static lookupByUUID(uuid: string): Extension;

    static defineTranslationFunctions(domain: string): {
      gettext(str: string): string;
      ngettext(str: string, strPlural: string, n: number): string;
      pgettext(context: string, str: string): string;
    };

    constructor(metadata: ExtensionMetadata);

    get uuid(): string;

    get path(): string;

    get dir(): Gio.File;

    gettext(str: string): string;

    ngettext(str: string, strPlural: string, n: number): string;

    pgettext(context: string, str: string): string;

    getSettings(schema: string): Gio.Settings;

    initTranslations(domain: string): void;

    enable(): void;

    disable(): void;

    openPreferences(): void;
  }

  export class InjectionManager {
    overrideMethod(prototype: object, method: string, callback: (f: Function) => Function): void;

    restoreMethod(prototype: object, method: string): void;

    clear();
  }
}

declare module 'resource:///org/gnome/shell/ui/panelMenu.js' {
  export * from '@girs/gnome-shell/src/ui/panelMenu';
  //
  // export const Button: typeof GnomeShell.ui.panelMenu.Button;
  // export const ButtonBox: typeof GnomeShell.ui.panelMenu.ButtonBox;
  // export const SystemIndicator: typeof GnomeShell.ui.panelMenu.SystemIndicator;

  // export GnomeShell.ui.panelMenu;
  // ...GnomeShell.ui.panelMenu
}

declare module 'resource:///org/gnome/shell/ui/popupMenu.js' {
  export * from '@girs/gnome-shell/src/ui/popupMenu';
}

declare module 'resource:///org/gnome/shell/ui/main.js' {
  export * from '@girs/gnome-shell/src/ui/main';
}
