const fs = require('fs');
let html = fs.readFileSync('frontend/index.html', 'utf8');

// 1. Add COD to payment modal
const codHtml = \
        <div class="payment-method-btn" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: all 0.2s;" onclick="Cart.processMockPayment('Cash on Delivery')">
          <i class="ri-money-rupee-circle-line" style="font-size: 24px; color: var(--primary);"></i>
          <div>
            <div style="font-weight: 600; font-size: 14px;">Cash on Delivery</div>
            <div style="font-size: 12px; color: #777;">Pay when you receive the order</div>
          </div>
        </div>
\;
if (!html.includes('Cash on Delivery')) {
  html = html.replace('All Indian Banks</div>\n          </div>\n        </div>', 'All Indian Banks</div>\n          </div>\n        </div>\n' + codHtml);
}

// 2. Add Invoice Modal HTML
const invoiceModal = \
  <!-- Invoice / Bill Modal -->
  <div class="modal-backdrop" id="invoice-modal-backdrop" style="display: none; z-index: 9999;">
    <div class="modal-container" style="max-width: 600px; padding: 0; position: relative; background: #f5f5f5;">
      <div style="padding: 15px 20px; background: white; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #ddd;">
        <h3 style="margin:0; font-size: 18px;"><i class="ri-file-list-3-line"></i> Order Invoice</h3>
        <button id="invoice-close-btn" style="background: none; border: none; font-size: 24px; cursor: pointer;"><i class="ri-close-line"></i></button>
      </div>
      
      <div id="invoice-print-area" style="background: white; padding: 40px; margin: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); font-family: monospace; color: #333;">
        <div style="display: flex; justify-content: space-between; border-bottom: 2px dashed #ccc; padding-bottom: 20px; margin-bottom: 20px;">
          <div>
            <h2 style="margin:0; color: var(--primary-dark); font-family: sans-serif;">VedNidan Healthcare</h2>
            <p style="margin:4px 0 0 0; font-size: 12px;">Tax Invoice / Bill of Supply</p>
          </div>
          <div style="text-align: right;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Bouton_code_barres.svg/1200px-Bouton_code_barres.svg.png" alt="Barcode" style="height: 40px; filter: grayscale(100%); mix-blend-mode: multiply;">
            <p style="margin: 4px 0 0 0; font-size: 11px;">Scan to Track Order</p>
            <p style="margin: 4px 0 0 0; font-weight: bold;" id="invoice-order-id">ORDER ID: #000000</p>
          </div>
        </div>
        
        <div style="display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 30px;">
          <div style="max-width: 50%;">
            <strong>Billed To:</strong><br>
            <span id="invoice-customer-name">-</span><br>
            <span id="invoice-customer-address">-</span><br>
            <span id="invoice-customer-phone">-</span>
          </div>
          <div style="text-align: right;">
            <strong>Order Date:</strong> <span id="invoice-date">-</span><br>
            <strong>Payment Mode:</strong> <span id="invoice-payment-method">-</span>
          </div>
        </div>
        
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13px;">
          <thead>
            <tr style="background: #eee; text-align: left;">
              <th style="padding: 8px; border-bottom: 1px solid #ccc;">Item</th>
              <th style="padding: 8px; border-bottom: 1px solid #ccc;">Qty</th>
              <th style="padding: 8px; border-bottom: 1px solid #ccc;">Price</th>
              <th style="padding: 8px; border-bottom: 1px solid #ccc; text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody id="invoice-items-list">
            <!-- Rendered by JS -->
          </tbody>
        </table>
        
        <div style="display: flex; justify-content: flex-end; font-size: 14px;">
          <div style="width: 200px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><span>Subtotal:</span> <span id="invoice-subtotal">?0</span></div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><span>Discount:</span> <span id="invoice-discount">?0</span></div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 6px;"><span>Shipping:</span> <span id="invoice-shipping">?0</span></div>
            <div style="display: flex; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 2px solid #ccc; font-weight: bold; font-size: 16px;"><span>Total:</span> <span id="invoice-total">?0</span></div>
          </div>
        </div>
        
        <div style="margin-top: 40px; text-align: center; font-size: 11px; color: #777;">
          <p>Thank you for shopping with VedNidan Healthcare.</p>
          <p>This is a computer-generated invoice.</p>
        </div>
      </div>
      
      <div style="padding: 15px 20px; background: white; text-align: center; border-top: 1px solid #ddd;">
        <button onclick="window.print()" style="background: var(--primary); color: white; padding: 10px 20px; border: none; border-radius: 6px; cursor: pointer; font-weight: 600;"><i class="ri-printer-line"></i> Print / Download Invoice</button>
      </div>
    </div>
  </div>
\;

if (!html.includes('id="invoice-modal-backdrop"')) {
  html = html.replace('<!-- Toast Notification Container -->', invoiceModal + '\n  <!-- Toast Notification Container -->');
}

// 3. Add View Invoice button to success overlay
if (!html.includes('id="view-invoice-btn"')) {
  html = html.replace('<button class="btn-primary" id="track-order-btn" style="background:var(--secondary);border:none;padding:12px 20px;color:white;border-radius:40px;cursor:pointer;"><i class="ri-truck-line"></i> Track Delivery</button>',
  '<button class="btn-primary" id="view-invoice-btn" style="background:white;color:var(--primary);border:2px solid var(--primary);padding:12px 20px;border-radius:40px;cursor:pointer;font-weight:bold;"><i class="ri-file-list-3-line"></i> View Bill</button>\n        <button class="btn-primary" id="track-order-btn" style="background:var(--secondary);border:none;padding:12px 20px;color:white;border-radius:40px;cursor:pointer;"><i class="ri-barcode-box-line"></i> Track Delivery</button>');
}

fs.writeFileSync('frontend/index.html', html);
