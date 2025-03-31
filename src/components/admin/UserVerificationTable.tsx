
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Check, Loader2, User } from "lucide-react";
import { format } from 'date-fns';

interface PendingUser {
  id: number;
  name: string;
  email: string;
  batch: string;
  department: string;
  created_at: string;
}

const API_URL = "http://localhost:5000/api";

const UserVerificationTable = () => {
  const queryClient = useQueryClient();
  const [processingUser, setProcessingUser] = useState<number | null>(null);

  // Get pending users
  const { data: pendingUsers, isLoading, error } = useQuery({
    queryKey: ['pendingUsers'],
    queryFn: async () => {
      const token = localStorage.getItem('token');
      const response = await axios.get<PendingUser[]>(`${API_URL}/auth/pending`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  });

  // Verify user mutation
  const verifyUserMutation = useMutation({
    mutationFn: async (userId: number) => {
      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/auth/verify/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onMutate: (userId) => {
      setProcessingUser(userId);
    },
    onSuccess: () => {
      toast.success('User verified successfully');
      queryClient.invalidateQueries({ queryKey: ['pendingUsers'] });
    },
    onError: (error) => {
      console.error('Error verifying user:', error);
      toast.error('Failed to verify user');
    },
    onSettled: () => {
      setProcessingUser(null);
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md p-4 text-center">
        <p className="text-red-600 dark:text-red-400">Failed to load pending users</p>
      </div>
    );
  }

  if (!pendingUsers || pendingUsers.length === 0) {
    return (
      <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md p-8 text-center">
        <User className="h-10 w-10 mx-auto text-gray-400 mb-2" />
        <h3 className="text-lg font-medium">No pending users</h3>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          All alumni accounts have been verified.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
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
          {pendingUsers.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.batch || 'N/A'}</TableCell>
              <TableCell>{user.department || 'N/A'}</TableCell>
              <TableCell>{format(new Date(user.created_at), 'MMM dd, yyyy')}</TableCell>
              <TableCell className="text-right">
                <Button
                  size="sm"
                  onClick={() => verifyUserMutation.mutate(user.id)}
                  disabled={processingUser === user.id}
                >
                  {processingUser === user.id ? (
                    <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                  ) : (
                    <Check className="h-4 w-4 mr-1" />
                  )}
                  Verify
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserVerificationTable;
