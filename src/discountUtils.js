// discountUtils.js

// Calculate total price of cart items
export function calculateItems(cartItems) {
  return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}

// Calculate discounted price given a discount percentage
export function calculateDiscount(totalAmount, discountPercentage) {
  const discountNum = Number(discountPercentage) || 0; // ensure number
  const discountAmount = (totalAmount * discountNum / 100).toFixed(2);
  const finalPrice = (totalAmount - discountAmount).toFixed(2);
  return { discountAmount, finalPrice };
}

  // discountUtils.js
export function getCouponDiscount(coupon) {
  switch (coupon) {
    case "SREEJA10": return 10;
    case "SREEJA20": return 20;
    case "SREEJA30": return 30;
    default: return 0; // invalid coupon
  }
}
