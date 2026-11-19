import {afterEach, beforeEach, vi} from 'vitest';
import {cleanup} from '@testing-library/react';

// jsdom does not implement the native modal and scrolling browser APIs.
HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
window.scrollTo = vi.fn();
beforeEach(() => localStorage.clear());
afterEach(() => cleanup());
