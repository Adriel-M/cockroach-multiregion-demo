export function dispatchEvent(event: CustomEvent) {
  window.dispatchEvent(event);
}

export function addEventListener<T extends CustomEvent>(
  eventType: { channel: string },
  listener: (ev: T) => void,
): void {
  window.addEventListener(eventType.channel, listener);
}

export function removeEventListener<T extends CustomEvent>(
  eventType: { channel: string },
  listener: (ev: T) => void,
): void {
  window.removeEventListener(eventType.channel, listener);
}
