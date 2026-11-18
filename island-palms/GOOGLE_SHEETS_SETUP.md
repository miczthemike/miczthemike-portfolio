# 🏨 The Island Palms Homestay - Google Sheets Booking Backend Setup Guide

This guide walks you through deploying the **100% Free Tier Booking Engine** with **Double-Booking Shield (LockService)** for The Island Palms Homestay.

---

## ⚡ Quick 3-Minute Setup:

### Step 1: Create the Google Sheet
1. Open your browser and go to: [https://sheets.new](https://sheets.new)
2. Rename the spreadsheet at the top left to:  
   `The Island Palms - Reservations & Bookings`
3. Rename the first sheet tab at the bottom to `Bookings`.

### Step 2: Open Apps Script
1. In the top menu of Google Sheets, click **Extensions** $\rightarrow$ **Apps Script**.
2. Delete any default code in `Code.gs`.
3. Open [google-apps-script.js](google-apps-script.js) from this repository, copy the full code, and paste it into `Code.gs`.
4. Click the **Save** icon (diskette).

### Step 3: Deploy as a Web App (Public API)
1. At the top right of Apps Script, click the blue **Deploy** button $\rightarrow$ **New deployment**.
2. Click the gear icon ⚙️ next to "Select type" $\rightarrow$ choose **Web app**.
3. Fill in the deployment settings:
   - **Description:** `Island Palms Booking API v1`
   - **Execute as:** `Me (your google account)`
   - **Who has access:** `Anyone` *(Crucial: allows the website form to submit bookings)*
4. Click **Deploy**.
5. Google will ask for authorization $\rightarrow$ click **Authorize access**, choose your account, click **Advanced**, and click **Go to Untitled project (unsafe)** $\rightarrow$ **Allow**.
6. Copy the **Web App URL** (e.g., `https://script.google.com/macros/s/AKfycb.../exec`).

### Step 4: Plug the Web App URL into `script.js`
In `E:\miczthemike-portfolio\island-palms\script.js`, paste your URL in the `GOOGLE_SHEETS_ENDPOINT` constant at the top of the booking section:
```javascript
const GOOGLE_SHEETS_ENDPOINT = "https://script.google.com/macros/s/AKfycb.../exec";
```

---

## 🛡️ How the Double-Booking Shield Works:
1. **Atomic Concurrency Lock (`LockService`):**  
   If two people click "Book Now" at the same millisecond, the lock queues them in order.
2. **Date Overlap Verification:**  
   Before any booking is written, the script evaluates:
   `New_CheckIn < Existing_CheckOut AND New_CheckOut > Existing_CheckIn`
   If an existing row has `Confirmed` or `Pending Deposit`, it immediately returns a collision warning and rejects the overlapping submission.
3. **Status Workflow in Google Sheets:**
   - When a booking arrives, its status starts as **`Pending Deposit`**.
   - When the guest sends their GCash deposit screenshot via Messenger, the owner simply changes the status column dropdown to **`Confirmed`**.
   - If a customer cancels or does not pay, change to **`Cancelled`**, and those dates become instantly available again!
