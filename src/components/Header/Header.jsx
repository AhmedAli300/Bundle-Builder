import { ShieldCheck, RotateCcw, Save } from 'lucide-react';

export function Header({ onReset, onSave }) {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="brand-group">
          <div className="logo-badge">
            <ShieldCheck className="logo-icon" size={24} />
          </div>
          <div>
            <h1 className="header-title">Let's get started!</h1>
            <p className="header-subtitle">Build your custom Wyze security bundle & save</p>
          </div>
        </div>

        <div className="header-actions">
          <button 
            type="button" 
            className="header-btn secondary-btn" 
            onClick={onReset}
            title="Reset bundle to initial design state"
          >
            <RotateCcw size={15} />
            <span>Reset Demo</span>
          </button>
          <button 
            type="button" 
            className="header-btn primary-btn" 
            onClick={onSave}
            title="Save bundle configuration to localStorage"
          >
            <Save size={15} />
            <span>Save System</span>
          </button>
        </div>
      </div>
    </header>
  );
}
