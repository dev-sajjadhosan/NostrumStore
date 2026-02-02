import { toast } from "sonner";

export const generateSKU = (form: any) => {
  const name = form.getFieldValue("name");
  const strength = form.getFieldValue("strength");
  const unit = form.getFieldValue("unitType");

  if (!name || !strength) {
    toast.error("Please enter Name and Strength first");
    return;
  }

  const cleanName = name.replace(/\s+/g, "-").toUpperCase();
  const cleanStrength = strength.replace(/\s+/g, "").toUpperCase();
  const randomSuffix = Math.floor(100 + Math.random() * 900); // 3 random digits

  const generated = `${cleanName}-${cleanStrength}-${unit.toUpperCase()}-${randomSuffix}`;
  form.setFieldValue("sku", generated);
  toast.info("SKU Generated!");
};
