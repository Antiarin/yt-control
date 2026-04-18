declare namespace chrome {
  namespace runtime {
    function lastError(): { message?: string } | undefined;

    const onInstalled: {
      addListener(callback: () => void): void;
    };
  }

  namespace storage {
    type StorageChanges = Record<string, unknown>;

    interface StorageArea {
      get(
        keys: string | string[] | Record<string, unknown> | null,
        callback: (items: Record<string, unknown>) => void,
      ): void;
      set(items: Record<string, unknown>, callback?: () => void): void;
    }

    const sync: StorageArea;

    const onChanged: {
      addListener(callback: (changes: StorageChanges, areaName: string) => void): void;
    };
  }

  namespace sidePanel {
    function setPanelBehavior(options: { openPanelOnActionClick: boolean }): Promise<void>;
  }
}
