import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { ArrowRight, Shield, Zap, TrendingUp, CheckCircle2 } from "lucide-react";

export default function Home() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();

  const handleStartScan = () => {
    if (isAuthenticated) {
      navigate("/onboarding");
    } else {
      window.location.href = getLoginUrl("/onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">FraudLens.uk</span>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-muted-foreground" style={{fontSize: '10px'}}>{user?.name}</span>
                <Button
                  onClick={() => navigate("/dashboard")}
                  variant="outline"
                  size="sm"
                >
                  Dashboard
                </Button>
              </>
            ) : (
              <Button
                onClick={() => (window.location.href = getLoginUrl())}
                size="sm"
              >
                Sign In
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="section-padding border-b border-border">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-block mb-4 px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              <span className="text-sm font-medium text-primary">
                AI-Powered Fraud Detection
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Catch Cashier Fraud in Seconds
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 leading-relaxed">
              Upload surveillance footage. Our AI analyzes every transaction. Get forensic evidence of unregistered sales, staff behavior anomalies, and compliance violations—no hardware, no installation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Button
                size="lg"
                onClick={handleStartScan}
                className="gap-2"
              >
                Start Free Scan <ArrowRight className="w-4 h-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => document.getElementById("pricing")?.scrollIntoView({ behavior: "smooth" })}
              >
                View Pricing
              </Button>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12">
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-3xl font-bold text-primary mb-2">₺130</div>
                <p className="text-sm text-muted-foreground">Cost per scan</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-3xl font-bold text-primary mb-2">2 days</div>
                <p className="text-sm text-muted-foreground">Payback period</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border">
                <div className="text-3xl font-bold text-primary mb-2">95%</div>
                <p className="text-sm text-muted-foreground">Gross margin</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-padding border-b border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card-elevated p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Upload & Analyze</h3>
              <p className="text-muted-foreground">
                Drag and drop surveillance footage or link your Google Drive folder. We process it instantly on our cloud GPU.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="card-elevated p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI Scene Detection</h3>
              <p className="text-muted-foreground">
                Our AI identifies the counter, register, and customer area. You define zones and detection rules in seconds.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="card-elevated p-6">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Forensic Report</h3>
              <p className="text-muted-foreground">
                Receive timestamped evidence, shift-level risk reports, and court-ready documentation within hours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section-padding border-b border-border">
        <div className="container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Why Station Managers Choose FraudLens</h2>
            <div className="space-y-4">
              {[
                "Timestamped video evidence per incident",
                "Shift-level risk report per cashier",
                "Court-ready evidence package",
                "Proof of diligence to ownership",
                "Deterrent effect on future theft",
              ].map((benefit, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="section-padding border-b border-border">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">Transparent Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {/* Free Scan */}
            <div className="card-elevated p-8 border-2 border-primary/20">
              <h3 className="text-xl font-semibold mb-2">First Scan</h3>
              <p className="text-muted-foreground mb-6">15-day retrospective</p>
              <div className="text-3xl font-bold mb-6">
                Free
                <span className="text-sm text-muted-foreground font-normal"> (Value ₺900)</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>PDF + video clips</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Full analysis</span>
                </li>
              </ul>
              <Button onClick={handleStartScan} className="w-full">
                Start Free Scan
              </Button>
            </div>

            {/* Monthly Subscription */}
            <div className="card-elevated p-8 border-2 border-primary">
              <h3 className="text-xl font-semibold mb-2">Monthly Subscription</h3>
              <p className="text-muted-foreground mb-6">Single station</p>
              <div className="text-3xl font-bold mb-6">
                ₺2,500
                <span className="text-sm text-muted-foreground font-normal"> /month</span>
              </div>
              <ul className="space-y-2 mb-6 text-sm">
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Live monitoring</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>Weekly reports</span>
                </li>
                <li className="flex gap-2 items-start">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span>24/7 support</span>
                </li>
              </ul>
              <Button onClick={handleStartScan} variant="outline" className="w-full">
                Upgrade After Scan
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-primary/5 border-b border-border">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Your Station?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Upload your first surveillance footage today. No credit card required.
          </p>
          <Button size="lg" onClick={handleStartScan} className="gap-2">
            Start Free Scan <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              <span className="font-semibold">www.fraudLens.uk</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2026 FraudLens. AI-powered fraud detection for retail.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
