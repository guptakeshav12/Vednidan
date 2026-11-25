const fs = require('fs');
let html = fs.readFileSync('frontend/index.html', 'utf8');

const paymentModal = \
  <!-- Razorpay Mock Payment Modal -->
  <div class="modal-backdrop" id="payment-modal-backdrop" style="display: none; z-index: 9999;">
    <div class="payment-modal" style="background: white; border-radius: 12px; width: 400px; max-width: 90%; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.3); margin: auto; margin-top: 10vh; font-family: sans-serif;">
      <div style="background: var(--primary-dark); color: white; padding: 20px; text-align: center; position: relative;">
        <button id="payment-close-btn" style="position: absolute; right: 15px; top: 15px; background: none; border: none; color: white; font-size: 20px; cursor: pointer;"><i class="ri-close-line"></i></button>
        <img src="https://razorpay.com/assets/razorpay-logo.svg" alt="Razorpay" style="height: 24px; filter: brightness(0) invert(1); margin-bottom: 10px;">
        <div style="font-size: 14px; opacity: 0.8;">VedNidan Healthcare</div>
        <div id="payment-amount-display" style="font-size: 28px; font-weight: bold; margin-top: 10px;">?0</div>
      </div>
      <div style="padding: 24px;">
        <h4 style="margin-top:0; margin-bottom: 16px; color: #333; font-size: 15px;">Select Payment Method</h4>
        <div class="payment-method-btn" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 10px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: all 0.2s;" onclick="processMockPayment('UPI')">
          <i class="ri-qr-code-line" style="font-size: 24px; color: var(--primary);"></i>
          <div>
            <div style="font-weight: 600; font-size: 14px;">UPI / QR</div>
            <div style="font-size: 12px; color: #777;">Google Pay, PhonePe, Paytm</div>
          </div>
        </div>
        <div class="payment-method-btn" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 10px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: all 0.2s;" onclick="processMockPayment('Card')">
          <i class="ri-bank-card-line" style="font-size: 24px; color: var(--primary);"></i>
          <div>
            <div style="font-weight: 600; font-size: 14px;">Card</div>
            <div style="font-size: 12px; color: #777;">Visa, MasterCard, RuPay</div>
          </div>
        </div>
        <div class="payment-method-btn" style="padding: 12px; border: 1px solid #ddd; border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 12px; transition: all 0.2s;" onclick="processMockPayment('NetBanking')">
          <i class="ri-bank-line" style="font-size: 24px; color: var(--primary);"></i>
          <div>
            <div style="font-weight: 600; font-size: 14px;">Netbanking</div>
            <div style="font-size: 12px; color: #777;">All Indian Banks</div>
          </div>
        </div>
      </div>
      <div id="payment-processing-state" style="display: none; padding: 40px 20px; text-align: center;">
        <i class="ri-loader-4-line ri-spin" style="font-size: 40px; color: var(--primary);"></i>
        <p style="margin-top: 16px; font-weight: 600; color: #333;">Processing Payment...</p>
        <p style="font-size: 12px; color: #777;">Please do not close this window.</p>
      </div>
    </div>
  </div>

  <!-- Delivery Tracker Modal -->
  <div class="modal-backdrop" id="delivery-modal-backdrop" style="display: none; z-index: 9999;">
    <div class="modal-container" style="max-width: 500px; padding: 30px; position: relative;">
      <button class="modal-close" id="delivery-close-btn" style="position: absolute; right: 15px; top: 15px; background: none; border: none; font-size: 20px; cursor: pointer;"><i class="ri-close-line"></i></button>
      <h3 style="font-size: 20px; color: var(--primary-dark); margin-bottom: 24px; border-bottom: 1px solid #eee; padding-bottom: 15px;">
        <i class="ri-truck-line"></i> Delivery Partner Tracking
      </h3>
      
      <div style="display: flex; gap: 16px; margin-bottom: 24px; background: #f8fbfa; padding: 16px; border-radius: 8px;">
        <img src="https://images.unsplash.com/photo-1617450365226-9bf28c04e130?auto=format&fit=crop&q=80&w=60&h=60" style="border-radius: 50%; object-fit: cover;">
        <div>
          <h4 style="margin: 0 0 4px 0; color: #333;">Ramesh Kumar</h4>
          <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">Delivery Partner (Delhivery)</p>
          <div style="color: #f39c12; font-size: 13px;"><i class="ri-star-fill"></i> 4.8 Ratings</div>
        </div>
        <button style="margin-left: auto; align-self: center; background: var(--primary); color: white; border: none; border-radius: 50%; width: 40px; height: 40px; cursor: pointer;"><i class="ri-phone-fill"></i></button>
      </div>

      <div class="delivery-timeline" style="position: relative; padding-left: 20px;">
        <div style="position: absolute; left: 6px; top: 10px; bottom: 20px; width: 2px; background: #eee;"></div>
        
        <div style="position: relative; margin-bottom: 20px;">
          <div style="position: absolute; left: -20px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: var(--primary); border: 3px solid #e2f1ed;"></div>
          <h5 style="margin: 0 0 4px 0; color: #333;">Order Confirmed</h5>
          <p style="margin: 0; font-size: 12px; color: #777;">We have received your order.</p>
        </div>
        <div style="position: relative; margin-bottom: 20px;">
          <div style="position: absolute; left: -20px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: var(--primary); border: 3px solid #e2f1ed;"></div>
          <h5 style="margin: 0 0 4px 0; color: #333;">Packed & Ready</h5>
          <p style="margin: 0; font-size: 12px; color: #777;">Seller has packed your items.</p>
        </div>
        <div style="position: relative; margin-bottom: 20px;">
          <div style="position: absolute; left: -20px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: #fff; border: 2px solid var(--primary); box-shadow: 0 0 0 3px #e2f1ed;"></div>
          <h5 style="margin: 0 0 4px 0; color: var(--primary-dark); font-weight: bold;">Out for Delivery <span class="pulse-dot" style="display:inline-block;width:8px;height:8px;background:#e74c3c;border-radius:50%;margin-left:5px;animation:pulse 1.5s infinite;"></span></h5>
          <p style="margin: 0; font-size: 12px; color: #777;">Ramesh is on the way to your address.</p>
          <div style="margin-top: 10px; height: 120px; background: #e0e0e0; border-radius: 8px; overflow: hidden; position: relative;">
            <img src="https://miro.medium.com/v2/resize:fit:1200/1*qYUvh-dpN62eXqR8B1z-Kw.jpeg" style="width: 100%; height: 100%; object-fit: cover; opacity: 0.7;">
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 6px 12px; border-radius: 20px; font-size: 11px; font-weight: bold; box-shadow: 0 2px 5px rgba(0,0,0,0.2);"><i class="ri-map-pin-line"></i> Live Tracking</div>
          </div>
        </div>
        <div style="position: relative;">
          <div style="position: absolute; left: -20px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: #eee; border: 2px solid #ccc;"></div>
          <h5 style="margin: 0 0 4px 0; color: #999;">Delivered</h5>
          <p style="margin: 0; font-size: 12px; color: #aaa;">Package will be handed over to you.</p>
        </div>
      </div>
    </div>
  </div>
\;

if (!html.includes('id=\"payment-modal-backdrop\"')) {
  html = html.replace('<!-- Toast Notification Container -->', paymentModal + '\n  <!-- Toast Notification Container -->');
}

if (!html.includes('id=\"track-order-btn\"')) {
  html = html.replace('<button class=\"btn-primary success-ok-btn\" id=\"success-close-btn\">Continue Shopping</button>',
  '<div style=\"display:flex;gap:10px;justify-content:center;margin-top:20px;\"><button class=\"btn-primary\" id=\"track-order-btn\" style=\"background:var(--secondary);border:none;padding:12px 20px;color:white;border-radius:40px;cursor:pointer;\"><i class=\"ri-truck-line\"></i> Track Delivery</button><button class=\"btn-primary success-ok-btn\" id=\"success-close-btn\">Continue Shopping</button></div>');
}

fs.writeFileSync('frontend/index.html', html);
