import { CartItem, CustomerInfo, OrderType, Branch } from '../types';

export function buildWhatsAppMessage(
  cart: CartItem[],
  customer: CustomerInfo,
  orderType: OrderType,
  branch: Branch | null,
  note?: string
): string {
  const activeBranchName = branch ? branch.name : "غير محدد";

  let msg = `*طلب جديد من موقع مطعم زنجر* 🍔\n\n`;
  msg += `*الفرع:* ${activeBranchName}\n`;
  msg += `*الاسم:* ${customer.name}\n`;
  msg += `*رقم الجوال:* ${customer.phone}\n`;
  msg += `*نوع الطلب:* ${orderType === "delivery" ? "توصيل للمنزل" : "استلام من الفرع"}\n`;

  if (orderType === "delivery" && customer.address) {
    msg += `*العنوان:* ${customer.address}\n`;
  }
  if (note && note.trim()) {
    msg += `*ملاحظات:* ${note.trim()}\n`;
  }

  msg += `\n*🧾 الطلبات:*\n`;

  let subtotal = 0;
  cart.forEach((item) => {
    subtotal += item.totalPrice;
    
    let itemDesc = `• ${item.item.name}`;
    if (item.selectedSize?.name) {
      itemDesc += ` (${item.selectedSize.name})`;
    }
    if (item.spiceLevel) {
      itemDesc += ` - ${item.spiceLevel}`;
    }
    if (item.selectedExtras && item.selectedExtras.length > 0) {
      const extrasStr = item.selectedExtras.map((e) => e.name).join(' + ');
      itemDesc += ` [إضافات: ${extrasStr}]`;
    }
    itemDesc += ` x${item.quantity} = ${item.totalPrice} ج.م\n`;
    msg += itemDesc;
  });

  msg += `\n*💰 الإجمالي:* ${subtotal} ج.م\n`;
  msg += `\n*شكراً لاستخدامك موقع مطعم زنجر ❤️*`;

  return encodeURIComponent(msg);
}

export function getWhatsAppLink(
  cart: CartItem[],
  customer: CustomerInfo,
  orderType: OrderType,
  branch: Branch | null,
  note?: string
): string {
  const branchWa = branch?.whatsapp || "201034456624";
  const encodedMsg = buildWhatsAppMessage(cart, customer, orderType, branch, note);
  return `https://wa.me/${branchWa}?text=${encodedMsg}`;
}
