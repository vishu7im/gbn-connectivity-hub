
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
import { 
  MessageSquare, 
  Search, 
  ChevronDown, 
  Mail, 
  ExternalLink,
  Check,
  Clock,
  AlertTriangle
} from "lucide-react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { format } from "date-fns";

// Mock data for contact messages
const mockContactMessages = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    subject: "Alumni Event Inquiry",
    message: "I'm interested in attending the upcoming alumni meet. Could you please share more details about the event schedule and registration process?",
    status: "unread",
    date: new Date(2024, 3, 10).toISOString()
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    subject: "Donation for Scholarship Fund",
    message: "I would like to contribute to the alumni scholarship fund. Could you please guide me through the process and share the relevant details for making a donation?",
    status: "read",
    date: new Date(2024, 3, 8).toISOString()
  },
  {
    id: 3,
    name: "Michael Johnson",
    email: "michael.j@example.com",
    subject: "Website Technical Issue",
    message: "I'm experiencing some issues while trying to update my profile on the alumni portal. The changes are not getting saved and I keep getting an error message. Could you please help me resolve this issue?",
    status: "replied",
    date: new Date(2024, 3, 5).toISOString()
  },
  {
    id: 4,
    name: "Akshay Kumar",
    email: "akshay.k@example.com",
    subject: "Career Mentorship Program",
    message: "I'm interested in participating in the alumni career mentorship program as a mentor. I have over 15 years of experience in the software industry and would like to give back to the community. Please let me know the process to register as a mentor.",
    status: "flagged",
    date: new Date(2024, 3, 2).toISOString()
  },
  {
    id: 5,
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    subject: "Update Alumni Directory",
    message: "I noticed that my information in the alumni directory is outdated. I've recently changed my job and relocated to a different city. How can I update this information in the directory?",
    status: "unread",
    date: new Date(2024, 2, 28).toISOString()
  }
];

const GlobalMessages = () => {
  const [messages, setMessages] = useState(mockContactMessages);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  
  const filteredMessages = messages.filter(msg => 
    msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    msg.message.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setMessageDialogOpen(true);
    
    // Mark as read if it was unread
    if (message.status === 'unread') {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === message.id ? { ...msg, status: 'read' } : msg
        )
      );
    }
  };
  
  const handleReply = () => {
    if (!selectedMessage || !replyText.trim()) return;
    
    // In a real app, this would be an API call
    setMessages(prev => 
      prev.map(msg => 
        msg.id === selectedMessage.id ? { ...msg, status: 'replied' } : msg
      )
    );
    
    toast.success(`Reply sent to ${selectedMessage.name}`);
    setReplyText("");
    setMessageDialogOpen(false);
  };
  
  const handleStatusChange = (messageId: number, newStatus: string) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      )
    );
    
    toast.success(`Message status updated to ${newStatus}`);
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'unread':
        return <Badge variant="outline" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Unread</Badge>;
      case 'read':
        return <Badge variant="outline" className="bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">Read</Badge>;
      case 'replied':
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Replied</Badge>;
      case 'flagged':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Flagged</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'unread':
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case 'read':
        return <Check className="h-4 w-4 text-gray-500" />;
      case 'replied':
        return <Mail className="h-4 w-4 text-green-500" />;
      case 'flagged':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search messages..."
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
              <TableHead>From</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message) => (
                <TableRow 
                  key={message.id} 
                  className={message.status === 'unread' ? 'font-medium' : ''}
                >
                  <TableCell>
                    <div>
                      <div className="font-medium">{message.name}</div>
                      <div className="text-sm text-muted-foreground">{message.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="max-w-xs truncate" title={message.subject}>
                      {message.subject}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(message.date), 'MMM dd, yyyy')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(message.status)}
                      <span>{getStatusBadge(message.status)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewMessage(message)}
                      >
                        View
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" size="icon">
                            <ChevronDown className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleStatusChange(message.id, 'read')}>
                            <Check className="mr-2 h-4 w-4" />
                            Mark as Read
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(message.id, 'unread')}>
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Mark as Unread
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(message.id, 'flagged')}>
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Flag Message
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => window.open(`mailto:${message.email}`)}>
                            <Mail className="mr-2 h-4 w-4" />
                            Email Sender
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No messages found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject}</DialogTitle>
            <DialogDescription>
              From: {selectedMessage?.name} &lt;{selectedMessage?.email}&gt;
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="text-sm text-muted-foreground">
              {format(new Date(selectedMessage?.date || new Date()), 'PPPp')}
            </div>
            <div className="border-t pt-4">
              <p className="whitespace-pre-line">{selectedMessage?.message}</p>
            </div>
            
            <div className="border-t pt-4">
              <h4 className="text-sm font-medium mb-2">Reply to this message:</h4>
              <textarea
                className="w-full min-h-[120px] p-3 border rounded-md dark:bg-slate-900 dark:border-slate-700"
                placeholder="Type your reply here..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              ></textarea>
            </div>
          </div>
          <DialogFooter className="flex justify-between sm:justify-between">
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(`mailto:${selectedMessage?.email}`)}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                Open in Email Client
              </Button>
            </div>
            <div className="flex space-x-2">
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleReply} disabled={!replyText.trim()}>
                <Mail className="mr-2 h-4 w-4" />
                Send Reply
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default GlobalMessages;
