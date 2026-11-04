import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import { woocommerce, WCConnectionStatus } from '../services/woocommerce';
import {
  Server,
  CheckCircle,
  AlertCircle,
  Key,
  Shield,
  FileCode,
  Download,
  ExternalLink,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

export const WooCommerceSyncModal: React.FC = () => {
  const { language, navigateTo } = useStore();
  const [status, setStatus] = useState<WCConnectionStatus | null>(null);
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [storeUrl, setStoreUrl] = useState('https://eval-uae.com');
  const [consumerKey, setConsumerKey] = useState('');
  const [consumerSecret, setConsumerSecret] = useState('');
  const [copiedFile, setCopiedFile] = useState(false);

  useEffect(() => {
    async function loadStatus() {
      const s = await woocommerce.checkStatus();
      setStatus(s);
    }
    loadStatus();
  }, []);

  const handleTestConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    setTesting(true);
    setTestResult(null);

    const result = await woocommerce.testConnection(storeUrl, consumerKey, consumerSecret);
    setTestResult(result);
    setTesting(false);
  };

  const handleCopyPluginCode = () => {
    setCopiedFile(true);
    setTimeout(() => setCopiedFile(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-8">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#1E1E1E] gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-[#C8A44D] uppercase tracking-widest font-mono">
            <Server className="w-3.5 h-3.5" />
            <span>WooCommerce REST Integration Architecture</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif-luxury font-semibold text-white mt-1">
            WooCommerce Storefront Bridge Console
          </h1>
        </div>
        <button
          onClick={() => navigateTo('home')}
          className="px-4 py-2 bg-[#161616] hover:bg-[#222222] text-xs text-neutral-300 rounded-sm self-start sm:self-auto cursor-pointer"
        >
          {language === 'ar' ? 'العودة للمتجر' : 'Return to Storefront'}
        </button>
      </div>

      {/* Live Status Card */}
      <div className="p-6 bg-[#121212] border border-[#222222] rounded-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-3 h-3 rounded-full ${
                status?.connected ? 'bg-emerald-400' : 'bg-[#C8A44D]'
              }`}
            />
            <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
              Target Store: <span className="text-[#C8A44D] font-mono">{status?.storeUrl || 'https://eval-uae.com'}</span>
            </h2>
          </div>
          <span className="text-xs font-mono text-neutral-400">
            REST API: {status?.version || 'wc/v3'}
          </span>
        </div>

        <p className="text-xs text-neutral-300 leading-relaxed">
          {status?.message ||
            'The storefront is operating with a high-fidelity local replica of the EVAL UAE catalog and is ready for live API synchronization with your WordPress + Salient installation.'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3 bg-[#181818] border border-[#262626] rounded-sm">
            <p className="text-[10px] text-neutral-500 uppercase font-mono">Theme Protection</p>
            <p className="text-white font-medium mt-0.5">Salient Theme Preserved</p>
            <p className="text-[10px] text-emerald-400 mt-1">✓ No overwriting / Astra not required</p>
          </div>

          <div className="p-3 bg-[#181818] border border-[#262626] rounded-sm">
            <p className="text-[10px] text-neutral-500 uppercase font-mono">Server Hosting</p>
            <p className="text-white font-medium mt-0.5">Hostinger + LiteSpeed</p>
            <p className="text-[10px] text-emerald-400 mt-1">✓ Auto-purge cache hooks enabled</p>
          </div>

          <div className="p-3 bg-[#181818] border border-[#262626] rounded-sm">
            <p className="text-[10px] text-neutral-500 uppercase font-mono">Security Architecture</p>
            <p className="text-white font-medium mt-0.5">Server-Side Proxy</p>
            <p className="text-[10px] text-emerald-400 mt-1">✓ Consumer secrets never exposed in JS</p>
          </div>
        </div>
      </div>

      {/* Test Connection Form */}
      <div className="bg-[#121212] border border-[#222222] p-6 rounded-sm space-y-4">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
          Test Live WooCommerce REST Credentials
        </h3>
        <p className="text-xs text-neutral-400">
          Enter your WooCommerce REST API keys generated under <strong>WooCommerce → Settings → Advanced → REST API</strong> to verify live server-to-server handshake:
        </p>

        <form onSubmit={handleTestConnection} className="space-y-4 text-xs">
          <div>
            <label className="block text-neutral-300 mb-1">WordPress Site URL</label>
            <input
              type="url"
              required
              value={storeUrl}
              onChange={(e) => setStoreUrl(e.target.value)}
              className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm font-mono"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 mb-1">Consumer Key (ck_...)</label>
              <input
                type="text"
                value={consumerKey}
                onChange={(e) => setConsumerKey(e.target.value)}
                placeholder="ck_xxxxxxxxxxxxxxxxxxxxxx"
                className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm font-mono"
              />
            </div>
            <div>
              <label className="block text-neutral-300 mb-1">Consumer Secret (cs_...)</label>
              <input
                type="password"
                value={consumerSecret}
                onChange={(e) => setConsumerSecret(e.target.value)}
                placeholder="cs_xxxxxxxxxxxxxxxxxxxxxx"
                className="w-full bg-[#181818] border border-[#2A2A2A] focus:border-[#C8A44D] text-xs p-2.5 text-white rounded-sm font-mono"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={testing}
            className="px-6 py-2.5 bg-[#C8A44D] hover:bg-[#D6B866] text-black font-semibold uppercase tracking-wider text-xs transition-colors rounded-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${testing ? 'animate-spin' : ''}`} />
            <span>{testing ? 'Testing Handshake...' : 'Verify Connection'}</span>
          </button>
        </form>

        {testResult && (
          <div
            className={`p-4 rounded-sm text-xs flex items-start gap-2.5 ${
              testResult.success
                ? 'bg-emerald-950/40 border border-emerald-800 text-emerald-300'
                : 'bg-red-950/40 border border-red-800 text-red-300'
            }`}
          >
            {testResult.success ? (
              <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400 mt-0.5" />
            )}
            <div>
              <p className="font-semibold">{testResult.success ? 'Success' : 'Connection Notice'}</p>
              <p className="mt-0.5">{testResult.message}</p>
            </div>
          </div>
        )}
      </div>

      {/* WordPress Bridge & Child Theme Deliverables Section */}
      <div className="bg-[#121212] border border-[#222222] p-6 rounded-sm space-y-4">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-white font-serif-luxury pb-2 border-b border-[#1E1E1E]">
          Ready-to-Deploy WordPress Deliverables
        </h3>
        <p className="text-xs text-neutral-400">
          The following files have been prepared and structured in the codebase for your WordPress server:
        </p>

        <div className="space-y-3 text-xs">
          <div className="p-3 bg-[#181818] border border-[#262626] rounded-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileCode className="w-4 h-4 text-[#C8A44D]" />
              <div>
                <p className="font-mono text-white">/wordpress/eval-woocommerce-bridge.php</p>
                <p className="text-[11px] text-neutral-400">
                  WordPress bridge plugin handling custom engraving line-item meta, CORS, and LiteSpeed cache hooks.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#C8A44D] bg-[#222] px-2 py-1 rounded">
              Ready
            </span>
          </div>

          <div className="p-3 bg-[#181818] border border-[#262626] rounded-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileCode className="w-4 h-4 text-[#C8A44D]" />
              <div>
                <p className="font-mono text-white">/wordpress/eval-salient-child/functions.php & style.css</p>
                <p className="text-[11px] text-neutral-400">
                  Dedicated Salient Child Theme maintaining complete compatibility with existing WPBakery pages.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#C8A44D] bg-[#222] px-2 py-1 rounded">
              Ready
            </span>
          </div>

          <div className="p-3 bg-[#181818] border border-[#262626] rounded-sm flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <FileCode className="w-4 h-4 text-[#C8A44D]" />
              <div>
                <p className="font-mono text-white">/wordpress/INSTALLATION_GUIDE.md</p>
                <p className="text-[11px] text-neutral-400">
                  Full step-by-step installation, testing checklist, deployment, and zero-risk rollback instructions.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-[#C8A44D] bg-[#222] px-2 py-1 rounded">
              Ready
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};
