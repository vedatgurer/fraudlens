import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import {
  Shield,
  FileText,
  Download,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Clock,
  BarChart3,
} from "lucide-react";

export default function Dashboard() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Please sign in to continue</p>
          <Button onClick={() => (window.location.href = getLoginUrl("/dashboard"))}>
            Sign In
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border">
        <div className="container py-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">FraudLens</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user?.name}</span>
            <Button variant="outline" size="sm" onClick={() => navigate("/")}>
              Back to Home
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container section-padding">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Analysis Dashboard</h1>
            <p className="text-muted-foreground">
              Your forensic report and monitoring results
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Analysis Status</h3>
                <Clock className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold mb-2">Completed</p>
              <p className="text-sm text-muted-foreground">Processed 2 hours ago</p>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Issues Found</h3>
                <AlertCircle className="w-5 h-5 text-destructive" />
              </div>
              <p className="text-2xl font-bold mb-2">3</p>
              <p className="text-sm text-muted-foreground">Unregistered sales detected</p>
            </div>

            <div className="card-elevated p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">Confidence</h3>
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <p className="text-2xl font-bold mb-2">94%</p>
              <p className="text-sm text-muted-foreground">High accuracy analysis</p>
            </div>
          </div>

          {/* Key Findings */}
          <div className="card-elevated p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Key Findings</h2>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-200">
                    Unregistered Sale Detected
                  </h3>
                  <p className="text-sm text-red-800 dark:text-red-300 mt-1">
                    <strong>Time:</strong> 2026-03-31 14:23:45 | <strong>Duration:</strong> 8
                    seconds
                  </p>
                  <p className="text-sm text-red-800 dark:text-red-300">
                    Customer handed cash to cashier. Receipt printer remained inactive for 12
                    seconds. High confidence fraud indicator.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-900 dark:text-red-200">
                    Unregistered Sale Detected
                  </h3>
                  <p className="text-sm text-red-800 dark:text-red-300 mt-1">
                    <strong>Time:</strong> 2026-03-31 15:07:12 | <strong>Duration:</strong> 6
                    seconds
                  </p>
                  <p className="text-sm text-red-800 dark:text-red-300">
                    Customer paid cash. Cashier pocketed amount without entering into register.
                    No receipt issued.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg border border-amber-200 dark:border-amber-800">
                <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 dark:text-amber-200">
                    Suspicious Pattern
                  </h3>
                  <p className="text-sm text-amber-800 dark:text-amber-300 mt-1">
                    <strong>Time:</strong> 2026-03-31 16:45:30
                  </p>
                  <p className="text-sm text-amber-800 dark:text-amber-300">
                    Multiple rapid transactions with minimal register interaction. Recommend
                    manual review.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Analysis Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Transaction Analysis
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Registered Sales</span>
                    <span className="font-semibold">47</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-green-600 h-2 rounded-full"
                      style={{ width: "94%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Unregistered Sales</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-2">
                    <div
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: "6%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card-elevated p-6">
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-primary" />
                Report Summary
              </h3>
              <div className="space-y-2 text-sm">
                <p>
                  <span className="text-muted-foreground">Analysis Period:</span> 4 hours
                </p>
                <p>
                  <span className="text-muted-foreground">Total Transactions:</span> 50
                </p>
                <p>
                  <span className="text-muted-foreground">Fraud Rate:</span> 6%
                </p>
                <p>
                  <span className="text-muted-foreground">Estimated Loss:</span> ₺1,200
                </p>
              </div>
            </div>
          </div>

          {/* Video Evidence */}
          <div className="card-elevated p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Video Evidence</h2>
            <div className="space-y-4">
              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-black h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <div className="w-0 h-0 border-l-8 border-l-primary border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1" />
                    </div>
                    <p className="text-white text-sm">Incident 1: 14:23:45</p>
                  </div>
                </div>
                <div className="p-4 bg-card">
                  <p className="text-sm font-medium mb-2">Unregistered Sale - 8 seconds</p>
                  <p className="text-xs text-muted-foreground">
                    Customer hands cash, cashier pockets without registering. Receipt printer
                    inactive.
                  </p>
                </div>
              </div>

              <div className="border border-border rounded-lg overflow-hidden">
                <div className="bg-black h-48 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                      <div className="w-0 h-0 border-l-8 border-l-primary border-t-5 border-t-transparent border-b-5 border-b-transparent ml-1" />
                    </div>
                    <p className="text-white text-sm">Incident 2: 15:07:12</p>
                  </div>
                </div>
                <div className="p-4 bg-card">
                  <p className="text-sm font-medium mb-2">Unregistered Sale - 6 seconds</p>
                  <p className="text-xs text-muted-foreground">
                    Cash transaction completed without receipt. Immediate pocketing of funds.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Report Download */}
          <div className="card-elevated p-8 bg-primary/5 border-primary/20 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Forensic Report</h3>
                  <p className="text-sm text-muted-foreground">
                    Complete analysis with evidence and recommendations
                  </p>
                </div>
              </div>
              <Button className="gap-2">
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
            </div>
          </div>

          {/* Next Steps */}
          <div className="card-elevated p-8">
            <h2 className="text-2xl font-bold mb-6">Next Steps</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-semibold text-primary">
                  1
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Review the Evidence</h3>
                  <p className="text-sm text-muted-foreground">
                    Watch the timestamped video clips and review the detailed findings
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-semibold text-primary">
                  2
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Take Action</h3>
                  <p className="text-sm text-muted-foreground">
                    Use the forensic evidence to address the identified issues with staff
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-semibold text-primary">
                  3
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Subscribe for Ongoing Monitoring</h3>
                  <p className="text-sm text-muted-foreground">
                    Upgrade to monthly subscription for continuous live monitoring and weekly
                    reports
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <Button onClick={() => navigate("/")} variant="outline" className="flex-1">
                Back to Home
              </Button>
              <Button className="flex-1">Upgrade to Monthly Monitoring</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
