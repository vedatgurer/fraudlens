import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Shield, Upload, Link2, Eye, Zap, FileText, Check } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

type OnboardingStep = "upload" | "preview" | "zones" | "config" | "details" | "review";

interface OnboardingState {
  videoSource: "file" | "drive" | null;
  videoFile: File | null;
  driveLink: string;
  frameUrl: string | null;
  sceneDescription: string;
  zones: Array<{ id: string; name: string; coords: [number, number, number, number] }>;
  jobType: string;
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
}

export default function Onboarding() {
  const [, navigate] = useLocation();
  const { isAuthenticated } = useAuth();
  const [step, setStep] = useState<OnboardingStep>("upload");
  const [state, setState] = useState<OnboardingState>({
    videoSource: null,
    videoFile: null,
    driveLink: "",
    frameUrl: null,
    sceneDescription: "",
    zones: [],
    jobType: "unregistered-sales",
    businessName: "",
    contactPerson: "",
    email: "",
    phone: "",
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Please sign in to continue</p>
          <Button onClick={() => (window.location.href = getLoginUrl("/onboarding"))}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setState((prev) => ({
        ...prev,
        videoFile: file,
        videoSource: "file",
      }));
      // Simulate frame extraction
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          frameUrl: URL.createObjectURL(file),
          sceneDescription: "I can see a checkout counter with a cash register, receipt printer, and customer area. Ready to analyze.",
          step: "preview",
        }));
      }, 500);
    }
  };

  const handleDriveLink = () => {
    if (state.driveLink) {
      setState((prev) => ({
        ...prev,
        videoSource: "drive",
      }));
      // Simulate frame extraction from Drive
      setTimeout(() => {
        setState((prev) => ({
          ...prev,
          frameUrl: "https://via.placeholder.com/640x480?text=Video+Frame",
          sceneDescription: "I can see a checkout counter with a cash register, receipt printer, and customer area. Ready to analyze.",
        }));
        setStep("preview");
      }, 500);
    }
  };

  const handleAddZone = () => {
    const newZone = {
      id: `zone-${Date.now()}`,
      name: "New Zone",
      coords: [100, 100, 200, 200] as [number, number, number, number],
    };
    setState((prev) => ({
      ...prev,
      zones: [...prev.zones, newZone],
    }));
  };

  const handleRemoveZone = (id: string) => {
    setState((prev) => ({
      ...prev,
      zones: prev.zones.filter((z) => z.id !== id),
    }));
  };

  const handleSubmit = () => {
    // In a real app, this would submit to the backend
    console.log("Submitting onboarding:", state);
    navigate("/dashboard");
  };

  const progressSteps = [
    { id: "upload", label: "Upload", icon: Upload },
    { id: "preview", label: "Preview", icon: Eye },
    { id: "zones", label: "Zones", icon: Zap },
    { id: "config", label: "Config", icon: FileText },
    { id: "details", label: "Details", icon: Shield },
    { id: "review", label: "Review", icon: Check },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container py-6">
          <div className="flex items-center gap-2 mb-6">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">FraudLens</span>
          </div>
          <h1 className="text-3xl font-bold">Start Your Free Scan</h1>
          <p className="text-muted-foreground mt-2">
            Upload surveillance footage and configure detection parameters
          </p>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="border-b border-border bg-card/50">
        <div className="container py-6">
          <div className="flex items-center justify-between">
            {progressSteps.map((s, idx) => {
              const isActive = s.id === step;
              const isCompleted = progressSteps.findIndex((x) => x.id === step) > idx;
              const Icon = s.icon;

              return (
                <div key={s.id} className="flex items-center">
                  <button
                    onClick={() => {
                      if (isCompleted || isActive) setStep(s.id as OnboardingStep);
                    }}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      isActive
                        ? "border-primary bg-primary text-primary-foreground"
                        : isCompleted
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border bg-background text-muted-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </button>
                  {idx < progressSteps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-2 ${
                        isCompleted ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-xs text-muted-foreground">
            {progressSteps.map((s) => (
              <span key={s.id}>{s.label}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container section-padding">
        <div className="max-w-2xl mx-auto">
          {/* Step 1: Upload */}
          {step === "upload" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Upload Surveillance Footage</h2>
                <p className="text-muted-foreground mb-6">
                  Choose how you want to provide your video footage
                </p>
              </div>

              {/* File Upload */}
              <div className="card-elevated p-8">
                <h3 className="font-semibold mb-4">Drag & Drop or Select File</h3>
                <label className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="font-medium">Drop your video here</p>
                  <p className="text-sm text-muted-foreground">or click to browse</p>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {state.videoFile && (
                  <p className="text-sm text-green-600 mt-2">
                    ✓ {state.videoFile.name} selected
                  </p>
                )}
              </div>

              {/* Google Drive Link */}
              <div className="card-elevated p-8">
                <h3 className="font-semibold mb-4">Or Use Google Drive Link</h3>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste your Google Drive folder link (read-only)"
                    value={state.driveLink}
                    onChange={(e) =>
                      setState((prev) => ({ ...prev, driveLink: e.target.value }))
                    }
                    className="input-field"
                  />
                  <Button onClick={handleDriveLink}>
                    <Link2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <Button
                onClick={() => setStep("preview")}
                disabled={!state.videoFile && !state.driveLink}
                className="w-full"
              >
                Continue to Preview
              </Button>
            </div>
          )}

          {/* Step 2: Preview */}
          {step === "preview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">AI Scene Preview</h2>
                <p className="text-muted-foreground mb-6">
                  Our AI has analyzed your footage. Here's what it detected:
                </p>
              </div>

              {state.frameUrl && (
                <div className="card-elevated overflow-hidden">
                  <img
                    src={state.frameUrl}
                    alt="Video frame"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              <div className="card-elevated p-6 bg-primary/5 border-primary/20">
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  <Eye className="w-5 h-5 text-primary" />
                  Scene Analysis
                </h3>
                <p className="text-foreground">{state.sceneDescription}</p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("upload")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={() => setStep("zones")} className="flex-1">
                  Define Zones
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Zones */}
          {step === "zones" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Define Monitoring Zones</h2>
                <p className="text-muted-foreground mb-6">
                  Draw boxes on the frame to define areas of interest
                </p>
              </div>

              {state.frameUrl && (
                <div className="card-elevated overflow-hidden">
                  <img
                    src={state.frameUrl}
                    alt="Video frame"
                    className="w-full h-64 object-cover"
                  />
                </div>
              )}

              <div className="space-y-3">
                <h3 className="font-semibold">Zones</h3>
                {state.zones.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No zones defined yet</p>
                ) : (
                  <div className="space-y-2">
                    {state.zones.map((zone) => (
                      <div
                        key={zone.id}
                        className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
                      >
                        <input
                          type="text"
                          value={zone.name}
                          onChange={(e) => {
                            setState((prev) => ({
                              ...prev,
                              zones: prev.zones.map((z) =>
                                z.id === zone.id ? { ...z, name: e.target.value } : z
                              ),
                            }));
                          }}
                          className="input-field text-sm"
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveZone(zone.id)}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  variant="outline"
                  onClick={handleAddZone}
                  className="w-full"
                >
                  + Add Zone
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("preview")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={() => setStep("config")} className="flex-1">
                  Next: Configure Jobs
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Config */}
          {step === "config" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Detection Configuration</h2>
                <p className="text-muted-foreground mb-6">
                  Choose what types of issues to monitor
                </p>
              </div>

              <div className="card-elevated p-6">
                <h3 className="font-semibold mb-4">Detection Type</h3>
                <div className="space-y-3">
                  {[
                    {
                      id: "unregistered-sales",
                      label: "Unregistered Sales",
                      desc: "Cash received but no receipt printed",
                    },
                    {
                      id: "shift-changes",
                      label: "Shift Changes",
                      desc: "Monitor staff transitions and handovers",
                    },
                    {
                      id: "staff-behavior",
                      label: "Staff Behavior",
                      desc: "Unusual patterns or anomalies",
                    },
                  ].map((option) => (
                    <label
                      key={option.id}
                      className="flex items-start gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-card/50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="jobType"
                        value={option.id}
                        checked={state.jobType === option.id}
                        onChange={(e) =>
                          setState((prev) => ({ ...prev, jobType: e.target.value }))
                        }
                        className="mt-1"
                      />
                      <div>
                        <p className="font-medium">{option.label}</p>
                        <p className="text-sm text-muted-foreground">{option.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("zones")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={() => setStep("details")} className="flex-1">
                  Next: Your Details
                </Button>
              </div>
            </div>
          )}

          {/* Step 5: Details */}
          {step === "details" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Your Business Details</h2>
                <p className="text-muted-foreground mb-6">
                  Where should we send the forensic report?
                </p>
              </div>

              <div className="card-elevated p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Business Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Station Manager - Central Location"
                    value={state.businessName}
                    onChange={(e) =>
                      setState((prev) => ({ ...prev, businessName: e.target.value }))
                    }
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Contact Person</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    value={state.contactPerson}
                    onChange={(e) =>
                      setState((prev) => ({ ...prev, contactPerson: e.target.value }))
                    }
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={state.email}
                    onChange={(e) =>
                      setState((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="+90 (555) 123-4567"
                    value={state.phone}
                    onChange={(e) =>
                      setState((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("config")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={() => setStep("review")} className="flex-1">
                  Review & Submit
                </Button>
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {step === "review" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold mb-4">Review Your Submission</h2>
                <p className="text-muted-foreground mb-6">
                  Verify all details before submitting for analysis
                </p>
              </div>

              <div className="space-y-4">
                <div className="card-elevated p-6">
                  <h3 className="font-semibold mb-3">Video Source</h3>
                  <p className="text-muted-foreground">
                    {state.videoSource === "file" ? state.videoFile?.name : state.driveLink}
                  </p>
                </div>

                <div className="card-elevated p-6">
                  <h3 className="font-semibold mb-3">Monitoring Zones</h3>
                  <p className="text-muted-foreground">
                    {state.zones.length} zone{state.zones.length !== 1 ? "s" : ""} defined
                  </p>
                </div>

                <div className="card-elevated p-6">
                  <h3 className="font-semibold mb-3">Detection Type</h3>
                  <p className="text-muted-foreground capitalize">
                    {state.jobType.replace("-", " ")}
                  </p>
                </div>

                <div className="card-elevated p-6">
                  <h3 className="font-semibold mb-3">Contact Information</h3>
                  <div className="space-y-1 text-sm">
                    <p>
                      <span className="text-muted-foreground">Business:</span>{" "}
                      {state.businessName}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Contact:</span>{" "}
                      {state.contactPerson}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Email:</span> {state.email}
                    </p>
                    <p>
                      <span className="text-muted-foreground">Phone:</span> {state.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="card-elevated p-6 bg-primary/5 border-primary/20">
                <p className="text-sm text-foreground">
                  Your analysis will be processed within 24 hours. You'll receive a forensic
                  report with timestamped evidence and detailed findings.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setStep("details")}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  Submit for Analysis
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
