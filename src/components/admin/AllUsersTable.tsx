
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Mail, Search, MessageCircle, Shield, CheckCircle, XCircle, UserX } from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { alumniData } from "@/data/alumniData";

interface User {
  id: number;
  name: string;
  email: string;
  batch: string;
  department: string;
  company: string;
  currentRole: string;
  isVerified: boolean;
  status?: string;
}

interface AllUsersTableProps {
  users: User[];
}

const AllUsersTable: React.FC<AllUsersTableProps> = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  
  // If no users provided, use alumniData as fallback
  const allUsers = users.length > 0 ? users : alumniData;
  
  const filteredUsers = allUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.batch.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.currentRole?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSendMessage = () => {
    if (!selectedUser) return;
    
    // This would be an API call in a real app
    toast.success(`Message sent to ${selectedUser.name}`);
    setMessageText("");
    setMessageDialogOpen(false);
  };
  
  const openMessageDialog = (user: User) => {
    setSelectedUser(user);
    setMessageDialogOpen(true);
  };
  
  const getStatusBadge = (user: User) => {
    if (!user.isVerified) {
      return <Badge variant="outline" className="bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-200 text-yellow-800">Pending</Badge>;
    }
    return <Badge variant="outline" className="bg-green-100 dark:bg-green-900 dark:text-green-200 text-green-800">Verified</Badge>;
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase();
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="rounded-md border dark:border-gray-700">
        <Table>
          <TableHeader className="bg-muted/50 dark:bg-slate-900">
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Batch & Department</TableHead>
              <TableHead className="hidden md:table-cell">Current Position</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {getInitials(user.name)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{user.batch}</div>
                    <div className="text-sm text-muted-foreground">{user.department}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.currentRole && user.company ? (
                      <>
                        <div className="font-medium">{user.currentRole}</div>
                        <div className="text-sm text-muted-foreground">{user.company}</div>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Not provided</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user)}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        title="Send message"
                        onClick={() => openMessageDialog(user)}
                      >
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        title="Email user"
                        onClick={() => window.open(`mailto:${user.email}`)}
                      >
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        title="View profile"
                        onClick={() => window.open(`/members/${user.id}`, '_blank')}
                      >
                        <Search className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No users found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Compose a message to send to {selectedUser?.name}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center space-x-2">
              <Avatar className="h-10 w-10">
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {selectedUser && getInitials(selectedUser.name)}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{selectedUser?.name}</div>
                <div className="text-sm text-muted-foreground">{selectedUser?.email}</div>
              </div>
            </div>
            <Textarea
              placeholder="Type your message here..."
              className="min-h-[120px]"
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="button" onClick={handleSendMessage} disabled={!messageText.trim()}>
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AllUsersTable;
