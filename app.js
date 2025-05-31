// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

// Initialize Express app
const app = express();

// Middleware setup
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(express.json());

// MongoDB connection using mongoose
mongoose.connect('mongodb+srv://firdhouskh:kunjumol@cluster0.h3qcl.mongodb.net/musjidapp?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
});

// Define User, Volunteer, and Maintenance schemas and models

// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    houseNo: { type: String, required: true },
    phoneNo: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    selectedTiming: { type: String },
});
const User = mongoose.model('User', UserSchema);

// Volunteer Schema
const VolunteerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNo: { type: String, required: true },
    address: { type: String, required: true },
});
const Volunteer = mongoose.model('Volunteer', VolunteerSchema);

// Maintenance Schema with helpRequests field
const MaintenanceSchema = new mongoose.Schema({
    type: { type: String, required: true },
    description: { type: String, required: true },
    helpRequests: [{
        userName: { type: String, required: true },
        requestDate: { type: Date, default: Date.now },
        status: { type: String, default: 'pending' },
    }],
});
const Maintenance = mongoose.model('Maintenance', MaintenanceSchema);


const auctionItemSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    startingRate: { type: Number, required: true },
    quantity: { type: Number, required: true },
});
const AuctionItem = mongoose.model('AuctionItem', auctionItemSchema);




// User Registration Route
app.post('/userreg', async (req, res) => {
    const { name, address, houseNo, phoneNo, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create a new user
        const newUser = new User({ name, address, houseNo, phoneNo, email, password });
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);

        await newUser.save();
        res.status(201).json({ status: 'success', message: 'Registration successful!' });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// User Login Route
app.post('/userlogin', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const payload = { userId: user.id };
        const token = jwt.sign(payload, 'your_jwt_secret_here', { expiresIn: '1h' }); // Replace 'your_jwt_secret_here' with your actual secret

        res.status(200).json({
            status: 'success',
            token,
            user: {
                name: user.name,
                address: user.address,
                houseNo: user.houseNo,
                phoneNo: user.phoneNo,
                email: user.email,
                selectedTiming: user.selectedTiming,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Route to save user's selected timing
app.post('/api/users/timing', async (req, res) => {
    const { name, timing } = req.body;

    try {
        const user = await User.findOne({ name });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.selectedTiming = timing;
        await user.save();
        res.status(200).json({ message: 'Timing saved successfully' });
    } catch (error) {
        console.error('Error saving timing:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to fetch all users with their selected timings
app.get('/api/users/timings', async (req, res) => {
    try {
        const users = await User.find({}, 'name selectedTiming');
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching user timings:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to fetch all volunteers
app.get('/volunteers', async (req, res) => {
    try {
        const volunteers = await Volunteer.find();
        res.json(volunteers);
    } catch (error) {
        console.error('Error fetching volunteers:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to register a new volunteer
app.post('/register-volunteer', async (req, res) => {
    const { name, phoneNo, address } = req.body;

    if (!name || !phoneNo || !address) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const existingVolunteer = await Volunteer.findOne({ phoneNo });
        if (existingVolunteer) {
            return res.status(400).json({ message: 'This phone number is already registered.' });
        }

        const newVolunteer = new Volunteer({ name, phoneNo, address });
        await newVolunteer.save();
        res.json({ message: 'Volunteer registered successfully!' });
    } catch (error) {
        console.error('Error registering volunteer:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// DELETE a volunteer by ID
app.delete('/volunteers/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVolunteer = await Volunteer.findByIdAndDelete(id);
        if (!deletedVolunteer) {
            return res.status(404).json({ message: 'Volunteer not found' });
        }
        res.status(200).json({ message: 'Volunteer deleted successfully' });
    } catch (error) {
        console.error('Error deleting volunteer:', error);
        res.status(500).json({ message: 'Error deleting volunteer' });
    }
});

// Route to fetch all users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to delete a user
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/maintenance', async (req, res) => {
    const { type, description } = req.body;
    try {
        const newTask = new Maintenance({ type, description });
        await newTask.save();
        res.status(201).json({ message: 'Maintenance task added successfully!' });
    } catch (error) {
        console.error('Error adding maintenance task:', error);
        res.status(500).json({ message: 'Error adding maintenance task' });
    }
});

// Route to get all maintenance tasks
app.get('/api/maintenance', async (req, res) => {
    try {
        const tasks = await Maintenance.find();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching maintenance tasks:', error);
        res.status(500).json({ message: 'Error fetching maintenance tasks' });
    }
});

// Route to delete a maintenance task by ID
app.delete('/api/maintenance/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTask = await Maintenance.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ message: 'Maintenance task not found' });
        }
        res.status(200).json({ message: 'Maintenance task deleted successfully' });
    } catch (error) {
        console.error('Error deleting maintenance task:', error);
        res.status(500).json({ message: 'Error deleting maintenance task' });
    }
});




// Route to add a help request to a maintenance task
app.post('/api/maintenance/:id/request-help', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body; // Ensure you are sending the user's name in the request body

    try {
        const task = await Maintenance.findById(id);
        if (!task) {
            return res.status(404).json({ message: 'Maintenance task not found' });
        }

        // Create the help request object with userName
        task.helpRequests.push({ userName: name }); // Use userName instead of name
        
        await task.save();

        res.status(201).json({ message: 'Help request submitted successfully!' });
    } catch (error) {
        console.error('Error adding help request:', error);
        res.status(500).json({ message: 'Error adding help request', error: error.message });
    }
});



// Route to get all help requests for maintenance tasks
app.get('/api/maintenance/help-requests', async (req, res) => {
    try {
        const helpRequests = await Maintenance.find(
            { "helpRequests.0": { "$exists": true } },
            'helpRequests type description'
        ).populate('helpRequests'); // Populate the helpRequests field

        res.status(200).json(helpRequests);
    } catch (error) {
        console.error('Error fetching help requests:', error);
        res.status(500).json({ message: 'Error fetching help requests' });
    }
});
// Route to get maintenance tasks with pending help requests
app.get('/api/maintenance/pending-help-requests', async (req, res) => {
    try {
        const tasksWithPendingRequests = await Maintenance.find({
            'helpRequests.status': 'pending',
        });
        res.status(200).json(tasksWithPendingRequests);
    } catch (error) {
        console.error('Error fetching tasks with pending help requests:', error);
        res.status(500).json({ message: 'Error fetching tasks with pending help requests' });
    }
});

// Route to update the status of a help request in a maintenance task
app.put('/api/maintenance/:taskId/help-requests/:requestId/status', async (req, res) => {
    const { taskId, requestId } = req.params;
    const { status } = req.body;

    try {
        const maintenanceTask = await Maintenance.findById(taskId);
        if (!maintenanceTask) {
            return res.status(404).json({ message: 'Maintenance task not found' });
        }

        const helpRequest = maintenanceTask.helpRequests.id(requestId);
        if (!helpRequest) {
            return res.status(404).json({ message: 'Help request not found' });
        }

        helpRequest.status = status;
        await maintenanceTask.save();

        res.status(200).json({ message: 'Help request status updated successfully' });
    } catch (error) {
        console.error('Error updating help request status:', error);
        res.status(500).json({ message: 'Error updating help request status' });
    }
});

// Route to add a new auction item
app.post('/adminauction', async (req, res) => {
    const { productName, startingRate, quantity } = req.body;

    try {
        if (!productName || !startingRate || !quantity) {
            return res.status(400).json({ message: 'Please fill in all fields' });
        }

        const newAuctionItem = new AuctionItem({ productName, startingRate, quantity });
        await newAuctionItem.save();
        res.status(201).json({ message: 'Auction item added successfully' });
    } catch (error) {
        console.error('Error adding auction item:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/adminauction', async (req, res) => {
    try {
        const { productName, startingRate, quantity } = req.body;
        
        if (isNaN(quantity)) {
            return res.status(400).json({ error: 'Quantity must be a numeric value' });
        }

        const auctionItem = new AuctionItem({
            productName,
            startingRate,
            quantity: Number(quantity), // Ensure `quantity` is saved as a number
        });

        await auctionItem.save();
        res.status(201).json({ message: 'Auction item added successfully' });
    } catch (error) {
        console.error('Error adding auction item:', error);
        res.status(500).json({ error: 'Error adding auction item' });
    }
});


// Route to delete an auction item by ID
app.delete('/adminauction/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await AuctionItem.findByIdAndDelete(id);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Auction item not found' });
        }
        res.status(200).json({ message: 'Auction item deleted successfully' });
    } catch (error) {
        console.error('Error deleting auction item:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
// Route to get all auction items
app.get('/adminauction', async (req, res) => {
    try {
        const auctionItems = await AuctionItem.find();
        res.status(200).json(auctionItems);
    } catch (error) {
        console.error('Error fetching auction items:', error);
        res.status(500).json({ message: 'Server error' });
    }
});




// Start the server
const PORT = process.env.PORT || 8000; // Use environment variable or default to 8000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
