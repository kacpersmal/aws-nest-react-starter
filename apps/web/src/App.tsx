import { useEffect, useState } from "react";
import { apiClient } from "@/lib/api-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface HealthStatus {
  status: string;
  info?: Record<string, { status: string }>;
  error?: Record<string, { status: string; message?: string }>;
  details?: Record<string, { status: string }>;
}

function App() {
  const [health, setHealth] = useState<HealthStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    apiClient
      .get<HealthStatus>("/health")
      .then((data) => {
        setHealth(data);
        setError(null);
      })
      .catch((err: Error) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-xl">AWS Nest React Starter</CardTitle>
          <CardDescription>API Health Check</CardDescription>
        </CardHeader>
        <CardContent>
          {loading && <p className="text-muted-foreground">Checking API...</p>}
          {error && (
            <div className="space-y-2">
              <Badge variant="destructive">Error</Badge>
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}
          {health && (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">Status:</span>
                <Badge
                  variant={health.status === "ok" ? "default" : "destructive"}
                >
                  {health.status}
                </Badge>
              </div>
              {health.info &&
                Object.entries(health.info).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <span className="text-muted-foreground">{key}:</span>
                    <Badge variant="outline">{value.status}</Badge>
                  </div>
                ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
