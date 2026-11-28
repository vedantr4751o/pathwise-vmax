import React, {useEffect, useId, useRef, useState} from 'react';

export default function CreditsPopover() {
  const [mode, setMode] = useState(null);
  const rootRef = useRef(null);
  const panelId = useId();
  const isOpen = mode !== null;

  useEffect(() => {
    if (!isOpen) return;

    function closeOutside(event) {
      if (!rootRef.current?.contains(event.target)) setMode(null);
    }

    function closeOnEscape(event) {
      if (event.key === 'Escape' && !event.defaultPrevented) setMode(null);
    }

    document.addEventListener('pointerdown', closeOutside);
    document.addEventListener('focusin', closeOutside);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOutside);
      document.removeEventListener('focusin', closeOutside);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  return (
    <div
      className="credits-popover"
      ref={rootRef}
      onPointerEnter={event => {
        if (event.pointerType === 'mouse') setMode(current => current ?? 'hover');
      }}
      onPointerLeave={event => {
        if (event.pointerType === 'mouse') setMode(current => current === 'hover' ? null : current);
      }}
    >
      <button type="button" className="credits-trigger" aria-label="VMax developer credits" aria-expanded={isOpen} aria-controls={panelId} onClick={() => setMode(current => current === 'pinned' ? null : 'pinned')}>
        <span className="avatar" aria-hidden="true">V</span>
      </button>
      <div className="credits-flyout" id={panelId} hidden={!isOpen}>
        <div className="credits-panel">
          <div className="credits-logo">
            <img src={`${import.meta.env.BASE_URL}favicon.svg`} width="32" height="32" alt=""/>
            <div className="credits-wordmark">
              <strong>Pathwise</strong>
              <small>VMax</small>
            </div>
          </div>
          <div className="credits-developer">
            <span>Developed by</span>
            <strong>Vedant S Rajput</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
