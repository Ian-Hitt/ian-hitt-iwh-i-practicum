const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();

// Configuration
const PORT = 3000;
const PRIVATE_APP_TOKEN = process.env.PRIVATE_APP_TOKEN;

const CUSTOM_OBJECT_TYPE = '2-52283222';

// Middleware
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// HubSpot API headers
const headers = {
    Authorization: `Bearer ${PRIVATE_APP_TOKEN}`,
    'Content-Type': 'application/json'
};

// Route 1: Homepage - Display all custom objects in a table
app.get('/', async (req, res) => {
    try {
        // Get all custom object records
        const apiUrl = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
        
        // Request all properties for the custom object
        const params = {
            limit: 100,
            properties: ['name', 'author', 'genre'] // Update these with your actual property names
        };

        const response = await axios.get(apiUrl, {
            headers: headers,
            params: params
        });

        const customObjects = response.data.results || [];
        
        // Format the data for display
        const formattedObjects = customObjects.map(obj => ({
            id: obj.id,
            name: obj.properties.name || 'N/A',
            author: obj.properties.author || 'N/A',
            genre: obj.properties.genre || 'N/A',
            createdAt: obj.createdAt,
            updatedAt: obj.updatedAt
        }));

        res.render('homepage', {
            title: 'Custom Objects List | Integrating With HubSpot I Practicum',
            customObjects: formattedObjects
        });

    } catch (error) {
        console.error('Error fetching custom objects:', error.response?.data || error.message);
        res.render('homepage', {
            title: 'Custom Objects List | Integrating With HubSpot I Practicum',
            customObjects: [],
            error: 'Failed to fetch custom objects'
        });
    }
});

// Route 2: Display the form for creating new custom objects
app.get('/update-cobj', (req, res) => {
    res.render('updates', {
        title: 'Update Custom Object Form | Integrating With HubSpot I Practicum'
    });
});

// Route 3: Handle form submission to create new custom object
app.post('/update-cobj', async (req, res) => {
    try {
        const { name, author, genre } = req.body; // Update these based on your custom properties

        const apiUrl = `https://api.hubapi.com/crm/v3/objects/${CUSTOM_OBJECT_TYPE}`;
        
        const requestBody = {
            properties: {
                name: name,
                author: author,
                genre: genre // Update these based on your custom properties
            }
        };

        const response = await axios.post(apiUrl, requestBody, {
            headers: headers
        });

        console.log('Custom object created successfully:', response.data.id);
        
        // Redirect back to homepage after successful creation
        res.redirect('/');

    } catch (error) {
        console.error('Error creating custom object:', error.response?.data || error.message);
        res.render('updates', {
            title: 'Update Custom Object Form | Integrating With HubSpot I Practicum',
            error: 'Failed to create custom object. Please try again.'
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Make sure to:');
    console.log('1. Update PRIVATE_APP_TOKEN in your .env file');
    console.log('2. Update CUSTOM_OBJECT_TYPE with your actual custom object ID');
    console.log('3. Update property names to match your custom object schema');
});