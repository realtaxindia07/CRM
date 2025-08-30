const route=require("express").Router();
const { getAllCalls, createCall } = require('../controllers/dashboard/callController');
const { getAllEmails, createEmail } = require('../controllers/dashboard/emailController');
const { getAllTasks, createTask, updateTask, deleteTask } = require('../controllers/dashboard/taskController');
// const { getAllUsers } = require('../controllers/dashboard/userController');
const { getAllLeads, createLead, updateLead, deleteLead } = require('../controllers/dashboard/leadController');
const { getAllEmployees,createEmployee,updateEmployee,deleteEmployee } = require('../controllers/dashboard/employeeController');
const {getAllContacts,createContact,updateContact,deleteContact} = require('../controllers/dashboard/contactController');
const {getAllProperties,createProperty,updateProperty,deleteProperty} = require('../controllers/dashboard/propertyController');
const { root } = require('../controllers/dashboard/root');
const { isLeadValid ,isEmployeeValid} = require('../middlewares/validation/dashboard');
const { isloggedIn ,isTeamLeader,isManager} = require('../middlewares/auth');


// dashboard
route.get('/',isloggedIn, root);
// // Property routes
// route.get('/properties', isloggedIn, getAllProperties);
// route.post('/properties', isloggedIn, createProperty);
// route.put('/properties/:id', isloggedIn, updateProperty);
// route.delete('/properties/:id', isloggedIn, deleteProperty);

// // Contact routes
// route.get('/contacts', isloggedIn, getAllContacts);
// route.post('/contacts', isloggedIn, createContact);
// route.put('/contacts/:id', isloggedIn, updateContact);
// route.delete('/contacts/:id', isloggedIn, deleteContact);

// Employee routes
route.get('/employees',isloggedIn, getAllEmployees);
route.post('/employees',isEmployeeValid,isloggedIn, createEmployee);
route.put('/employees/:id',isEmployeeValid,isloggedIn, updateEmployee);
route.delete('/employees/:id',isloggedIn, deleteEmployee);

// // User routes
// // route.get('/users', getAllUsers);

// // Task routes
// route.get('/tasks', isloggedIn, getAllTasks);
// route.post('/tasks', isloggedIn, createTask);
// route.put('/tasks/:id', isloggedIn, updateTask);
// route.delete('/tasks/:id', isloggedIn, deleteTask);

// Lead routes
route.get('/leads', isloggedIn, getAllLeads);
route.post('/leads', isLeadValid, isloggedIn, createLead);
route.put('/leads/:id', isLeadValid, isloggedIn, isTeamLeader, updateLead);
route.delete('/leads/:id', isloggedIn, isManager, deleteLead);

// // Call routes
// route.get('/calls', isloggedIn, getAllCalls);
// route.post('/calls', isloggedIn, createCall);

// // Email routes
// route.get('/emails', isloggedIn, getAllEmails);
// route.post('/emails', isloggedIn, createEmail);

module.exports = route;
