export default {
  name: "executive",
  title: "Executive Member",
  type: "document",
  fields: [
    { name: "name", title: "Name", type: "string" },
    { name: "role", title: "Role", type: "string" },
    { name: "phone", title: "Phone Number", type: "string" },
    { name: "orderRank", title: "Order Rank", type: "number" },
    { name: "image", title: "Profile Image", type: "image", options: { hotspot: true } },
  ],
};
