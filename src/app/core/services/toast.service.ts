import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private ensureContainer(): HTMLElement {
    let el = document.getElementById('toast-container');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast-container';
      el.style.position = 'fixed';
      el.style.top = '16px';
      el.style.right = '16px';
      el.style.zIndex = '1080';
      el.style.display = 'flex';
      el.style.flexDirection = 'column';
      el.style.gap = '8px';
      document.body.appendChild(el);
    }
    return el;
  }

  show(message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'success', timeoutMs = 2500) {
    if (typeof document === 'undefined') return;
    const container = this.ensureContainer();
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} shadow-sm py-2 px-3`;
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), timeoutMs);
  }
}
