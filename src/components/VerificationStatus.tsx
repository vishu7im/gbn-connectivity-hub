
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const VerificationStatus = () => {
  const { user } = useAuth();

  if (!user) return null;

  const getStatusBadge = () => {
    switch (user.verificationStatus) {
      case "approved":
        return <Badge className="bg-green-500">Verified</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "pending":
      default:
        return <Badge variant="outline" className="border-yellow-500 text-yellow-500">Pending</Badge>;
    }
  };

  const getStatusIcon = () => {
    switch (user.verificationStatus) {
      case "approved":
        return <CheckCircle className="h-10 w-10 text-green-500" />;
      case "rejected":
        return <AlertCircle className="h-10 w-10 text-red-500" />;
      case "pending":
      default:
        return <Clock className="h-10 w-10 text-yellow-500" />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Verification Status</CardTitle>
          {getStatusBadge()}
        </div>
        <CardDescription>
          Your alumni verification status
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-4">
          {getStatusIcon()}
          <div>
            <h3 className="font-medium">
              {user.verificationStatus === "approved" && "Your account is verified!"}
              {user.verificationStatus === "rejected" && "Your verification was rejected"}
              {user.verificationStatus === "pending" && "Your verification is pending"}
            </h3>
            <p className="text-sm text-muted-foreground">
              {user.verificationStatus === "approved" && "You can now post jobs, share posts, and comment."}
              {user.verificationStatus === "pending" && "Your profile is awaiting verification by the admin."}
            </p>
          </div>
        </div>

        {user.verificationStatus === "rejected" && user.rejectionRemarks && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Rejection Remarks</AlertTitle>
            <AlertDescription>
              {user.rejectionRemarks}
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
};

export default VerificationStatus;
