
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminAPI } from "@/services/api";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

interface User {
  _id: string;
  name: string;
  email: string;
  batch: string;
  department: string;
  createdAt: string;
}

const UserVerificationTable = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);
  const [rejectionRemarks, setRejectionRemarks] = useState("");
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["pendingUsers"],
    queryFn: async () => {
      const response = await adminAPI.getPendingVerifications();
      return response.data;
    },
  });

  const approveMutation = useMutation({
    mutationFn: (userId: string) => adminAPI.verifyUser(userId, "approved"),
    onSuccess: () => {
      toast.success("User has been approved successfully");
      queryClient.invalidateQueries({ queryKey: ["pendingUsers"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
    },
    onError: () => {
      toast.error("Failed to approve user");
    },
  });

  const rejectMutation = useMutation({
    mutationFn: ({ userId, remarks }: { userId: string; remarks: string }) =>
      adminAPI.verifyUser(userId, "rejected", remarks),
    onSuccess: () => {
      toast.success("User has been rejected");
      setIsRejectionOpen(false);
      setRejectionRemarks("");
      queryClient.invalidateQueries({ queryKey: ["pendingUsers"] });
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
    },
    onError: () => {
      toast.error("Failed to reject user");
    },
  });

  const handleApprove = (user: User) => {
    approveMutation.mutate(user._id);
  };

  const handleReject = () => {
    if (!selectedUser) return;
    rejectMutation.mutate({
      userId: selectedUser._id,
      remarks: rejectionRemarks,
    });
  };

  const openRejectDialog = (user: User) => {
    setSelectedUser(user);
    setIsRejectionOpen(true);
  };

  if (isLoading) {
    return <UserVerificationTableLoading />;
  }

  if (error) {
    return (
      <div className="p-4 bg-destructive/10 text-destructive rounded-md">
        <h3 className="font-medium">Error loading pending verifications</h3>
        <p className="text-sm">Please try refreshing the page.</p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No pending verifications</p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Registered On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((user: User) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.batch}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>
                {user.createdAt
                  ? format(new Date(user.createdAt), "MMM d, yyyy")
                  : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                    onClick={() => handleApprove(user)}
                    disabled={approveMutation.isPending}
                  >
                    {approveMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Check className="h-4 w-4 mr-1" />
                    )}
                    Approve
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex items-center border-destructive text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => openRejectDialog(user)}
                    disabled={rejectMutation.isPending}
                  >
                    {rejectMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <X className="h-4 w-4 mr-1" />
                    )}
                    Reject
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isRejectionOpen} onOpenChange={setIsRejectionOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject User Verification</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting {selectedUser?.name}'s verification.
              This will be visible to the user.
            </DialogDescription>
          </DialogHeader>
          <Textarea
            value={rejectionRemarks}
            onChange={(e) => setRejectionRemarks(e.target.value)}
            placeholder="Enter rejection reason..."
            className="min-h-[100px]"
          />
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsRejectionOpen(false)}
              disabled={rejectMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectionRemarks.trim() || rejectMutation.isPending}
            >
              {rejectMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Rejecting...
                </>
              ) : (
                "Reject User"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const UserVerificationTableLoading = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-10 w-32" />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Batch</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Registered On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <TableRow key={index}>
                <TableCell>
                  <Skeleton className="h-5 w-32" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-40" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-16" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-5 w-24" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-9 w-24" />
                    <Skeleton className="h-9 w-24" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserVerificationTable;
