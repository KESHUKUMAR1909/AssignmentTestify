# Platform Testing & Review Guide

This SaaS Platform features a dynamic "Auto-Registration" system to make testing the Role-Based Access Control (RBAC) extremely easy without needing to manually seed a database. 

When you log in with an email that does not exist in the database, the backend intercepts the request and **automatically registers the user** with the exact password and role you provided.

You can use the following credentials on the Login screen (`http://localhost:3000/login`) to easily demonstrate the 3 distinct roles in the application:

### 1. Employee Access
* **Email:** `employee@testify.com`
* **Password:** `password123`
* **Demo Role Selection:** `Employee`
* **Permissions:** Can view Dashboard, Manage their Tasks & To-Dos, complete Performance Reviews, and view SOPs. Cannot view HR, Inventory, Analytics, or Orders.

### 2. HR Manager Access
* **Email:** `hr@testify.com`
* **Password:** `password123`
* **Demo Role Selection:** `HR Manager`
* **Permissions:** Same as Employee, but unlocks full access to the **HR Vault & Employee Onboarding** module.

### 3. Full Admin Access
* **Email:** `admin@testify.com`
* **Password:** `password123`
* **Demo Role Selection:** `Admin`
* **Permissions:** Unlocks all 8 modules including Hardware Inventory, Department Analytics, and Client Order Intake Management.

---

### How to test:
1. Go to `http://localhost:3000/login`.
2. Type in the Employee email and password above. Ensure the dropdown says **Employee**. Click Login.
3. Observe the restricted Sidebar. Navigate to "Tasks & To-Do" and add a task.
4. Click **Logout** at the bottom of the Sidebar.
5. Repeat the process using the **Admin** credentials and the **Admin** dropdown selection to see the entire platform unlock.
