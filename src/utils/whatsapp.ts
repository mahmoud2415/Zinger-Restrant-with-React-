import { CartItem, CustomerInfo, OrderType, Branch } from '../types';

export function buildWhatsAppMessage(
  cart: CartItem[],
  customer: CustomerInfo,
  orderType: OrderType,
  branch: Branch | null
): string {
  const branchName = branch ? branch.name : 'فرع غير محدد';

  let msg = `*طلب جديد من موقع مطعم زينجر* 🍔🔥\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `📍 *الفرع المختار:* ${branchName}\n`;
  msg += `👤 *اسم العميل:* ${customer.name || 'عميل زينجر'}\n`;
  msg += `📞 *رقم الجوال:* ${customer.phone}\n`;
  msg += `🛵 *نوع الطلب:* ${orderType === 'delivery' ? 'توصيل للمنزل (Delivery)' : 'استلام من المطعم (Pickup)'}\n`;

  if (orderType === 'delivery' && customer.address) {
    msg += `🏠 *العنوان بالتفصيل:* ${customer.address}\n`;
  }
  if (customer.note && customer.note.trim()) {
    msg += `📝 *ملاحظات خاصة:* ${customer.note.trim()}\n`;
  }

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `*🧾 تفاصيل الوجبات والطلبات:*\n\n`;

  let subtotal = 0;
  cart.forEach((cartItem, idx) => {
    subtotal += cartItem.totalPrice;

    let itemLine = `${idx + 1}. *${cartItem.item.nameAr}*`;
    if (cartItem.selectedSize) {
      itemLine += `\n   ▫️ *الحجم:* ${cartItem.selectedSize.nameAr}`;
    }
    if (cartItem.spiceLevel) {
      itemLine += `\n   ▫️ *الشطة:* ${cartItem.spiceLevel}`;
    }
    itemLine += `\n   ▫️ *الكمية:* ${cartItem.quantity} × ${cartItem.unitPrice} ج.م = *${cartItem.totalPrice} ج.م*\n`;

    msg += itemLine + '\n';
  });

  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `💰 *الإجمالي النهائي:* *${subtotal} جنيه مصري*\n`;
  msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
  msg += `شكراً لطلبك من مطعم زينجر! ❤️🍔\n_ZINGER Restaurant_`;

  return encodeURIComponent(msg);
}

export function getWhatsAppLink(
  cart: CartItem[],
  customer: CustomerInfo,
  orderType: OrderType,
  branch: Branch | null
): string {
  const branchWhatsApp = branch?.whatsapp || '201002552421';
  const encodedMsg = buildWhatsAppMessage(cart, customer, orderType, branch);
  return `https://wa.me/${branchWhatsApp}?text=${encodedMsg}`;
}
