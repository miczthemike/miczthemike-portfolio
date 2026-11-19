/**
 * ============================================================================
 * THE ISLAND PALMS HOMESTAY - RESERVATION ENGINE & DOUBLE-BOOKING SHIELD
 * Google Apps Script Web App (Backend API)
 * ============================================================================
 * 
 * Features:
 *  - Concurrency Lock (LockService) to completely prevent race conditions.
 *  - Date Overlap Validation: Rejects booking if room is already Confirmed or Pending.
 *  - Automatic Booking Reference ID generation (IPH-2026-XXXX).
 *  - CORS-compliant JSON API for GET (check dates) and POST (submit booking).
 *  - Auto-initialization: Creates table headers if sheet is empty.
 */

var SHEET_NAME = "Bookings";

/**
 * Handle HTTP GET Requests:
 * Used by frontend to fetch already-booked date ranges per room to disable on calendar.
 * URL format: .../exec?action=getBookedDates&room=Deluxe+Queen+Room
 */
function doGet(e) {
  try {
    var sheet = getOrCreateBookingsSheet();
    var action = e && e.parameter ? e.parameter.action : "getBookedDates";
    var requestedRoom = e && e.parameter ? e.parameter.room : "";

    if (action === "getAllBookings") {
      var rows = sheet.getDataRange().getValues();
      var allBookings = [];

      for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        if (!row[1]) continue; // Skip empty rows
        allBookings.push({
          timestamp: row[0] ? String(row[0]) : "",
          bookingRef: String(row[1] || ""),
          fullName: String(row[2] || ""),
          phone: String(row[3] || ""),
          email: String(row[4] || ""),
          room: String(row[5] || ""),
          checkIn: formatDateISO(row[6]),
          checkOut: formatDateISO(row[7]),
          nights: parseInt(row[8] || 1, 10),
          guests: parseInt(row[9] || 2, 10),
          tourAddons: String(row[10] || "None"),
          grandTotal: String(row[11] || "0"),
          depositAmt: String(row[12] || "0"),
          paymentMethod: String(row[13] || "GCASH"),
          paymentType: String(row[14] || "deposit"),
          notes: String(row[15] || ""),
          status: String(row[16] || "Pending Deposit")
        });
      }

      return createJsonResponse({
        success: true,
        count: allBookings.length,
        bookings: allBookings
      });
    }

    if (action === "getBookedDates") {
      var rows = sheet.getDataRange().getValues();
      var bookedRanges = [];

      for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var room = String(row[5] || "").trim(); // Col F: Selected Room
        var checkInStr = formatDateISO(row[6]); // Col G: Check-in
        var checkOutStr = formatDateISO(row[7]); // Col H: Check-out
        var status = String(row[16] || "").trim(); // Col Q: Status

        // Only count Confirmed or Pending Deposit bookings (ignore Cancelled)
        if (status === "Confirmed" || status === "Pending Deposit") {
          if (!requestedRoom || room.toLowerCase() === requestedRoom.toLowerCase()) {
            bookedRanges.push({
              bookingRef: row[1],
              room: room,
              checkIn: checkInStr,
              checkOut: checkOutStr,
              status: status
            });
          }
        }
      }

      return createJsonResponse({
        success: true,
        count: bookedRanges.length,
        bookedRanges: bookedRanges
      });
    }

    // Default health check
    return createJsonResponse({
      success: true,
      service: "The Island Palms Reservation API",
      status: "Active & Operational",
      timestamp: new Date().toISOString()
    });

  } catch (err) {
    return createJsonResponse({
      success: false,
      error: err.toString()
    });
  }
}

/**
 * Handle HTTP POST Requests:
 * Atomically checks for date collision and records reservation if available.
 */
function doPost(e) {
  // Concurrency Lock: Prevents two simultaneous requests from booking the same room at the same millisecond
  var lock = LockService.getScriptLock();
  
  try {
    // Wait up to 10 seconds to acquire atomic lock
    var acquired = lock.tryLock(10000);
    if (!acquired) {
      return createJsonResponse({
        success: false,
        error: "Server is busy processing another reservation. Please try again in a few seconds."
      });
    }

    // Parse incoming JSON body or form payload
    var payload;
    if (e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (parseErr) {
        payload = e.parameter || {};
      }
    } else {
      payload = e.parameter || {};
    }

    // Admin Action: Update Booking Status (e.g. Pending Deposit -> Confirmed / Verified)
    if (payload.action === "updateBookingStatus") {
      var targetRef = String(payload.bookingRef || "").trim();
      var targetStatus = String(payload.newStatus || "Confirmed").trim();
      if (!targetRef) {
        return createJsonResponse({ success: false, error: "Missing required bookingRef" });
      }

      var sheet = getOrCreateBookingsSheet();
      var rows = sheet.getDataRange().getValues();
      var updated = false;

      for (var r = 1; r < rows.length; r++) {
        if (String(rows[r][1]).trim() === targetRef) {
          sheet.getRange(r + 1, 17).setValue(targetStatus);
          updated = true;
          break;
        }
      }

      return createJsonResponse({
        success: updated,
        message: updated ? "Booking " + targetRef + " successfully updated to: " + targetStatus : "Booking reference not found in sheet",
        bookingRef: targetRef,
        newStatus: targetStatus
      });
    }

    var fullName      = String(payload.fullName || payload.guestFullName || "Valued Guest").trim();
    var phone         = String(payload.phone || payload.guestPhone || "").trim();
    var email         = String(payload.email || payload.guestEmail || "").trim();
    var room          = String(payload.room || payload.modalRoomSelect || "Standard Room").trim();
    var checkInStr    = String(payload.checkIn || payload.modalCheckIn || "").trim();
    var checkOutStr   = String(payload.checkOut || payload.modalCheckOut || "").trim();
    var nights        = parseInt(payload.nights || 1, 10);
    var guests        = parseInt(payload.guests || payload.modalAdults || 2, 10);
    var tourAddons    = String(payload.tourAddons || "None").trim();
    var grandTotal    = String(payload.grandTotal || "0").trim();
    var depositAmt    = String(payload.depositAmt || "0").trim();
    var paymentMethod = String(payload.paymentMethod || "gcash").toUpperCase();
    var paymentType   = String(payload.paymentType || "deposit").trim();
    var notes         = String(payload.notes || payload.guestNotes || "None").trim();

    // Validation
    if (!checkInStr || !checkOutStr) {
      return createJsonResponse({
        success: false,
        error: "Missing required check-in or check-out date."
      });
    }

    var newCheckIn = new Date(checkInStr);
    var newCheckOut = new Date(checkOutStr);

    if (isNaN(newCheckIn.getTime()) || isNaN(newCheckOut.getTime())) {
      return createJsonResponse({
        success: false,
        error: "Invalid date format provided. Please use YYYY-MM-DD."
      });
    }

    if (newCheckOut <= newCheckIn) {
      return createJsonResponse({
        success: false,
        error: "Check-out date must be after check-in date."
      });
    }

    var sheet = getOrCreateBookingsSheet();
    var rows = sheet.getDataRange().getValues();

    // ========================================================================
    // DOUBLE-BOOKING COLLISION CHECK (Crucial Shield)
    // Formula: New_CheckIn < Existing_CheckOut AND New_CheckOut > Existing_CheckIn
    // ========================================================================
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var existingRoom = String(row[5] || "").trim();
      var existingStatus = String(row[16] || "").trim();

      // Only check against the same room type and active/pending statuses
      if (existingRoom.toLowerCase() === room.toLowerCase()) {
        if (existingStatus === "Confirmed" || existingStatus === "Pending Deposit") {
          var existIn = new Date(row[6]);
          var existOut = new Date(row[7]);

          if (!isNaN(existIn.getTime()) && !isNaN(existOut.getTime())) {
            // Overlap condition
            if (newCheckIn < existOut && newCheckOut > existIn) {
              return createJsonResponse({
                success: false,
                isCollision: true,
                error: "DATES UNAVAILABLE: " + room + " is already booked from " + 
                       formatDateDisplay(existIn) + " to " + formatDateDisplay(existOut) + 
                       ". Please select another date or room type."
              });
            }
          }
        }
      }
    }

    // ========================================================================
    // NO COLLISION FOUND: Record Reservation Atomically
    // ========================================================================
    var bookingRef = payload.bookingRef || ("IPH-" + Utilities.formatDate(new Date(), "Asia/Manila", "yyyy") + "-" + Math.floor(1000 + Math.random() * 9000));
    var timestamp = Utilities.formatDate(new Date(), "Asia/Manila", "yyyy-MM-dd HH:mm:ss");
    var initialStatus = (paymentType === "cash") ? "Pending Deposit" : "Pending Deposit";

    var newRow = [
      timestamp,                    // Col A: Timestamp
      bookingRef,                   // Col B: Booking Reference
      fullName,                     // Col C: Guest Full Name
      phone,                        // Col D: Phone Number
      email,                        // Col E: Email Address
      room,                         // Col F: Selected Room
      checkInStr,                   // Col G: Check-in Date
      checkOutStr,                  // Col H: Check-out Date
      nights,                       // Col I: Nights
      guests,                       // Col J: Guests
      tourAddons,                   // Col K: Tours & Add-ons
      grandTotal,                   // Col L: Grand Total
      depositAmt,                   // Col M: Deposit Due
      paymentMethod,                // Col N: Payment Method
      paymentType,                  // Col O: Payment Type
      notes,                        // Col P: Special Requests
      initialStatus                 // Col Q: Booking Status
    ];

    sheet.appendRow(newRow);

    // Optional: Format the newly added row
    var lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1, 1, newRow.length).setVerticalAlignment("middle");

    return createJsonResponse({
      success: true,
      bookingRef: bookingRef,
      message: "Provisional reservation successfully secured in Google Sheets!",
      data: {
        room: room,
        checkIn: checkInStr,
        checkOut: checkOutStr,
        status: initialStatus,
        grandTotal: grandTotal,
        depositAmt: depositAmt
      }
    });

  } catch (err) {
    return createJsonResponse({
      success: false,
      error: "Server Error: " + err.toString()
    });
  } finally {
    // Always release lock so subsequent bookings can proceed
    lock.releaseLock();
  }
}

/**
 * Get or create the master 'Bookings' sheet with professional headers and formatting.
 */
function getOrCreateBookingsSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    var headers = [
      "Timestamp",
      "Booking Reference",
      "Guest Full Name",
      "Phone Number",
      "Email Address",
      "Selected Room",
      "Check-In Date",
      "Check-Out Date",
      "Nights",
      "Guests",
      "Included Tours & Addons",
      "Grand Total (PHP)",
      "Deposit Due (PHP)",
      "Payment Method",
      "Payment Type",
      "Special Requests / Notes",
      "Booking Status"
    ];

    sheet.appendRow(headers);
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#0f5132")
               .setFontColor("#ffffff")
               .setFontWeight("bold")
               .setFontSize(10)
               .setHorizontalAlignment("center");
    
    sheet.setFrozenRows(1);
    sheet.autoResizeColumns(1, headers.length);
  }

  return sheet;
}

/**
 * Helper to build JSON responses for client website
 */
function createJsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
                       .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Helper to format date object or string into YYYY-MM-DD
 */
function formatDateISO(d) {
  if (!d) return "";
  if (typeof d === "string") {
    var parts = d.split("T")[0];
    return parts;
  }
  var dateObj = new Date(d);
  if (isNaN(dateObj.getTime())) return String(d);
  return Utilities.formatDate(dateObj, "Asia/Manila", "yyyy-MM-dd");
}

function formatDateDisplay(d) {
  if (!d) return "";
  var dateObj = new Date(d);
  if (isNaN(dateObj.getTime())) return String(d);
  return Utilities.formatDate(dateObj, "Asia/Manila", "MMM dd, yyyy");
}
