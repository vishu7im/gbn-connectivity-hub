
import React, { useState } from "react";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardFooter, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EventType } from "@/data/mockAdminData";
import { Plus, Edit, Trash2, Loader2, Calendar, MapPin, Link2 } from "lucide-react";
import { format, parseISO } from "date-fns";

interface EventsManagerProps {
  events: EventType[];
}

const EventsManager = ({ events }: EventsManagerProps) => {
  const [eventsList, setEventsList] = useState<EventType[]>(events);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    event_date: "",
    location: "",
    registration_link: "",
    image: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      event_date: "",
      location: "",
      registration_link: "",
      image: "",
    });
    setSelectedEvent(null);
  };

  const openCreateDialog = () => {
    resetForm();
    setIsEditMode(false);
    setIsDialogOpen(true);
  };

  const openEditDialog = (event: EventType) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title,
      description: event.description,
      event_date: format(new Date(event.event_date || event.date), "yyyy-MM-dd'T'HH:mm"),
      location: event.location,
      registration_link: event.registration_link || event.registrationLink || "",
      image: event.image || "",
    });
    setIsEditMode(true);
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      if (isEditMode && selectedEvent) {
        // Update existing event
        const updatedEvents = eventsList.map((event) =>
          event.id === selectedEvent.id
            ? {
                ...event,
                title: formData.title,
                description: formData.description,
                event_date: new Date(formData.event_date).toISOString(),
                location: formData.location,
                registration_link: formData.registration_link || null,
                image: formData.image || null,
                organizer: "Admin User", // Use organizer instead of organizer_name
              }
            : event
        );
        setEventsList(updatedEvents);
        toast.success("Event updated successfully");
      } else {
        // Create new event
        const newEvent: EventType = {
          id: Math.floor(Math.random() * 10000),
          title: formData.title,
          description: formData.description,
          event_date: new Date(formData.event_date).toISOString(),
          date: new Date(formData.event_date).toISOString(), // Set both date and event_date for compatibility
          location: formData.location,
          registration_link: formData.registration_link || null,
          registrationLink: formData.registration_link || null, // Set both for compatibility
          image: formData.image || null,
          organizer: "Admin User", // Use organizer instead of organizer_name
        };
        setEventsList([newEvent, ...eventsList]);
        toast.success("Event created successfully");
      }

      setIsLoading(false);
      resetForm();
      setIsDialogOpen(false);
    }, 1500);
  };

  const handleDelete = (eventId: number) => {
    // Simulate API call with timeout
    setTimeout(() => {
      setEventsList(eventsList.filter((event) => event.id !== eventId));
      toast.success("Event deleted successfully");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Events</h2>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" /> Add Event
        </Button>
      </div>

      {eventsList.length === 0 ? (
        <div className="text-center py-10 bg-gray-50 rounded-lg">
          <p className="text-muted-foreground mb-4">No events found</p>
          <Button onClick={openCreateDialog}>
            <Plus className="h-4 w-4 mr-2" /> Create First Event
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {eventsList.map((event) => (
            <Card key={event.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between">
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <div className="flex space-x-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => openEditDialog(event)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive"
                      onClick={() => handleDelete(event.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                {event.image && (
                  <div className="mb-3">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-40 object-cover rounded-md"
                    />
                  </div>
                )}
                <div className="flex items-center mb-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 mr-1" />
                  {format(new Date(event.event_date || event.date), "MMMM d, yyyy 'at' h:mm a")}
                </div>
                <div className="flex items-center mb-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 mr-1" />
                  {event.location}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
                  {event.description}
                </p>
                {(event.registration_link || event.registrationLink) && (
                  <a 
                    href={event.registration_link || event.registrationLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-xs text-primary flex items-center hover:underline"
                  >
                    <Link2 className="h-3 w-3 mr-1" /> Registration Link
                  </a>
                )}
              </CardContent>
              <CardFooter className="text-xs text-muted-foreground border-t pt-3">
                Organized by {event.organizer || "Admin User"}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              {isEditMode ? "Edit Event" : "Create Event"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="min-h-[100px]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="event_date">Date and Time</Label>
                <Input
                  id="event_date"
                  name="event_date"
                  type="datetime-local"
                  value={formData.event_date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration_link">Registration Link (optional)</Label>
                <Input
                  id="registration_link"
                  name="registration_link"
                  value={formData.registration_link}
                  onChange={handleChange}
                  placeholder="https://example.com/register"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : (
                  isEditMode ? "Update Event" : "Create Event"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EventsManager;
