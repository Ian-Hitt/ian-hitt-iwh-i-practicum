# HubSpot Integration Practicum

## Project Overview
This Node.js application integrates with HubSpot's API to manage custom objects. It demonstrates the ability to:
- Create custom objects via a web form
- Display custom objects in a table format
- Make API calls to HubSpot using a private app

## Custom Object Details
**Custom Object Type:** Books

**Custom Properties:**
1. Name (string) - Required
2. Author (text)
3. genre (string)

## HubSpot Test Account Link
**Custom Object List View:** https://app.hubspot.com/contacts/50651764/objects/2-52283222/views/all/list

## Setup Instructions

### 1. Prerequisites
- Node.js installed (v14 or higher)
- npm installed
- Git installed
- HubSpot developer test account

### 2. Installation
```bash
# Clone the repository
git clone [your-forked-repo-url]
cd [repository-name]

# Install dependencies
npm install

# Create .env file and add your private app token
echo "PRIVATE_APP_TOKEN=your_token_here" > .env
```

### 3. Configuration
1. Create a private app in HubSpot with these permissions:
   - `crm.schemas.custom` (read and write)
   - `crm.objects.custom` (read and write)
   - `crm.objects.contacts` (read and write)

2. Update the `CUSTOM_OBJECT_TYPE` variable in `index.js` with your custom object ID

3. Update the property names in `index.js` to match your custom object schema

### 4. Running the Application
```bash
node index.js
```
The app will run on `http://localhost:3000`

## Features
- **Homepage (`/`)**: Displays all custom objects in a table format
- **Create Form (`/update-cobj`)**: Form to create new custom object records
- **API Integration**: Uses HubSpot's CRM API v3

## Technologies Used
- Node.js
- Express.js
- Pug (templating engine)
- Axios (HTTP client)
- HubSpot API

## Author
Ian Hitt

## License
This project is part of the HubSpot Academy Developer Certification program.
