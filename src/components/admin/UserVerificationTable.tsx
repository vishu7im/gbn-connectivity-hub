
import React, { useState } from "react";
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
import { Check, X, Loader2, Ban, Lock, Unlock, Eye, FileCheck, FilePlus } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { UserType } from "@/data/mockAdminData";

interface UserVerificationTableProps {
  users: UserType[];
  isBlockedList?: boolean;
  isRejectedList?: boolean;
}

const UserVerificationTable = ({ users, isBlockedList = false, isRejectedList = false }: UserVerificationTableProps) => {
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null);
  const [isRejectionOpen, setIsRejectionOpen] = useState(false);
  const [isDocumentOpen, setIsDocumentOpen] = useState(false);
  const [rejectionRemarks, setRejectionRemarks] = useState("");
  const [isLoading, setIsLoading] = useState<string | null>(null);

  const handleApprove = (user: UserType) => {
    setIsLoading(user._id);
    // Simulate API call
    setTimeout(() => {
      toast.success(`${user.name} has been approved successfully`);
      setIsLoading(null);
    }, 1000);
  };

  const handleReject = () => {
    if (!selectedUser) return;
    setIsLoading(selectedUser._id);
    // Simulate API call
    setTimeout(() => {
      toast.success(`${selectedUser.name} has been rejected`);
      setIsRejectionOpen(false);
      setRejectionRemarks("");
      setIsLoading(null);
    }, 1000);
  };

  const handleBlock = (user: UserType) => {
    setIsLoading(user._id);
    // Simulate API call
    setTimeout(() => {
      toast.success(`${user.name} has been ${isBlockedList ? 'unblocked' : 'blocked'}`);
      setIsLoading(null);
    }, 1000);
  };

  const openRejectDialog = (user: UserType) => {
    setSelectedUser(user);
    setIsRejectionOpen(true);
  };

  const openDocumentDialog = (user: UserType) => {
    setSelectedUser(user);
    setIsDocumentOpen(true);
  };

  if (!users || users.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No users found</p>
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
            <TableHead>Document</TableHead>
            <TableHead>Registered On</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user: UserType) => (
            <TableRow key={user._id}>
              <TableCell className="font-medium">
                {user.name}
                {user.status && (
                  <Badge 
                    variant={
                      user.status === 'pending' ? 'outline' : 
                      user.status === 'approved' ? 'default' :
                      user.status === 'rejected' ? 'destructive' : 'secondary'
                    } 
                    className="ml-2"
                  >
                    {user.status}
                  </Badge>
                )}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.batch}</TableCell>
              <TableCell>{user.department}</TableCell>
              <TableCell>
                {user.verificationDocuments ? (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex items-center text-xs"
                    onClick={() => openDocumentDialog(user)}
                  >
                    <FileCheck className="h-3 w-3 mr-1" />
                    View Doc
                  </Button>
                ) : (
                  <Badge variant="outline" className="text-xs">
                    <FilePlus className="h-3 w-3 mr-1" />
                    No Doc
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {user.createdAt
                  ? format(new Date(user.createdAt), "MMM d, yyyy")
                  : "N/A"}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  {!isBlockedList && !isRejectedList && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex items-center border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                        onClick={() => handleApprove(user)}
                        disabled={isLoading === user._id}
                      >
                        {isLoading === user._id ? (
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
                        disabled={isLoading === user._id}
                      >
                        {isLoading === user._id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <X className="h-4 w-4 mr-1" />
                        )}
                        Reject
                      </Button>
                    </>
                  )}
                  
                  {isRejectedList && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex items-center border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
                      onClick={() => handleApprove(user)}
                      disabled={isLoading === user._id}
                    >
                      {isLoading === user._id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Check className="h-4 w-4 mr-1" />
                      )}
                      Approve Now
                    </Button>
                  )}
                  
                  <Button
                    size="sm"
                    variant={isBlockedList ? "outline" : "destructive"}
                    className={`flex items-center ${isBlockedList ? "border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white" : ""}`}
                    onClick={() => handleBlock(user)}
                    disabled={isLoading === user._id}
                  >
                    {isLoading === user._id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isBlockedList ? (
                      <Unlock className="h-4 w-4 mr-1" />
                    ) : (
                      <Ban className="h-4 w-4 mr-1" />
                    )}
                    {isBlockedList ? "Unblock" : "Block"}
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Rejection Dialog */}
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
              disabled={isLoading === selectedUser?._id}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={!rejectionRemarks.trim() || isLoading === selectedUser?._id}
            >
              {isLoading === selectedUser?._id ? (
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

      {/* Document Viewer Dialog */}
      <Dialog open={isDocumentOpen} onOpenChange={setIsDocumentOpen}>
        <DialogContent className="max-w-3xl h-auto">
          <DialogHeader>
            <DialogTitle>Verification Document</DialogTitle>
            <DialogDescription>
              Document uploaded by {selectedUser?.name} for verification
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center">
            {selectedUser?.verificationDocuments ? (
              <div className="mt-4 p-2 border rounded-md w-full max-h-[60vh] overflow-auto">
                {selectedUser.verificationDocuments.includes('image') ? (
                  <img 
                    src={selectedUser.verificationDocuments} 
                    alt="Verification Document" 
                    className="mx-auto"
                  />
                ) : selectedUser.verificationDocuments.includes('pdf') ? (
                  <embed 
                    src={selectedUser.verificationDocuments} 
                    type="application/pdf" 
                    className="w-full h-[50vh]" 
                  />
                ) : (
                  <div className="flex flex-col items-center p-8 text-center">
                    <FileCheck className="h-16 w-16 text-blue-500 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Document available but preview is not supported.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center p-8 text-center">
                <FilePlus className="h-16 w-16 text-gray-300 mb-2" />
                <p className="text-sm text-muted-foreground">No document has been uploaded by this user</p>
              </div>
            )}
          </div>
          <DialogFooter className="flex justify-between">
            <div>
              {/* We've removed documentType and documentName references since they don't exist in UserType */}
            </div>
            <Button variant="outline" onClick={() => setIsDocumentOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserVerificationTable;
