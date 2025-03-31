
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar as CalendarIcon, Edit, Loader2, MapPin, Plus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

interface EventItem {
  id: number;
  title: string;
  description: string;
  event_date: string;
  location: string | null;
  registration_link: string | null;
  image: string | null;
  user_id: number;
  organizer_name: string;
  created_at: string;
}

const API_URL = "http://localhost:5000/api";

const EventsManager = () => {
  const queryClient = useQueryClient();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState<Date | undefined>(undefined);
  const [location, setLocation] = useState('');
  const [registrationLink, setRegistrationLink] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentEventId, setCurrentEventId] = useState<number | null>(null);
  const [deleteInProgress, setDeleteInProgress] = useState<number | null>(null);

  // Get all events
  const { data: events, isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: async () => {
      const response = await axios.get<EventItem[]>(`${API_URL}/events`);
      return response.data;
    }
  });

  // Create event mutation
  const createEventMutation = useMutation({
    mutationFn: async () => {
      if (!eventDate) {
        throw new Error('Event date is required');
      }

      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('event_date', eventDate.toISOString());
      formData.append('location', location);
      formData.append('registration_link', registrationLink);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/events`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      toast.success('Event created successfully');
      queryClient.invalidateQueries({ queryKey: ['events'] });
      resetForm();
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error creating event:', error);
      toast.error('Failed to create event');
    },
    onSettled: () => {
      setIsSubmitting(false);
    }
  });

  // Update event mutation
  const updateEventMutation = useMutation({
    mutationFn: async () => {
      if (!currentEventId || !eventDate) return;
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('event_date', eventDate.toISOString());
      formData.append('location', location);
      formData.append('registration_link', registrationLink);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const token = localStorage.getItem('token');
      await axios.put(`${API_URL}/events/${currentEventId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`
        }
      });
    },
    onMutate: () => {
      setIsSubmitting(true);
    },
    onSuccess: () => {
      toast.success('Event updated successfully');
      queryClient.invalidateQueries({ queryKey: ['events'] });
      resetForm();
      setIsEditDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
    },
    onSettled: () => {
      setIsSubmitting(false);
      setCurrentEventId(null);
    }
  });

  // Delete event mutation
  const deleteEventMutation = useMutation({
    mutationFn: async (eventId: number) => {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/events/${eventId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
    },
    onMutate: (eventId) => {
      setDeleteInProgress(eventId);
    },
    onSuccess: () => {
      toast.success('Event deleted successfully');
      queryClient.invalidateQueries({ queryKey: ['events'] });
    },
    onError: (error) => {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
    },
    onSettled: () => {
      setDeleteInProgress(null);
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !eventDate) {
      toast.error('Please provide title, description, and event date');
      return;
    }
    createEventMutation.mutate();
  };

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !eventDate) {
      toast.error('Please provide title, description, and event date');
      return;
    }
    updateEventMutation.mutate();
  };

  const openEditDialog = (event: EventItem) => {
    setTitle(event.title);
    setDescription(event.description);
    setEventDate(new Date(event.event_date));
    setLocation(event.location || '');
    setRegistrationLink(event.registration_link || '');
    setCurrentEventId(event.id);
    setIsEditDialogOpen(true);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setEventDate(undefined);
    setLocation('');
    setRegistrationLink('');
    setSelectedImage(null);
    setCurrentEventId(null);
  };

  const EventForm = ({ isEdit = false, onSubmit }: { isEdit?: boolean, onSubmit: (e: React.FormEvent) => void }) => (
    <form onSubmit={onSubmit}>
      <div className="space-y-4 py-2">
        <div className="grid w-full gap-1.5">
          <Label htmlFor={`${isEdit ? 'edit-' : ''}title`}>Title</Label>
          <Input 
            id={`${isEdit ? 'edit-' : ''}title`} 
            value={title}
            onChange={(e) => setTitle(e.target.value)} 
            required
          />
        </div>
        
        <div className="grid w-full gap-1.5">
          <Label htmlFor={`${isEdit ? 'edit-' : ''}description`}>Description</Label>
          <Textarea
            id={`${isEdit ? 'edit-' : ''}description`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={5}
            required
          />
        </div>
        
        <div className="grid w-full gap-1.5">
          <Label htmlFor={`${isEdit ? 'edit-' : ''}event-date`}>Event Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id={`${isEdit ? 'edit-' : ''}event-date`}
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !eventDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {eventDate ? format(eventDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={eventDate}
                onSelect={setEventDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="grid w-full gap-1.5">
          <Label htmlFor={`${isEdit ? 'edit-' : ''}location`}>Location (Optional)</Label>
          <Input 
            id={`${isEdit ? 'edit-' : ''}location`} 
            value={location}
            onChange={(e) => setLocation(e.target.value)} 
          />
        </div>
        
        <div className="grid w-full gap-1.5">
          <Label htmlFor={`${isEdit ? 'edit-' : ''}registration`}>Registration Link (Optional)</Label>
          <Input 
            id={`${isEdit ? 'edit-' : ''}registration`} 
            value={registrationLink}
            onChange={(e) => setRegistrationLink(e.target.value)} 
            placeholder="https://..."
            type="url"
          />
        </div>
        
        <div className="grid w-full gap-1.5">
          <Label htmlFor={`${isEdit ? 'edit-' : ''}image`}>{isEdit ? 'Replace Image (Optional)' : 'Image (Optional)'}</Label>
          <Input 
            id={`${isEdit ? 'edit-' : ''}image`} 
            type="file" 
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
      </div>
      
      <DialogFooter className="mt-4">
        <Button type="button" variant="outline" onClick={() => isEdit ? setIsEditDialogOpen(false) : setIsAddDialogOpen(false)}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isEdit ? 'Updating...' : 'Creating...'}
            </>
          ) : (
            isEdit ? 'Update Event' : 'Create Event'
          )}
        </Button>
      </DialogFooter>
    </form>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Events</h2>
        
        <Dialog open={isAddDialogOpen} onOpenChange={(open) => {
          setIsAddDialogOpen(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event for alumni to attend.
              </DialogDescription>
            </DialogHeader>
            
            <EventForm onSubmit={handleCreate} />
          </DialogContent>
        </Dialog>
      </div>
      
      {/* Edit Event Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={(open) => {
        setIsEditDialogOpen(open);
        if (!open) resetForm();
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Event</DialogTitle>
            <DialogDescription>
              Update the event details.
            </DialogDescription>
          </DialogHeader>
          
          <EventForm isEdit onSubmit={handleUpdate} />
        </DialogContent>
      </Dialog>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : !events || events.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-md p-8 text-center">
          <CalendarIcon className="h-10 w-10 mx-auto text-gray-400 mb-2" />
          <h3 className="text-lg font-medium">No events</h3>
          <p className="text-gray-500 dark:text-gray-400 mt-1 mb-4">
            Add events to inform alumni about upcoming gatherings.
          </p>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add First Event
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {events.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="grid md:grid-cols-3 gap-0">
                {event.image ? (
                  <div className="md:col-span-1 h-48 md:h-full">
                    <img
                      src={`${API_URL}${event.image}`}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
                <div className={`${event.image ? 'md:col-span-2' : 'md:col-span-3'}`}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle>{event.title}</CardTitle>
                      <div className="bg-primary/10 text-primary font-medium px-3 py-1 rounded-full text-sm">
                        {format(new Date(event.event_date), 'MMM dd, yyyy')}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <ScrollArea className="h-24">
                      <p className="text-sm">{event.description}</p>
                    </ScrollArea>
                    
                    {event.location && (
                      <div className="flex items-center mt-4">
                        <MapPin className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{event.location}</span>
                      </div>
                    )}
                    
                    {event.registration_link && (
                      <div className="mt-3">
                        <a 
                          href={event.registration_link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline"
                        >
                          Registration Link
                        </a>
                      </div>
                    )}
                    
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
                      Organized by {event.organizer_name}
                    </p>
                  </CardContent>
                  
                  <CardFooter className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditDialog(event)}
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteEventMutation.mutate(event.id)}
                      disabled={deleteInProgress === event.id}
                    >
                      {deleteInProgress === event.id ? (
                        <Loader2 className="h-4 w-4 mr-1 animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4 mr-1" />
                      )}
                      Delete
                    </Button>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsManager;
