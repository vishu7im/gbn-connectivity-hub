
const { pool } = require('../config/db.config');
const fs = require('fs');
const path = require('path');

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const [events] = await pool.query(`
      SELECT e.*, u.name as organizer_name
      FROM events e
      JOIN users u ON e.user_id = u.id
      ORDER BY e.event_date DESC
    `);

    res.status(200).json(events);
  } catch (err) {
    console.error('Error getting events:', err);
    res.status(500).json({ message: 'Failed to get events' });
  }
};

// Get a single event
exports.getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const [events] = await pool.query(`
      SELECT e.*, u.name as organizer_name
      FROM events e
      JOIN users u ON e.user_id = u.id
      WHERE e.id = ?
    `, [id]);

    if (events.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json(events[0]);
  } catch (err) {
    console.error('Error getting event:', err);
    res.status(500).json({ message: 'Failed to get event' });
  }
};

// Create an event (admin only)
exports.createEvent = async (req, res) => {
  try {
    // Check if user is admin
    const [admins] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND is_admin = TRUE', 
      [req.userId]
    );
    
    if (admins.length === 0) {
      // Delete uploaded file if user is not admin
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).json({ message: 'Not authorized to create events' });
    }

    const { title, description, event_date, location, registration_link } = req.body;
    
    if (!title || !description || !event_date) {
      return res.status(400).json({ message: 'Title, description and event date are required' });
    }

    let imagePath = null;
    if (req.file) {
      imagePath = `/uploads/events/${path.basename(req.file.path)}`;
    }

    // Add to database
    const [result] = await pool.query(
      'INSERT INTO events (title, description, event_date, location, registration_link, image, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, description, new Date(event_date), location || null, registration_link || null, imagePath, req.userId]
    );

    const [newEvent] = await pool.query(`
      SELECT e.*, u.name as organizer_name
      FROM events e
      JOIN users u ON e.user_id = u.id
      WHERE e.id = ?
    `, [result.insertId]);

    res.status(201).json({
      message: 'Event created successfully',
      event: newEvent[0]
    });
  } catch (err) {
    // Delete uploaded file in case of error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Error creating event:', err);
    res.status(500).json({ message: 'Failed to create event' });
  }
};

// Update an event (admin only)
exports.updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user is admin
    const [admins] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND is_admin = TRUE', 
      [req.userId]
    );
    
    if (admins.length === 0) {
      // Delete uploaded file if user is not admin
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      return res.status(403).json({ message: 'Not authorized to update events' });
    }

    const { title, description, event_date, location, registration_link } = req.body;
    
    if (!title || !description || !event_date) {
      return res.status(400).json({ message: 'Title, description and event date are required' });
    }

    // Get existing event to check if we need to delete old image
    const [existingEvents] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    
    if (existingEvents.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    let imagePath = existingEvents[0].image;
    
    // If new image is uploaded
    if (req.file) {
      imagePath = `/uploads/events/${path.basename(req.file.path)}`;
      
      // Delete old image if it exists
      if (existingEvents[0].image) {
        const oldFilePath = path.join('public', existingEvents[0].image);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
    }

    // Update in database
    await pool.query(
      'UPDATE events SET title = ?, description = ?, event_date = ?, location = ?, registration_link = ?, image = ? WHERE id = ?',
      [title, description, new Date(event_date), location || null, registration_link || null, imagePath, id]
    );

    const [updatedEvent] = await pool.query(`
      SELECT e.*, u.name as organizer_name
      FROM events e
      JOIN users u ON e.user_id = u.id
      WHERE e.id = ?
    `, [id]);

    res.status(200).json({
      message: 'Event updated successfully',
      event: updatedEvent[0]
    });
  } catch (err) {
    // Delete uploaded file in case of error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    
    console.error('Error updating event:', err);
    res.status(500).json({ message: 'Failed to update event' });
  }
};

// Delete an event (admin only)
exports.deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if user is admin
    const [admins] = await pool.query(
      'SELECT * FROM users WHERE id = ? AND is_admin = TRUE', 
      [req.userId]
    );
    
    if (admins.length === 0) {
      return res.status(403).json({ message: 'Not authorized to delete events' });
    }

    // Get event to delete the image file
    const [events] = await pool.query('SELECT * FROM events WHERE id = ?', [id]);
    
    if (events.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete image from filesystem if it exists
    if (events[0].image) {
      const filePath = path.join('public', events[0].image);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    // Delete from database
    await pool.query('DELETE FROM events WHERE id = ?', [id]);

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ message: 'Failed to delete event' });
  }
};
