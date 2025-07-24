const route=require("express").Router();
const { getAllCalls, createCall } = require('../controllers/dashboard/callController');
const { getAllEmails, createEmail } = require('../controllers/dashboard/emailController');
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/dashboard/taskController');
// const { getAllUsers } = require('../controllers/dashboard/userController');
const { getAllLeads, createLead, updateLead, deleteLead } = require('../controllers/dashboard/leadController');
const { getAllEmloyees,createEmloyee,updateEmloyee,deleteEmloyee } = require('../controllers/dashboard/employeeController');
const {getAllContacts,createContact,updateContact,deleteContact} = require('../controllers/dashboard/contactController');
const {getAllProperties,createProperty,updateProperty,deleteProperty} = require('../controllers/dashboard/propertyController');
const { isLeadValid } = require('../middlewares/validation/dashboard');
const { isloggedIn } = require('../middlewares/auth');

// Property routes
route.get('/properties', isloggedIn, getAllProperties);
route.post('/properties', isloggedIn, createProperty);
route.put('/properties/:id', isloggedIn, updateProperty);
route.delete('/properties/:id', isloggedIn, deleteProperty);

// Contact routes
route.get('/contacts', isloggedIn, getAllContacts);
route.post('/contacts', isloggedIn, createContact);
route.put('/contacts/:id', isloggedIn, updateContact);
route.delete('/contacts/:id', isloggedIn, deleteContact);

// Employee routes
route.get('/employees', isloggedIn, getAllEmloyees);
route.post('/employees', isloggedIn, createEmloyee);
route.put('/employees/:id', isloggedIn, updateEmloyee);
route.delete('/employees/:id', isloggedIn, deleteEmloyee);

// User routes
// route.get('/users', getAllUsers);

// Task routes
route.get('/tasks', isloggedIn, getAllTasks);
route.post('/tasks', isloggedIn, createTask);
route.put('/tasks/:id', isloggedIn, updateTask);
route.delete('/tasks/:id', isloggedIn, deleteTask);

// Lead routes
route.get('/leads',isloggedIn, getAllLeads);
route.post('/leads',isloggedIn, isLeadValid, createLead);
route.put('/leads/:id', isloggedIn, isLeadValid, updateLead);
route.delete('/leads/:id', isloggedIn, deleteLead);

// Call routes
route.get('/calls', isloggedIn, getAllCalls);
route.post('/calls', isloggedIn, createCall);

// Email routes
route.get('/emails', isloggedIn, getAllEmails);
route.post('/emails', isloggedIn, createEmail);

module.exports = route;
