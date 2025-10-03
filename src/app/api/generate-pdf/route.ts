import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

// Types
interface BookingData {
  hospitalName: string;
  serviceName: string;
  patientName: string;
  date: string;
  time: string;
  location: string;
  bookingId: string;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingData } = body;

    if (!bookingData) {
      return NextResponse.json(
        { error: "Booking data is required" },
        { status: 400 }
      );
    }

    // Launch Puppeteer browser
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--no-first-run",
        "--no-zygote",
        "--single-process",
        "--disable-gpu",
      ],
    });

    const page = await browser.newPage();

    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 });

    // Generate HTML content with Tailwind CSS
    const htmlContent = generateAppointmentPassHTML(bookingData);

    // Set the HTML content
    await page.setContent(htmlContent, { waitUntil: "networkidle0" });

    // Wait for fonts and styles to load
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "20px",
        right: "20px",
        bottom: "20px",
        left: "20px",
      },
      preferCSSPageSize: true,
    });

    await browser.close();

    // Return PDF as response
    return new NextResponse(Buffer.from(pdfBuffer), {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="appointment-pass-${bookingData.bookingId}.pdf"`,
      },
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate PDF" },
      { status: 500 }
    );
  }
}

// HTML template function
function generateAppointmentPassHTML(bookingData: BookingData) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Appointment Pass - ${bookingData.bookingId}</title>
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
        <style>
            body { font-family: 'Inter', sans-serif; }
        </style>
    </head>
    <body class="bg-gray-100 p-8">
        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow-lg border-2 border-green-200 p-8">
            <!-- Header -->
            <div class="text-center mb-8">
                <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                    </svg>
                </div>
                <h1 class="text-3xl font-bold text-gray-900 mb-2">Appointment Pass</h1>
                <div class="flex items-center justify-center gap-2 mb-4">
                    <span class="px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">Confirmed</span>
                    <span class="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-semibold rounded-full">QR Verified</span>
                </div>
            </div>

            <!-- QR Code Section -->
            <div class="text-center mb-8">
                <div class="bg-gray-50 p-6 rounded-lg border-2 border-gray-200 inline-block">
                    <div class="w-32 h-32 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                        <span class="text-gray-500 text-sm text-center">QR CODE</span>
                    </div>
                </div>
            </div>

            <!-- Booking Details -->
            <div class="space-y-6">
                <!-- Hospital -->
                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div class="w-6 h-6 text-blue-600 mt-1">🏥</div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">Hospital</p>
                        <p class="font-bold text-gray-900 text-lg">${
                          bookingData.hospitalName
                        }</p>
                    </div>
                </div>

                <!-- Service -->
                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div class="w-6 h-6 text-green-600 mt-1">✅</div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">Service</p>
                        <p class="font-bold text-gray-900 text-lg">${
                          bookingData.serviceName
                        }</p>
                    </div>
                </div>

                <!-- Patient -->
                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div class="w-6 h-6 text-purple-600 mt-1">👤</div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">Patient</p>
                        <p class="font-bold text-gray-900 text-lg">${
                          bookingData.patientName
                        }</p>
                    </div>
                </div>

                <!-- Date & Time -->
                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div class="w-6 h-6 text-orange-600 mt-1">📅</div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">Date & Time</p>
                        <p class="font-bold text-gray-900 text-lg">${
                          bookingData.date
                        } at ${bookingData.time}</p>
                    </div>
                </div>

                <!-- Location -->
                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div class="w-6 h-6 text-red-600 mt-1">📍</div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">Location</p>
                        <p class="font-bold text-gray-900 text-lg">${
                          bookingData.location
                        }</p>
                    </div>
                </div>

                <!-- Booking ID -->
                <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                    <div class="w-6 h-6 text-indigo-600 mt-1">🔢</div>
                    <div class="flex-1">
                        <p class="text-sm font-medium text-gray-600 uppercase tracking-wide">Booking ID</p>
                        <p class="font-mono font-bold text-gray-900 text-lg">${
                          bookingData.bookingId
                        }</p>
                    </div>
                </div>

                <!-- Pricing -->
                <div class="bg-gray-50 p-6 rounded-lg">
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-sm text-gray-600">Original Price:</span>
                        <span class="line-through text-gray-500 font-medium">SAR ${
                          bookingData.originalPrice
                        }</span>
                    </div>
                    <div class="flex justify-between items-center mb-3">
                        <span class="text-sm text-gray-600">You Paid:</span>
                        <span class="text-2xl font-bold text-green-600">SAR ${
                          bookingData.discountedPrice
                        }</span>
                    </div>
                    <div class="flex justify-between items-center text-sm">
                        <span class="text-green-600 font-medium">You Saved:</span>
                        <span class="text-green-600 font-bold text-lg">SAR ${
                          bookingData.savings
                        }</span>
                    </div>
                </div>

                <!-- Important Notes -->
                <div class="space-y-4">
                    <div class="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <p class="text-sm text-blue-800 text-center">
                            <strong>💡 Scan QR Code:</strong> Hospital staff can scan this code to verify your appointment details instantly.
                        </p>
                    </div>
                    <div class="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <p class="text-sm text-yellow-800 text-center">
                            <strong>⚠️ Important:</strong> Show this pass at the hospital reception when you arrive for your appointment.
                        </p>
                    </div>
                </div>
            </div>

            <!-- Footer -->
            <div class="mt-8 pt-6 border-t border-gray-200 text-center">
                <p class="text-sm text-gray-500">
                    Generated on ${new Date().toLocaleDateString()} | Maven Health Platform
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
}
