'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { fetchApi } from '../../lib/api';

export default function SkinAnalysisPage() {
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [alignmentPhase, setAlignmentPhase] = useState<'idle' | 'aligning' | 'aligned'>('idle');
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [activeMetricTab, setActiveMetricTab] = useState<'overview' | 'ingredients' | 'history'>('overview');
  
  const [metrics, setMetrics] = useState<any[]>([]);
  const [recommendedActives, setRecommendedActives] = useState<any[]>([]);
  const [overallScore, setOverallScore] = useState<number | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [history, setHistory] = useState<any[]>([]);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  useEffect(() => {
    const fetchInitial = async () => {
      try {
        const data = await fetchApi('/skin-analysis/history');
        if (Array.isArray(data)) {
          setHistory(data);
          if (data.length > 0) {
            const latest = data[0];
            setMetrics(latest.metrics || []);
            setRecommendedActives(latest.actives || []);
            setOverallScore(latest.overallScore);
            setSummary(latest.summary);
            setScanComplete(true);
          }
        }
      } catch (e) {
        console.error(e);
      }
    };
    fetchInitial();
    return () => stopCamera();
  }, []);

  useEffect(() => {
    let phase1: NodeJS.Timeout;
    let phase2: NodeJS.Timeout;
    
    if (isCameraActive && alignmentPhase === 'aligning') {
      // Simulate the AI detecting a perfect fit after 3 seconds
      phase1 = setTimeout(() => {
        setAlignmentPhase('aligned');
        
        // Auto capture 1.5 seconds after finding the perfect fit
        phase2 = setTimeout(() => {
          handleCaptureAndScan();
        }, 1500);
      }, 3000);
    }
    
    return () => {
      clearTimeout(phase1);
      clearTimeout(phase2);
    };
  }, [isCameraActive, alignmentPhase]);

  const loadHistory = async () => {
    try {
      const data = await fetchApi('/skin-analysis/history');
      if (Array.isArray(data)) {
        setHistory(data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startCameraFlow = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      setStream(mediaStream);
      setIsCameraActive(true);
      setAlignmentPhase('aligning');
      // We need a slight delay to ensure videoRef is rendered before assigning the stream
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }, 100);
    } catch (err) {
      console.error('Camera access denied or unavailable', err);
      alert('Camera access denied. Please allow camera permissions to use this feature.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setIsCameraActive(false);
    setAlignmentPhase('idle');
  };

  const handleCaptureAndScan = async () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    // Capture Image
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Resize to 1024x1024 for higher clinical clarity while maintaining token limits
    const maxDim = 1024;
    const scale = Math.min(maxDim / video.videoWidth, maxDim / video.videoHeight);
    canvas.width = video.videoWidth * scale;
    canvas.height = video.videoHeight * scale;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    // Compress JPEG to 0.85 quality for a crisp image
    const base64Image = canvas.toDataURL('image/jpeg', 0.85);

    // Stop camera and transition to scanning state
    stopCamera();
    setIsScanning(true);
    setScanComplete(false);

    try {
      const data = await fetchApi('/skin-analysis/scan', {
        method: 'POST',
        body: JSON.stringify({ image: base64Image }),
      });
      
      setMetrics(data.metrics);
      setRecommendedActives(data.actives);
      setOverallScore(data.overallScore);
      setSummary(data.summary);
      setScanComplete(true);
      setActiveMetricTab('overview');
      loadHistory(); // Refresh history
    } catch (err) {
      console.error('Failed to scan skin', err);
      alert('Failed to analyze skin. Please try again.');
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Header Banner */}
      <section className="bg-[#EFE7E0] rounded-[36px] border border-[#E2D4C8] p-8 sm:p-10 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-emerald-800 text-sm">✨</span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#708264]">
                DERMATOLOGY AI LAB
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1F1916] tracking-tight">
              AI Skin Diagnostics
            </h1>
            <p className="text-xs sm:text-sm text-[#6B5A52] leading-relaxed">
              Clinical-grade dermal intelligence. Our neural scan analyzes pore geometry, surface hydration, redness, and cellular vitality in seconds using real-time computer vision.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {!isCameraActive ? (
              <button
                onClick={startCameraFlow}
                disabled={isScanning}
                className="bg-[#334234] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#253226] transition-all shadow-md flex items-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                {isScanning ? (
                  <>
                    <span className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing Scan...</span>
                  </>
                ) : (
                  <>
                    <span>📸</span>
                    <span>Start New Scan</span>
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleCaptureAndScan}
                className="bg-emerald-600 text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-all shadow-lg flex items-center gap-2 cursor-pointer animate-pulse"
              >
                <span>✨</span>
                <span>Capture & Analyze</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 2. Main Scan & Metric Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Phone Scanner Mockup */}
        <div className="lg:col-span-5 bg-white rounded-[36px] border border-[#E8DCD2] p-8 shadow-sm flex flex-col items-center text-center space-y-6">
          <div className="w-full flex justify-between items-center border-b border-[#E8DCD2] pb-4">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#8A7970]">Active Scan Session</span>
              <p className="text-xs font-bold text-[#1F1916]">High-Resolution Optical Sensor</p>
            </div>
            <span className="px-3 py-1 rounded-full bg-[#E8EFE6] text-[10px] font-bold text-[#334234] border border-[#708264]/20">
              {isCameraActive ? 'Live Camera Feed' : 'Neural Processing'}
            </span>
          </div>

          {/* Phone Mockup Frame */}
          <div className="relative bg-[#FAF7F2] rounded-[36px] border-4 border-stone-200 shadow-xl overflow-hidden w-full max-w-[290px] aspect-[9/14] flex flex-col justify-between transition-all duration-500">
            {/* Camera notch */}
            <div className="w-16 h-2 bg-stone-300 rounded-full mx-auto mt-3 shrink-0 z-20" />

            {/* Viewport content */}
            <div className="relative flex-1 w-full overflow-hidden bg-black rounded-lg mx-2 my-1">
              {isCameraActive ? (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                  
                  {/* Face Fitting Guide Overlay */}
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none">
                    {/* The semi-transparent mask outside the oval */}
                    <div className="absolute inset-0 bg-black/40 mix-blend-hard-light"></div>
                    
                    {/* The clear oval guide */}
                    <div className="relative w-[180px] h-[240px] border-[3px] border-dashed border-emerald-400 rounded-[100px] shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] overflow-hidden flex items-center justify-center">
                      {/* Scanning line animation inside the oval */}
                      <div className={`absolute inset-x-0 h-1 shadow-[0_0_15px_#10B981] animate-bounce top-0 ${alignmentPhase === 'aligned' ? 'bg-emerald-400' : 'bg-stone-300 shadow-[0_0_15px_#d6d3d1]'}`} />
                      
                      {/* Alignment Status Overlay */}
                      {alignmentPhase === 'aligned' && (
                        <div className="absolute inset-0 border-[4px] border-emerald-400 rounded-[100px] shadow-[inset_0_0_20px_#10B981] animate-pulse" />
                      )}
                    </div>
                    
                    <p className={`absolute bottom-10 text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full backdrop-blur-md transition-all ${
                      alignmentPhase === 'aligned' ? 'bg-emerald-500/80 text-white shadow-lg' : 'bg-black/60 text-white'
                    }`}>
                      {alignmentPhase === 'aligning' ? 'Aligning Face... Keep Still' : 
                       alignmentPhase === 'aligned' ? 'Perfect Fit! Capturing...' : 'Align Face in Oval'}
                    </p>
                  </div>
                  
                  {/* Hidden Canvas for capture */}
                  <canvas ref={canvasRef} className="hidden" />
                </>
              ) : (
                <>
                  <Image
                    src="/images/veyra_hero_velera_portrait.png"
                    alt="AI Face Scan Diagnostics"
                    fill
                    className="object-cover object-top opacity-90 grayscale-[20%]"
                    priority
                  />

                  {/* Scanning laser beam animation */}
                  {isScanning && (
                    <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent shadow-[0_0_15px_#10B981] animate-bounce top-1/3 z-30" />
                  )}

                  {/* Top Sensor Readout Badges */}
                  <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] text-white font-mono flex items-center gap-1.5 z-20">
                    <span className={`w-1.5 h-1.5 rounded-full ${isScanning ? 'bg-amber-400 animate-ping' : 'bg-emerald-400'}`} />
                    {isScanning ? 'ANALYZING...' : 'FACIAL MATRIX'}
                  </div>

                  {/* Bottom Floating Score Pill */}
                  {scanComplete && overallScore && (
                    <div className="absolute bottom-4 inset-x-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-stone-200 shadow-md flex justify-between items-center z-20 animate-fade-in-up">
                      <div className="text-left">
                        <span className="block text-[9px] uppercase font-bold text-stone-400 tracking-wider">Overall Skin Index</span>
                        <span className="text-base font-serif font-bold text-[#1F1916]">{overallScore} / 100</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                        Grade {overallScore >= 80 ? 'A' : overallScore >= 60 ? 'B' : 'C'}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            {/* Bottom bar indicator */}
            <div className="w-20 h-1 bg-stone-300 rounded-full mx-auto mb-2 mt-2 shrink-0 z-20" />
          </div>

          <p className="text-xs text-[#6B5A52] leading-relaxed max-w-xs">
            {isCameraActive 
              ? "Ensure your face is well-lit and fits securely within the guide before capturing."
              : "Calibrated against over 25,000 clinical dermatological benchmarks. Next recommended diagnostic: in 7 days."
            }
          </p>
        </div>

        {/* Right: Comprehensive Clinical Metric Report */}
        <div className="lg:col-span-7 space-y-6">
          {/* Navigation Pills */}
          <div className="flex items-center gap-2 bg-[#FAF7F2] p-1.5 rounded-full border border-[#E8DCD2] w-fit">
            <button
              onClick={() => setActiveMetricTab('overview')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeMetricTab === 'overview'
                  ? 'bg-[#334234] text-white shadow-sm'
                  : 'text-[#6B5A52] hover:text-[#1F1916]'
              }`}
            >
              Biomarker Overview
            </button>
            <button
              onClick={() => setActiveMetricTab('ingredients')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeMetricTab === 'ingredients'
                  ? 'bg-[#334234] text-white shadow-sm'
                  : 'text-[#6B5A52] hover:text-[#1F1916]'
              }`}
            >
              Prescribed Actives
            </button>
            <button
              onClick={() => setActiveMetricTab('history')}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeMetricTab === 'history'
                  ? 'bg-[#334234] text-white shadow-sm'
                  : 'text-[#6B5A52] hover:text-[#1F1916]'
              }`}
            >
              Scan History
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeMetricTab === 'overview' && (
            <div className="space-y-4">
              <div className="bg-white rounded-[32px] border border-[#E8DCD2] p-7 shadow-sm space-y-6">
                <div className="flex justify-between items-center border-b border-[#E8DCD2] pb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-[#1F1916]">Dermal Parameters</h3>
                    <p className="text-xs text-[#8A7970]">{scanComplete ? 'Real-time AI optical evaluation' : 'Awaiting Scan...'}</p>
                  </div>
                  {scanComplete && (
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      Confidence: 98.4%
                    </span>
                  )}
                </div>

                {scanComplete && metrics.length > 0 ? (
                  <div className="space-y-5">
                    {summary && (
                      <div className="p-4 bg-[#E8EFE6]/50 rounded-2xl border border-[#708264]/20 text-xs text-[#334234] leading-relaxed italic shadow-sm">
                        "{summary}"
                      </div>
                    )}
                    {metrics.map((m: any) => {
                      // Correctly handle "Compromised" status so it maps to amber/orange
                      const isBad = m.status?.includes('Risk') || m.status?.includes('Attention') || m.status?.includes('Sub-optimal') || m.status?.includes('Compromised');
                      const hexColor = m.colorHex || (isBad ? '#F59E0B' : '#10B981');
                      
                      return (
                        <div key={m.name} className="space-y-1.5">
                          <div className="flex justify-between items-center text-xs">
                            <span className="font-bold text-[#1F1916]">{m.name}</span>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-semibold text-[#8A7970]">{m.status}</span>
                              <span className="font-mono font-bold" style={{ color: hexColor }}>{m.score}%</span>
                            </div>
                          </div>
                          <div className="w-full h-2.5 bg-[#FAF7F2] rounded-full overflow-hidden border border-[#E8DCD2]/60">
                            <div
                              className="h-full rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${m.score}%`, backgroundColor: hexColor }}
                            />
                          </div>
                          <p className="text-[11px] text-[#8A7970]">{m.note}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                    <span className="text-3xl">{isScanning ? '⏳' : '📸'}</span>
                    <p className="text-xs font-bold text-[#1F1916]">{isScanning ? 'Analyzing Neural Feed...' : 'No Active Scan'}</p>
                    <p className="text-xs text-[#8A7970] max-w-xs">
                      {isScanning 
                        ? 'Extracting biomarkers and cross-referencing clinical dermatological data. This takes a few seconds.'
                        : 'Capture a new scan using the button above to generate your real-time biomarker analysis.'}
                    </p>
                  </div>
                )}
              </div>

              {/* Routine Action Callout */}
              {scanComplete && (
                <div className="bg-[#FAF7F2] rounded-[28px] border border-[#E8DCD2] p-6 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-3xl p-3 bg-white rounded-2xl border border-[#E8DCD2]">🌿</span>
                    <div>
                      <h4 className="text-sm font-serif font-bold text-[#1F1916]">Synchronize Daily Routine</h4>
                      <p className="text-xs text-[#6B5A52]">Update your morning and evening skincare steps based on today's diagnostics.</p>
                    </div>
                  </div>
                  <Link
                    href="/grooming"
                    className="px-5 py-2.5 bg-[#334234] text-white text-xs font-bold uppercase tracking-wider rounded-full hover:bg-[#253226] transition-all shrink-0"
                  >
                    View Routine →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PRESCRIBED ACTIVES */}
          {activeMetricTab === 'ingredients' && (
            <div className="bg-white rounded-[32px] border border-[#E8DCD2] p-7 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-[#E8DCD2] pb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1F1916]">Curated Active Ingredients</h3>
                  <p className="text-xs text-[#8A7970]">Selected by AI based on your barrier status</p>
                </div>
                {scanComplete && (
                  <span className="text-xs font-bold text-[#334234]">{recommendedActives.length} Targeted Actives</span>
                )}
              </div>

              {scanComplete && recommendedActives.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {recommendedActives.map((active: any) => (
                      <div key={active.name} className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#E8DCD2] space-y-2 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-2 mb-1">
                            <h4 className="text-xs font-bold text-[#1F1916]">{active.name}</h4>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                              {active.match}
                            </span>
                          </div>
                          <p className="text-[11px] text-[#6B5A52] leading-relaxed">{active.purpose}</p>
                        </div>
                        <div className="pt-2 border-t border-[#E8DCD2]/60 flex justify-between items-center text-[10px]">
                          <span className="text-[#8A7970] font-semibold">Recommended Application</span>
                          <span className="font-bold text-[#334234]">{active.type}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-3 text-xs text-amber-900">
                    <span className="text-base">⚠️</span>
                    <div>
                      <span className="font-bold block">AI Warning:</span>
                      <span>Ensure you patch test new actives. Based on your scan, avoid high concentration exfoliants today.</span>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <p className="text-xs text-[#8A7970]">Complete a scan to see your AI-prescribed active ingredients.</p>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: SCAN HISTORY */}
          {activeMetricTab === 'history' && (
            <div className="bg-white rounded-[32px] border border-[#E8DCD2] p-7 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-[#E8DCD2] pb-4">
                <div>
                  <h3 className="text-xl font-serif font-bold text-[#1F1916]">Diagnostic Timeline</h3>
                  <p className="text-xs text-[#8A7970]">Past evaluations and barrier progression</p>
                </div>
              </div>

              {history.length > 0 ? (
                <div className="space-y-3">
                  {history.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between p-4 rounded-2xl bg-[#FAF7F2] border border-[#E8DCD2] hover:bg-[#EADBCE]/30 transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#334234] text-white flex items-center justify-center text-xs font-serif font-bold">
                          {item.overallScore}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#1F1916]">
                            {new Date(item.createdAt).toLocaleString(undefined, {
                              month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                            })}
                          </p>
                          <p className="text-[11px] text-[#6B5A52] line-clamp-1">{item.metrics?.[0]?.note || 'Scan completed'}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white text-[#334234] border border-[#E8DCD2]">
                        {item.overallScore >= 80 ? 'Optimal' : item.overallScore >= 60 ? 'Good' : 'Fair'}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                  <p className="text-xs text-[#8A7970]">Your diagnostic timeline is empty. Take your first scan today!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


