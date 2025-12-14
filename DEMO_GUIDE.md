# 🚀 ServiceFlow - Demo & Testing Guide

## QUICK START

### 1. Start Backend:
```bash
cd backend
npm install
npm run dev
```
**Server runs on:** http://localhost:5000

### 2. Start Frontend:
```bash
cd frontend
npm install
npm start
```
**App runs on:** http://localhost:3000

### 3. Start MongoDB:
```bash
mongod
```

---

## 📋 DEMO SCRIPT - All Features

### STEP 1: User Registration & Login ✅

**Create Users for Each Role:**

1. **Service Advisor:**
   - Name: John Advisor
   - Email: advisor@test.com
   - Password: 123456
   - Role: Service Advisor

2. **Technician:**
   - Name: Mike Tech
   - Email: tech@test.com
   - Password: 123456
   - Role: Technician

3. **Cashier:**
   - Name: Sarah Cash
   - Email: cashier@test.com
   - Password: 123456
   - Role: Cashier

4. **Manager:**
   - Name: David Manager
   - Email: manager@test.com
   - Password: 123456
   - Role: Manager

---

### STEP 2: Service Advisor - Create Job Card & Assign Technician ✅

**Login as:** advisor@test.com

**Create Job Card:**
- Vehicle Type: 2W
- Vehicle Number: KA01AB1234
- Customer Name: Raj Kumar
- Customer Phone: 9876543210
- Reported Issues: "Engine making unusual noise, brake pads worn out"

**Assign Technician:**
- Select "Mike Tech" from dropdown
- Click "Assign" button
- Status changes to "IN_PROGRESS"

---

### STEP 3: Technician - Update Progress & Report Critical Issue ✅

**Login as:** tech@test.com

**Update Progress #1:**
- Click "Update Progress"
- Status Message: "Started inspection. Found engine oil leak."
- ☑ Mark as Critical Issue
- Critical Issue Description: "Major oil leak detected. Requires engine gasket replacement. Estimated cost: ₹5,000. Need customer approval."
- Submit Update

**Result:** ⚠️ Alert shown: "Critical Issue Reported! Service Advisor has been notified..."

---

### STEP 4: Service Advisor - View Critical Issue Alert ✅

**Login as:** advisor@test.com

**View Job Details:**
- Click "View Details" on the job card
- See: ⚠️ **CRITICAL ISSUES REPORTED!** alert
- View critical issue description
- Call customer for authorization (simulated)

---

### STEP 5: Technician - Continue Work & Complete Job ✅

**Login as:** tech@test.com

**Update Progress #2:**
- Click "Update Progress"
- Status Message: "Replaced engine gasket, fixed oil leak. Starting brake work."
- Submit Update

**Complete Job:**
- Click "Complete Job"
- **Work Done:** "Replaced engine gasket, fixed oil leak, replaced brake pads and rotors, cleaned air filter, changed engine oil"
- **Next Service Advice:** "Next oil change in 3000 km or 3 months. Brake inspection in 6 months. Check coolant level monthly."
- **Prevention Tips:** "Avoid aggressive acceleration, check for leaks weekly, maintain regular service schedule, use recommended engine oil grade"
- Submit

**Result:** Job status changes to "DONE"

---

### STEP 6: Service Advisor - View Service Summary ✅

**Login as:** advisor@test.com

**View Summary for Customer Delivery:**
- Click "View Details" on completed job
- See comprehensive service summary
- Use this to explain work to customer:
  - ✅ Work Done
  - ✅ Next Service Advice
  - ✅ Prevention Tips

---

### STEP 7: Cashier - Generate Bill with Notification ✅

**Login as:** cashier@test.com

**Generate Bill:**
- See job in "Completed Jobs (Ready for Billing)"
- Click "Generate Bill"

**Add Parts:**
- Engine Gasket: Qty 1, Price ₹800
- Brake Pads: Qty 1, Price ₹1200
- Engine Oil: Qty 1, Price ₹900

**Add Services:**
- Engine Repair: ₹2000
- Brake Service: ₹1500
- General Inspection: ₹500

**Total:** ₹6900

**Submit Bill**

**Result:** 
- ✅ Bill Generated Successfully!
- 📧 Notification sent to customer: Raj Kumar (9876543210)
- Check backend console for notification log

---

### STEP 8: Manager - View Kanban & Analytics ✅

**Login as:** manager@test.com

**View Dashboard:**
- See statistics: Total Jobs, In Progress, Completed, Billed
- View Kanban Board with 4 columns:
  - CREATED
  - IN_PROGRESS
  - DONE
  - BILLED

**View Job Details:**
- Click on any job card in Kanban
- See complete history:
  - All technician updates
  - Critical issues
  - Service summary
  - Assigned technician

---

## ✅ FEATURE CHECKLIST FOR DEMO

### Core Requirements:
- [ ] User registration and role-based login
- [ ] Create job cards for 2W/4W vehicles
- [ ] Service Advisor assigns technician
- [ ] Technician updates work progress
- [ ] Technician reports critical issue with alert
- [ ] Service Advisor views critical issue notification
- [ ] Technician completes job with comprehensive summary
- [ ] Service Advisor views summary for customer delivery
- [ ] Cashier views completed jobs (status = DONE)
- [ ] Cashier generates bill with parts and services
- [ ] Bill notification sent to customer (logged)
- [ ] Manager views Kanban board
- [ ] Manager has admin access to all features

### Additional Features:
- [ ] Real-time status updates
- [ ] Color-coded status badges
- [ ] Critical issue visual alerts
- [ ] Timestamp tracking for all actions
- [ ] Error handling and validation
- [ ] Responsive design (test on mobile)
- [ ] 3rd party inventory pricing (mock)

---

## 🧪 TEST SCENARIOS

### Test Case 1: Complete Workflow
1. Advisor creates job → Assigns tech
2. Tech updates → Reports critical issue
3. Advisor sees alert → Approves
4. Tech completes → Adds summary
5. Advisor views summary
6. Cashier bills → Notification sent
7. Manager views in Kanban

### Test Case 2: Critical Issue Flow
1. Tech marks critical issue checkbox
2. Adds detailed description
3. Submits with alert confirmation
4. Advisor opens job details
5. Sees red alert banner
6. Views critical issue description

### Test Case 3: Billing with Inventory
1. Cashier selects completed job
2. Adds multiple parts (inventory pricing)
3. Adds multiple services
4. See real-time total calculation
5. Generate bill
6. Verify notification in console

---

## 🎯 KEY DEMO POINTS

1. **Service Advisor Dashboard:**
   - "I can create job cards for both 2W and 4W vehicles"
   - "I can assign technicians from a dropdown"
   - "I can track all job progress in real-time"
   - "I receive critical issue alerts immediately"
   - "I can view complete service summary to explain to customers"

2. **Technician Dashboard:**
   - "I see only my assigned jobs"
   - "I can update progress anytime"
   - "I can report critical issues that alert the advisor"
   - "I provide comprehensive summary on completion with prevention tips"

3. **Cashier Dashboard:**
   - "I see only completed jobs ready for billing"
   - "I can add multiple parts with pricing from inventory"
   - "I can add services with custom pricing"
   - "Total is calculated automatically"
   - "Customer notification is sent automatically"

4. **Manager Dashboard:**
   - "I have a Kanban view of all jobs"
   - "I can see statistics at a glance"
   - "I have admin access to view everything"
   - "I can assign technicians like advisors"

---

## 🔧 TROUBLESHOOTING

### Backend not starting:
```bash
# Check MongoDB is running
mongod

# Check port 5000 is free
netstat -an | find "5000"
```

### Frontend not loading:
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Can't login:
- Make sure you registered the user first
- Check email and password match
- Check backend console for errors

---

## 📊 SYSTEM ARCHITECTURE

```
Frontend (React)
    ↓
API Layer (axios)
    ↓
Backend (Express)
    ↓
MongoDB (Database)
    ↓
Inventory Service (3rd Party API - Mock)
```

---

## 🎓 PROJECT HIGHLIGHTS

1. **Complete CRUD Operations:** Create, Read, Update job cards
2. **Role-Based Access Control:** 4 distinct user roles with specific permissions
3. **Real-Time Notifications:** Critical issue alerts and bill notifications
4. **Workflow Management:** Status transitions (CREATED → IN_PROGRESS → DONE → BILLED)
5. **Comprehensive Summary:** Service completion details for customer communication
6. **3rd Party Integration:** Inventory API ready for real integration
7. **Modern UI/UX:** Responsive design with modal dialogs and visual feedback
8. **Error Handling:** Try-catch blocks everywhere, user-friendly error messages
9. **Security:** JWT authentication, password hashing, protected routes
10. **Scalability:** Modular architecture, separate concerns, easy to extend

---

## 🎉 READY FOR DEMO!

All features are implemented and tested. Follow the demo script above to showcase every requirement from the project specification.

**Good Luck with your presentation! 🚀**
